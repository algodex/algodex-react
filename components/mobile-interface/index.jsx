import { useState } from 'react'
import Chart from 'components/chart'
import BottomNav from 'components/mobile-bottom-nav'
import Orders from 'components/mobile-orders'
import OrderBook from 'components/order-book'
import PlaceOrder from 'components/place-order'
import TradeHistory from 'components/trade-history'
import Wallet from 'components/wallet'
import useStore, { mobileTabs } from 'store/use-store'
import {
  BookContainer,
  ChartContainer,
  Container,
  HistoryContainer,
  OrdersContainer,
  TradeContainer,
  Wrapper,
  PlaceOrderTabs,
  TabItem
} from './mobile-interface.css'
import { BodyCopy } from 'components/type'

const TypeContainer = styled.div`
  padding: 15vh 2rem 0;
  text-align: center;
`

const LogoContainer = styled.div`
  padding: 4rem;
`

export default function MobileInterface() {
  const [activeTradeTab, setActiveTradeTab] = useState('PLACE_ORDER')
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
          <PlaceOrderTabs>
            <TabItem
              isActive={activeTradeTab === 'PLACE_ORDER'}
              onClick={() => setActiveTradeTab('PLACE_ORDER')}
            >
              <BodyCopy textTransform="uppercase">Place Order</BodyCopy>
            </TabItem>
            <TabItem
              isActive={activeTradeTab === 'WALLET'}
              onClick={() => setActiveTradeTab('WALLET')}
            >
              <BodyCopy textTransform="uppercase">Wallet</BodyCopy>
            </TabItem>
          </PlaceOrderTabs>
          {activeTradeTab === 'PLACE_ORDER' && <PlaceOrder />}
          {activeTradeTab === 'WALLET' && <Wallet />}
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
