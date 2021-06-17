import AssetSearch from 'components/asset-search'
import { demoAssetsData } from 'components/assets/demo'
import Chart from 'components/chart'
import {
  DEMO_BID_ASK_PRICE,
  DEMO_CHART_DATA,
  DEMO_DAILY_CHANGE_PERCENT,
  DEMO_OHLC,
  DEMO_SELECTED_PAIR,
  DEMO_VOLUME_AMOUNT,
  DEMO_VOLUME_DATA
} from 'components/chart/demo'
import MobileInterface from 'components/mobile-interface'
import { demoOpenOrderData } from 'components/open-orders/demo'
import OrderBook from 'components/order-book'
import { generateBookData } from 'components/order-book/demo'
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

const DEMO_SELL_DATA = generateBookData(1.3766, 0.0001)
const DEMO_BUY_DATA = generateBookData(1.3764, -0.0001)
const DEMO_TRADES_DATA = generateTradesData(1.3766, 0.0001)

const DEMO_WALLETS = [
  { id: 'wallet-01', name: 'Main', balance: 812569.2658 },
  { id: 'wallet-02', name: 'Trading', balance: 63125.7856 },
  { id: 'wallet-03', name: 'Stablecoins', balance: 1078.9265 }
]

const DEMO_OPEN_ORDER_DATA = demoOpenOrderData
const DEMO_ORDER_HISTORY_DATA = demoOrderHistoryData
const DEMO_ASSETS_DATA = demoAssetsData

export default function MainLayout() {
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
          <Chart
            priceData={DEMO_CHART_DATA}
            bidAndAsk={DEMO_BID_ASK_PRICE}
            volume24hr={DEMO_VOLUME_AMOUNT}
            pair={DEMO_SELECTED_PAIR}
            dailyChange={DEMO_DAILY_CHANGE_PERCENT}
            ohlc={DEMO_OHLC}
            volumeData={DEMO_VOLUME_DATA}
          />
        </ChartSection>
        <OrderBookSection>
          <OrderBook
            assetName="YLDY"
            currentPrice={1.3765}
            priceChange={-0.0001}
            sellData={DEMO_SELL_DATA}
            buyData={DEMO_BUY_DATA}
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
