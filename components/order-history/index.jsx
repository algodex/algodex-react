import PropTypes from 'prop-types'
import { Container, Header, OrderWrapper, OrderRow, WrapperContainer } from './order-history.css'
import { tradeHistory } from 'data/test-data'
import styled from 'styled-components'
import { BodyCopyTiny } from 'components/type'
import dayjs from 'dayjs'

const DateCointainer = styled.div`
  display: flex;
  flex: 1 1 0%;
  flex-direction: column;
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
      </OrderRow>
    ))
  return (
    <Container>
      <Header>
        <BodyCopyTiny color="gray.500">Date</BodyCopyTiny>
        <BodyCopyTiny color="gray.500">Pair</BodyCopyTiny>
        <BodyCopyTiny color="gray.500">Side</BodyCopyTiny>
        <BodyCopyTiny color="gray.500">Price</BodyCopyTiny>
        <BodyCopyTiny color="gray.500">Amount</BodyCopyTiny>
        <BodyCopyTiny color="gray.500">Executed</BodyCopyTiny>
        <BodyCopyTiny color="gray.500">Total</BodyCopyTiny>
      </Header>
      <WrapperContainer>
        <OrderWrapper>{renderOrderHistory(tradeHistory)}</OrderWrapper>
      </WrapperContainer>
    </Container>
  )
}

export default OrderHistory

OrderHistory.propTypes = {}
OrderHistory.defaultProps = {}
