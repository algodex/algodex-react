import { CacheProvider } from '@emotion/react'
import { ThemeProvider } from '@mui/material/styles'
import createEmotionCache from '@/utils/createEmotionCache'
import { render } from '@testing-library/react'
import theme from '../theme'
import { QueryClient, QueryClientProvider } from 'react-query'

const clientSideEmotionCache = createEmotionCache()
clientSideEmotionCache.compat = true
// eslint-disable-next-line react/prop-types
const Providers = ({ children }) => (
  <CacheProvider value={clientSideEmotionCache}>
    <ThemeProvider theme={theme}>{children}</ThemeProvider>
  </CacheProvider>
)

const customRender = (ui, options = {}) => render(ui, { wrapper: Providers, ...options })

export const withQueryClient = (component) => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false
      }
    }
  })
  const { rerender, ...result } = customRender(
    <QueryClientProvider client={queryClient}>{component}</QueryClientProvider>
  )
  return {
    ...result,
    rerender: (rerenderComponent) =>
      rerender(<QueryClientProvider client={queryClient}>{rerenderComponent}</QueryClientProvider>)
  }
}
// re-export everything
export * from '@testing-library/react'

// override render method
export { customRender as render }
