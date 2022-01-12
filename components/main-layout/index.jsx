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
  WalletSection,
  MobileBookTab,
  WebOnly,
  MobileBookMenu
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
import { Tab } from 'components/orders/orders.css'

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

  const BOOKTABS = {
    ORDER_BOOK: 'ORDER_BOOK',
    TRADE_HISTORY: 'TRADE_HISTORY'
  }

  const [activeBookMobile, setActiveBookMobile] = useState(BOOKTABS.ORDER_BOOK)
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
          <ContentSection>{children}</ContentSection>
        </SearchAndChartSection>

        {/* <AssetOrderBookSection>
          <WebOnly>
            <OrderBook asset={asset} />
          </WebOnly>
        </AssetOrderBookSection>
        <AssetTradeHistorySection>
          <WebOnly>
            <TradeHistory asset={asset} />
          </WebOnly>
        </AssetTradeHistorySection> */}

            <section>
        <MobileBookTab active={activeMobile === TABS.BOOK}>
          <MobileBookMenu>
            <Tab
              isActive={activeBookMobile === BOOKTABS.ORDER_BOOK}
              onClick={() => setActiveBookMobile(BOOKTABS.ORDER_BOOK)}
            >
              {t('order-book')}
            </Tab>
            <Tab
              isActive={activeBookMobile === BOOKTABS.TRADE_HISTORY}
              onClick={() => setActiveBookMobile(BOOKTABS.TRADE_HISTORY)}
            >
              {t('trade-history')}
            </Tab>
          </MobileBookMenu>
        </MobileBookTab>

          <AssetOrderBookSection
            active={activeMobile === TABS.BOOK && activeBookMobile === BOOKTABS.ORDER_BOOK}
          >
            <OrderBook asset={asset} />
          </AssetOrderBookSection>
          <AssetTradeHistorySection
            active={activeMobile === TABS.BOOK && activeBookMobile === BOOKTABS.TRADE_HISTORY}
          >
            <TradeHistory asset={asset} />
          </AssetTradeHistorySection>
        </section>

        <WalletOrdersSection active={activeMobile === TABS.ORDERS}>
          <Orders />
        </WalletOrdersSection>
        <MobileMenu>
          <ul>
            <li>
              <MobileMenuButton
                characterLength={t('mobilefooter-CHART').length}
                type="button"
                onClick={() => setActiveMobile(TABS.CHART)}
              >
                {t('mobilefooter-CHART')}
              </MobileMenuButton>
            </li>
            <li>
              <MobileMenuButton
                characterLength={t('mobilefooter-BOOK').length}
                type="button"
                onClick={() => setActiveMobile(TABS.BOOK)}
              >
                {t('mobilefooter-BOOK')}
              </MobileMenuButton>
            </li>
            <li>
              <MobileMenuButton
                characterLength={t('mobilefooter-TRADE').length}
                type="button"
                onClick={() => setActiveMobile(TABS.TRADE)}
              >
                {t('mobilefooter-TRADE')}
              </MobileMenuButton>
            </li>
            <li>
              <MobileMenuButton
                characterLength={t('mobilefooter-ORDERS').length}
                type="button"
                onClick={() => setActiveMobile(TABS.ORDERS)}
              >
                {t('mobilefooter-ORDERS')}
              </MobileMenuButton>
            </li>

            <li>
              <MobileMenuButton
                type="button"
                characterLength={t('mobilefooter-WALLET').length}
                onClick={() => setActiveMobile(TABS.WALLET)}
              >
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
