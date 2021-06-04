import { BodyCopySm, BodyCopyTiny } from 'components/type'
import { tradeHistory } from 'data/test-data'
import dayjs from 'dayjs'
import {
  Container,
  DateContainer,
  EmptyState,
  Header,
  OrderRow,
  OrderWrapper,
  PrimaryToken,
  WrapperContainer
} from './order-history.css'

function OrderHistory(props) {
  const renderOrderHistory = (orders) =>
    orders.map((order) => (
      <OrderRow key={`${order.date}-${order.filled}`}>
        <DateContainer>
          <BodyCopyTiny color="gray.100" m={0}>
            {dayjs(order.date).format('HH:mm:ss')}
          </BodyCopyTiny>
          <BodyCopyTiny color="gray.500" m={0}>
            {dayjs(order.date).format('D-MM-YY')}
          </BodyCopyTiny>
        </DateContainer>
        <BodyCopySm color="gray.100" my={2}>
          {order.pair[0]}
          <PrimaryToken>{`/${order.pair[1]}`}</PrimaryToken>
        </BodyCopySm>
        <BodyCopySm
          color={order.side === 'buy' ? 'green.500' : 'red.500'}
          textTransform="uppercase"
          my={2}
        >
          {order.side}
        </BodyCopySm>
        <BodyCopySm color="gray.100" textAlign="right" my={2}>
          {order.price}
          <PrimaryToken>{`${order.pair[1]}`}</PrimaryToken>
        </BodyCopySm>
        <BodyCopySm color="gray.100" textAlign="right" my={2}>
          {order.amount}
        </BodyCopySm>
        <BodyCopySm color="gray.100" textAlign="right" my={2}>
          {order.executed}
        </BodyCopySm>
        <BodyCopySm color="gray.100" textAlign="right" my={2}>
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
