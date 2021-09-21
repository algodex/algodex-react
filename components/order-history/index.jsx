/* eslint-disable react/prop-types, react/jsx-key  */
import { useMemo } from 'react'
import { useQuery } from 'react-query'
import { BodyCopyTiny, BodyCopySm } from 'components/type'
import OrdersTable from 'components/orders-table'
import { useStorePersisted } from 'store/use-store'
import { fetchTradeHistoryByAddress } from 'lib/api'
import { mapTradeHistoryData } from './helpers'
import useTranslation from 'next-translate/useTranslation'

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

const OrderDateCell = ({ value }) => <OrderDate>{value}</OrderDate>

const OrderPairCell = ({ value }) => <OrderPair>{value}</OrderPair>

const OrderSideCell = ({ value }) => <OrderSide value={value}>{value}</OrderSide>

const OrderPriceCell = ({ value }) => <OrderPrice>{value}</OrderPrice>

const OrderAmountCell = ({ value }) => <OrderAmount>{value}</OrderAmount>

function OrderHistory() {
  const { t } = useTranslation("orders");
  const activeWalletAddress = useStorePersisted((state) => state.activeWalletAddress)

  const { data, isLoading, isError } = useQuery(
    ['tradeHistory', { address: activeWalletAddress }],
    () => fetchTradeHistoryByAddress(activeWalletAddress),
    {
      enabled: !!activeWalletAddress,
      refetchInterval: 3000
    }
  )

  const tradeHistoryData = useMemo(() => mapTradeHistoryData(data, { buyText: t("buy"), sellText: t("sell")}), [data])

  const columns = useMemo(
    () => [
      {
        Header: t("date"),
        accessor: 'date',
        Cell: OrderDateCell
      },
      {
        Header: t("pair"),
        accessor: 'pair',
        Cell: OrderPairCell
      },
      {
        Header: t("side"),
        accessor: 'side',
        Cell: OrderSideCell
      },

      {
        Header: t("price") + ' (ALGO)',
        accessor: 'price',
        Cell: OrderPriceCell
      },
      {
        Header: t("amount"),
        accessor: 'amount',
        Cell: OrderAmountCell
      }
    ],
    []
  )

  const renderStatus = () => {
    if (!isLoading && !isError) {
      return null
    }
    return (
      <StatusContainer>
        {isLoading && <BodyCopyTiny color="gray.600">{t("loading")}&hellip;</BodyCopyTiny>}
        {isError && <BodyCopySm color="gray.400">{t.error}</BodyCopySm>}
      </StatusContainer>
    )
  }

  return (
    <OrderHistoryContainer>
      <TableWrapper>
        <OrdersTable columns={columns} data={tradeHistoryData || []} />
      </TableWrapper>

      {renderStatus()}
    </OrderHistoryContainer>
  )
}

export default OrderHistory
