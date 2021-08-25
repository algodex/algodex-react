/* eslint-disable react/prop-types  */
import { useMemo, useState, useEffect, useCallback } from 'react'
import { useQuery } from 'react-query'
import { BodyCopyTiny, BodyCopySm } from 'components/type'
import OrdersTable from 'components/orders-table'
import { mapOpenOrdersData } from './helpers'
import { fetchOpenOrdersByAddress } from 'lib/api'
import OrderService from 'services/order'
import { useStorePersisted } from 'store/use-store'
import toast from 'react-hot-toast'

import {
  OrderDate,
  OrderPrice,
  OrderPair,
  OrderType,
  OrderAmount,
  OrderStatus,
  OrderCancel,
  OrderCancelButton,
  StatusContainer,
  TableWrapper,
  OpenOrdersContainer
} from './open-orders.css'

function OpenOrders() {
  const activeWalletAddress = useStorePersisted((state) => state.activeWalletAddress)
  const [openOrdersData, setOpenOrdersData] = useState(null)

  const { data, isLoading, isError } = useQuery(
    ['openOrders', { address: activeWalletAddress }],
    () => fetchOpenOrdersByAddress(activeWalletAddress),
    {
      enabled: !!activeWalletAddress,
      refetchInterval: 3000
    }
  )

  useEffect(() => {
    if (data) {
      setOpenOrdersData(mapOpenOrdersData(data))
    }
  }, [data])

  const openOrdersDataMemoized = useMemo(() => openOrdersData, [openOrdersData])

  const OrderDateCell = ({ value }) => <OrderDate>{value}</OrderDate>

  const OrderPriceCell = ({ value }) => <OrderPrice>{value}</OrderPrice>

  const OrderPairCell = ({ value }) => <OrderPair>{value}</OrderPair>

  const OrderTypeCell = ({ value }) => <OrderType value={value}>{value}</OrderType>

  const OrderAmountCell = ({ value }) => <OrderAmount>{value}</OrderAmount>

  const OrderStatusCell = ({ value }) => <OrderStatus>{value}</OrderStatus>

  const OrderCancelCell = useCallback(
    ({ data, cell }) => {
      const handleCancelOrder = async () => {
        const cellIndex = cell.row.index
        const cellData = data[cellIndex]

        const { escrowAddress, ownerAddress, assetLimitPriceN, assetLimitPriceD, assetId } =
          cellData.metadata
        const orderBookEntry = `${assetLimitPriceN}-${assetLimitPriceD}-0-${assetId}`

        const updateOrderStatus = (statusMsg) =>
          openOrdersData.map((order, index) =>
            index === cellIndex ? { ...order, status: statusMsg } : order
          )

        setOpenOrdersData(updateOrderStatus('CANCELLING'))

        const cancelOrderPromise = OrderService.closeOrder(
          escrowAddress,
          ownerAddress,
          orderBookEntry
        )

        toast.promise(cancelOrderPromise, {
          loading: 'Awaiting confirmation...',
          success: 'Order successfully cancelled',
          error: 'Error cancelling order'
        })

        try {
          const result = await cancelOrderPromise
          setOpenOrdersData(updateOrderStatus('CANCELLED'))
          console.log('Order successfully cancelled', result)
        } catch (err) {
          console.error(err)
          setOpenOrdersData(updateOrderStatus('OPEN'))
        }
      }

      return (
        <OrderCancel>
          <OrderCancelButton onClick={handleCancelOrder}>x</OrderCancelButton>
        </OrderCancel>
      )
    },
    [openOrdersData]
  )

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
        Header: 'Status',
        accessor: 'status',
        Cell: OrderStatusCell
      },
      {
        Header: '',
        accessor: 'cancel',
        Cell: OrderCancelCell,
        disableSortBy: true
      }
    ],
    [OrderCancelCell]
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
        <OrdersTable columns={columns} data={openOrdersDataMemoized || []} />
      </TableWrapper>

      {renderStatus()}
    </OpenOrdersContainer>
  )
}

export default OpenOrders
