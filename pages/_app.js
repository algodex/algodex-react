/* eslint-disable react/prop-types */
import { useState, useEffect } from 'react'
import { QueryClient, QueryClientProvider } from 'react-query'
import { Hydrate } from 'react-query/hydration'
import { createGlobalStyle, ThemeProvider } from 'styled-components'
import theme from 'theme'

const GlobalStyle = createGlobalStyle`
  html,
  body {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: 'Inter', sans-serif;
    background-color: ${theme.colors.background.dark};
  }

  *,
  *:before,
  *:after {
    box-sizing: inherit;
  }
`

export default function App({ Component, pageProps }) {
  const [queryClient] = useState(() => new QueryClient())
  useEffect(() => {
    const initAlgodexApi = async () => {
      const algodex = (await import('@algodex/algodex-api')).default
      algodex.printMsg()
    }
    initAlgodexApi()
  }, [])

  return (
    <>
      <GlobalStyle />
      <ThemeProvider theme={theme}>
        <QueryClientProvider client={queryClient}>
          <Hydrate state={pageProps.dehydratedState}>
            <Component {...pageProps} />
          </Hydrate>
        </QueryClientProvider>
      </ThemeProvider>
    </>
  )
}
