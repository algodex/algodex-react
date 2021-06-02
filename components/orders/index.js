import NavItem from 'components/nav-item'
import OrderRow from 'components/order-row'
import TradeHistoryRow from 'components/trade-history-row'
import TableHeader from 'components/table-header'
import { assets, openOrders, tradeHistory } from 'data/test-data'
import { useState } from 'react'
import { Container, EmptyState, HeaderSection, TableContainer, TableSection } from './orders.css'
function Orders(props) {
  const [activeSection, setActiveSection] = useState('orders')

  return (
    <Container>
      <HeaderSection>
        <div onClick={() => setActiveSection('orders')}>
          <NavItem isActive={activeSection === 'orders'} border={true}>
            Open Orders
          </NavItem>
        </div>
        <div onClick={() => setActiveSection('history')}>
          <NavItem isActive={activeSection === 'history'} border={true}>
            Trade History
          </NavItem>
        </div>
        <div onClick={() => setActiveSection('assets')}>
          <NavItem isActive={activeSection === 'assets'} border={true}>
            Assets
          </NavItem>
        </div>
      </HeaderSection>
      {/* Orders */}
      {activeSection === 'orders' &&
        (openOrders?.length ? (
          <TableContainer>
            <TableHeader
              headings={['date', 'pair', 'type', 'price', 'amount', 'filled', 'total']}
            />
            <TableSection>
              {openOrders.map((order) => (
                <OrderRow
                  type={order.type}
                  amount={order.amount}
                  filled={order.filled}
                  price={order.price}
                  pair={order.pair}
                  date={order.date}
                />
              ))}
            </TableSection>
          </TableContainer>
        ) : (
          <>
            <TableHeader
              headings={['date', 'pair', 'type', 'price', 'amount', 'filled', 'total']}
            />
            <EmptyState>You have no open orders.</EmptyState>
          </>
        ))}
      {/* Trade History */}
      {activeSection === 'history' &&
        (tradeHistory?.length ? (
          <TableContainer>
            <TableHeader
              headings={['date', 'pair', 'side', 'price', 'executed', 'fee', 'total']}
              columns={7}
            />
            <TableSection columns={7}>
              {tradeHistory.map((order) => (
                <TradeHistoryRow
                  side={order.side}
                  executed={order.executed}
                  fee={order.fee}
                  price={order.price}
                  pair={order.pair}
                  date={order.date}
                />
              ))}
            </TableSection>
          </TableContainer>
        ) : (
          <>
            <TableHeader
              headings={['date', 'pair', 'side', 'price', 'executed', 'fee', 'total']}
              columns={7}
            />
            <EmptyState>You have no trade history.</EmptyState>
          </>
        ))}
      {activeSection === 'assets' &&
        (assets?.length ? (
          <TableContainer>
            <TableHeader
              headings={[
                'coin',
                'total',
                'available',
                'in order',
                'ALGO value',
                'USDC value',
                'PNL'
              ]}
            />
            <TableSection>
              {assets.map((order) => (
                <OrderRow
                  type={order.type}
                  amount={order.amount}
                  filled={order.filled}
                  price={order.price}
                  pair={order.pair}
                  date={order.date}
                />
              ))}
            </TableSection>
          </TableContainer>
        ) : (
          <TableContainer>
            <TableHeader
              columns={7}
              headings={[
                'coin',
                'total',
                'available',
                'in order',
                'ALGO value',
                'USDC value',
                'PNL'
              ]}
            />
            <EmptyState>You have no assets in your wallet.</EmptyState>
          </TableContainer>
        ))}
      ;
    </Container>
  )
}

export default Orders

Orders.propTypes = {}
Orders.defaultProps = {}
