import PropTypes from 'prop-types'
import { Container } from './mobile-order-history.css'
import { BodyCopySm } from 'components/type'
import OrderHistoryTable from 'components/mobile-order-history-table'

function MobileOrderHistory({ data }) {
  if (!data.length) {
    return (
      <Container>
        <BodyCopySm color="gray.500">You have no order history.</BodyCopySm>
      </Container>
    )
  }
  return (
    <Container>
      <OrderHistoryTable data={data} />
    </Container>
  )
}
export default MobileOrderHistory

MobileOrderHistory.propTypes = {
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
