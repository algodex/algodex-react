import OpenOrders from 'components/open-orders'
import OrderHistory from 'components/order-history'
import Assets from 'components/assets'
import { Tab, Header, Container } from './orders.css'
import { useState } from 'react'

function Orders() {
  // 'open-orders', 'order-history', 'assets'
  const [currentTab, setCurrentTab] = useState('open-orders')

  const renderCurrentTab = (tab) => {
    switch (tab) {
      case 'open-orders':
        return <OpenOrders />
      case 'order-history':
        return <OrderHistory />
      case 'assets':
        return <Assets />
      default:
        return null
    }
  }
  return (
    <Container>
      <Header>
        <Tab isActive={currentTab === 'open-orders'} onClick={() => setCurrentTab('open-orders')}>
          Open Orders
        </Tab>
        <Tab
          isActive={currentTab === 'order-history'}
          onClick={() => setCurrentTab('order-history')}
        >
          Order History
        </Tab>
        <Tab isActive={currentTab === 'assets'} onClick={() => setCurrentTab('assets')}>
          Assets
        </Tab>
      </Header>
      {renderCurrentTab(currentTab)}
    </Container>
  )
}

export default Orders

Orders.propTypes = {}
Orders.defaultProps = {}
