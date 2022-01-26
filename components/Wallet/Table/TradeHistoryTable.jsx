import styled from 'styled-components'
import PropTypes from 'prop-types'
import Link from 'next/link'
import { useCallback, useMemo } from 'react'
import useTranslation from 'next-translate/useTranslation'

import { BrightGraySpan } from '@/components/Typography'
import Table, { DefaultCell } from '@/components/Table'
import { useEventDispatch } from '@/hooks/useEvents'
import useUserStore from '@/store/use-user-state'
import { withWalletTradeHistoryQuery } from '@/hooks/withAlgodex'

const OrderHistoryContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1 1 0%;
  position: relative;
`

const TableWrapper = styled.div`
  padding: 0;
  position: absolute;
  inset: 0;
  overflow: scroll;
  scrollbar-width: none;

  &::-webkit-scrollbar {
    display: none;
  }
`

const OrderSide = styled.span`
  color: ${({ theme, value }) =>
    ('' + value).toUpperCase() === 'BUY' ? theme.colors.green[500] : theme.colors.red[500]};
`

const OrderPairCell = ({ value, row }) => {
  const dispatcher = useEventDispatch()
  const assetId = row?.original?.id
  const onClick = useCallback(() => {
    dispatcher('clicked', 'asset')
  }, [dispatcher])
  return (
    <Link href={`/trade/${assetId}`}>
      <button onClick={onClick}>
        <BrightGraySpan>{value}</BrightGraySpan>
      </button>
    </Link>
  )
}
OrderPairCell.propTypes = { row: PropTypes.any, value: PropTypes.any }

export function TradeHistoryTable({ orders }) {
  const { t } = useTranslation('orders')
  const OrderSideCell = useCallback(
    ({ value }) => {
      return <OrderSide value={value}>{t(value.toLowerCase())}</OrderSide>
    },
    [t]
  )
  OrderSideCell.propTypes = { value: PropTypes.any }

  const walletOrderHistoryTableState = useUserStore((state) => state.walletOrderHistoryTableState)
  const setWalletOrderHistoryTableState = useUserStore(
    (state) => state.setWalletOrderHistoryTableState
  )

  const columns = useMemo(
    () => [
      {
        Header: t('date'),
        accessor: 'date',
        Cell: DefaultCell
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
        Cell: DefaultCell
      },
      {
        Header: t('amount'),
        accessor: 'amount',
        Cell: DefaultCell
      }
    ],
    [t, OrderSideCell]
  )

  return (
    <OrderHistoryContainer>
      <TableWrapper>
        <Table
          initialState={walletOrderHistoryTableState}
          onStateChange={(state) => setWalletOrderHistoryTableState(state)}
          columns={columns}
          data={orders || []}
        />
      </TableWrapper>
    </OrderHistoryContainer>
  )
}

TradeHistoryTable.propTypes = {
  wallet: PropTypes.shape({
    address: PropTypes.string.isRequired
  }),
  orders: PropTypes.array.isRequired
}

TradeHistoryTable.defaultProps = {
  orders: []
}

export default withWalletTradeHistoryQuery(TradeHistoryTable)
