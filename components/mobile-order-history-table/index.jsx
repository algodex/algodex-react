import PropTypes from 'prop-types'
import { Container } from './mobile-order-history-table.css'
import Order from 'components/mobile-order'

function MobileOrderHistoryTable({ data }) {
  return (
    <Container data-testid="order-history-table">
      {
        // eslint-disable-next-line
        data?.map((order) => (
          <Order key={`${order.pair}-${order.date}`} order={order} />
        ))
      }
    </Container>
  )
}

export default MobileOrderHistoryTable

MobileOrderHistoryTable.propTypes = {
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
