/* eslint-disable react/prop-types, react/jsx-key  */
import { useMemo } from 'react'
import dayjs from 'dayjs'
// import { useQuery } from 'react-query'
import { BodyCopyTiny, BodyCopySm } from 'components/type'
import OrdersTable from 'components/orders-table'

import {
  OrderDate,
  OrderPrice,
  OrderPair,
  OrderSide,
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
      }
    ],
    []
  )

  const data = useMemo(
    () => [
      {
        date: dayjs(1624296854921).format('YYYY-MM-DD HH:mm:ss'),
        price: '0.458',
        pair: 'YLDY/ALGO',
        side: 'BUY',
        amount: '1000',
        executed: '125',
        total: '458'
      },
      {
        date: dayjs(1624296854921).format('YYYY-MM-DD HH:mm:ss'),
        price: '0.501',
        pair: 'MCAU/ALGO',
        side: 'SELL',
        amount: '9000',
        executed: '3000',
        total: '4600'
      }
    ],
    []
  )

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
