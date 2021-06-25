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
import Orders from 'components/mobile-orders'

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
          <BodyCopyLg color="gray.100">Book</BodyCopyLg>
        </BookContainer>
        <TradeContainer isActive={activeMobileTab === mobileTabs.TRADE}>
          <BodyCopyLg color="gray.100">Trade</BodyCopyLg>
        </TradeContainer>
        <OrdersContainer isActive={activeMobileTab === mobileTabs.ORDERS}>
          <Orders />
        </OrdersContainer>
        <HistoryContainer isActive={activeMobileTab === mobileTabs.HISTORY}>
          <BodyCopyLg color="gray.100">History</BodyCopyLg>
        </HistoryContainer>
      </Wrapper>
      <BottomNav />
    </Container>
  )
}
