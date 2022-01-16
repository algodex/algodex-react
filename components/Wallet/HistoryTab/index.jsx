/* eslint-disable react/prop-types, react/jsx-key  */
import { useCallback, useMemo } from 'react'
import { useWalletTradeHistory } from 'hooks/useAlgodex'
import { BodyCopyTiny, BodyCopySm } from 'components/type'
import OrdersTable from 'components/orders-table'
import useStore, { useStorePersisted } from 'store/use-store'
import { mapTradeHistoryData } from './helpers'
import { useEventDispatch } from 'hooks/useEvents'
import useTranslation from 'next-translate/useTranslation'
import Link from 'next/link'

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
import useUserStore from '../../store/use-user-state'

const OrderDateCell = ({ value }) => <OrderDate>{value}</OrderDate>

const OrderPairCell = ({ value, row }) => {
  const dispatcher = useEventDispatch()
  const assetId = row?.original?.id
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

const OrderPriceCell = ({ value }) => <OrderPrice>{value}</OrderPrice>

const OrderAmountCell = ({ value }) => <OrderAmount>{value}</OrderAmount>

function OrderHistory() {
  const { t, lang } = useTranslation('orders')
  const OrderSideCell = ({ value }) => <OrderSide value={value}>{t(value.toLowerCase())}</OrderSide>
  const activeWalletAddress = useStorePersisted((state) => state.activeWalletAddress)
  const isSignedIn = useStore((state) => state.isSignedIn)

  const walletOrderHistoryTableState = useUserStore((state) => state.walletOrderHistoryTableState)
  const setWalletOrderHistoryTableState = useUserStore(
    (state) => state.setWalletOrderHistoryTableState
  )

  const { data, isLoading, isError } = useWalletTradeHistory({
    wallet: { address: activeWalletAddress },
    options: {
      enabled: isSignedIn,
      refetchInterval: 3000
    }
  })

  const tradeHistoryData = useMemo(() => mapTradeHistoryData(data), [data, lang])

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
        Header: t('side'),
        accessor: 'side',
        Cell: OrderSideCell
      },

      {
        Header: t('price') + ' (ALGO)',
        accessor: 'price',
        Cell: OrderPriceCell
      },
      {
        Header: t('amount'),
        accessor: 'amount',
        Cell: OrderAmountCell
      }
    ],
    [lang]
  )

  const renderStatus = () => {
    if (!isLoading && !isError) {
      return null
    }
    return (
      <StatusContainer>
        {isLoading && <BodyCopyTiny color="gray.600">{t('loading')}&hellip;</BodyCopyTiny>}
        {isError && <BodyCopySm color="gray.400">{t.error}</BodyCopySm>}
      </StatusContainer>
    )
  }

  return (
    <OrderHistoryContainer>
      <TableWrapper>
        <OrdersTable
          initialState={walletOrderHistoryTableState}
          onStateChange={(state) => setWalletOrderHistoryTableState(state)}
          columns={columns}
          data={tradeHistoryData || []}
        />
      </TableWrapper>

      {renderStatus()}
    </OrderHistoryContainer>
  )
}

export default OrderHistory
