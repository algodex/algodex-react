import PropTypes from 'prop-types'
import { Container } from './mobile-orders-table.css'
import Order from 'components/mobile-order'

function MobileOrdersTable({ data }) {
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
          status="OPEN"
        />
      ))}
    </Container>
  )
}

export default MobileOrdersTable

MobileOrdersTable.propTypes = {}
MobileOrdersTable.defaultProps = {}
