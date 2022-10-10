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
import { useAlgodex, withWalletOrdersQuery } from '@algodex/algodex-hooks'
import { useCallback, useEffect, useMemo, useState } from 'react'

import PropTypes from 'prop-types'
import React from 'react'
import Typography from '@mui/material/Typography'
import { logInfo } from 'services/logRemote'
import styled from '@emotion/styled'
import toast from 'react-hot-toast'
import { useEvent } from '@/hooks/useEvents'
import useTranslation from 'next-translate/useTranslation'
import useUserStore from '@/store/use-user-state'

const OpenOrdersContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1 1 0%;
  position: relative;
`

const TableWrapper = styled.div`
  padding: 0;
  position: absolute;
  inset: 0;
  // scrollbar-width: none;

  // &::-webkit-scrollbar {
  //   display: none;
  // }
`

const OrderCancelButton = styled.button`
  cursor: pointer;
  background: none;
  border: none;
  border-radius: 3px;
  text-decoration: none;
  display: inline-block;
  padding: 0.25rem 0.75rem;
  color: inherit;

  &:hover {
    background: ${({ theme }) => theme.palette.blue['700']};
    color: ${({ theme }) => theme.palette.gray['000']};
  }
`

export function OpenOrdersTable({ orders: _orders }) {
  // console.log(`OpenOrdersTable(`, arguments[0], `)`)
  const { t } = useTranslation('orders')
  const [openOrdersData, setOpenOrdersData] = useState(_orders)
  const { algodex, wallet, setWallet } = useAlgodex()
  function closeOrder() {
    return algodex.closeOrder.apply(algodex, arguments)
  }

  useEvent('signOut', (data) => {
    if (data.type === 'wallet') {
      setWallet({
        ...wallet,
        connector: {
          ...wallet.connector,
          connected: false
        }
      })
    }
  })

  useEffect(() => {
    setOpenOrdersData(_orders)
  }, [_orders, setOpenOrdersData])

  const walletOpenOrdersTableState = useUserStore((state) => state.walletOpenOrdersTableState)
  const setWalletOpenOrdersTableState = useUserStore((state) => state.setWalletOpenOrdersTableState)

  const OrderCancelCell = useCallback(
    ({ data, cell }) => {
      const handleCancelOrder = async () => {
        const cellIndex = cell.row.index
        const cellData = data[cellIndex]

        const {
          ownerAddress,
          assetId,
          version,
          formattedASAAmount,
          decimals,
          formattedPrice,
          appId
        } = cellData.metadata
        // const orderBookEntry = `${assetLimitPriceN}-${assetLimitPriceD}-0-${assetId}`

        const updateOrderStatus = (statusMsg) =>
          openOrdersData.map((order, index) =>
            index === cellIndex ? { ...order, status: statusMsg } : order
          )

        setOpenOrdersData(updateOrderStatus('CANCELLING'))
        let lastToastId = undefined
        const notifier = (msg) => {
          if (lastToastId) {
            toast.dismiss(lastToastId)
          }
          lastToastId = toast.loading(msg, { duration: 30 * 60 * 1000 }) // Awaiting signature, or awaiting confirmations
        }

        const orderbookEntry = `${cellData.metadata.assetLimitPriceN}-${cellData.metadata.assetLimitPriceD}-0-${cellData.metadata.assetId}`
        logInfo('Cancel Wallet Data:', wallet)
        const _walletConnectionDB = JSON.parse(localStorage.getItem('walletconnect'))
        logInfo('Cancel Wallet Connect:', _walletConnectionDB)

        const awaitCancelOrder = async () => {
          try {
            notifier('Initializing cancel')
            await closeOrder(
              {
                address: ownerAddress,
                version,
                price: Number(formattedPrice),
                amount: Number(formattedASAAmount),
                total: Number(formattedPrice) * Number(formattedASAAmount),
                asset: { id: assetId, decimals },
                assetId,
                type: cellData.type.toLowerCase(),
                appId,
                contract: {
                  creator: ownerAddress,
                  escrow: cellData.metadata.escrowAddress,
                  N: cellData.metadata.assetLimitPriceN,
                  D: cellData.metadata.assetLimitPriceD,
                  entry: orderbookEntry
                },
                wallet
              },
              notifier
            )

            toast.success(t('order-cancelled'), {
              id: lastToastId,
              duration: 3000
            })
          } catch (e) {
            toast.error(`${t('error-cancelling')} ${e}`, { id: lastToastId, duration: 5000 })
          }
        }
        try {
          // const result = await cancelOrderPromise
          const result = awaitCancelOrder()
          setOpenOrdersData(updateOrderStatus('CANCELLED'))
          console.log('Order successfully cancelled', result)
        } catch (err) {
          console.error(err)
          setOpenOrdersData(updateOrderStatus('OPEN'))
        }
      }

      return (
        <Typography variant="body_small" color="gray.000" data-testid="cancel-order-button">
          <OrderCancelButton onClick={handleCancelOrder}>{t('cancel')}</OrderCancelButton>
        </Typography>
      )
    },
    [t, openOrdersData, wallet]
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
        accessor: 'pair',
        Cell: AssetNameCell
      },
      {
        Header: t('price') + ' (ALGO)',
        accessor: 'price',
        Cell: DefaultCell
      },
      {
        Header: t('type'),
        accessor: 'type',
        Cell: OrderTypeCell
      },
      {
        Header: t('amount'),
        accessor: 'amount',
        Cell: DefaultCell
      },
      {
        Header: t('status'),
        accessor: 'status',
        Cell: DefaultCell
      },
      {
        Header: t('cancel-all'),
        accessor: 'cancel',
        Cell: OrderCancelCell,
        disableSortBy: true
      }
    ],
    [t, OrderCancelCell]
  )

  return (
    <OpenOrdersContainer>
      <TableWrapper>
        <Table
          initialState={walletOpenOrdersTableState}
          onStateChange={(state) => setWalletOpenOrdersTableState(state)}
          columns={columns}
          data={_orders || []}
        />
      </TableWrapper>
    </OpenOrdersContainer>
  )
}

OpenOrdersTable.propTypes = {
  wallet: PropTypes.shape({
    address: PropTypes.string.isRequired
  }),
  orders: PropTypes.array.isRequired
}

OpenOrdersTable.defaultProps = {
  orders: []
}

export default withWalletOrdersQuery(OpenOrdersTable)
