use super::Id;
use sqlx::types::Uuid;

pub async fn is_user_provisioned(
    user_id: Uuid,
    txn: &mut sqlx::Transaction<'_, sqlx::Postgres>,
) -> sqlx::Result<bool> {
    let exists = sqlx::query!(
        r#"
        -- We prevent a user from provisioning a new tenant if they're
        -- already an administrator of at least one tenant.
        select 1 as "exists" from user_grants g
        join tenants t on t.tenant = g.object_role
        where g.user_id = $1 and g.capability = 'admin'
        "#,
        user_id as Uuid,
    )
    .fetch_optional(txn)
    .await?;

    Ok(exists.is_some())
}

// tenant_exists is true if the given tenant exists (case invariant).
pub async fn tenant_exists(
    tenant: &str,
    txn: &mut sqlx::Transaction<'_, sqlx::Postgres>,
) -> sqlx::Result<bool> {
    let prefix = format!("{tenant}/");

    let illegal = sqlx::query!(
        r#"
        select 1 as "exists" from internal.illegal_tenant_names
        where lower(name) = lower($1::catalog_tenant)
        "#,
        prefix.clone() as String,
    )
    .fetch_optional(&mut *txn)
    .await?;

    let exists = sqlx::query!(
        r#"
        select 1 as "exists" from tenants
        where lower(tenant) = lower($1::catalog_tenant)
        "#,
        prefix as String,
    )
    .fetch_optional(&mut *txn)
    .await?;

    Ok(illegal.is_some() || exists.is_some())
}

// ProvisionedTenant is the shape of a provisioned tenant.
#[derive(Debug)]
pub struct ProvisionedTenant {
    /// The id of the publication that will create the ops catalog for this tenant.
    pub publication_id: Id,
}

pub async fn provision_tenant(
    accounts_user_email: &str,
    detail: Option<String>,
    tenant: &str,
    tenant_user_id: Uuid,
    txn: &mut sqlx::Transaction<'_, sqlx::Postgres>,
) -> sqlx::Result<ProvisionedTenant> {
    let prefix = format!("{tenant}/");

    let provisioned = sqlx::query_as!(
        ProvisionedTenant,
        r#"with
        accounts_root_user as (
            -- Precondition: the accounts root user must exist.
            -- Use a sub-select to select either one match or an explicit null row,
            -- which will then fail a not-null constraint.
            select (select id from auth.users where email = $4 limit 1) as accounts_id
        ),
        create_tenant as (
            insert into tenants (tenant, detail) values ($2, $3)
        ),
        grant_user_admin_to_tenant as (
            insert into user_grants (user_id, object_role, capability, detail) values
                ($1, $2, 'admin', $3)
            on conflict do nothing
        ),
        grant_to_tenant as (
            insert into role_grants (subject_role, object_role, capability, detail) values
                ($2, $2, 'write', $3),              -- Tenant specs may write to other tenant specs.
                ($2, 'ops/' || $2, 'read', $3),     -- Tenant may read `ops/$tenant/...` collections.
                ($2, 'estuary/public/', 'read', $3) -- Tenant may read `estuary/pubic/` collections.
            on conflict do nothing
        ),
        create_storage_mappings as (
            insert into storage_mappings (catalog_prefix, spec, detail) values
                ($2, '{"stores": [{"provider": "GCS", "bucket": "estuary-trial", "prefix": "collection-data/"}]}', $3),
                ('recovery/' || $2, '{"stores": [{"provider": "GCS", "bucket": "estuary-trial"}]}', $3)
            on conflict do nothing
        )
        select internal.create_ops_publication($2, accounts_id) as "publication_id!: Id" from accounts_root_user;
        "#,
        tenant_user_id as Uuid,
        &prefix as &str,
        detail.clone() as Option<String>,
        accounts_user_email as &str,
    )
    .fetch_one(&mut *txn)
    .await?;

    // Create partition of catalog_stats which will home all stats of the tenant. We allow for the
    // possibility of a stats partition for the tenant already existing.
    sqlx::query(&format!(
        r#"
        create table if not exists catalog_stat_partitions."{tenant}_stats"
            partition of public.catalog_stats for values in ('{prefix}');
        "#
    ))
    .execute(&mut *txn)
    .await?;

    Ok(provisioned)
}