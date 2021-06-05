import { BodyCopySm, BodyCopyTiny } from 'components/type'
import PropTypes from 'prop-types'
import dayjs from 'dayjs'
import {
  CancelButton,
  EmptyState,
  Header,
  WrapperContainer,
  Container,
  OrderRow,
  SmallButton,
  OrderWrapper,
  DateContainer,
  SecondaryToken
} from './open-orders.css'

function OpenOrders({ openOrders }) {
  const renderOpenOrders = (orders) =>
    orders.map((order, index) => {
      const total = order.price * order.amount
      return (
        <OrderRow key={`order-${order.price}=${index}`} data-testid="open-order-row">
          <DateContainer>
            <BodyCopyTiny color="gray.100" m={0}>
              {dayjs(order.date).format('HH:mm:ss')}
            </BodyCopyTiny>
            <BodyCopyTiny color="gray.500" m={0}>
              {dayjs(order.date).format('D-MM-YY')}
            </BodyCopyTiny>
          </DateContainer>
          <BodyCopySm color="gray.000" my={2}>
            {`${order.pair[0]}`}
            <SecondaryToken>{`/${order.pair[1]}`}</SecondaryToken>
          </BodyCopySm>
          <BodyCopySm
            color={order.type === 'sell' ? 'red.500' : 'green.500'}
            textAlign="left"
            my={2}
            textTransform="uppercase"
          >
            {order.type}
          </BodyCopySm>
          <BodyCopySm color="gray.000" textAlign="right" my={2}>
            {`${order.price}`}
            <SecondaryToken>{`${order.pair[1]}`}</SecondaryToken>
          </BodyCopySm>
          <BodyCopySm color="gray.000" textAlign="right" my={2}>
            {order.amount}
          </BodyCopySm>
          <BodyCopySm color="gray.000" textAlign="right" my={2}>
            {`${order.filled}%`}
          </BodyCopySm>
          <BodyCopySm color="gray.000" textAlign="right" my={2}>
            {total}
          </BodyCopySm>
          <SmallButton variant="outline">Cancel</SmallButton>
        </OrderRow>
      )
    })

  return (
    <Container data-testid="open-orders">
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
      <WrapperContainer>
        {openOrders.length ? (
          <OrderWrapper>{renderOpenOrders(openOrders)}</OrderWrapper>
        ) : (
          <EmptyState data-testid="empty-state">
            <BodyCopySm color="gray.500">You have no open orders.</BodyCopySm>
          </EmptyState>
        )}
      </WrapperContainer>
    </Container>
  )
}

export default OpenOrders

OpenOrders.propTypes = {
  openOrders: PropTypes.array.isRequired
}
OpenOrders.defaultProps = {
  openOrders: []
}
