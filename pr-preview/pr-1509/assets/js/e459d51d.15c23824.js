"use strict";(self.webpackChunksite=self.webpackChunksite||[]).push([[4876],{82345:(e,n,s)=>{s.r(n),s.d(n,{assets:()=>l,contentTitle:()=>i,default:()=>h,frontMatter:()=>o,metadata:()=>c,toc:()=>a});var t=s(74848),r=s(28453);const o={},i="Google Firestore",c={id:"reference/Connectors/capture-connectors/google-firestore",title:"Google Firestore",description:"This connector captures data from your Google Firestore collections into Flow collections.",source:"@site/docs/reference/Connectors/capture-connectors/google-firestore.md",sourceDirName:"reference/Connectors/capture-connectors",slug:"/reference/Connectors/capture-connectors/google-firestore",permalink:"/pr-preview/pr-1509/reference/Connectors/capture-connectors/google-firestore",draft:!1,unlisted:!1,editUrl:"https://github.com/estuary/flow/edit/master/site/docs/reference/Connectors/capture-connectors/google-firestore.md",tags:[],version:"current",frontMatter:{},sidebar:"tutorialSidebar",previous:{title:"Google Drive",permalink:"/pr-preview/pr-1509/reference/Connectors/capture-connectors/google-drive"},next:{title:"Google Search Console",permalink:"/pr-preview/pr-1509/reference/Connectors/capture-connectors/google-search-console"}},l={},a=[{value:"Data model",id:"data-model",level:2},{value:"Prerequisites",id:"prerequisites",level:2},{value:"Configuration",id:"configuration",level:2},{value:"Properties",id:"properties",level:3},{value:"Endpoint",id:"endpoint",level:4},{value:"Bindings",id:"bindings",level:4},{value:"Sample",id:"sample",level:3},{value:"Backfill mode",id:"backfill-mode",level:2}];function d(e){const n={a:"a",code:"code",h1:"h1",h2:"h2",h3:"h3",h4:"h4",li:"li",p:"p",pre:"pre",strong:"strong",table:"table",tbody:"tbody",td:"td",th:"th",thead:"thead",tr:"tr",ul:"ul",...(0,r.R)(),...e.components};return(0,t.jsxs)(t.Fragment,{children:[(0,t.jsx)(n.h1,{id:"google-firestore",children:"Google Firestore"}),"\n",(0,t.jsx)(n.p,{children:"This connector captures data from your Google Firestore collections into Flow collections."}),"\n",(0,t.jsxs)(n.p,{children:[(0,t.jsx)(n.a,{href:"https://ghcr.io/estuary/source-firestore:dev",children:(0,t.jsx)(n.code,{children:"ghcr.io/estuary/source-firestore:dev"})})," provides the latest connector image. You can also follow the link in your browser to see past image versions."]}),"\n",(0,t.jsx)(n.h2,{id:"data-model",children:"Data model"}),"\n",(0,t.jsxs)(n.p,{children:["Firestore is a NoSQL database. Its ",(0,t.jsx)(n.a,{href:"https://firebase.google.com/docs/firestore/data-model",children:"data model"})," consists of ",(0,t.jsx)(n.strong,{children:"documents"})," (lightweight records that contain mappings of fields and values) organized in ",(0,t.jsx)(n.strong,{children:"collections"}),"."]}),"\n",(0,t.jsxs)(n.p,{children:["Collections are organized hierarchically. A given document in a collection can, in turn, be associated with a ",(0,t.jsx)(n.strong,{children:(0,t.jsx)(n.a,{href:"https://firebase.google.com/docs/firestore/data-model#subcollections",children:"subcollection"})}),"."]}),"\n",(0,t.jsxs)(n.p,{children:["For example, you might have a collection called ",(0,t.jsx)(n.code,{children:"users"}),", which contains two documents, ",(0,t.jsx)(n.code,{children:"alice"})," and ",(0,t.jsx)(n.code,{children:"bob"}),".\nEach document has a subcollection called ",(0,t.jsx)(n.code,{children:"messages"})," (for example, ",(0,t.jsx)(n.code,{children:"users/alice/messages"}),"), which contain more documents (for example, ",(0,t.jsx)(n.code,{children:"users/alice/messages/1"}),")."]}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-console",children:"users\n\u251c\u2500\u2500 alice\n\u2502   \u2514\u2500\u2500 messages\n\u2502       \u251c\u2500\u2500 1\n\u2502       \u2514\u2500\u2500 2\n\u2514\u2500\u2500 bob\n    \u2514\u2500\u2500 messages\n        \u2514\u2500\u2500 1\n"})}),"\n",(0,t.jsxs)(n.p,{children:["The connector works by identifying documents associated with a particular sequence of Firestore collection names,\nregardless of documents that split the hierarchy.\nThese document groupings are mapped to Flow collections using a ",(0,t.jsx)(n.a,{href:"#bindings",children:"path"})," in the pattern ",(0,t.jsx)(n.code,{children:"collection/*/subcollection"}),"."]}),"\n",(0,t.jsxs)(n.p,{children:["In this example, we'd end up with ",(0,t.jsx)(n.code,{children:"users"})," and ",(0,t.jsx)(n.code,{children:"users/*/messages"})," Flow collections, with the latter contain messages from both users.\nThe ",(0,t.jsx)(n.code,{children:"/_meta/path"})," property for each document contains its full, original path, so we'd still know which messages were Alice's and which were Bob's."]}),"\n",(0,t.jsx)(n.h2,{id:"prerequisites",children:"Prerequisites"}),"\n",(0,t.jsx)(n.p,{children:"You'll need:"}),"\n",(0,t.jsxs)(n.ul,{children:["\n",(0,t.jsxs)(n.li,{children:["\n",(0,t.jsx)(n.p,{children:"A Google service account with:"}),"\n",(0,t.jsxs)(n.ul,{children:["\n",(0,t.jsxs)(n.li,{children:["\n",(0,t.jsxs)(n.p,{children:["Read access to your Firestore database, via ",(0,t.jsx)(n.a,{href:"https://cloud.google.com/datastore/docs/access/iam",children:"roles/datastore.viewer"}),".\nYou can assign this role when you ",(0,t.jsx)(n.a,{href:"https://cloud.google.com/iam/docs/creating-managing-service-accounts#creating",children:"create the service account"}),", or ",(0,t.jsx)(n.a,{href:"https://cloud.google.com/iam/docs/granting-changing-revoking-access#single-role",children:"add it to an existing service account"}),"."]}),"\n"]}),"\n",(0,t.jsxs)(n.li,{children:["\n",(0,t.jsxs)(n.p,{children:["A generated ",(0,t.jsx)(n.a,{href:"https://cloud.google.com/iam/docs/creating-managing-service-account-keys#creating",children:"JSON service account key"})," for the account."]}),"\n"]}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,t.jsx)(n.h2,{id:"configuration",children:"Configuration"}),"\n",(0,t.jsxs)(n.p,{children:["You configure connectors either in the Flow web app, or by directly editing the Flow specification file.\nSee ",(0,t.jsx)(n.a,{href:"/pr-preview/pr-1509/concepts/connectors#using-connectors",children:"connectors"})," to learn more about using connectors. The values and specification sample below provide configuration details specific to the Firestore source connector."]}),"\n",(0,t.jsx)(n.h3,{id:"properties",children:"Properties"}),"\n",(0,t.jsx)(n.h4,{id:"endpoint",children:"Endpoint"}),"\n",(0,t.jsxs)(n.table,{children:[(0,t.jsx)(n.thead,{children:(0,t.jsxs)(n.tr,{children:[(0,t.jsx)(n.th,{children:"Property"}),(0,t.jsx)(n.th,{children:"Title"}),(0,t.jsx)(n.th,{children:"Description"}),(0,t.jsx)(n.th,{children:"Type"}),(0,t.jsx)(n.th,{children:"Required/Default"})]})}),(0,t.jsxs)(n.tbody,{children:[(0,t.jsxs)(n.tr,{children:[(0,t.jsx)(n.td,{children:(0,t.jsx)(n.strong,{children:(0,t.jsx)(n.code,{children:"/googleCredentials"})})}),(0,t.jsx)(n.td,{children:"Credentials"}),(0,t.jsx)(n.td,{children:"Google Cloud Service Account JSON credentials."}),(0,t.jsx)(n.td,{children:"string"}),(0,t.jsx)(n.td,{children:"Required"})]}),(0,t.jsxs)(n.tr,{children:[(0,t.jsx)(n.td,{children:(0,t.jsx)(n.code,{children:"/database"})}),(0,t.jsx)(n.td,{children:"Database"}),(0,t.jsx)(n.td,{children:'Optional name of the database to capture from. Leave blank to autodetect. Typically "projects/$PROJECTID/databases/(default)".'}),(0,t.jsx)(n.td,{children:"string"}),(0,t.jsx)(n.td,{})]})]})]}),"\n",(0,t.jsx)(n.h4,{id:"bindings",children:"Bindings"}),"\n",(0,t.jsxs)(n.table,{children:[(0,t.jsx)(n.thead,{children:(0,t.jsxs)(n.tr,{children:[(0,t.jsx)(n.th,{children:"Property"}),(0,t.jsx)(n.th,{children:"Title"}),(0,t.jsx)(n.th,{children:"Description"}),(0,t.jsx)(n.th,{children:"Type"}),(0,t.jsx)(n.th,{children:"Required/Default"})]})}),(0,t.jsxs)(n.tbody,{children:[(0,t.jsxs)(n.tr,{children:[(0,t.jsx)(n.td,{children:(0,t.jsx)(n.strong,{children:(0,t.jsx)(n.code,{children:"/backfillMode"})})}),(0,t.jsx)(n.td,{children:"Backfill Mode"}),(0,t.jsxs)(n.td,{children:["Configures the handling of data already in the collection. See ",(0,t.jsx)(n.a,{href:"#backfill-mode",children:"below"})," for details or just stick with 'async'"]}),(0,t.jsx)(n.td,{children:"string"}),(0,t.jsx)(n.td,{children:"Required"})]}),(0,t.jsxs)(n.tr,{children:[(0,t.jsx)(n.td,{children:(0,t.jsx)(n.strong,{children:(0,t.jsx)(n.code,{children:"/path"})})}),(0,t.jsx)(n.td,{children:"Path to Collection"}),(0,t.jsx)(n.td,{children:"Supports parent/*/nested to capture all nested collections of parent's children"}),(0,t.jsx)(n.td,{children:"string"}),(0,t.jsx)(n.td,{children:"Required"})]})]})]}),"\n",(0,t.jsx)(n.h3,{id:"sample",children:"Sample"}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-yaml",children:'captures:\n  ${PREFIX}/${CAPTURE_NAME}:\n    endpoint:\n      connector:\n        image: ghcr.io/estuary/source-firestore:dev\n        config:\n          googleCredentials:\n            "type": "service_account",\n            "project_id": "project-id",\n            "private_key_id": "key-id",\n            "private_key": "-----BEGIN PRIVATE KEY-----\\nprivate-key\\n-----END PRIVATE KEY-----\\n",\n            "client_email": "service-account-email",\n            "client_id": "client-id",\n            "auth_uri": "https://accounts.google.com/o/oauth2/auth",\n            "token_uri": "https://accounts.google.com/o/oauth2/token",\n            "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",\n            "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/service-account-email"\n    bindings:\n      - resource:\n          #The below `path` will capture all Firestore documents that match the pattern\n          #`orgs/<orgID>/runs/<runID>/runResults/<runResultID>/queryResults`.\n          #See the Data Model section above for details.\n          path: orgs/*/runs/*/runResults/*/queryResults\n          backfillMode: async\n        target: ${PREFIX}/orgs_runs_runResults_queryResults\n      - resource:\n          path: orgs/*/runs/*/runResults\n          backfillMode: async\n        target: ${PREFIX}/orgs_runs_runResults\n      - resource:\n          path: orgs/*/runs\n          backfillMode: async\n        target: ${PREFIX}/orgs_runs\n      - resource:\n          path: orgs\n          backfillMode: async\n        target: ${PREFIX}/orgs\n'})}),"\n",(0,t.jsx)(n.h2,{id:"backfill-mode",children:"Backfill mode"}),"\n",(0,t.jsxs)(n.p,{children:["In each captured collection's ",(0,t.jsx)(n.a,{href:"#bindings",children:"binding configuration"}),", you can choose whether and how to backfill historical data.\nThere are three options:"]}),"\n",(0,t.jsxs)(n.ul,{children:["\n",(0,t.jsxs)(n.li,{children:["\n",(0,t.jsxs)(n.p,{children:[(0,t.jsx)(n.code,{children:"none"}),": Skip preexisting data in the Firestore collection. Capture only new documents and changes to existing documents that occur after the capture is published."]}),"\n"]}),"\n",(0,t.jsxs)(n.li,{children:["\n",(0,t.jsxs)(n.p,{children:[(0,t.jsx)(n.code,{children:"async"}),": Use two threads to capture data. The first captures new documents, as with ",(0,t.jsx)(n.code,{children:"none"}),".\nThe second progressively ingests historical data in chunks. This mode is most reliable for Firestore collections of all sizes but provides slightly weaker guarantees against data duplication."]}),"\n",(0,t.jsxs)(n.p,{children:["The connector uses a ",(0,t.jsx)(n.a,{href:"/pr-preview/pr-1509/concepts/schemas#reductions",children:"reduction"})," to reconcile changes to the same document found on the parallel threads.\nThe version with the most recent timestamp the document metadata will be preserved (",(0,t.jsx)(n.code,{children:'{"strategy": "maximize", "key": "/_meta/mtime"}'}),"). For most collections, this produces an accurate copy of your Firestore collections in Flow."]}),"\n"]}),"\n",(0,t.jsxs)(n.li,{children:["\n",(0,t.jsxs)(n.p,{children:[(0,t.jsx)(n.code,{children:"sync"}),": Request that Firestore stream all changes to the collection since its creation, in order."]}),"\n",(0,t.jsx)(n.p,{children:"This mode provides the strongest guarantee against duplicated data, but can cause errors for large datasets.\nFirestore may terminate the process if the backfill of historical data has not completed within about ten minutes, forcing the capture to restart from the beginning.\nIf this happens once it is likely to recur continuously. If left unattended for an extended time this can result in a massive number of read operations and a correspondingly large bill from Firestore."}),"\n",(0,t.jsx)(n.p,{children:"This mode should only be used when somebody can keep an eye on the backfill and shut it down if it has not completed within half an hour at most, and on relatively small collections.\n100,000 documents or fewer should generally be safe, although this can vary depending on the average document size in the collection."}),"\n"]}),"\n"]}),"\n",(0,t.jsxs)(n.p,{children:["If you're unsure which backfill mode to use, choose ",(0,t.jsx)(n.code,{children:"async"}),"."]})]})}function h(e={}){const{wrapper:n}={...(0,r.R)(),...e.components};return n?(0,t.jsx)(n,{...e,children:(0,t.jsx)(d,{...e})}):d(e)}},28453:(e,n,s)=>{s.d(n,{R:()=>i,x:()=>c});var t=s(96540);const r={},o=t.createContext(r);function i(e){const n=t.useContext(o);return t.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function c(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(r):e.components||r:i(e.components),t.createElement(o.Provider,{value:n},e.children)}}}]);