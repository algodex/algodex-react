/* eslint-disable react/prop-types */
import { useEffect } from 'react'
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
`

export default function App({ Component, pageProps }) {
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
        <Component {...pageProps} />
      </ThemeProvider>
    </>
  )
}
