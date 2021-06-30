import PropTypes from 'prop-types'
import { Container } from './mobile-open-orders-table.css'
import Order from 'components/mobile-order'

function MobileOpenOrdersTable({ data }) {
  return (
    <Container data-testid="open-orders-table">
      {
        // eslint-disable-next-line
        data?.map((order) => (
          <Order key={`${order.pair}-${order.date}`} order={order} status="OPEN" />
        ))
      }
    </Container>
  )
}

export default MobileOpenOrdersTable

MobileOpenOrdersTable.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      date: PropTypes.string.isRequired,
      price: PropTypes.number.isRequired,
      pair: PropTypes.arrayOf(PropTypes.string),
      type: PropTypes.string.isRequired,
      role: PropTypes.string.isRequired,
      amount: PropTypes.number.isRequired,
      filled: PropTypes.number.isRequired,
      total: PropTypes.number.isRequired
    })
  )
}
