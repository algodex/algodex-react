/* eslint-disable react/prop-types */
import { render } from '@testing-library/react'
import { ThemeProvider } from 'styled-components'
import { QueryClient, QueryClientProvider } from 'react-query'
import I18nProvider from 'next-translate/I18nProvider'
import theme from '../theme'
import commonEN from '../i18n/en/common.json'
import ordersEN from '../i18n/en/orders.json'
import assetsEN from '../i18n/en/assets.json'
import placeOrderEN from '../i18n/en/place-order.json'
import walletEN from '../i18n/en/wallet.json'
import chartEN from '../i18n/en/chart.json'

const queryClient = new QueryClient()

const Providers = ({ children }) => {
  return (
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
  )
}

const customRender = (ui, options = {}) => render(ui, { wrapper: Providers, ...options })

// re-export everything
export * from '@testing-library/react'

// override render method
export { customRender as render }
