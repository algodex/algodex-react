import Chart from 'components/chart'
import BottomNav from 'components/mobile-bottom-nav'
import Orders from 'components/mobile-orders'
import OrderBook from 'components/order-book'
import PlaceOrder from 'components/place-order'
import TradeHistory from 'components/trade-history'
import useStore, { mobileTabs } from 'store/use-store'
import {
  BookContainer,
  ChartContainer,
  Container,
  HistoryContainer,
  OrdersContainer,
  TradeContainer,
  Wrapper
} from './mobile-interface.css'

export default function MobileInterface() {
  const activeMobileTab = useStore((state) => state.activeMobileTab)
  return (
    <Container>
      <Wrapper>
        <ChartContainer isActive={activeMobileTab === mobileTabs.CHART}>
          <Chart />
        </ChartContainer>
        <BookContainer isActive={activeMobileTab === mobileTabs.BOOK}>
          <OrderBook />
        </BookContainer>
        <TradeContainer isActive={activeMobileTab === mobileTabs.TRADE}>
          <PlaceOrder />
        </TradeContainer>
        <OrdersContainer isActive={activeMobileTab === mobileTabs.ORDERS}>
          <Orders />
        </OrdersContainer>
        <HistoryContainer isActive={activeMobileTab === mobileTabs.HISTORY}>
          <TradeHistory />
        </HistoryContainer>
      </Wrapper>
      <BottomNav />
    </Container>
  )
}
