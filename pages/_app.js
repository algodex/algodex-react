import '../styles/global.css'

import * as React from 'react'

import { CacheProvider, Global, css } from '@emotion/react'
// React Query
import { QueryClient, QueryClientProvider } from 'react-query'

import CssBaseline from '@mui/material/CssBaseline'
import { EventEmitter } from '@/hooks/useEvents'
import Head from 'next/head'
import { Hydrate } from 'react-query/hydration'
import PropTypes from 'prop-types'
// Algodex
import ReactGA from 'react-ga'
import { ReactQueryDevtools } from 'react-query/devtools'
// Material UI
import { ThemeProvider } from '@mui/material/styles'
import { Toaster } from 'react-hot-toast'
import createEmotionCache from '@/utils/createEmotionCache'
import theme from '../theme/index'
import useStore from '@/store/use-store'
import useUserStore from '@/store/use-user-state'

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache()
const styles = css`
  html,
  body,
  div,
  span,
  applet,
  object,
  iframe,
  h1,
  h2,
  h3,
  h4,
  h5,
  h6,
  p,
  blockquote,
  pre,
  a,
  abbr,
  acronym,
  address,
  big,
  cite,
  code,
  del,
  dfn,
  em,
  img,
  ins,
  kbd,
  q,
  s,
  samp,
  small,
  strike,
  strong,
  sub,
  sup,
  tt,
  var,
  b,
  u,
  i,
  center,
  dl,
  dt,
  dd,
  ol,
  ul,
  li,
  fieldset,
  form,
  label,
  legend,
  table,
  caption,
  tbody,
  tfoot,
  thead,
  tr,
  th,
  td,
  article,
  aside,
  canvas,
  details,
  embed,
  figure,
  figcaption,
  footer,
  header,
  hgroup,
  menu,
  nav,
  output,
  ruby,
  section,
  summary,
  time,
  mark,
  audio,
  video {
    margin: 0;
    padding: 0;
    border: 0;
    font-size: 100%;
    font: inherit;
    vertical-align: baseline;
  }
  /* HTML5 display-role reset for older browsers */
  article,
  aside,
  details,
  figcaption,
  figure,
  footer,
  header,
  hgroup,
  menu,
  nav,
  section {
    display: block;
  }
  body {
    line-height: 1;
  }
  ol,
  ul {
    list-style: none;
  }
  blockquote,
  q {
    quotes: none;
  }
  blockquote:before,
  blockquote:after,
  q:before,
  q:after {
    content: '';
    content: none;
  }
  table {
    border-collapse: collapse;
    border-spacing: 0;
  }
  #__next {
    height: 100%;
  }
  html,
  body {
    height: 100%;
    box-sizing: border-box;
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu,
      Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;
    background: ${theme.palette.background.dark};
    color: ${theme.palette.gray['400']};
  }
  *,
  *:before,
  *:after {
    box-sizing: inherit;
  }

  a {
    text-decoration: none;
  }

  ::-webkit-scrollbar {
    width: 8px;
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

  input[type='number']::-webkit-inner-spin-button,
  input[type='number']::-webkit-outer-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
  button {
    background-color: transparent;
    border: none;
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
    window.store = useStore
    window.queryClient = queryClient
  }
  return (
    <QueryClientProvider client={queryClient}>
      <CssBaseline />
      <Global styles={styles} />
      <Hydrate state={pageProps.dehydratedState}>
        <EventEmitter>
          <CacheProvider value={emotionCache}>
            <Head>
              <meta name="viewport" content="initial-scale=1, width=device-width" />
            </Head>
            <ThemeProvider theme={theme}>
              {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
              <Toaster />
              <ReactQueryDevtools initialIsOpen={false} />
              <Component {...pageProps} />
            </ThemeProvider>
          </CacheProvider>
        </EventEmitter>
      </Hydrate>
    </QueryClientProvider>
  )
}

Algodex.propTypes = {
  Component: PropTypes.elementType.isRequired,
  emotionCache: PropTypes.object,
  pageProps: PropTypes.object.isRequired
}
export default Algodex
