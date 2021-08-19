import { useEffect, useRef, useState } from 'react'
import PropTypes from 'prop-types'
import AssetSearch from 'components/asset-search'
import { demoAssetsData } from 'components/assets/demo'
import Chart from 'components/chart'
import MobileInterface from 'components/mobile-interface'
import { demoOpenOrderData } from 'components/open-orders/demo'
import OrderBook from 'components/order-book'
import { demoOrderHistoryData } from 'components/order-history/demo'
import Orders from 'components/orders'
import PlaceOrder from 'components/place-order'
import TradeHistory from 'components/trade-history'
import { generateTradesData } from 'components/trade-history/demo'
import Wallet from 'components/wallet'
import useStore from 'store/use-store'
import TestnetGate from 'components/testnet-gate'

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

const DEMO_TRADES_DATA = generateTradesData(1.3766, 0.0001)

const DEMO_OPEN_ORDER_DATA = demoOpenOrderData
const DEMO_ORDER_HISTORY_DATA = demoOrderHistoryData
const DEMO_ASSETS_DATA = demoAssetsData

function MainLayout(props) {
  const { onWalletConnect, refetchWallets } = props

  const asset = useStore((state) => state.asset)

  const [gridSize, setGridSize] = useState({ width: 0, height: 0 })
  const gridRef = useRef()

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
          <TestnetGate>
            <Wallet onWalletConnect={onWalletConnect} />
          </TestnetGate>
        </WalletSection>
        <TradeSection>
          <PlaceOrder refetchWallets={refetchWallets} />
        </TradeSection>
        <ChartSection>
          <Chart />
        </ChartSection>
        <OrderBookSection>
          <OrderBook />
        </OrderBookSection>
        <TradeHistorySection>
          <TradeHistory assetName={asset.name} tradesData={DEMO_TRADES_DATA} />
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
          <AssetSearch gridSize={gridSize} />
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
