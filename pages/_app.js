/* eslint-disable react/prop-types */
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
  return (
    <>
      <GlobalStyle />
      <ThemeProvider theme={theme}>
        <Component {...pageProps} />
      </ThemeProvider>
    </>
  )
}
