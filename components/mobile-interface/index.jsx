import styled from 'styled-components'
import BottomNav from 'components/mobile-bottom-nav'
import {
  Wrapper,
  Container,
  ChartContainer,
  BookContainer,
  TradeContainer,
  OrdersContainer,
  HistoryContainer
} from './mobile-interface.css'
import useStore, { mobileTabs } from 'store/use-store'
import { BodyCopyLg } from 'components/type'
import Chart from 'components/chart'
import OrderBook from 'components/order-book'
import Orders from 'components/mobile-orders'
import TradeHistory from 'components/trade-history'
import PlaceOrder from 'components/place-order'

export default function MobileInterface() {
  const activeMobileTab = useStore((state) => state.activeMobileTab)
  console.log(activeMobileTab)
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
