import React from 'react'
import { jsxDecorator } from 'storybook-addon-jsx'
import { createGlobalStyle, ThemeProvider } from 'styled-components'
import theme from '../theme'

const GlobalStyle = createGlobalStyle`
  html,
  body {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: 'Inter', sans-serif;
  }
`

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/
    }
  }
}

export const decorators = [
  jsxDecorator,
  (Story) => <ThemeProvider theme={theme}>{Story()}</ThemeProvider>,
  (Story) => (
    <>
      <GlobalStyle />
      {Story()}
    </>
  )
]
