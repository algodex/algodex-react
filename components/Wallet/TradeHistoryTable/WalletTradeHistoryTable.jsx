import { useCallback, useMemo } from 'react'
import { useWalletTradeHistory } from 'hooks/useAlgodex'
import { BodyCopyTiny, BodyCopySm } from 'components/Typography'
import Table from 'components/Table'
import useStore, { useStorePersisted } from 'store/use-store'
import { useEventDispatch } from 'hooks/useEvents'
import useTranslation from 'next-translate/useTranslation'
import Link from 'next/link'

import useUserStore from 'store/use-user-state'
import styled from 'styled-components'
import dayjs from 'dayjs'
import { floatToFixed } from 'services/display'
import PropTypes from 'prop-types'

export const mapTradeHistoryData = (data) => {
  const buyText = 'BUY'
  const sellText = 'SELL'
  if (!data || !data.transactions || !data.allAssets) {
    return null
  }

  const { transactions: tradeHistoryData, allAssets: assetsData } = data

  const assetsInfo = assetsData.reduce((allAssetsInfo, currentAssetInfo) => {
    allAssetsInfo[currentAssetInfo.index] = currentAssetInfo
    return allAssetsInfo
  }, {})

  const tradeHistory = tradeHistoryData.map(
    ({ unix_time, asset_id, tradeType, formattedPrice, formattedASAAmount }) => {
      const side = tradeType === 'buyASA' ? buyText : sellText

      return {
        id: asset_id,
        date: dayjs(unix_time * 1000).format('YYYY-MM-DD HH:mm:ss'),
        price: floatToFixed(formattedPrice),
        pair: `${assetsInfo[asset_id].params['unit-name']}/ALGO`,
        side,
        amount: formattedASAAmount
      }
    }
  )

  return tradeHistory
}
export const OrderHistoryContainer = styled.div`
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
export const OrderSide = styled.span`
  color: ${({ theme, value }) =>
    ('' + value).toUpperCase() === 'BUY' ? theme.colors.green[500] : theme.colors.red[500]};
`
export const OrderAmount = styled.span`
  color: ${({ theme }) => theme.colors.gray['000']};
`

const OrderDateCell = ({ value }) => <OrderDate>{value}</OrderDate>
OrderDateCell.propTypes = { value: PropTypes.any }
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
OrderPairCell.propTypes = { row: PropTypes.any, value: PropTypes.any }
const OrderPriceCell = ({ value }) => <OrderPrice>{value}</OrderPrice>
OrderPriceCell.propTypes = { value: PropTypes.any }
const OrderAmountCell = ({ value }) => <OrderAmount>{value}</OrderAmount>
OrderAmountCell.propTypes = { value: PropTypes.any }
function OrderHistory() {
  const { t, lang } = useTranslation('orders')
  const OrderSideCell = ({ value }) => <OrderSide value={value}>{t(value.toLowerCase())}</OrderSide>
  OrderSideCell.propTypes = { value: PropTypes.any }
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
        <Table
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
