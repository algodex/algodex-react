import React from 'react'
import { jsxDecorator } from 'storybook-addon-jsx'
import { RouterContext } from 'next/dist/next-server/lib/router-context'
import { createGlobalStyle, ThemeProvider } from 'styled-components'
import { QueryClient, QueryClientProvider } from 'react-query'
import theme from '../theme'

const queryClient = new QueryClient()

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
  },
  nextRouter: {
    Provider: RouterContext.Provider
  }
}

export const decorators = [
  jsxDecorator,
  (Story) => (
    <ThemeProvider theme={theme}>
      <QueryClientProvider client={queryClient}>
        {Story()}
      </QueryClientProvider>
    </ThemeProvider>
  ),
  (Story) => (
    <>
      <GlobalStyle />
      {Story()}
    </>
  )
]
