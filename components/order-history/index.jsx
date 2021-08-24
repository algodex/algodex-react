/* eslint-disable react/prop-types, react/jsx-key  */
import { useMemo } from 'react'
import { useQuery } from 'react-query'
import { BodyCopyTiny, BodyCopySm } from 'components/type'
import OrdersTable from 'components/orders-table'
import { useStorePersisted } from 'store/use-store'
import { fetchTradeHistoryByAddress } from 'lib/api/fetch'
import { mapTradeHistoryData } from './helpers'

import {
  OrderDate,
  OrderPrice,
  OrderPair,
  OrderSide,
  OrderAmount,
  StatusContainer,
  TableWrapper,
  OrderHistoryContainer
} from './order-history.css'

const OrderDateCell = ({ value }) => <OrderDate>{value}</OrderDate>

const OrderPairCell = ({ value }) => <OrderPair>{value}</OrderPair>

const OrderSideCell = ({ value }) => <OrderSide value={value}>{value}</OrderSide>

const OrderPriceCell = ({ value }) => <OrderPrice>{value}</OrderPrice>

const OrderAmountCell = ({ value }) => <OrderAmount>{value}</OrderAmount>

function OrderHistory() {
  const activeWalletAddress = useStorePersisted((state) => state.activeWalletAddress)

  const { data, isLoading, isError } = useQuery(
    ['tradeHistory', { address: activeWalletAddress }],
    () => fetchTradeHistoryByAddress(activeWalletAddress),
    {
      enabled: !!activeWalletAddress,
      refetchInterval: 3000
    }
  )

  const tradeHistoryData = useMemo(() => mapTradeHistoryData(data), [data])

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
    <OrderHistoryContainer>
      <TableWrapper>
        <OrdersTable columns={columns} data={tradeHistoryData || []} />
      </TableWrapper>

      {renderStatus()}
    </OrderHistoryContainer>
  )
}

export default OrderHistory
