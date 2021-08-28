import { useEffect, useRef, useState } from 'react'
import PropTypes from 'prop-types'
import AssetSearch from 'components/asset-search'
import Chart from 'components/chart'
import MobileInterface from 'components/mobile-interface'
import OrderBook from 'components/order-book'
import Orders from 'components/orders'
import PlaceOrder from 'components/place-order'
import TradeHistory from 'components/trade-history'
import Wallet from 'components/wallet'
import AssetInfo from 'components/asset-info'
import FirstOrderMsg from 'components/first-order-msg'
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
  WalletSection
} from './main-layout.css'

import { ChartOverlay } from '../asset-search/info-flyover/info-flyover.css'

const DEMO_OPEN_ORDER_DATA = demoOpenOrderData
const DEMO_ORDER_HISTORY_DATA = demoOrderHistoryData
const DEMO_ASSETS_DATA = demoAssetsData

function MainLayout(props) {
  const { onWalletConnect, refetchWallets } = props
  console.log('in main layout!!! env: ' + process.env.NEXT_PUBLIC_ENV );
  
  const asset = useStore((state) => state.asset)
  const isSignedIn = useStore((state) => state.isSignedIn)
  const showOrderBook = asset.isTraded || asset.hasOrders

  const [gridSize, setGridSize] = useState({ width: 0, height: 0 })
  const gridRef = useRef()

  const [showOverlay, setShowOverlay] = useState(false)

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
    <MainWrapper>
      <Main ref={gridRef}>
        <MobileInterface />
        <WalletSection>
          <Wallet onWalletConnect={onWalletConnect} />
        </WalletSection>
        <TradeSection>
          <PlaceOrder refetchWallets={refetchWallets} />
        </TradeSection>
        <ChartSection>
          {asset.isTraded ? <Chart /> : <AssetInfo />}
          <ChartOverlay isActive={showOverlay} />
        </ChartSection>
        <OrderBookSection>
          {showOrderBook ? <OrderBook /> : <FirstOrderMsg asset={asset} isSignedIn={isSignedIn} />}
        </OrderBookSection>
        <TradeHistorySection>
          <TradeHistory />
        </TradeHistorySection>
        <OrdersSection>
          <Orders
            openOrderData={DEMO_OPEN_ORDER_DATA}
            orderHistoryData={DEMO_ORDER_HISTORY_DATA}
            assetData={DEMO_ASSETS_DATA}
            gridSize={gridSize}
          />
        </OrdersSection>
        <AssetsSection>
          <AssetSearch gridSize={gridSize} onInfoChange={(show) => setShowOverlay(show)} />
        </AssetsSection>
      </Main>
    </MainWrapper>
  )
}

MainLayout.propTypes = {
  onWalletConnect: PropTypes.func.isRequired,
  refetchWallets: PropTypes.func.isRequired
}

export default MainLayout
