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

import '../styles/global.css'

import * as React from 'react'

import { CacheProvider, Global, css } from '@emotion/react'
// React Query
import { QueryClient, QueryClientProvider } from 'react-query'

import AlgodexApi from '@algodex/algodex-sdk'
import CssBaseline from '@mui/material/CssBaseline'
import { EventEmitter } from '@/hooks/useEvents'
import Head from 'next/head'
import { Hydrate } from 'react-query/hydration'
import NextApp from 'next/app'
import PropTypes from 'prop-types'
import { Provider } from '@algodex/algodex-hooks'
// Algodex
import ReactGA from 'react-ga'
import { ReactQueryDevtools } from 'react-query/devtools'
// Material UI
import { ThemeProvider } from '@mui/material/styles'
import { Toaster } from 'react-hot-toast'
import { WalletsProvider } from '@/hooks/useWallets'
// import AlgodexApi from '@algodex/algodex-sdk'
// import { Provider } from '@algodex/algodex-hooks'
import config from '@/config.json'
// import AlgodexApi from '@algodex/algodex-sdk'
// import { Provider } from '@algodex/algodex-hooks'
import createEmotionCache from '@/utils/createEmotionCache'
import parser from 'ua-parser-js'
import theme from '../theme/index'
import useUserStore from '@/store/use-user-state'

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache()
let api

/**
 *
 * @return {AlgodexApi}
 */
function makeApi() {
  if (typeof api === 'undefined') {
    const configEnv =
      process.env.NEXT_PUBLIC_ALGORAND_NETWORK === 'mainnet' ? config.mainnet : config.testnet
    api = new AlgodexApi({ config: configEnv })
  }
  return api
}

const styles = css`
  #__next,
  body,
  html {
    height: 100%;
  }
  ::-webkit-scrollbar {
    width: 6px;
    height: 5px;
  }
  ::-webkit-scrollbar-track {
    background: ${theme.palette.gray[900]};
  }
  ::-webkit-scrollbar-thumb {
    background: ${theme.palette.gray[600]};
    border-radius: 3px;
  }
  ::-webkit-scrollbar-thumb:hover {
    background: ${theme.palette.gray[500]};
  }
  ::-webkit-scrollbar-corner {
    background: ${theme.palette.gray[700]};
  }
  .tv-lightweight-charts {
    top: -0rem;
    position: absolute;
  }
  #pera-wallet-connect-modal-wrapper {
    position: fixed;
    z-index: 9999;
  }
`

function Algodex(props) {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props
  const TRACKING_ID = 'UA-195819772-1'

  ReactGA.initialize(TRACKING_ID)
  ReactGA.pageview('/')
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        // refetchInterval: 5000,
        staleTime: 3000,
        cacheTime: 300000
      }
    }
  })
  // Lift stores and cache for tests
  if (typeof window !== 'undefined' && window.Cypress) {
    window.userStore = useUserStore
    window.queryClient = queryClient
  }
  return (
    <QueryClientProvider client={queryClient}>
      <Hydrate state={pageProps.dehydratedState}>
        <EventEmitter>
          <CacheProvider value={emotionCache}>
            <Head>
              <meta name="viewport" content="initial-scale=1, width=device-width" />
            </Head>
            <ThemeProvider theme={theme}>
              <CssBaseline />
              <Global styles={styles} />
              <WalletsProvider>
                <Provider dex={makeApi()}>
                  {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
                  <Toaster />
                  <ReactQueryDevtools initialIsOpen={false} />
                  <Component {...pageProps} />
                </Provider>
              </WalletsProvider>
            </ThemeProvider>
          </CacheProvider>
        </EventEmitter>
      </Hydrate>
    </QueryClientProvider>
  )
}

Algodex.getInitialProps = async (ctx) => {
  const initialProps = await NextApp.getInitialProps(ctx)
  const deviceType = ctx.ctx.req ? parser(ctx.ctx.req.headers['user-agent']).device.type : 'desktop'
  return { pageProps: { ...initialProps, deviceType } }
}

Algodex.propTypes = {
  Component: PropTypes.elementType.isRequired,
  emotionCache: PropTypes.object,
  pageProps: PropTypes.object.isRequired
}
export default Algodex
