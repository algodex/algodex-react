/* eslint-disable react/prop-types  */
import { useMemo } from 'react'
import dayjs from 'dayjs'
// import { useQuery } from 'react-query'
import { BodyCopyTiny, BodyCopySm } from 'components/type'
import OrdersTable from 'components/orders-table'
import {
  OrderDate,
  OrderPrice,
  OrderPair,
  OrderType,
  OrderRole,
  OrderAmount,
  OrderFilled,
  OrderTotal,
  StatusContainer,
  TableWrapper,
  OpenOrdersContainer
} from './open-orders.css'
import { openOrdersColumns, openOrdersData } from 'components/utils/open-orders'

function OpenOrders({ openOrders }) {
  // const { status, data, error } = useQuery('openOrders', fetchOpenOrders)

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
