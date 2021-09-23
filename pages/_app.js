/* eslint-disable react/prop-types */
import { useState } from 'react'
import { QueryClient, QueryClientProvider } from 'react-query'
import { Hydrate } from 'react-query/hydration'
import { createGlobalStyle, ThemeProvider } from 'styled-components'
import { Toaster } from 'react-hot-toast'
import theme from 'theme'
import ReactGA from 'react-ga'

const GlobalStyle = createGlobalStyle`
  html, body, div, span, applet, object, iframe,
  h1, h2, h3, h4, h5, h6, p, blockquote, pre,
  a, abbr, acronym, address, big, cite, code,
  del, dfn, em, img, ins, kbd, q, s, samp,
  small, strike, strong, sub, sup, tt, var,
  b, u, i, center,
  dl, dt, dd, ol, ul, li,
  fieldset, form, label, legend,
  table, caption, tbody, tfoot, thead, tr, th, td,
  article, aside, canvas, details, embed, 
  figure, figcaption, footer, header, hgroup, 
  menu, nav, output, ruby, section, summary,
  time, mark, audio, video {
    margin: 0;
    padding: 0;
    border: 0;
    font-size: 100%;
    font: inherit;
    vertical-align: baseline;
  }
  /* HTML5 display-role reset for older browsers */
  article, aside, details, figcaption, figure, 
  footer, header, hgroup, menu, nav, section {
    display: block;
  }
  body {
    line-height: 1;
  }
  ol, ul {
    list-style: none;
  }
  blockquote, q {
    quotes: none;
  }
  blockquote:before, blockquote:after,
  q:before, q:after {
    content: '';
    content: none;
  }
  table {
    border-collapse: collapse;
    border-spacing: 0;
  }

  html,
  body {
    box-sizing: border-box;
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;
    background: ${theme.colors.background.dark};
    color: ${theme.colors.gray['400']};
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
    width: 0;
    height: 5px;
  }
  ::-webkit-scrollbar-track {
    background: ${theme.colors.gray[700]};
  }
  ::-webkit-scrollbar-thumb {
    background: ${theme.colors.gray[600]};
    border-radius: 3px;
  }
  ::-webkit-scrollbar-thumb:hover {
    background: ${theme.colors.gray[500]};
  }
  ::-webkit-scrollbar-corner {
    background: ${theme.colors.gray[700]};
  }
`

export default function App({ Component, pageProps, err }) {
  const TRACKING_ID = 'UA-195819772-1'
  ReactGA.initialize(TRACKING_ID)
  ReactGA.pageview('/')
  const [queryClient] = useState(() => new QueryClient())
  return (
    <>
      <GlobalStyle />
      <Toaster />
      <ThemeProvider theme={theme}>
        <QueryClientProvider client={queryClient}>
          <Hydrate state={pageProps.dehydratedState}>
            <Component {...pageProps} err={err} />
          </Hydrate>
        </QueryClientProvider>
      </ThemeProvider>
    </>
  )
}
