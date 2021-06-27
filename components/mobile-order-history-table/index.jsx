import PropTypes from 'prop-types'
import { Container } from './mobile-order-history-table.css'
import Order from 'components/mobile-order'

function MobileOrderHistoryTable({ data }) {
  console.log(data)
  return (
    <Container>
      {data?.map((order) => (
        <Order
          key={`${order.pair}-${order.date}`}
          pair={order.pair}
          amount={order.amount}
          price={order.price}
          type={order.type}
          filled={order.filled}
          role={order.role}
          date={order.date}
          total={order.total}
        />
      ))}
    </Container>
  )
}

export default MobileOrderHistoryTable

MobileOrderHistoryTable.propTypes = {}
MobileOrderHistoryTable.defaultProps = {}
