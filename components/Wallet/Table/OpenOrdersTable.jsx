import { useCallback, useEffect, useMemo, useState } from 'react'
import useTranslation from 'next-translate/useTranslation'
import styled from '@emotion/styled'
import toast from 'react-hot-toast'
import PropTypes from 'prop-types'

import { BrightGraySpan } from '@/components/Typography'
import Table, { DefaultCell, OrderTypeCell, AssetNameCell } from '@/components/Table'
import { withWalletOrdersQuery } from '@/hooks/withAlgodex'
import useUserStore from '@/store/use-user-state'
import OrderService from '@/services/order'

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
  overflow: scroll;
  scrollbar-width: none;

  &::-webkit-scrollbar {
    display: none;
  }
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
    background: ${({ theme }) => theme.colors.red['500']};
  }
`

export function OpenOrdersTable({ orders: _orders }) {
  // console.log(`OpenOrdersTable(`, arguments[0], `)`)
  const { t } = useTranslation('orders')
  const [openOrdersData, setOpenOrdersData] = useState(_orders)

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
        <BrightGraySpan data-testid="cancel-order-button">
          <OrderCancelButton onClick={handleCancelOrder}>x</OrderCancelButton>
        </BrightGraySpan>
      )
    },
    [t, openOrdersData]
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
        Header: '',
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
