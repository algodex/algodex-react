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
import { useRouter } from 'next/router'

/**
 * @param asset
 * @param children
 * @returns {JSX.Element}
 * @constructor
 */
function MainLayout({ asset, children }) {
  console.debug(`Main Layout Render ${asset?.id || 'Missing'}`)
  const { isFallback } = useRouter()
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

  // If the Server failed to load data
  if (isFallback) {
    return <Spinner flex />
  }
  return (
    <MainWrapper>
      <Main ref={gridRef}>
        <WalletSection active={activeMobile === TABS.WALLET}>
          <Wallet />
        </WalletSection>
        <PlaceOrderSection active={activeMobile === TABS.TRADE}>
          <PlaceOrder />
        </PlaceOrderSection>
        <SearchAndChartSection active={activeMobile === TABS.CHART}>
          <AssetsSection>
            <AssetSearch gridRef={gridRef} />
          </AssetsSection>
          <ContentSection>
            {children}
            {/*{asset?.id && router.pathname.match('trade') && <Chart asset={asset} />}*/}
            {/*{asset?.id && router.pathname.match('asset') && <AssetInfo asset={asset} />}*/}
          </ContentSection>
        </SearchAndChartSection>

        <AssetOrderBookSection active={activeMobile === TABS.BOOK}>
          <OrderBook explorerAsset={asset} />
        </AssetOrderBookSection>

        <AssetTradeHistorySection active={activeMobile === TABS.HISTORY}>
          <TradeHistory asset={asset} />
        </AssetTradeHistorySection>

        <WalletOrdersSection active={activeMobile === TABS.ORDERS}>
          <Orders asset={asset} />
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
  asset: PropTypes.object.isRequired,
  children: PropTypes.any
}
export default MainLayout
