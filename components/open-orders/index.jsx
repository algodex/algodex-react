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
  OrderAmount,
  OrderFilled,
  OrderTotal,
  StatusContainer,
  TableWrapper,
  OpenOrdersContainer
} from './open-orders.css'

const OrderDateCell = ({ value }) => <OrderDate>{value}</OrderDate>

const OrderPriceCell = ({ value }) => <OrderPrice>{value}</OrderPrice>

const OrderPairCell = ({ value }) => <OrderPair>{value}</OrderPair>

const OrderTypeCell = ({ value }) => <OrderType value={value}>{value}</OrderType>

const OrderAmountCell = ({ value }) => <OrderAmount>{value}</OrderAmount>

const OrderFilledCell = ({ value }) => <OrderFilled>{value}</OrderFilled>

const OrderTotalCell = ({ value }) => <OrderTotal>{value}</OrderTotal>

function OpenOrders({ openOrders }) {
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
        Header: 'Price (ALGO)',
        accessor: 'price',
        Cell: OrderPriceCell
      },
      {
        Header: 'Type',
        accessor: 'type',
        Cell: OrderTypeCell
      },
      {
        Header: 'Amount',
        accessor: 'amount',
        Cell: OrderAmountCell
      },
      {
        Header: 'Filled',
        accessor: 'filled',
        Cell: OrderFilledCell
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
        type: 'BUY',
        amount: '1000',
        filled: '125',
        total: '458'
      },
      {
        date: dayjs(1624296854921).format('YYYY-MM-DD HH:mm:ss'),
        price: '0.501',
        pair: 'MCAU/ALGO',
        type: 'SELL',
        amount: '9000',
        filled: '3000',
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
    <OpenOrdersContainer>
      <TableWrapper>
        <OrdersTable columns={columns} data={data} />
      </TableWrapper>

      {renderStatus()}
    </OpenOrdersContainer>
  )
}

export default OpenOrders
