/* eslint-disable react/prop-types */
import { render } from '@testing-library/react'
import { ThemeProvider } from '@mui/material/styles'
import { QueryClient, QueryClientProvider } from 'react-query'
import I18nProvider from 'next-translate/I18nProvider'
import theme from '../theme'
import commonEN from '../locales/en/common.json'
import ordersEN from '../locales/en/orders.json'
import assetsEN from '../locales/en/assets.json'
import placeOrderEN from '../locales/en/place-order.json'
import walletEN from '../locales/en/wallet.json'
import chartEN from '../locales/en/chart.json'
const queryClient = new QueryClient()
import createEmotionCache from '@/utils/createEmotionCache'
import { CacheProvider } from '@emotion/react'
const clientSideEmotionCache = createEmotionCache()
clientSideEmotionCache.compat = true
const Providers = ({ children }) => (
  <CacheProvider value={clientSideEmotionCache}>
    <ThemeProvider theme={theme}>
      <QueryClientProvider client={queryClient}>
        <I18nProvider
          lang={'en'}
          namespaces={{
            common: commonEN,
            orders: ordersEN,
            assets: assetsEN,
            'place-order': placeOrderEN,
            chart: chartEN,
            wallet: walletEN
          }}
        >
          {children}
        </I18nProvider>
      </QueryClientProvider>
    </ThemeProvider>
  </CacheProvider>
)

const customRender = (ui, options = {}) => render(ui, { wrapper: Providers, ...options })

// re-export everything
export * from '@testing-library/react'

// override render method
export { customRender as render }
