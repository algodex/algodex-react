import { useRef, useState } from 'react'
import AssetSearch from 'components/asset-search'
import OrderBook from 'components/order-book'
import Orders from 'components/orders'
import PlaceOrder from 'components/place-order'
import TradeHistory from 'components/trade-history'
import Wallet from 'components/wallet'
import useTranslation from 'next-translate/useTranslation'
import Spinner from 'components/spinner'

import {
  AssetsSection,
  ContentSection,
  Main,
  MainWrapper,
  AssetOrderBookSection,
  WalletOrdersSection,
  AssetTradeHistorySection,
  PlaceOrderSection,
  WalletSection,
  MobileMenu,
  MobileMenuButton,
  SearchAndChartSection
} from './main-layout.css'
import PropTypes from 'prop-types'

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
            <AssetSearch gridRef={gridRef} />
          </AssetsSection>
          <ContentSection>{children}</ContentSection>
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
            {/* <li>
                <MobileMenuButton type="button" onClick={() => setActiveMobile(TABS.HISTORY)}>
                  History
                </MobileMenuButton>
              </li> */}
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
