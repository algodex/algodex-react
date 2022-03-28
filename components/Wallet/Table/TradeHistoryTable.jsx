import styled from '@emotion/styled'
import PropTypes from 'prop-types'
import { useMemo } from 'react'
import useTranslation from 'next-translate/useTranslation'

import Table, { DefaultCell, OrderTypeCell, AssetNameCell } from '@/components/Table'
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

/**
 * Trade History Table
 * @param orders
 * @returns {JSX.Element}
 * @constructor
 */
export function TradeHistoryTable({ orders }) {
  //console.log(`TradeHistoryTable(`, arguments[0], `)`)
  const { t } = useTranslation('orders')

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
        Cell: AssetNameCell
      },
      {
        Header: t('side'),
        accessor: 'side',
        Cell: OrderTypeCell
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
    [t]
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
