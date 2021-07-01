import Assets from 'components/mobile-assets'
import OpenOrders from 'components/mobile-open-orders'
import OrderHistory from 'components/mobile-order-history'
import { BodyCopySm } from 'components/type'
import { openOrdersData } from 'components/utils/open-orders'
import { orderHistoryData } from 'components/utils/order-history'
import { useState } from 'react'
import { assetBalances } from '../utils/asset-balances'
import {
  AssetsContainer,
  Container,
  OpenOrdersContainer,
  OrderHistoryContainer,
  OrderTabContainer,
  PanelWrapper,
  TabItem
} from './mobile-orders.css'

const orderTabs = {
  OPEN_ORDERS: 'OPEN_ORDERS',
  ORDER_HISTORY: 'ORDER_HISTORY',
  ASSETS: 'ASSETS'
}

function MobileOrders() {
  const [activeTab, setActiveTab] = useState(orderTabs.OPEN_ORDERS)
  const orderHistoryActive = activeTab === orderTabs.ORDER_HISTORY
  const openOrdersActive = activeTab === orderTabs.OPEN_ORDERS
  const assetsActive = activeTab === orderTabs.ASSETS
  return (
    <Container>
      <OrderTabContainer data-testid="tab-container">
        <TabItem isActive={openOrdersActive} onClick={() => setActiveTab(orderTabs.OPEN_ORDERS)}>
          <BodyCopySm textTransform="uppercase">Open</BodyCopySm>
        </TabItem>
        <TabItem
          isActive={orderHistoryActive}
          onClick={() => setActiveTab(orderTabs.ORDER_HISTORY)}
        >
          <BodyCopySm textTransform="uppercase">History</BodyCopySm>
        </TabItem>
        <TabItem isActive={assetsActive} onClick={() => setActiveTab(orderTabs.ASSETS)}>
          <BodyCopySm textTransform="uppercase">Assets</BodyCopySm>
        </TabItem>
      </OrderTabContainer>
      <PanelWrapper>
        <OpenOrdersContainer isActive={openOrdersActive} data-testid="open-orders">
          <OpenOrders data={openOrdersData} />
        </OpenOrdersContainer>
        <OrderHistoryContainer isActive={orderHistoryActive} data-testid="order-history">
          <OrderHistory data={orderHistoryData} />
        </OrderHistoryContainer>
        <AssetsContainer isActive={assetsActive} data-testid="assets">
          <Assets data={assetBalances} />
        </AssetsContainer>
      </PanelWrapper>
    </Container>
  )
}

export default MobileOrders
