import {
  AssetOrderBookSection,
  AssetTradeHistorySection,
  AssetsSection,
  ContentSection,
  Main,
  MainWrapper,
  MobileMenu,
  MobileMenuButton,
  PlaceOrderSection,
  SearchAndChartSection,
  WalletOrdersSection,
  WalletSection
} from './main-layout.css'
import { useRef, useState } from 'react'

import AssetSearch from 'components/asset-search'
import OrderBook from 'components/order-book'
import Orders from 'components/orders'
import PlaceOrder from 'components/place-order'
import PropTypes from 'prop-types'
import Spinner from 'components/spinner'
import TradeHistory from 'components/trade-history'
import Wallet from 'components/wallet'
import { useEvent } from 'hooks/useEvents'
import useTranslation from 'next-translate/useTranslation'

/**
 * @param asset
 * @param children
 * @returns {JSX.Element}
 * @constructor
 */
function MainLayout({ asset, children }) {
  console.debug(`Main Layout Render ${asset?.id || 'Missing'}`)

  const { t } = useTranslation('common')
  const gridRef = useRef()
  const TABS = {
    CHART: 'CHART',
    BOOK: 'BOOK',
    TRADE: 'TRADE',
    ORDERS: 'ORDERS',
    HISTORY: 'HISTORY'
  }

  const [activeMobile, setActiveMobile] = useState(TABS.CHART)
  /**
   * Use Clicked Events
   *
   * This is only used to switch to MobileMenu Chart view
   * when the Next/Router navigates to a shallow route
   */
  useEvent('clicked', (data) => {
    if (data === 'asset') {
      console.log('CLicked', data)
      setActiveMobile(TABS.CHART)
    }
    if (data === 'order') {
      setActiveMobile(TABS.TRADE)
    }
  })
  if (!asset) {
    return <Spinner flex={true} />
  }
  return (
    <MainWrapper>
      <Main ref={gridRef}>
        <WalletSection active={activeMobile === TABS.WALLET}>
          <Wallet />
        </WalletSection>
        <PlaceOrderSection active={activeMobile === TABS.TRADE}>
          <PlaceOrder asset={asset} />
        </PlaceOrderSection>
        <SearchAndChartSection active={activeMobile === TABS.CHART}>
          <AssetsSection>
            <AssetSearch style={{ height: '6rem' }} className="h-24" gridRef={gridRef} />
          </AssetsSection>
          <ContentSection style={{ marginTop: '2rem' }} className="mt-8">
            {children}
          </ContentSection>
        </SearchAndChartSection>

        <AssetOrderBookSection active={activeMobile === TABS.BOOK}>
          <OrderBook asset={asset} />
        </AssetOrderBookSection>

        <AssetTradeHistorySection active={activeMobile === TABS.HISTORY}>
          <TradeHistory asset={asset} />
        </AssetTradeHistorySection>

        <WalletOrdersSection active={activeMobile === TABS.ORDERS}>
          <Orders />
        </WalletOrdersSection>
        <MobileMenu>
          <ul>
            <li>
              <MobileMenuButton type="button" onClick={() => setActiveMobile(TABS.CHART)}>
                {t('mobilefooter-CHART')}
              </MobileMenuButton>
            </li>
            <li>
              <MobileMenuButton type="button" onClick={() => setActiveMobile(TABS.BOOK)}>
                {t('mobilefooter-BOOK')}
              </MobileMenuButton>
            </li>
            <li>
              <MobileMenuButton type="button" onClick={() => setActiveMobile(TABS.TRADE)}>
                {t('mobilefooter-TRADE')}
              </MobileMenuButton>
            </li>
            <li>
              <MobileMenuButton type="button" onClick={() => setActiveMobile(TABS.ORDERS)}>
                {t('mobilefooter-ORDERS')}
              </MobileMenuButton>
            </li>
            <li>
              <MobileMenuButton type="button" onClick={() => setActiveMobile(TABS.HISTORY)}>
                History
              </MobileMenuButton>
            </li>
            <li>
              <MobileMenuButton type="button" onClick={() => setActiveMobile(TABS.WALLET)}>
                {t('mobilefooter-WALLET')}
              </MobileMenuButton>
            </li>
          </ul>
        </MobileMenu>
      </Main>
    </MainWrapper>
  )
}
MainLayout.propTypes = {
  asset: PropTypes.object,
  children: PropTypes.any
}
export default MainLayout
