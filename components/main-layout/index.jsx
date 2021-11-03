import { useEffect, useRef, useState } from 'react'
import PropTypes from 'prop-types'
// import AssetSearch from 'components/asset-search'
import Chart from 'components/chart'
// import MobileInterface from 'components/mobile-interface'
// import OrderBook from 'components/order-book'
// import Orders from 'components/orders'
// import PlaceOrder from 'components/place-order'
// import TradeHistory from 'components/trade-history'
// import Wallet from 'components/wallet'
import AssetInfo from 'components/asset-info'
// import FirstOrderMsg from 'components/first-order-msg'
import { demoAssetsData } from 'components/assets/demo'
import { demoOpenOrderData } from 'components/open-orders/demo'
import { demoOrderHistoryData } from 'components/order-history/demo'
import useStore from 'store/use-store'
import OrderBookPrice from 'components/order-book-price'
import useTranslation from 'next-translate/useTranslation'
import {
  // AssetsSection,
  ChartSection
  // Main,
  // MainWrapper,
  // OrderBookSection,
  // OrdersSection,
  // TradeHistorySection,
  // TradeSection,
  // WalletSection,
  // MobileMenu,
  // MobileMenuButton,
  // MobilePriceSection,
  // SearchAndChartSection
} from './main-layout.css'

import { ChartOverlay } from '../asset-search/info-flyover/info-flyover.css'

// const DEMO_OPEN_ORDER_DATA = demoOpenOrderData
// const DEMO_ORDER_HISTORY_DATA = demoOrderHistoryData
// const DEMO_ASSETS_DATA = demoAssetsData

function MainLayout(props) {
  // const { onWalletConnect, refetchWallets } = props
  // const { t } = useTranslation('common')
  const asset = useStore((state) => state.asset)
  // const isSignedIn = useStore((state) => state.isSignedIn)
  // const showOrderBook = asset.isTraded || asset.hasOrders
  const showAssetInfo = useStore((state) => state.showAssetInfo)

  const [gridSize, setGridSize] = useState({ width: 0, height: 0 })
  const gridRef = useRef()

  const [showOverlay, setShowOverlay] = useState(false)

  const TABS = {
    CHART: 'CHART',
    BOOK: 'BOOK',
    TRADE: 'TRADE',
    ORDERS: 'ORDERS',
    HISTORY: 'HISTORY'
  }

  const [activeMobile, setActiveMobile] = useState(TABS.CHART)

  useEffect(() => {
    const handleResize = () => {
      if (gridRef?.current) {
        const { width, height } = gridRef.current.getBoundingClientRect()
        setGridSize({ width, height })
      }
    }
    window.addEventListener('resize', handleResize)
    handleResize()

    return () => removeEventListener('resize', handleResize)
  }, [])

  return (
    // <MainWrapper>
    <div>
      {/*<Main ref={gridRef}>*/}
      {/* <MobilePriceSection active={activeMobile === TABS.TRADE}>
          <h3>
            <span>{`${asset.name} `}</span> / ALGO
          </h3>
          <OrderBookPrice price={asset.price} decimals={asset.decimals} change={asset.priceChange24hr} />
        </MobilePriceSection> */}

      {/*<WalletSection active={activeMobile === TABS.WALLET}>*/}
      {/*  <Wallet onWalletConnect={onWalletConnect} />*/}
      {/*</WalletSection>*/}
      {/*<TradeSection active={activeMobile === TABS.TRADE}>*/}
      {/*  <PlaceOrder refetchWallets={refetchWallets} />*/}
      {/*</TradeSection>*/}
      {/*<SearchAndChartSection active={activeMobile === TABS.CHART}>*/}
      {/*  <AssetsSection>*/}
      {/*    <AssetSearch gridSize={gridSize} onInfoChange={(show) => setShowOverlay(show)} />*/}
      {/*  </AssetsSection>*/}
      <ChartSection>
        {asset.isTraded && !showAssetInfo ? <Chart /> : <AssetInfo />}
        <ChartOverlay isActive={showOverlay} />
      </ChartSection>
      {/*</SearchAndChartSection>*/}
      {/*<OrderBookSection active={activeMobile === TABS.BOOK}>*/}
      {/*  {showOrderBook ? <OrderBook /> : <FirstOrderMsg asset={asset} isSignedIn={isSignedIn} />}*/}
      {/*</OrderBookSection>*/}
      {/*<TradeHistorySection active={activeMobile === TABS.HISTORY}>*/}
      {/*  <TradeHistory />*/}
      {/*</TradeHistorySection>*/}
      {/*<OrdersSection active={activeMobile === TABS.ORDERS}>*/}
      {/*  <Orders*/}
      {/*    openOrderData={DEMO_OPEN_ORDER_DATA}*/}
      {/*    orderHistoryData={DEMO_ORDER_HISTORY_DATA}*/}
      {/*    assetData={DEMO_ASSETS_DATA}*/}
      {/*    gridSize={gridSize}*/}
      {/*  />*/}
      {/*</OrdersSection>*/}
      {/*<MobileMenu>*/}
      {/*  <ul>*/}
      {/*    <li>*/}
      {/*      <MobileMenuButton type="button" onClick={() => setActiveMobile(TABS.CHART)}>*/}
      {/*        {t('mobilefooter-CHART')}*/}
      {/*      </MobileMenuButton>*/}
      {/*    </li>*/}
      {/*    <li>*/}
      {/*      <MobileMenuButton type="button" onClick={() => setActiveMobile(TABS.BOOK)}>*/}
      {/*        {t('mobilefooter-BOOK')}*/}
      {/*      </MobileMenuButton>*/}
      {/*    </li>*/}
      {/*    <li>*/}
      {/*      <MobileMenuButton type="button" onClick={() => setActiveMobile(TABS.TRADE)}>*/}
      {/*        {t('mobilefooter-TRADE')}*/}
      {/*      </MobileMenuButton>*/}
      {/*    </li>*/}
      {/*    <li>*/}
      {/*      <MobileMenuButton type="button" onClick={() => setActiveMobile(TABS.ORDERS)}>*/}
      {/*        {t('mobilefooter-ORDERS')}*/}
      {/*      </MobileMenuButton>*/}
      {/*    </li>*/}
      {/*    /!* <li>*/}
      {/*          <MobileMenuButton type="button" onClick={() => setActiveMobile(TABS.HISTORY)}>*/}
      {/*            History*/}
      {/*          </MobileMenuButton>*/}
      {/*        </li> *!/*/}
      {/*    <li>*/}
      {/*      <MobileMenuButton type="button" onClick={() => setActiveMobile(TABS.WALLET)}>*/}
      {/*        {t('mobilefooter-WALLET')}*/}
      {/*      </MobileMenuButton>*/}
      {/*    </li>*/}
      {/*  </ul>*/}
      {/*</MobileMenu>*/}
      {/*</Main>*/}
    </div>
  )
}

MainLayout.propTypes = {
  onWalletConnect: PropTypes.func.isRequired,
  refetchWallets: PropTypes.func.isRequired
}

export default MainLayout
