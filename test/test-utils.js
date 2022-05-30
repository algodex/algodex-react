import { QueryClient, QueryClientProvider } from 'react-query'

import { CacheProvider } from '@emotion/react'
import I18nProvider from 'next-translate/I18nProvider'
import { ThemeProvider } from '@mui/material/styles'
import assetsEN from '../locales/en/assets.json'
import chartEN from '../locales/en/chart.json'
import commonEN from '../locales/en/common.json'
import createEmotionCache from '@/utils/createEmotionCache'
import networkNoficationEN from '../locales/en/network-notification.json'
import ordersEN from '../locales/en/orders.json'
import placeOrderEN from '../locales/en/place-order.json'
/* eslint-disable react/prop-types */
import { render } from '@testing-library/react'
import theme from '../theme'
import walletEN from '../locales/en/wallet.json'

const queryClient = new QueryClient()
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
            'network-notification': networkNoficationEN,
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
