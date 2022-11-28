/* 
 * Algodex Frontend (algodex-react) 
 * Copyright (C) 2021 - 2022 Algodex VASP (BVI) Corp.
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as published
 * by the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.

 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Affero General Public License for more details.
 * You should have received a copy of the GNU Affero General Public License
 * along with this program.  If not, see <https://www.gnu.org/licenses/>.
 */

import Table, {
  AssetNameCell,
  DefaultCell,
  ExpandTradeDetail,
  OrderTypeCell
} from '@/components/Table'
import { StableAssets } from '@/components/StableAssets'
import PropTypes from 'prop-types'
import styled from '@emotion/styled'
import { useMemo } from 'react'
import useTranslation from 'next-translate/useTranslation'
import useUserStore from '@/store/use-user-state'
import { withWalletTradeHistoryQuery } from '@/hooks'
import {floatToFixedDisplay} from '@/services/display';
import {useInversionStatus} from '@/hooks/utils/useInversionStatus'

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
  const _formattedOrders = useMemo(() => {
    return orders.map((order) => {
      const _order = {
        ...order,
        price: floatToFixedDisplay(order.price),
        isInverted: useInversionStatus(parseInt(order.id))
      }
      return _order
    })
  }, [orders])

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
          data={_formattedOrders || []}
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
