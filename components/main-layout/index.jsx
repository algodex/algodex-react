import MobileInterface from 'components/mobile-interface'
import OrderBook from 'components/order-book'
import Orders from 'components/orders'
import TradeHistory from 'components/trade-history'
import Wallet from 'components/wallet'

import { generateBookData } from 'components/order-book/demo'
import { generateTradesData } from 'components/trade-history/demo'

import {
  Main,
  WalletSection,
  TradeSection,
  ChartSection,
  OrderBookSection,
  TradeHistorySection,
  OrdersSection,
  AssetsSection
} from './main-layout.css'

const DEMO_SELL_DATA = generateBookData(1.3766, 0.0001)
const DEMO_BUY_DATA = generateBookData(1.3764, -0.0001)
const DEMO_TRADES_DATA = generateTradesData(1.3766, 0.0001)

const DEMO_WALLETS = [
  { id: 'wallet-01', name: 'Main', balance: 812569.2658 },
  { id: 'wallet-02', name: 'Trading', balance: 63125.7856 },
  { id: 'wallet-03', name: 'Stablecoins', balance: 1078.9265 }
]

export default function MainLayout() {
  return (
    <Main>
      <MobileInterface />
      <WalletSection>
        <Wallet wallets={DEMO_WALLETS} activeWalletId={DEMO_WALLETS[0].id} />
      </WalletSection>
      <TradeSection>
        <p className="demo">Trade</p>
      </TradeSection>
      <ChartSection>
        <p className="demo">Chart</p>
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
        <Orders />
      </OrdersSection>
      <AssetsSection>
        <p className="demo">Assets search</p>
      </AssetsSection>
    </Main>
  )
}
