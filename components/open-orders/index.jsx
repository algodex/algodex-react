/* eslint-disable react/prop-types  */
import OrdersTable from 'components/orders-table'
// import { useQuery } from 'react-query'
import { BodyCopySm, BodyCopyTiny } from 'components/type'
import { openOrdersColumns, openOrdersData } from 'components/utils/open-orders'
import { useMemo } from 'react'
import { OpenOrdersContainer, StatusContainer, TableWrapper } from './open-orders.css'

function OpenOrders({ openOrders }) {
  // const { status, data, error } = useQuery('openOrders', fetchOpenOrders)
  const status = 'success' // remove - demo only
  const error = {}

  const columns = useMemo(() => openOrdersColumns, [])

  const data = useMemo(() => openOrdersData, [])

  const renderStatus = () => {
    if (status === 'success') {
      return null
    }
    return (
      <StatusContainer>
        {status === 'loading' && <BodyCopyTiny color="gray.600">Loading&hellip;</BodyCopyTiny>}
        {status === 'error' && <BodyCopySm color="gray.400">Error: {error.message}</BodyCopySm>}
      </StatusContainer>
    )
  }

  return (
    <OpenOrdersContainer>
      <TableWrapper>
        <OrdersTable columns={columns} data={data} />
      </TableWrapper>

      {renderStatus()}
    </OpenOrdersContainer>
  )
}

export default OpenOrders
