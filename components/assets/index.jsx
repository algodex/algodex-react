/* eslint-disable react/prop-types  */
import { useMemo } from 'react'
import { useQuery } from 'react-query'
import { BodyCopyTiny, BodyCopySm } from 'components/type'
import OrdersTable from 'components/orders-table'
import { useStorePersisted } from 'store/use-store'
import { fetchAssetsByByAddress } from 'lib/api'
import { mapAssetsData } from './helpers'
import useTranslation from 'next-translate/useTranslation'

import {
  AssetCoin,
  AssetName,
  AssetTotal,
  AssetAvailable,
  AssetInOrder,
  AssetAlgoValue,
  StatusContainer,
  TableWrapper,
  Container
} from './assets.css'

const AssetCoinCell = ({ value }) => <AssetCoin>{value}</AssetCoin>

const AssetNameCell = ({ value }) => <AssetName>{value}</AssetName>

const AssetTotalCell = ({ value }) => <AssetTotal>{value}</AssetTotal>

const AssetAvailableCell = ({ value }) => <AssetAvailable>{value}</AssetAvailable>

const AssetInOrderCell = ({ value }) => <AssetInOrder>{value}</AssetInOrder>

const AssetAlgoValueCell = ({ value }) => <AssetAlgoValue>{value}</AssetAlgoValue>

function Assets() {
  const { t } = useTranslation("orders");
  const activeWalletAddress = useStorePersisted((state) => state.activeWalletAddress)

  const { data, isLoading, isError } = useQuery(
    ['assets', { address: activeWalletAddress }],
    () => fetchAssetsByByAddress(activeWalletAddress),
    {
      enabled: !!activeWalletAddress,
      refetchInterval: 3000
    }
  )

  const assetsData = useMemo(() => mapAssetsData(data), [data])

  const columns = useMemo(
    () => [
      {
        Header: t("unit-name"),
        accessor: 'unit',
        Cell: AssetCoinCell
      },
      {
        Header: t("name"),
        accessor: 'name',
        Cell: AssetNameCell
      },
      {
        Header: t("total"),
        accessor: 'total',
        Cell: AssetTotalCell
      },
      {
        Header: t("available"),
        accessor: 'available',
        Cell: AssetAvailableCell
      },
      {
        Header: t("in-order"),
        accessor: 'in-order',
        Cell: AssetInOrderCell
      },
      {
        Header: t("algo-value"),
        accessor: 'algo-value',
        Cell: AssetAlgoValueCell
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
        {isError && <BodyCopySm color="gray.400">{t("error")}</BodyCopySm>}
      </StatusContainer>
    )
  }

  return (
    <Container>
      <TableWrapper>
        <OrdersTable columns={columns} data={assetsData || []} />
      </TableWrapper>

      {renderStatus()}
    </Container>
  )
}

export default Assets
