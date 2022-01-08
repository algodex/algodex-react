import { BodyCopySm, BodyCopyTiny } from 'components/type'
import {
  OpenOrdersContainer,
  OrderAmount,
  OrderCancel,
  OrderCancelButton,
  OrderDate,
  OrderPair,
  OrderPrice,
  OrderStatus,
  OrderType,
  StatusContainer,
  TableWrapper
} from './open-orders.css'
/* eslint-disable react/prop-types  */
import { useCallback, useEffect, useMemo, useState } from 'react'
import useStore, { useStorePersisted } from 'store/use-store'

import Link from 'next/link'
import OrderService from 'services/order'
import OrdersTable from 'components/orders-table'
import { mapOpenOrdersData } from './helpers'
import toast from 'react-hot-toast'
import { useEventDispatch } from '../../hooks/useEvents'
import useTranslation from 'next-translate/useTranslation'
import useUserStore from '../../store/use-user-state'
import { useWalletOrdersQuery } from '../../hooks/useAlgodex'

function OpenOrders() {
  // const { t, lang } = useTranslation('orders')
  const { t } = useTranslation('orders')
  const activeWalletAddress = useStorePersisted((state) => state.activeWalletAddress)
  const [openOrdersData, setOpenOrdersData] = useState([])
  const isSignedIn = useStore((state) => state.isSignedIn)

  const walletOpenOrdersTableState = useUserStore((state) => state.walletOpenOrdersTableState)
  const setWalletOpenOrdersTableState = useUserStore((state) => state.setWalletOpenOrdersTableState)

  const { data, isLoading, isError } = useWalletOrdersQuery({
    wallet: { address: activeWalletAddress },
    options: {
      enabled: isSignedIn,
      refetchInterval: 3000
    }
  })

  useEffect(() => {
    if (data) {
      setOpenOrdersData(mapOpenOrdersData(data))
    }
  }, [data])

  const openOrdersDataMemoized = useMemo(() => openOrdersData, [openOrdersData])
  // const openOrdersDataMemoized = openOrdersData

  const OrderDateCell = ({ value }) => <OrderDate>{value}</OrderDate>

  const OrderPriceCell = ({ value }) => <OrderPrice>{value}</OrderPrice>

  const OrderPairCell = ({ value, row }) => {
    const dispatcher = useEventDispatch()
    const assetId = row?.original?.metadata?.assetId
    const onClick = useCallback(() => {
      dispatcher('clicked', 'asset')
    }, [dispatcher])
    return (
      <Link href={`/trade/${assetId}`}>
        <button onClick={onClick}>
          <OrderPair>{value}</OrderPair>
        </button>
      </Link>
    )
  }

  const OrderTypeCell = ({ value }) => <OrderType value={value}>{t(value.toLowerCase())}</OrderType>

  const OrderAmountCell = ({ value }) => <OrderAmount>{value}</OrderAmount>

  const OrderStatusCell = ({ value }) => <OrderStatus>{value}</OrderStatus>

  const OrderCancelCell = useCallback(
    ({ data, cell }) => {
      const handleCancelOrder = async () => {
        const cellIndex = cell.row.index
        const cellData = data[cellIndex]

        const {
          escrowAddress,
          ownerAddress,
          assetLimitPriceN,
          assetLimitPriceD,
          assetId,
          version
        } = cellData.metadata
        const orderBookEntry = `${assetLimitPriceN}-${assetLimitPriceD}-0-${assetId}`

        const updateOrderStatus = (statusMsg) =>
          openOrdersData.map((order, index) =>
            index === cellIndex ? { ...order, status: statusMsg } : order
          )

        setOpenOrdersData(updateOrderStatus('CANCELLING'))

        const cancelOrderPromise = OrderService.closeOrder(
          escrowAddress,
          ownerAddress,
          orderBookEntry,
          version
        )

        toast.promise(cancelOrderPromise, {
          loading: t('awaiting-confirmation'),
          success: t('order-cancelled'),
          error: t('error-cancelling')
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
    [t, openOrdersData]
  )

  const columns = useMemo(
    () => [
      {
        Header: t('date'),
        accessor: 'date',
        Cell: OrderDateCell
      },
      {
        Header: t('pair'),
        accessor: 'pair',
        Cell: OrderPairCell
      },
      {
        Header: t('price') + ' (ALGO)',
        accessor: 'price',
        Cell: OrderPriceCell
      },
      {
        Header: t('type'),
        accessor: 'type',
        Cell: OrderTypeCell
      },
      {
        Header: t('amount'),
        accessor: 'amount',
        Cell: OrderAmountCell
      },
      {
        Header: t('status'),
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
    [t, OrderTypeCell, OrderCancelCell]
  )

  const renderStatus = () => {
    if (!isLoading && !isError) {
      return null
    }
    return (
      <StatusContainer>
        {isLoading && <BodyCopyTiny color="gray.600">{t('loading')}&hellip;</BodyCopyTiny>}
        {isError && <BodyCopySm color="gray.400">{t('error')}</BodyCopySm>}
      </StatusContainer>
    )
  }

  return (
    <OpenOrdersContainer>
      <TableWrapper>
        <OrdersTable
          initialState={walletOpenOrdersTableState}
          onStateChange={(state) => {
            console.log('State changing', state)
            setWalletOpenOrdersTableState(state)
          }}
          columns={columns}
          data={openOrdersDataMemoized || []}
        />
      </TableWrapper>

      {renderStatus()}
    </OpenOrdersContainer>
  )
}

export default OpenOrders
