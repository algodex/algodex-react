import { BodyCopySm, BodyCopyTiny } from 'components/type'
import { openOrders } from 'data/test-data'
import dayjs from 'dayjs'
import styled from 'styled-components'
import {
  CancelButton,
  EmptyState,
  Header,
  OpenOrdersContainer,
  OrderContainer,
  OrderRow,
  SmallButton,
  OrderWrapper,
  DateContainer,
  SecondaryToken
} from './open-orders.css'

function OpenOrders(props) {
  const renderOpenOrders = (orders) =>
    orders.map((order, index) => {
      const total = order.price * order.amount
      return (
        <OrderRow key={`order-${order.price}=${index}`}>
          <DateContainer>
            <BodyCopyTiny color="gray.100" m={0}>
              {dayjs(order.date).format('HH:mm:ss')}
            </BodyCopyTiny>
            <BodyCopyTiny color="gray.500" m={0}>
              {dayjs(order.date).format('D-MM-YY')}
            </BodyCopyTiny>
          </DateContainer>
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
            <SecondaryToken>{`${order.pair[1]}`}</SecondaryToken>
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
          <SmallButton variant="outline">Cancel</SmallButton>
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
        <OpenOrdersContainer>
          <OrderWrapper>{renderOpenOrders(openOrders)}</OrderWrapper>
        </OpenOrdersContainer>
      ) : (
        <EmptyState>You have no open orders.</EmptyState>
      )}
    </OrderContainer>
  )
}

export default OpenOrders

OpenOrders.propTypes = {}
OpenOrders.defaultProps = {}
