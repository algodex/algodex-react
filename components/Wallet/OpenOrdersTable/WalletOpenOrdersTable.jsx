import { BodyCopySm, BodyCopyTiny } from 'components/Typography'
import { useCallback, useEffect, useMemo, useState } from 'react'
// import useStore, { useStorePersisted } from 'store/use-store'
import Table from 'components/Table'
import Link from 'next/link'
import OrderService from 'services/order'
import toast from 'react-hot-toast'
import { useEventDispatch } from 'hooks/useEvents'
import useTranslation from 'next-translate/useTranslation'
import useUserStore from 'store/use-user-state'
import { useWalletOrdersQuery } from 'hooks/useAlgodex'
import styled from 'styled-components'
import dayjs from 'dayjs'
import { floatToFixed } from 'services/display'
import PropTypes from 'prop-types'

export const mapOpenOrdersData = (data) => {
  if (!data || !data.buyASAOrdersInEscrow || !data.sellASAOrdersInEscrow || !data.allAssets) {
    return null
  }

  const {
    buyASAOrdersInEscrow: buyOrdersData,
    sellASAOrdersInEscrow: sellOrdersData,
    allAssets: assetsData
  } = data

  const assetsInfo = assetsData.reduce((allAssetsInfo, currentAssetInfo) => {
    allAssetsInfo[currentAssetInfo.index] = currentAssetInfo
    return allAssetsInfo
  }, {})

  const buyOrders = buyOrdersData.map((order) => {
    const { assetId, formattedPrice, formattedASAAmount, unix_time } = order
    return {
      /** @todo get date/time from API */
      date: dayjs.unix(unix_time).format('YYYY-MM-DD HH:mm:ss'),
      // date: moment(unix_time, 'YYYY-MM-DD HH:mm').format(),
      unix_time: unix_time,
      price: floatToFixed(formattedPrice),
      pair: `${assetsInfo[assetId].params['unit-name']}/ALGO`,
      type: 'BUY',
      status: 'OPEN',
      amount: formattedASAAmount,
      metadata: order
    }
  })

  const sellOrders = sellOrdersData.map((order) => {
    const { assetId, formattedPrice, formattedASAAmount, unix_time } = order

    return {
      /** @todo get date/time from API */
      date: dayjs.unix(unix_time).format('YYYY-MM-DD HH:mm:ss'),
      unix_time: unix_time,
      price: floatToFixed(formattedPrice),
      pair: `${assetsInfo[assetId].params['unit-name']}/ALGO`,
      type: 'SELL',
      status: 'OPEN',
      amount: formattedASAAmount,
      metadata: order
    }
  })

  const allOrders = [...buyOrders, ...sellOrders]
  allOrders.sort((a, b) => (a.unix_time < b.unix_time ? 1 : -1))
  return allOrders
}
export const OpenOrdersContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1 1 0%;
  position: relative;
`

export const StatusContainer = styled.div`
  position: absolute;
  inset: 6.25rem 1.125rem 2rem;
`

export const TableWrapper = styled.div`
  padding: 0;
  position: absolute;
  inset: 0;
  overflow: scroll;
  scrollbar-width: none;

  &::-webkit-scrollbar {
    display: none;
  }
`

export const OrderDate = styled.span`
  color: ${({ theme }) => theme.colors.gray['000']};
`
export const OrderPrice = styled.span`
  color: ${({ theme }) => theme.colors.gray['000']};
`
export const OrderPair = styled.span`
  color: ${({ theme }) => theme.colors.gray['000']};
`
export const OrderType = styled.span`
  color: ${({ theme, value }) =>
    value === 'BUY' ? theme.colors.green[500] : theme.colors.red[500]};
`
export const OrderAmount = styled.span`
  color: ${({ theme }) => theme.colors.gray['000']};
`
export const OrderFilled = styled.span`
  color: ${({ theme }) => theme.colors.gray['000']};
`
export const OrderRole = styled.span`
  color: ${({ theme }) => theme.colors.gray['000']};
`
export const OrderStatus = styled.span`
  color: ${({ theme }) => theme.colors.gray['000']};
`
export const OrderCancel = styled.span`
  color: ${({ theme }) => theme.colors.gray['000']};
`
export const OrderCancelButton = styled.button`
  cursor: pointer;
  background: none;
  border: none;
  border-radius: 3px;
  text-decoration: none;
  display: inline-block;
  padding: 0.25rem 0.75rem;
  color: inherit;

  &:hover {
    background: ${({ theme }) => theme.colors.red['500']};
  }
`

export function OpenOrders({ wallet }) {
  // const { t, lang } = useTranslation('orders')
  const { t } = useTranslation('orders')
  // const activeWalletAddress = useStorePersisted((state) => state.activeWalletAddress)
  const activeWalletAddress = wallet.address
  const [openOrdersData, setOpenOrdersData] = useState([])
  // const isSignedIn = useStore((state) => state.isSignedIn)
  const isSignedIn = typeof wallet !== 'undefined'

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
  OrderDateCell.propTypes = { value: PropTypes.any }
  const OrderPriceCell = ({ value }) => <OrderPrice>{value}</OrderPrice>
  OrderPriceCell.propTypes = { value: PropTypes.any }
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
  OrderPairCell.propTypes = { row: PropTypes.any, value: PropTypes.any }
  // const OrderTypeCell = ({ value }) => <OrderType value={value}>{t(value.toLowerCase())}</OrderType>
  const OrderTypeCell = useCallback(
    ({ value }) => {
      return <OrderType value={value}>{t(value.toLowerCase())}</OrderType> // eslint-disable-line
    },
    [t]
  )
  OrderTypeCell.propTypes = { value: PropTypes.any }
  const OrderAmountCell = ({ value }) => <OrderAmount>{value}</OrderAmount>
  OrderAmountCell.propTypes = { value: PropTypes.any }
  const OrderStatusCell = ({ value }) => <OrderStatus>{value}</OrderStatus>
  OrderStatusCell.propTypes = { value: PropTypes.any }

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
        <Table
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

OpenOrders.propTypes = {
  wallet: PropTypes.shape({
    address: PropTypes.string.isRequired
  })
}

export default OpenOrders
