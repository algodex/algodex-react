import PropTypes from 'prop-types'
import { useMemo } from 'react'
import { Container } from './mobile-open-orders.css'
import MobileOpenOrdersTable from 'components/mobile-open-orders-table'
import { BodyCopySm } from 'components/type'
function MobileOpenOrders({ data: openOrdersData }) {
  const data = useMemo(() => openOrdersData, [])

  if (!data.length) {
    return (
      <Container>
        <BodyCopySm color="gray.500">You have no open orders.</BodyCopySm>
      </Container>
    )
  }

  return (
    <Container>
      <MobileOpenOrdersTable data={data} />
    </Container>
  )
}

export default MobileOpenOrders

MobileOpenOrders.propTypes = {
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
