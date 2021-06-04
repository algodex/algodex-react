import PropTypes from 'prop-types'
import {
  Container,
  Header,
  OrderWrapper,
  OrderRow,
  WrapperContainer,
  EmptyState
} from './order-history.css'
import { tradeHistory } from 'data/test-data'
import styled from 'styled-components'
import { BodyCopyTiny, BodyCopySm } from 'components/type'
import dayjs from 'dayjs'

const DateCointainer = styled.div`
  display: flex;
  flex: 1 1 0%;
  flex-direction: column;
`

const PrimaryToken = styled.span`
  color: ${({ theme }) => theme.colors.gray[500]};
`

function OrderHistory(props) {
  const renderOrderHistory = (orders) =>
    orders.map((order) => (
      <OrderRow key={`${order.date}-${order.filled}`}>
        <DateCointainer>
          <BodyCopyTiny color="gray.100" m={0}>
            {dayjs(order.date).format('HH:mm:ss')}
          </BodyCopyTiny>
          <BodyCopyTiny color="gray.500" m={0}>
            {dayjs(order.date).format('D-MM-YY')}
          </BodyCopyTiny>
        </DateCointainer>
        <BodyCopySm color="gray.100">
          {order.pair[0]}
          <PrimaryToken>{`/${order.pair[1]}`}</PrimaryToken>
        </BodyCopySm>
        <BodyCopySm
          color={order.side === 'buy' ? 'green.500' : 'red.500'}
          textTransform="uppercase"
        >
          {order.side}
        </BodyCopySm>
        <BodyCopySm color="gray.100" textAlign="right">
          {order.price}
          <PrimaryToken>{`${order.pair[1]}`}</PrimaryToken>
        </BodyCopySm>
        <BodyCopySm color="gray.100" textAlign="right">
          {order.amount}
        </BodyCopySm>
        <BodyCopySm color="gray.100" textAlign="right">
          {order.executed}
        </BodyCopySm>
        <BodyCopySm color="gray.100" textAlign="right">
          {(order.executed * order.price).toFixed(4)}
        </BodyCopySm>
      </OrderRow>
    ))
  return (
    <Container>
      <Header>
        <BodyCopyTiny color="gray.500">Date</BodyCopyTiny>
        <BodyCopyTiny color="gray.500">Pair</BodyCopyTiny>
        <BodyCopyTiny color="gray.500">Side</BodyCopyTiny>
        <BodyCopyTiny color="gray.500" textAlign="right">
          Price
        </BodyCopyTiny>
        <BodyCopyTiny color="gray.500" textAlign="right">
          Amount
        </BodyCopyTiny>
        <BodyCopyTiny color="gray.500" textAlign="right">
          Executed
        </BodyCopyTiny>
        <BodyCopyTiny color="gray.500" textAlign="right">
          Total
        </BodyCopyTiny>
      </Header>
      <WrapperContainer>
        {tradeHistory.length ? (
          <OrderWrapper>{renderOrderHistory(tradeHistory)}</OrderWrapper>
        ) : (
          <EmptyState>
            <BodyCopySm color="gray.500">You have no order history.</BodyCopySm>
          </EmptyState>
        )}
      </WrapperContainer>
    </Container>
  )
}

export default OrderHistory

OrderHistory.propTypes = {}
OrderHistory.defaultProps = {}
