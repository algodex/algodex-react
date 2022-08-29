/* eslint-disable @typescript-eslint/no-var-requires */
// This file sets a custom webpack configuration to use your Next.js app
// with Sentry.
// https://nextjs.org/docs/api-reference/next.config.js/introduction
// https://docs.sentry.io/platforms/javascript/guides/nextjs/

const { withSentryConfig } = require('@sentry/nextjs')

const getDefaultAsset = () => {
  // Default to LAMP (available on Testnet only)
  return process.env.NEXT_PUBLIC_DEFAULT_ASSET || 15322902
}

const PUBLIC_API = process.env.NEXT_PUBLIC_API

if (typeof PUBLIC_API === 'undefined') throw new Error('Must have Public API!')

const defaultAsset = getDefaultAsset()
const nextTranslate = require('next-translate')
const nextPWA = require('next-pwa')

const moduleExports = nextPWA(
  nextTranslate({
    // experimental: {
    //   // this will allow nextjs to resolve files (js, ts, css)
    //   // outside packages/app directory.
    //   externalDir: true
    // },
    reactStrictMode: true,
    pwa: {
      dest: 'public',
      disable: process.env.NODE_ENV === 'development' || process.env.NODE_ENV === 'test'
    },
    async rewrites() {
      return {
        beforeFiles: [
          {
            source: '/algodex-backend/:path*',
            destination: `${PUBLIC_API}/algodex-backend/:path*`
          },
          {
            source: '/support/upload',
            destination: `https://api.hubapi.com/filemanager/api/v3/files/upload?hapikey=${process.env.NEXT_PUBLIC_HUBSPOT_APIKEY}`
          },
          {
            source: '/support/engagement',
            destination: `https://api.hubapi.com/engagements/v1/engagements?hapikey=${process.env.NEXT_PUBLIC_HUBSPOT_APIKEY}`
          },
          {
            source: '/support/ticket',
            destination: `https://api.hubapi.com/crm-objects/v1/objects/tickets?hapikey=${process.env.NEXT_PUBLIC_HUBSPOT_APIKEY}`
          }
        ]
      }
    },
    async redirects() {
      return [
        {
          source: '/',
          destination: '/about',
          permanent: true
        },
        {
          source: '/trade',
          destination: '/trade/' + defaultAsset,
          permanent: true
        }
      ]
    }
  })
)

const SentryWebpackPluginOptions = {
  // Additional config options for the Sentry Webpack plugin. Keep in mind that
  // the following options are set automatically, and overriding them is not
  // recommended:
  //   release, url, org, project, authToken, configFile, stripPrefix,
  //   urlPrefix, include, ignore

  silent: true // Suppresses all logs
  // For all available options, see:
  // https://github.com/getsentry/sentry-webpack-plugin#options.
}

// Make sure adding Sentry options is the last code to run before exporting, to
// ensure that your source maps include changes from all other Webpack plugins
if (!process.env.DISABLE_SENTRY) {
  module.exports = withSentryConfig(moduleExports, SentryWebpackPluginOptions)
} else {
  module.exports = moduleExports
}
