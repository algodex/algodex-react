//import dynamic from 'next/dynamic'
import { useRef, useState } from 'react'
import AssetSearch from 'components/asset-search'
import Chart from 'components/chart'
// import MobileInterface from 'components/mobile-interface'
import OrderBook from 'components/order-book'
import Orders from 'components/orders'
import PlaceOrder from 'components/place-order'
import TradeHistory from 'components/trade-history'
import Wallet from 'components/wallet'
import AssetInfo from 'components/asset-info'
import FirstOrderMsg from 'components/first-order-msg'
// import styled from 'styled-components'
import useTranslation from 'next-translate/useTranslation'
// import Spinner from 'components/spinner'
import { demoAssetsData } from 'components/assets/demo'
import { demoOpenOrderData } from 'components/open-orders/demo'
import { demoOrderHistoryData } from 'components/order-history/demo'
import useStore from 'store/use-store'

import {
  AssetsSection,
  ChartSection,
  Main,
  MainWrapper,
  OrderBookSection,
  OrdersSection,
  TradeHistorySection,
  TradeSection,
  WalletSection,
  MobileMenu,
  MobileMenuButton,
  SearchAndChartSection
} from './main-layout.css'

const DEMO_OPEN_ORDER_DATA = demoOpenOrderData
const DEMO_ORDER_HISTORY_DATA = demoOrderHistoryData
const DEMO_ASSETS_DATA = demoAssetsData

// const CenterSpinner = styled.div`
//   background-color: transparent;
//   height: 100%;
//   display: flex;
//   justify-content: center;
//   align-items: center;
// `
// const loading = () => (
//   <CenterSpinner>
//     <Spinner />
//   </CenterSpinner>
// )
function MainLayout() {
  console.log('Main Layout Render Counter')

  // const AssetSearch = dynamic(() => import('components/asset-search'), { loading })
  // const Chart = dynamic(() => import('components/chart'), { loading })
  // const OrderBook = dynamic(() => import('components/order-book'), { loading })
  // const Orders = dynamic(() => import('components/orders'), { loading })
  // const TradeHistory = dynamic(() => import('components/trade-history'), { loading })
  // const PlaceOrder = dynamic(() => import('components/place-order'), { loading })
  // const Wallet = dynamic(() => import('components/wallet'), { loading })
  // const AssetInfo = dynamic(() => import('components/asset-info'), { loading })
  // const FirstOrderMsg = dynamic(() => import('components/first-order-msg'), { loading })
  const { t } = useTranslation('common')
  const asset = useStore((state) => state.asset)
  const isSignedIn = useStore((state) => state.isSignedIn)
  const showOrderBook = asset.isTraded || asset.hasOrders
  const showAssetInfo = useStore((state) => state.showAssetInfo)
  const gridRef = useRef()

  const TABS = {
    CHART: 'CHART',
    BOOK: 'BOOK',
    TRADE: 'TRADE',
    ORDERS: 'ORDERS',
    HISTORY: 'HISTORY'
  }

  const [activeMobile, setActiveMobile] = useState(TABS.CHART)

  // useEffect(() => {
  //   const handleResize = () => {
  //     if (gridRef?.current) {
  //       const { width, height } = gridRef.current.getBoundingClientRect()
  //       setGridSize({ width, height })
  //     }
  //   }
  //   window.addEventListener('resize', handleResize)
  //   handleResize()
  //
  //   return () => removeEventListener('resize', handleResize)
  // }, [])

  return (
    <MainWrapper>
      <Main ref={gridRef}>
        {/* <MobilePriceSection active={activeMobile === TABS.TRADE}>
          <h3>
            <span>{`${asset.name} `}</span> / ALGO
          </h3>
          <OrderBookPrice price={asset.price} decimals={asset.decimals} change={asset.priceChange24hr} />
        </MobilePriceSection> */}

        <WalletSection active={activeMobile === TABS.WALLET}>
          <Wallet />
        </WalletSection>
        <TradeSection active={activeMobile === TABS.TRADE}>
          <PlaceOrder />
        </TradeSection>
        <SearchAndChartSection active={activeMobile === TABS.CHART}>
          <AssetsSection>
            <AssetSearch gridRef={gridRef} />
          </AssetsSection>
          <ChartSection>
            {asset.isTraded && !showAssetInfo ? <Chart /> : <AssetInfo />}
          </ChartSection>
        </SearchAndChartSection>
        <OrderBookSection active={activeMobile === TABS.BOOK}>
          {showOrderBook ? <OrderBook /> : <FirstOrderMsg asset={asset} isSignedIn={isSignedIn} />}
        </OrderBookSection>
        <TradeHistorySection active={activeMobile === TABS.HISTORY}>
          <TradeHistory />
        </TradeHistorySection>
        <OrdersSection active={activeMobile === TABS.ORDERS}>
          <Orders
            openOrderData={DEMO_OPEN_ORDER_DATA}
            orderHistoryData={DEMO_ORDER_HISTORY_DATA}
            assetData={DEMO_ASSETS_DATA}
          />
        </OrdersSection>
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

export default MainLayout
