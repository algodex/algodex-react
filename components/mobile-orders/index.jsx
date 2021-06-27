import PropTypes from 'prop-types'
import {
  Container,
  OrderTabContainer,
  PanelWrapper,
  TabItem,
  OpenOrdersContainer,
  OrderHistoryContainer,
  AssetsContainer
} from './mobile-orders.css'
import OpenOrders from 'components/mobile-open-orders'
import OrderHistory from 'components/mobile-order-history'
import Assets from 'components/mobile-assets'
import { BodyCopySm } from 'components/type'
import { useState } from 'react'

const orderTabs = {
  OPEN_ORDERS: 'OPEN_ORDERS',
  ORDER_HISTORY: 'ORDER_HISTORY',
  ASSETS: 'ASSETS'
}

function MobileOrders(props) {
  const [activeTab, setActiveTab] = useState(orderTabs.OPEN_ORDERS)

  const orderHistoryActive = activeTab === orderTabs.ORDER_HISTORY
  const openOrdersActive = activeTab === orderTabs.OPEN_ORDERS
  const assetsActive = activeTab === orderTabs.ASSETS
  return (
    <Container>
      <OrderTabContainer>
        <TabItem isActive={openOrdersActive} onClick={() => setActiveTab(orderTabs.OPEN_ORDERS)}>
          <BodyCopySm color="gray.100" textTransform="uppercase">
            Open
          </BodyCopySm>
        </TabItem>
        <TabItem
          isActive={orderHistoryActive}
          onClick={() => setActiveTab(orderTabs.ORDER_HISTORY)}
        >
          <BodyCopySm color="gray.100" textTransform="uppercase">
            History
          </BodyCopySm>
        </TabItem>
        <TabItem isActive={assetsActive} onClick={() => setActiveTab(orderTabs.ASSETS)}>
          <BodyCopySm color="gray.100" textTransform="uppercase">
            Assets
          </BodyCopySm>
        </TabItem>
      </OrderTabContainer>
      <PanelWrapper>
        <OpenOrdersContainer isActive={openOrdersActive}>
          <OpenOrders />
        </OpenOrdersContainer>
        <OrderHistoryContainer isActive={orderHistoryActive}>
          <OrderHistory />
        </OrderHistoryContainer>
        <AssetsContainer isActive={assetsActive}>
          <Assets />
        </AssetsContainer>
      </PanelWrapper>
    </Container>
  )
}

export default MobileOrders

MobileOrders.propTypes = {}
MobileOrders.defaultProps = {}
