// Import with `import * as Sentry from "@sentry/node"` if you are using ESM

import * as Sentry from "@sentry/node"

Sentry.init({
  dsn: "https://69b34b69c40575246fa970bcc7df0e13@o4509528917999616.ingest.us.sentry.io/4509529048416256",
   integrations: [Sentry.mongoIntegration()],
  // Setting this option to true will send default PII data to Sentry.
  // For example, automatic IP address collection on events
  sendDefaultPii: true,
});