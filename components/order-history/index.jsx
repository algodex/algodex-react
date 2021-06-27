/* eslint-disable react/prop-types, react/jsx-key  */
import { useMemo } from 'react'
import dayjs from 'dayjs'
// import { useQuery } from 'react-query'
import { BodyCopyTiny, BodyCopySm } from 'components/type'
import OrdersTable from 'components/orders-table'
import { orderHistoryData } from 'components/utils/order-history'
import {
  OrderDate,
  OrderPrice,
  OrderPair,
  OrderSide,
  OrderRole,
  OrderAmount,
  OrderExecuted,
  OrderTotal,
  StatusContainer,
  TableWrapper,
  OrderHistoryContainer
} from './order-history.css'

const OrderDateCell = ({ value }) => <OrderDate>{value}</OrderDate>

const OrderPairCell = ({ value }) => <OrderPair>{value}</OrderPair>

const OrderSideCell = ({ value }) => <OrderSide value={value}>{value}</OrderSide>

const OrderRoleCell = ({ value }) => <OrderRole value={value}>{value}</OrderRole>

const OrderPriceCell = ({ value }) => <OrderPrice>{value}</OrderPrice>

const OrderAmountCell = ({ value }) => <OrderAmount>{value}</OrderAmount>

const OrderExecutedCell = ({ value }) => <OrderExecuted>{value}</OrderExecuted>

const OrderTotalCell = ({ value }) => <OrderTotal>{value}</OrderTotal>

function OrderHistory({ orderHistory }) {
  // const { status, data, error } = useQuery('openOrders', fetchOpenOrders)

  const error = {}

  const columns = useMemo(
    () => [
      {
        Header: 'Date',
        accessor: 'date',
        Cell: OrderDateCell
      },
      {
        Header: 'Pair',
        accessor: 'pair',
        Cell: OrderPairCell
      },
      {
        Header: 'Side',
        accessor: 'side',
        Cell: OrderSideCell
      },

      {
        Header: 'Price (ALGO)',
        accessor: 'price',
        Cell: OrderPriceCell
      },
      {
        Header: 'Amount',
        accessor: 'amount',
        Cell: OrderAmountCell
      },
      {
        Header: 'Executed',
        accessor: 'executed',
        Cell: OrderExecutedCell
      },
      {
        Header: 'Total',
        accessor: 'total',
        Cell: OrderTotalCell
      },
      {
        Header: 'Role',
        accessor: 'role',
        Cell: OrderRoleCell
      }
    ],
    []
  )

  const data = useMemo(() => orderHistoryData, [])

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
    <OrderHistoryContainer>
      <TableWrapper>
        <OrdersTable columns={columns} data={data} />
      </TableWrapper>

      {renderStatus()}
    </OrderHistoryContainer>
  )
}

export default OrderHistory
