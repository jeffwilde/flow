use axum::{http::StatusCode, response::IntoResponse};
use std::sync::{Arc, Mutex};

mod authorize_task;
mod authorize_user_collection;
mod authorize_user_task;
mod create_data_plane;
mod notify_shard_failure;
mod snapshot;
mod update_l2_reporting;

use anyhow::Context;
use snapshot::Snapshot;

/// Request wraps a JSON-deserialized request type T which
/// also implements the validator::Validate trait.
#[derive(Debug, Clone, Copy, Default)]
pub struct Request<T>(pub T);

/// ControlClaims are claims encoded within control-plane access tokens.
type ControlClaims = models::authorizations::ControlClaims;

/// DataClaims are claims encoded within data-plane access tokens.
/// TODO(johnny): This should be a bare alias for proto_gazette::Claims.
/// We can do this once data-plane-gateway is updated to be a "dumb" proxy
/// which requires / forwards authorizations but doesn't inspect them.
#[derive(Debug, serde::Serialize, serde::Deserialize)]
struct DataClaims {
    #[serde(flatten)]
    inner: proto_gazette::Claims,
    // prefixes exclusively used by legacy auth checks in data-plane-gateway.
    prefixes: Vec<String>,
}

/// Rejection is an error type of reasons why an API request may fail.
#[derive(Debug, thiserror::Error)]
pub enum Rejection {
    #[error(transparent)]
    ValidationError(#[from] validator::ValidationErrors),
    #[error(transparent)]
    JsonError(#[from] axum::extract::rejection::JsonRejection),
}

struct App {
    id_generator: Mutex<models::IdGenerator>,
    jwt_secret: jsonwebtoken::DecodingKey,
    jwt_validation: jsonwebtoken::Validation,
    pg_pool: sqlx::PgPool,
    publisher: crate::publications::Publisher,
    snapshot: std::sync::RwLock<Snapshot>,
}

/// Build the agent's API router.
pub fn build_router(
    id_generator: models::IdGenerator,
    jwt_secret: Vec<u8>,
    pg_pool: sqlx::PgPool,
    publisher: crate::publications::Publisher,
    allow_origin: &[String],
) -> anyhow::Result<axum::Router<()>> {
    let jwt_secret = jsonwebtoken::DecodingKey::from_secret(&jwt_secret);

    let mut jwt_validation = jsonwebtoken::Validation::default();
    jwt_validation.set_audience(&["authenticated"]);

    let (snapshot, seed_rx) = snapshot::seed();

    let app = Arc::new(App {
        id_generator: Mutex::new(id_generator),
        jwt_secret,
        jwt_validation,
        pg_pool,
        publisher,
        snapshot: std::sync::RwLock::new(snapshot),
    });
    tokio::spawn(snapshot::fetch_loop(app.clone(), seed_rx));

    use axum::routing::post;

    let allow_origin = allow_origin
        .into_iter()
        .map(|o| o.parse())
        .collect::<Result<Vec<_>, _>>()
        .context("failed to parse allowed origins")?;

    let allow_headers = [
        "Cache-Control",
        "Content-Language",
        "Content-Length",
        "Content-Type",
        "Expires",
        "Last-Modified",
        "Pragma",
        "Authorization",
    ]
    .into_iter()
    .map(|h| h.parse().unwrap())
    .collect::<Vec<_>>();

    let cors = tower_http::cors::CorsLayer::new()
        .allow_methods(tower_http::cors::AllowMethods::mirror_request())
        .allow_origin(tower_http::cors::AllowOrigin::list(allow_origin))
        .allow_headers(allow_headers);

    let schema_router = axum::Router::new()
        .route("/authorize/task", post(authorize_task::authorize_task))
        .route(
            "/authorize/user/task",
            post(authorize_user_task::authorize_user_task)
                .route_layer(axum::middleware::from_fn_with_state(app.clone(), authorize))
                .options(preflight_handler),
        )
        .route(
            "/authorize/user/collection",
            post(authorize_user_collection::authorize_user_collection)
                .route_layer(axum::middleware::from_fn_with_state(app.clone(), authorize))
                .options(preflight_handler),
        )
        .route(
            "/admin/create-data-plane",
            post(create_data_plane::create_data_plane)
                .route_layer(axum::middleware::from_fn_with_state(app.clone(), authorize)),
        )
        .route(
            "/admin/update-l2-reporting",
            post(update_l2_reporting::update_l2_reporting)
                .route_layer(axum::middleware::from_fn_with_state(app.clone(), authorize)),
        )
        .route(
            "/notify/shard-failure",
            post(notify_shard_failure::notify_shard_failure),
        )
        .layer(tower_http::trace::TraceLayer::new_for_http())
        .layer(cors)
        .with_state(app);

    Ok(schema_router)
}

async fn preflight_handler() -> impl IntoResponse {
    (StatusCode::NO_CONTENT, "")
}

#[axum::async_trait]
impl<T, S> axum::extract::FromRequest<S> for Request<T>
where
    T: serde::de::DeserializeOwned + validator::Validate,
    S: Send + Sync,
    axum::extract::Json<T>:
        axum::extract::FromRequest<S, Rejection = axum::extract::rejection::JsonRejection>,
{
    type Rejection = Rejection;

    async fn from_request(req: axum::extract::Request, state: &S) -> Result<Self, Self::Rejection> {
        let axum::extract::Json(value) = axum::extract::Json::<T>::from_request(req, state).await?;
        value.validate()?;
        Ok(Request(value))
    }
}

impl axum::response::IntoResponse for Rejection {
    fn into_response(self) -> axum::response::Response {
        match self {
            Rejection::ValidationError(inner) => {
                let message = format!("Input validation error: [{inner}]").replace('\n', ", ");
                (StatusCode::BAD_REQUEST, message).into_response()
            }
            Rejection::JsonError(inner) => inner.into_response(),
        }
    }
}

// TODO(johnny): Helper for more ergonomic errors.
// I'm near-certain there's a cleaner way to do this, but haven't found it yet.
async fn wrap<F, T>(fut: F) -> axum::response::Response
where
    T: serde::Serialize,
    F: std::future::Future<Output = anyhow::Result<T>>,
{
    match fut.await {
        Ok(inner) => (StatusCode::OK, axum::Json::from(inner)).into_response(),
        Err(err) => {
            let err = format!("{err:#}");
            (StatusCode::BAD_REQUEST, err).into_response()
        }
    }
}

// Middleware which validates JWT tokens before proceeding, and attaches verified Claims.
async fn authorize(
    axum::extract::State(app): axum::extract::State<Arc<App>>,
    axum_extra::TypedHeader(bearer): axum_extra::TypedHeader<
        axum_extra::headers::Authorization<axum_extra::headers::authorization::Bearer>,
    >,
    mut req: axum::http::Request<axum::body::Body>,
    next: axum::middleware::Next,
) -> axum::response::Response {
    let token = match jsonwebtoken::decode::<ControlClaims>(
        bearer.token(),
        &app.jwt_secret,
        &app.jwt_validation,
    ) {
        Ok(claims) => claims,
        Err(err) => {
            return (
                StatusCode::UNAUTHORIZED,
                format!("failed to parse authorization token: {err}"),
            )
                .into_response();
        }
    };

    req.extensions_mut().insert(token.claims);
    next.run(req).await
}

fn exp_seconds() -> u64 {
    use rand::Rng;

    // Select a random expiration time in range [40, 80) minutes,
    // which spreads out load from re-authorization requests over time.
    rand::thread_rng().gen_range(40 * 60..80 * 60)
}

fn ops_suffix(task: &snapshot::SnapshotTask) -> String {
    let ops_kind = match task.spec_type {
        models::CatalogType::Capture => "capture",
        models::CatalogType::Collection => "derivation",
        models::CatalogType::Materialization => "materialization",
        models::CatalogType::Test => "test",
    };
    format!(
        "/kind={ops_kind}/name={}/pivot=00",
        labels::percent_encoding(&task.task_name).to_string(),
    )
}

// Support the legacy data-plane by re-writing its internal service
// addresses to use the data-plane-gateway in external contexts.
fn maybe_rewrite_address(external: bool, address: &str) -> String {
    if external && address.contains("svc.cluster.local:") {
        "https://us-central1.v1.estuary-data.dev".to_string()
    } else {
        address.to_string()
    }
}

// Parse a data-plane claims token without verifying it's signature.
fn parse_untrusted_data_plane_claims(
    token: &str,
) -> anyhow::Result<(jsonwebtoken::Header, proto_gazette::Claims)> {
    let jsonwebtoken::TokenData { header, claims }: jsonwebtoken::TokenData<proto_gazette::Claims> =
        {
            // In this pass we do not validate the signature,
            // because we don't yet know which data-plane the JWT is signed by.
            let empty_key = jsonwebtoken::DecodingKey::from_secret(&[]);
            let mut validation = jsonwebtoken::Validation::default();
            validation.insecure_disable_signature_validation();
            jsonwebtoken::decode(token, &empty_key, &validation)
        }?;

    if claims.sub.is_empty() {
        anyhow::bail!("missing required shard ID (`sub` claim)");
    }
    if claims.iss.is_empty() {
        anyhow::bail!("missing required shard data-plane FQDN (`iss` claim)");
    }

    tracing::debug!(?claims, ?header, "decoded authorization request");

    Ok((header, claims))
}

fn verify_data_plane_claims<'s>(
    data_planes: &'s tables::DataPlanes,
    tasks: &'s [snapshot::SnapshotTask],
    shard_id: &str,
    shard_data_plane_fqdn: &str,
    token: &str,
) -> anyhow::Result<(&'s snapshot::SnapshotTask, &'s tables::DataPlane)> {
    // Map `shard_id` into its task.
    let task = tasks
        .binary_search_by(|task| {
            if shard_id.starts_with(&task.shard_template_id) {
                std::cmp::Ordering::Equal
            } else {
                task.shard_template_id.as_str().cmp(shard_id)
            }
        })
        .ok()
        .map(|index| &tasks[index]);

    // Map `shard_data_plane_fqdn` into its task-matched data-plane.
    let task_data_plane = task.and_then(|task| {
        data_planes
            .get_by_key(&task.data_plane_id)
            .filter(|data_plane| data_plane.data_plane_fqdn == shard_data_plane_fqdn)
    });

    let (Some(task), Some(task_data_plane)) = (task, task_data_plane) else {
        anyhow::bail!(
            "task shard {shard_id} within data-plane {shard_data_plane_fqdn} is not known"
        )
    };

    // Attempt to find an HMAC key of this data-plane which validates against the request token.
    let validation = jsonwebtoken::Validation::default();
    let mut verified = false;

    for hmac_key in &task_data_plane.hmac_keys {
        let key = jsonwebtoken::DecodingKey::from_base64_secret(hmac_key)
            .context("invalid data-plane hmac key")?;

        if jsonwebtoken::decode::<proto_gazette::Claims>(token, &key, &validation).is_ok() {
            verified = true;
            break;
        }
    }
    if !verified {
        anyhow::bail!("no data-plane keys validated against the token signature");
    }

    Ok((task, task_data_plane))
}
