import PropTypes from 'prop-types'
import { Container } from './mobile-order-history.css'
import { BodyCopySm } from 'components/type'
import { orderHistoryData } from 'components/utils/order-history'
import { useMemo } from 'react'
import OrderHistoryTable from 'components/mobile-order-history-table'

function MobileOrderHistory(props) {
  if (!orderHistoryData.length) {
    return (
      <Container>
        <BodyCopySm color="gray.500">You have no order history.</BodyCopySm>
      </Container>
    )
  }
  return (
    <Container>
      <OrderHistoryTable data={orderHistoryData} />
    </Container>
  )
}
export default MobileOrderHistory

MobileOrderHistory.propTypes = {}
MobileOrderHistory.defaultProps = {}
