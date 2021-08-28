// This file configures the initialization of Sentry on the browser.
// The config you add here will be used whenever a page is visited.
// https://docs.sentry.io/platforms/javascript/guides/nextjs/

//import * as Sentry from '@sentry/nextjs'

//const SENTRY_DSN = process.env.SENTRY_DSN || process.env.NEXT_PUBLIC_SENTRY_DSN

// Sentry events should never be captured/sent in local development.
// This marks them as such, just in case.
//const ENVIRONMENT =
//  process.env.NEXT_PUBLIC_ENV === 'development' ? 'development' : process.env.NEXT_PUBLIC_SENTRY_ENV
/*

Sentry.init({
  dsn: SENTRY_DSN || 'https://1573deb1875c4a53a47ee128a24c042f@o861560.ingest.sentry.io/5841341',
  environment: ENVIRONMENT,
  enabled: ENVIRONMENT !== 'development',
  // Adjust this value in production, or use tracesSampler for greater control
  tracesSampleRate: 1.0
  // ...
  // Note: if you want to override the automatic release value, do not set a
  // `release` value here - use the environment variable `SENTRY_RELEASE`, so
  // that it will also get attached to your source maps
})
*/