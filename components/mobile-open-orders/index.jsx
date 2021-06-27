import PropTypes from 'prop-types'
import { useMemo } from 'react'
import { Container } from './mobile-open-orders.css'
import MobileOpenOrdersTable from 'components/mobile-orders-table'
import { openOrdersData } from 'components/utils/open-orders'
import { BodyCopySm } from 'components/type'
function MobileOpenOrders(props) {
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

MobileOpenOrders.propTypes = {}
MobileOpenOrders.defaultProps = {}
