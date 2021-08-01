/* eslint-disable react/prop-types  */
import { useMemo } from 'react'
import { useQuery } from 'react-query'
import { BodyCopyTiny, BodyCopySm } from 'components/type'
import OrdersTable from 'components/orders-table'
import { mapOpenOrdersData } from './helpers'
import { fetchOpenOrdersByAddress } from 'lib/api'
import useStore from 'store/use-store'
import {
  OrderDate,
  OrderPrice,
  OrderPair,
  OrderType,
  OrderRole,
  OrderAmount,
  CancelOrder,
  CancelButton,
  StatusContainer,
  TableWrapper,
  OpenOrdersContainer
} from './open-orders.css'

const OrderDateCell = ({ value }) => <OrderDate>{value}</OrderDate>

const OrderPriceCell = ({ value }) => <OrderPrice>{value}</OrderPrice>

const OrderPairCell = ({ value }) => <OrderPair>{value}</OrderPair>

const OrderTypeCell = ({ value }) => <OrderType value={value}>{value}</OrderType>

const OrderRoleCell = ({ value }) => <OrderRole value={value}>{value}</OrderRole>

const OrderAmountCell = ({ value }) => <OrderAmount>{value}</OrderAmount>

const CancelOrderCell = () => (
  <CancelOrder>
    <CancelButton>x</CancelButton>
  </CancelOrder>
)

function OpenOrders() {
  const activeWalletAddress = useStore((state) => state.activeWalletAddress)

  const { data, isLoading, isError } = useQuery(
    'openOrders',
    () => fetchOpenOrdersByAddress(activeWalletAddress),
    { refetchInterval: 1000 }
  )

  const openOrdersData = useMemo(() => mapOpenOrdersData(data), [data])

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
        Header: 'Role',
        accessor: 'role',
        Cell: OrderRoleCell
      },
      {
        Header: '',
        accessor: 'cancel',
        Cell: CancelOrderCell,
        disableSortBy: true
      }
    ],
    []
  )

  const renderStatus = () => {
    if (!isLoading && !isError) {
      return null
    }
    return (
      <StatusContainer>
        {isLoading && <BodyCopyTiny color="gray.600">Loading&hellip;</BodyCopyTiny>}
        {isError && <BodyCopySm color="gray.400">Something went wrong.</BodyCopySm>}
      </StatusContainer>
    )
  }

  return (
    <OpenOrdersContainer>
      <TableWrapper>
        <OrdersTable columns={columns} data={openOrdersData || []} />
      </TableWrapper>

      {renderStatus()}
    </OpenOrdersContainer>
  )
}

export default OpenOrders
