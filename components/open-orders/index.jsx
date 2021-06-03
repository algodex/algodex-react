import NavItem from 'components/nav-item'
import { BodyCopySm, BodyCopyTiny } from 'components/type'
import { openOrders } from 'data/test-data'
import { useState } from 'react'
import dayjs from 'dayjs'
import {
  Container,
  EmptyState,
  Header,
  HeaderSection,
  OrderRow,
  OrderWrapper,
  OpenOrders,
  OrderContainer,
  CancelButton
} from './open-orders.css'
import styled from 'styled-components'

const SecondaryToken = styled.span`
  color: ${({ theme }) => theme.colors.gray[500]};
`

const DateCointainer = styled.div`
  display: flex;
  flex: 1 1 0%;
  flex-direction: column;
`
function Orders(props) {
  const [activeSection, setActiveSection] = useState('orders')

  const renderOpenOrders = (orders) =>
    orders.map((order, index) => {
      const total = order.price * order.amount
      return (
        <OrderRow key={`order-${order.price}=${index}`}>
          <DateCointainer>
            <BodyCopyTiny color="gray.100" m={0}>
              {dayjs(order.date).format('HH:mm:ss')}
            </BodyCopyTiny>
            <BodyCopyTiny color="gray.500" m={0}>
              {dayjs(order.date).format('D-MM-YY')}
            </BodyCopyTiny>
          </DateCointainer>
          <BodyCopySm color="gray.000" m={0}>
            {`${order.pair[0]}`}
            <SecondaryToken>{`/${order.pair[1]}`}</SecondaryToken>
          </BodyCopySm>
          <BodyCopySm
            color={order.type === 'sell' ? 'red.500' : 'green.500'}
            textAlign="left"
            m={0}
            textTransform="uppercase"
          >
            {order.type}
          </BodyCopySm>
          <BodyCopySm color="gray.000" textAlign="right" m={0}>
            {`${order.price}`}
            <SecondaryToken>{`/${order.pair[1]}`}</SecondaryToken>
          </BodyCopySm>
          <BodyCopySm color="gray.000" textAlign="right" m={0}>
            {order.amount}
          </BodyCopySm>
          <BodyCopySm color="gray.000" textAlign="right" m={0}>
            {`${order.filled}%`}
          </BodyCopySm>
          <BodyCopySm color="gray.000" textAlign="right" m={0}>
            {total}
          </BodyCopySm>
          <CancelButton>Cancel</CancelButton>
        </OrderRow>
      )
    })

  return (
    <OrderContainer>
      <Header>
        <BodyCopyTiny color="gray.500" textTransform="uppercase">
          Date
        </BodyCopyTiny>
        <BodyCopyTiny color="gray.500" textTransform="uppercase">
          Pair
        </BodyCopyTiny>
        <BodyCopyTiny color="gray.500" textTransform="uppercase">
          Type
        </BodyCopyTiny>
        <BodyCopyTiny color="gray.500" textTransform="uppercase" textAlign="right">
          Price
        </BodyCopyTiny>
        <BodyCopyTiny color="gray.500" textTransform="uppercase" textAlign="right">
          Amount
        </BodyCopyTiny>
        <BodyCopyTiny color="gray.500" textTransform="uppercase" textAlign="right">
          Filled
        </BodyCopyTiny>
        <BodyCopyTiny color="gray.500" textTransform="uppercase" textAlign="right">
          Total
        </BodyCopyTiny>
        <CancelButton>
          <BodyCopyTiny fontWeight="600">Cancel All</BodyCopyTiny>
        </CancelButton>
      </Header>
      {openOrders.length ? (
        <OpenOrders>
          <OrderWrapper>{renderOpenOrders(openOrders)}</OrderWrapper>
        </OpenOrders>
      ) : (
        <EmptyState>You have no open orders.</EmptyState>
      )}
    </OrderContainer>
  )
}

export default Orders

Orders.propTypes = {}
Orders.defaultProps = {}
