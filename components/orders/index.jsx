import OpenOrders from 'components/open-orders'
import OrderHistory from 'components/order-history'
import PropTypes from 'prop-types'
import Assets from 'components/assets'
import { Tab, Header, Container } from './orders.css'
import { useState } from 'react'

function Orders({ initialPanel, openOrderData, orderHistoryData, assetsData }) {
  // 'open-orders', 'order-history', 'assets'
  const [selectedPanel, setSelectedPanel] = useState(initialPanel)

  const OPEN_ORDERS_PANEL = 'open-orders'
  const ORDER_HISTORY_PANEL = 'order-history'
  const ASSETS_PANEL = 'assets'

  const renderPanel = (panelName) => {
    switch (panelName) {
      case OPEN_ORDERS_PANEL:
        return <OpenOrders openOrders={openOrderData} />
      case ORDER_HISTORY_PANEL:
        return <OrderHistory orderHistory={orderHistoryData} />
      case ASSETS_PANEL:
        return <Assets assets={assetsData} />
      default:
        return null
    }
  }

  return (
    <Container>
      <Header>
        <Tab
          isActive={selectedPanel === OPEN_ORDERS_PANEL}
          onClick={() => setSelectedPanel(OPEN_ORDERS_PANEL)}
        >
          Open Orders
        </Tab>
        <Tab
          isActive={selectedPanel === ORDER_HISTORY_PANEL}
          onClick={() => setSelectedPanel(ORDER_HISTORY_PANEL)}
        >
          Order History
        </Tab>
        <Tab
          isActive={selectedPanel === ASSETS_PANEL}
          onClick={() => setSelectedPanel(ASSETS_PANEL)}
        >
          Assets
        </Tab>
      </Header>
      {renderPanel(selectedPanel)}
    </Container>
  )
}

export default Orders

Orders.propTypes = {
  initialPanel: PropTypes.string,
  openOrderData: PropTypes.array.isRequired,
  orderHistoryData: PropTypes.array.isRequired,
  assetsData: PropTypes.array.isRequired
}
Orders.defaultProps = {
  initialPanel: 'open-orders',
  openOrderData: [],
  orderHistoryData: [],
  assetsData: []
}
