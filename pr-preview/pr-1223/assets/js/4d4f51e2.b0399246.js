"use strict";(self.webpackChunksite=self.webpackChunksite||[]).push([[6238],{3905:(e,t,n)=>{n.d(t,{Zo:()=>s,kt:()=>g});var a=n(7294);function r(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function o(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,a)}return n}function i(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?o(Object(n),!0).forEach((function(t){r(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):o(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function l(e,t){if(null==e)return{};var n,a,r=function(e,t){if(null==e)return{};var n,a,r={},o=Object.keys(e);for(a=0;a<o.length;a++)n=o[a],t.indexOf(n)>=0||(r[n]=e[n]);return r}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(a=0;a<o.length;a++)n=o[a],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(r[n]=e[n])}return r}var u=a.createContext({}),p=function(e){var t=a.useContext(u),n=t;return e&&(n="function"==typeof e?e(t):i(i({},t),e)),n},s=function(e){var t=p(e.components);return a.createElement(u.Provider,{value:t},e.children)},c="mdxType",d={inlineCode:"code",wrapper:function(e){var t=e.children;return a.createElement(a.Fragment,{},t)}},m=a.forwardRef((function(e,t){var n=e.components,r=e.mdxType,o=e.originalType,u=e.parentName,s=l(e,["components","mdxType","originalType","parentName"]),c=p(n),m=r,g=c["".concat(u,".").concat(m)]||c[m]||d[m]||o;return n?a.createElement(g,i(i({ref:t},s),{},{components:n})):a.createElement(g,i({ref:t},s))}));function g(e,t){var n=arguments,r=t&&t.mdxType;if("string"==typeof e||r){var o=n.length,i=new Array(o);i[0]=m;var l={};for(var u in t)hasOwnProperty.call(t,u)&&(l[u]=t[u]);l.originalType=e,l[c]="string"==typeof e?e:r,i[1]=l;for(var p=2;p<o;p++)i[p]=n[p];return a.createElement.apply(null,i)}return a.createElement.apply(null,n)}m.displayName="MDXCreateElement"},5048:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>u,contentTitle:()=>i,default:()=>d,frontMatter:()=>o,metadata:()=>l,toc:()=>p});var a=n(7462),r=(n(7294),n(3905));const o={sidebar_position:4},i="Google Cloud Pub/Sub",l={unversionedId:"reference/Connectors/materialization-connectors/google-pubsub",id:"reference/Connectors/materialization-connectors/google-pubsub",title:"Google Cloud Pub/Sub",description:"This connector materializes Flow collections into topics in Google Cloud Pub/Sub.",source:"@site/docs/reference/Connectors/materialization-connectors/google-pubsub.md",sourceDirName:"reference/Connectors/materialization-connectors",slug:"/reference/Connectors/materialization-connectors/google-pubsub",permalink:"/pr-preview/pr-1223/reference/Connectors/materialization-connectors/google-pubsub",draft:!1,editUrl:"https://github.com/estuary/flow/edit/master/site/docs/reference/Connectors/materialization-connectors/google-pubsub.md",tags:[],version:"current",sidebarPosition:4,frontMatter:{sidebar_position:4},sidebar:"tutorialSidebar",previous:{title:"Google BigQuery",permalink:"/pr-preview/pr-1223/reference/Connectors/materialization-connectors/BigQuery"},next:{title:"Google Sheets",permalink:"/pr-preview/pr-1223/reference/Connectors/materialization-connectors/Google-sheets"}},u={},p=[{value:"Prerequisites",id:"prerequisites",level:2},{value:"OAuth authentication using the Flow web app",id:"oauth-authentication-using-the-flow-web-app",level:3},{value:"Manual authentication",id:"manual-authentication",level:3},{value:"Configuration",id:"configuration",level:2},{value:"Properties",id:"properties",level:3},{value:"Endpoint",id:"endpoint",level:4},{value:"Bindings",id:"bindings",level:4},{value:"Sample",id:"sample",level:3},{value:"Multiplex topics",id:"multiplex-topics",level:2},{value:"Delta updates",id:"delta-updates",level:2},{value:"Message ordering",id:"message-ordering",level:2}],s={toc:p},c="wrapper";function d(e){let{components:t,...n}=e;return(0,r.kt)(c,(0,a.Z)({},s,n,{components:t,mdxType:"MDXLayout"}),(0,r.kt)("h1",{id:"google-cloud-pubsub"},"Google Cloud Pub/Sub"),(0,r.kt)("p",null,"This connector materializes Flow collections into topics in Google Cloud Pub/Sub."),(0,r.kt)("p",null,"It is available for use in the Flow web application. For local development or open-source workflows, ",(0,r.kt)("a",{parentName:"p",href:"https://ghcr.io/estuary/materialize-google-pubsub:dev"},(0,r.kt)("inlineCode",{parentName:"a"},"ghcr.io/estuary/materialize-google-pubsub:dev"))," provides the latest version of the connector as a Docker image. You can also follow the link in your browser to see past image versions."),(0,r.kt)("h2",{id:"prerequisites"},"Prerequisites"),(0,r.kt)("p",null,"To use this connector, you'll need:"),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},"A ",(0,r.kt)("a",{parentName:"li",href:"https://cloud.google.com/resource-manager/docs/creating-managing-projects#creating_a_project"},"Google Cloud project")," with the Google Pub/Sub API ",(0,r.kt)("a",{parentName:"li",href:"https://support.google.com/googleapi/answer/6158841?hl=en"},"enabled"),"."),(0,r.kt)("li",{parentName:"ul"},"Access to the project. Different items are required to configure access ",(0,r.kt)("a",{parentName:"li",href:"#oauth-authentication-using-the-flow-web-app"},"using OAuth in the Flow web app")," (recommended),\nand ",(0,r.kt)("a",{parentName:"li",href:"#manual-authentication"},"configuring manually"),"."),(0,r.kt)("li",{parentName:"ul"},"At least one Flow collection to materialize.")),(0,r.kt)("admonition",{type:"tip"},(0,r.kt)("p",{parentName:"admonition"},"If you haven't yet captured your data from its external source, start at the beginning of the ",(0,r.kt)("a",{parentName:"p",href:"/pr-preview/pr-1223/guides/create-dataflow"},"guide to create a dataflow"),". You'll be referred back to this connector-specific documentation at the appropriate steps.")),(0,r.kt)("h3",{id:"oauth-authentication-using-the-flow-web-app"},"OAuth authentication using the Flow web app"),(0,r.kt)("p",null,"OAuth is the simplest authentication method, and is supported in the Flow web app. You'll need:"),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},"A Google account with the role ",(0,r.kt)("a",{parentName:"li",href:"https://cloud.google.com/pubsub/docs/access-control#roles"},(0,r.kt)("inlineCode",{parentName:"a"},"roles/pubsub.editor")),"\nor equivalent for the Google Cloud project.\nSee the ",(0,r.kt)("a",{parentName:"li",href:"https://cloud.google.com/iam/docs/granting-changing-revoking-access#grant-single-role"},"Google IAM documentation")," to learn about granting roles.")),(0,r.kt)("p",null,"You'll supply this account's username and password to authenticate."),(0,r.kt)("h3",{id:"manual-authentication"},"Manual authentication"),(0,r.kt)("p",null,"Manual authentication is the only method supported when using flowctl to develop locally. You'll need:"),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("p",{parentName:"li"},"A Google service account with the role ",(0,r.kt)("a",{parentName:"p",href:"https://cloud.google.com/pubsub/docs/access-control#roles"},(0,r.kt)("inlineCode",{parentName:"a"},"roles/pubsub.editor")),"\nor equivalent for the Google Cloud project.\nSee the ",(0,r.kt)("a",{parentName:"p",href:"https://cloud.google.com/iam/docs/granting-changing-revoking-access#grant-single-role"},"Google IAM documentation")," to learn about granting roles.")),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("p",{parentName:"li"},"A JSON key for the service account."))),(0,r.kt)("p",null,"See the ",(0,r.kt)("a",{parentName:"p",href:"https://developers.google.com/identity/protocols/oauth2/service-account#creatinganaccount"},"Google documentation")," for help creating a new service account and generating its key."),(0,r.kt)("h2",{id:"configuration"},"Configuration"),(0,r.kt)("p",null,"To use this connector, begin with data in one or more Flow collections.\nUse the below properties to configure a Google Cloud Pub/Sub materialization, which will direct one or more of your Flow collections to your desired Pub/Sub topics."),(0,r.kt)("h3",{id:"properties"},"Properties"),(0,r.kt)("h4",{id:"endpoint"},"Endpoint"),(0,r.kt)("table",null,(0,r.kt)("thead",{parentName:"table"},(0,r.kt)("tr",{parentName:"thead"},(0,r.kt)("th",{parentName:"tr",align:null},"Property"),(0,r.kt)("th",{parentName:"tr",align:null},"Title"),(0,r.kt)("th",{parentName:"tr",align:null},"Description"),(0,r.kt)("th",{parentName:"tr",align:null},"Type"),(0,r.kt)("th",{parentName:"tr",align:null},"Required/Default"))),(0,r.kt)("tbody",{parentName:"table"},(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("strong",{parentName:"td"},(0,r.kt)("inlineCode",{parentName:"strong"},"/credentials"))),(0,r.kt)("td",{parentName:"tr",align:null},"Authentication"),(0,r.kt)("td",{parentName:"tr",align:null},"Credentials used to authenticate with Google."),(0,r.kt)("td",{parentName:"tr",align:null},"array, boolean, null, number, object, string"),(0,r.kt)("td",{parentName:"tr",align:null},"Required")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("inlineCode",{parentName:"td"},"/credentials/auth_type")),(0,r.kt)("td",{parentName:"tr",align:null},"Authentication type"),(0,r.kt)("td",{parentName:"tr",align:null},"Set to ",(0,r.kt)("inlineCode",{parentName:"td"},"Service")," for manual authentication, or use OAuth in the web app."),(0,r.kt)("td",{parentName:"tr",align:null},"string"),(0,r.kt)("td",{parentName:"tr",align:null})),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("inlineCode",{parentName:"td"},"/credentials/credentials_json")),(0,r.kt)("td",{parentName:"tr",align:null},"Service Account JSON"),(0,r.kt)("td",{parentName:"tr",align:null},"The JSON key of the service account to use for authorization, if configuring manually."),(0,r.kt)("td",{parentName:"tr",align:null},"string"),(0,r.kt)("td",{parentName:"tr",align:null})),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("strong",{parentName:"td"},(0,r.kt)("inlineCode",{parentName:"strong"},"/project_id"))),(0,r.kt)("td",{parentName:"tr",align:null},"Google Cloud Project ID"),(0,r.kt)("td",{parentName:"tr",align:null},"Name of the project containing the PubSub topics for this materialization."),(0,r.kt)("td",{parentName:"tr",align:null},"string"),(0,r.kt)("td",{parentName:"tr",align:null},"Required")))),(0,r.kt)("h4",{id:"bindings"},"Bindings"),(0,r.kt)("admonition",{type:"caution"},(0,r.kt)("p",{parentName:"admonition"},"PubSub topics need a ",(0,r.kt)("a",{parentName:"p",href:"https://cloud.google.com/pubsub/docs/create-topic#properties_of_a_topic"},"default subscription"),";\notherwise, delivered messages will be lost. Leave ",(0,r.kt)("strong",{parentName:"p"},"Create with Default Subscription")," set to the default, ",(0,r.kt)("inlineCode",{parentName:"p"},"true"),",\nunless you have a specific reason not to do so.")),(0,r.kt)("table",null,(0,r.kt)("thead",{parentName:"table"},(0,r.kt)("tr",{parentName:"thead"},(0,r.kt)("th",{parentName:"tr",align:null},"Property"),(0,r.kt)("th",{parentName:"tr",align:null},"Title"),(0,r.kt)("th",{parentName:"tr",align:null},"Description"),(0,r.kt)("th",{parentName:"tr",align:null},"Type"),(0,r.kt)("th",{parentName:"tr",align:null},"Required/Default"))),(0,r.kt)("tbody",{parentName:"table"},(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("strong",{parentName:"td"},(0,r.kt)("inlineCode",{parentName:"strong"},"/create_default_subscription"))),(0,r.kt)("td",{parentName:"tr",align:null},"Create with Default Subscription"),(0,r.kt)("td",{parentName:"tr",align:null},"Create a default subscription when creating the topic. Will be created as ",'"',"<","topic",">","-sub",'"',". Has no effect if the topic already exists."),(0,r.kt)("td",{parentName:"tr",align:null},"boolean"),(0,r.kt)("td",{parentName:"tr",align:null},"Required, ",(0,r.kt)("inlineCode",{parentName:"td"},"true"))),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("inlineCode",{parentName:"td"},"identifier")),(0,r.kt)("td",{parentName:"tr",align:null},"Resource Binding Identifier"),(0,r.kt)("td",{parentName:"tr",align:null},"Optional identifier for the resource binding if creating a ",(0,r.kt)("a",{parentName:"td",href:"#multiplex-topics"},"multiplex topic"),'. Included as \\"identifier\\" attribute in published messages if specified.'),(0,r.kt)("td",{parentName:"tr",align:null},"string"),(0,r.kt)("td",{parentName:"tr",align:null})),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},(0,r.kt)("strong",{parentName:"td"},(0,r.kt)("inlineCode",{parentName:"strong"},"/topic"))),(0,r.kt)("td",{parentName:"tr",align:null},"Topic Name"),(0,r.kt)("td",{parentName:"tr",align:null},"Name of the topic to publish materialized results to."),(0,r.kt)("td",{parentName:"tr",align:null},"string"),(0,r.kt)("td",{parentName:"tr",align:null},"Required")))),(0,r.kt)("h3",{id:"sample"},"Sample"),(0,r.kt)("p",null,"This sample reflects the ",(0,r.kt)("a",{parentName:"p",href:"#manual-authentication"},"manual authentication")," method using the CLI."),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-yaml"},"materializations:\n  ${PREFIX}/${mat_name}:\n    endpoint:\n      connector:\n        config:\n          credentials:\n            auth_type: Service\n            credentials_json: {secret}\n          project_id: my_google_cloud_project\n    bindings:\n    - resource:\n        create_default_subscription: true\n        topic: my_new_topic\n      source: ${PREFIX}/${source_collection}\n")),(0,r.kt)("h2",{id:"multiplex-topics"},"Multiplex topics"),(0,r.kt)("p",null,"You can materialize multiple Flow collections to the same Pub/Sub topic. This is known as a ",(0,r.kt)("strong",{parentName:"p"},"multiplex topic"),".\nYou do so by adding the optional ",(0,r.kt)("inlineCode",{parentName:"p"},"identifier")," field to the ",(0,r.kt)("a",{parentName:"p",href:"#bindings"},"binding configuration"),"."),(0,r.kt)("p",null,"When materializing to a multiplex topic, ensure that:"),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},"The bindings you want to combine have the same ",(0,r.kt)("inlineCode",{parentName:"li"},"topic")," name."),(0,r.kt)("li",{parentName:"ul"},"Each binding pulls from a different Flow collection"),(0,r.kt)("li",{parentName:"ul"},"Each binding has a unique ",(0,r.kt)("inlineCode",{parentName:"li"},"identifier"),". It can be anything you'd like.")),(0,r.kt)("p",null,"The binding configuration will look similar to:"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-yaml"},"bindings:\n  - resource:\n      identifier: one\n      topic: multiplex-topic\n    source: ${PREFIX}/source_collection_one\n  - resource:\n      identifier: two\n      topic: multiplex-topic\n    source: ${PREFIX}/source_collection_two\n")),(0,r.kt)("h2",{id:"delta-updates"},"Delta updates"),(0,r.kt)("p",null,"Because Google Cloud Pub/Sub is a write-only event-streaming system, this connector uses only ",(0,r.kt)("a",{parentName:"p",href:"/pr-preview/pr-1223/concepts/materialization#delta-updates"},"delta updates"),"."),(0,r.kt)("h2",{id:"message-ordering"},"Message ordering"),(0,r.kt)("p",null,"Google Cloud Pub/Sub manages message ordering using ",(0,r.kt)("a",{parentName:"p",href:"https://cloud.google.com/pubsub/docs/ordering"},"ordering keys"),"."),(0,r.kt)("p",null,"This connector sets the ordering key of published messages using the Flow ",(0,r.kt)("a",{parentName:"p",href:"/pr-preview/pr-1223/concepts/collections#keys"},"collection key"),"\nof the documents being being published.\nMessages are published in order, on a per-key basis."))}d.isMDXComponent=!0}}]);