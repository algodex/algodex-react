import Table, {
  AssetNameCell,
  DefaultCell,
  ExpandTradeDetail,
  OrderTypeCell
} from '@/components/Table'

import PropTypes from 'prop-types'
import styled from '@emotion/styled'
import { useMemo } from 'react'
import useTranslation from 'next-translate/useTranslation'
import useUserStore from '@/store/use-user-state'
import { withWalletTradeHistoryQuery } from '@/hooks/withAlgodex'
import { StableAssets } from '@/components/StableAssets'

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
  // Update price in case it includes StableCoin
  orders.forEach((_order) => {
    if (StableAssets.includes(_order.id)) {
      // Invert the Pair and Price
      const pairs = _order.pair.split('/')
      if (pairs.length > 1) {
        _order.calculated_pair = 'ALGO/' + pairs[0]
      } else {
        _order.calculated_pair = 'Invalid Pair'
      }

      if (_order.price === 0) {
        _order.calculated_price = 'Invalid Price'
      } else {
        _order.calculated_price = 1 / _order.price
      }
    } else {
      _order.calculated_pair = _order.pair
      _order.calculated_price = _order.price
    }
  })

  const walletOrderHistoryTableState = useUserStore((state) => state.walletOrderHistoryTableState)
  const setWalletOrderHistoryTableState = useUserStore(
    (state) => state.setWalletOrderHistoryTableState
  )

  const columns = useMemo(
    () => [
      {
        Header: t('date'),
        accessor: 'date',
        minWidth: 160,
        width: 160,
        maxWidth: 160,
        Cell: ExpandTradeDetail
      },
      {
        Header: t('pair'),
        accessor: 'calculated_pair',
        Cell: AssetNameCell
      },
      {
        Header: t('side'),
        accessor: 'side',
        Cell: OrderTypeCell
      },

      {
        Header: t('price') + ' (ALGO)',
        accessor: 'calculated_price',
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
