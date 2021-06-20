/* eslint-disable react/prop-types */
import { render } from '@testing-library/react'
import { ThemeProvider } from 'styled-components'
import { QueryClient, QueryClientProvider } from 'react-query'
import theme from '../theme'

const queryClient = new QueryClient()

const Providers = ({ children }) => (
  <ThemeProvider theme={theme}>
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  </ThemeProvider>
)

const customRender = (ui, options = {}) => render(ui, { wrapper: Providers, ...options })

// re-export everything
export * from '@testing-library/react'

// override render method
export { customRender as render }
