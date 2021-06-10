import dynamic from 'next/dynamic'

import MobileInterface from 'components/mobile-interface'
import OrderBook from 'components/order-book'
import Orders from 'components/orders'
import TradeHistory from 'components/trade-history'
import Wallet from 'components/wallet'
import PlaceOrder from 'components/place-order'

import { generateBookData } from 'components/order-book/demo'
import { generateTradesData } from 'components/trade-history/demo'
import { demoChartData } from 'components/chart/demo'
import { demoOpenOrderData } from 'components/open-orders/demo'
import { demoOrderHistoryData } from 'components/order-history/demo'
import { demoAssetsData } from 'components/assets/demo'

import {
  Main,
  MainWrapper,
  WalletSection,
  TradeSection,
  ChartSection,
  OrderBookSection,
  TradeHistorySection,
  OrdersSection,
  AssetsSection
} from './main-layout.css'

const Chart = dynamic(() => import('../chart'), { ssr: false })

const DEMO_SELL_DATA = generateBookData(1.3766, 0.0001)
const DEMO_BUY_DATA = generateBookData(1.3764, -0.0001)
const DEMO_TRADES_DATA = generateTradesData(1.3766, 0.0001)

const DEMO_CHART_DATA = demoChartData
const DEMO_BID_ASK_PRICE = { bid: 191.26, ask: 192.68 }
const DEMO_VOLUME_AMOUNT = '650M'
const DEMO_SELECTED_PAIR = ['FAME', 'ALGO']
const DEMO_DAILY_CHANGE_PERCENT = 5.26
const DEMO_OHLC = { open: 185.6423, high: 209.6563, low: 159.3689, close: 171.6985 }

const DEMO_WALLETS = [
  { id: 'wallet-01', name: 'Main', balance: 812569.2658 },
  { id: 'wallet-02', name: 'Trading', balance: 63125.7856 },
  { id: 'wallet-03', name: 'Stablecoins', balance: 1078.9265 }
]

const DEMO_OPEN_ORDER_DATA = demoOpenOrderData
const DEMO_ORDER_HISTORY_DATA = demoOrderHistoryData
const DEMO_ASSETS_DATA = demoAssetsData

export default function MainLayout() {
  return (
    <MainWrapper>
      <Main>
        <MobileInterface />
        <WalletSection>
          <Wallet
            wallets={DEMO_WALLETS}
            activeWalletId={DEMO_WALLETS[0].id}
            onWalletClick={() => null}
          />
        </WalletSection>
        <TradeSection>
          <PlaceOrder activeWallet={DEMO_WALLETS[0]} asset="FAME" />
        </TradeSection>
        <ChartSection>
          <Chart
            priceData={DEMO_CHART_DATA}
            bidAndAsk={DEMO_BID_ASK_PRICE}
            volume={DEMO_VOLUME_AMOUNT}
            pair={DEMO_SELECTED_PAIR}
            dailyChange={DEMO_DAILY_CHANGE_PERCENT}
            ohlc={DEMO_OHLC}
          />
        </ChartSection>
        <OrderBookSection>
          <OrderBook
            assetName="FAME"
            currentPrice={1.3765}
            priceChange={-0.0001}
            sellData={DEMO_SELL_DATA}
            buyData={DEMO_BUY_DATA}
          />
        </OrderBookSection>
        <TradeHistorySection>
          <TradeHistory assetName="FAME" tradesData={DEMO_TRADES_DATA} />
        </TradeHistorySection>
        <OrdersSection>
          <Orders
            openOrderData={DEMO_OPEN_ORDER_DATA}
            orderHistoryData={DEMO_ORDER_HISTORY_DATA}
            assetData={DEMO_ASSETS_DATA}
          />
        </OrdersSection>
        <AssetsSection>
          <p className="demo">Assets search</p>
        </AssetsSection>
      </Main>
    </MainWrapper>
  )
}
