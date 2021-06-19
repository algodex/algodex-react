import PropTypes from 'prop-types'
import AssetSearch from 'components/asset-search'
import { demoAssetsData } from 'components/assets/demo'
import Chart from 'components/chart'
import {
  DEMO_BASE_ASSET,
  DEMO_ALGO_VOLUME,
  DEMO_DAILY_CHANGE,
  DEMO_ASSET_NAME,
  DEMO_VOLUME_DATA,
  DEMO_OHLC,
  DEMO_BID,
  DEMO_ASK,
  DEMO_SPREAD,
  DEMO_CANDLE_CHART_MODE,
  DEMO_AREA_CHART_MODE,
  DEMO_CHART_MODES
} from 'components/chart/demo'
import MobileInterface from 'components/mobile-interface'
import { demoOpenOrderData } from 'components/open-orders/demo'
import OrderBook from 'components/order-book'
import { demoOrderHistoryData } from 'components/order-history/demo'
import Orders from 'components/orders'
import PlaceOrder from 'components/place-order'
import TradeHistory from 'components/trade-history'
import { generateTradesData } from 'components/trade-history/demo'
import Wallet from 'components/wallet'
import { useEffect, useRef, useState } from 'react'
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

const DEMO_WALLETS = [
  { id: 'wallet-01', name: 'Main', balance: 812569.2658 },
  { id: 'wallet-02', name: 'Trading', balance: 63125.7856 },
  { id: 'wallet-03', name: 'Stablecoins', balance: 1078.9265 }
]

const DEMO_OPEN_ORDER_DATA = demoOpenOrderData
const DEMO_ORDER_HISTORY_DATA = demoOrderHistoryData
const DEMO_ASSETS_DATA = demoAssetsData

function MainLayout(props) {
  const { asset } = props

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
          <Wallet
            wallets={DEMO_WALLETS}
            activeWalletId={DEMO_WALLETS[0].id}
            onWalletClick={() => null}
          />
        </WalletSection>
        <TradeSection>
          <PlaceOrder activeWallet={DEMO_WALLETS[0]} asset="YLDY" />
        </TradeSection>
        <ChartSection>
          <Chart assetName={asset.params['unit-name']} assetId={asset.id} />
        </ChartSection>
        <OrderBookSection>
          <OrderBook
            assetName={asset.params['unit-name']}
            currentPrice={asset.price}
            priceChange={0.0001}
            assetId={asset.id}
          />
        </OrderBookSection>
        <TradeHistorySection>
          <TradeHistory assetName="YLDY" tradesData={DEMO_TRADES_DATA} />
        </TradeHistorySection>
        <OrdersSection>
          <Orders
            openOrderData={DEMO_OPEN_ORDER_DATA}
            orderHistoryData={DEMO_ORDER_HISTORY_DATA}
            assetData={DEMO_ASSETS_DATA}
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
  asset: PropTypes.object.isRequired
}

export default MainLayout
