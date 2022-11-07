/* 
 * Algodex Frontend (algodex-react) 
 * Copyright (C) 2021 - 2022 Algodex VASP (BVI) Corp.
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as published
 * by the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.

 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Affero General Public License for more details.
 * You should have received a copy of the GNU Affero General Public License
 * along with this program.  If not, see <https://www.gnu.org/licenses/>.
 */

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
const ALGODEX_API_V2 = process.env.ALGODEX_API_V2

if (typeof PUBLIC_API === 'undefined') throw new Error('Must have Public API!')
if (typeof ALGODEX_API_V2 === 'undefined') throw new Error('Must have ALGODEX_API_V2!')

const defaultAsset = getDefaultAsset()
const nextTranslate = require('next-translate')
// const nextPWA = require('next-pwa')
console.log({ ALGODEX_API_V2 })
const moduleExports = 
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
            destination: `https://api.hubapi.com/filemanager/api/v3/files/upload?hapikey=${process.env.HUBSPOT_APIKEY}`
          },
          {
            source: '/support/engagement',
            destination: `https://api.hubapi.com/engagements/v1/engagements?hapikey=${process.env.HUBSPOT_APIKEY}`
          },
          {
            source: '/support/ticket',
            destination: `https://api.hubapi.com/crm-objects/v1/objects/tickets?hapikey=${process.env.HUBSPOT_APIKEY}`
          },
          {
            source: '/api/v2/assets/search',
              has: [
                  {
                      type: 'query',
                      key: 'searchStr',
                      value: '(?<paramName>.*)'
                  }
              ],
              destination: '/api/v2/assets/search?searchStr=:paramName'
          },
          {
            source: '/api/v2/:path*',
            destination: `${ALGODEX_API_V2}/:path*`
          },
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
  }
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
