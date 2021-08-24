/* eslint-disable react/prop-types  */
import { useMemo } from 'react'
import { BodyCopyTiny, BodyCopySm } from 'components/type'
import OrdersTable from 'components/orders-table'
import { useStorePersisted } from 'store/use-store'
import { useWalletAssets, walletAssetsQueries } from 'lib/api'
import { mapAssetsData } from './helpers'

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
  const activeWalletAddress = useStorePersisted((state) => state.activeWalletAddress)

  const { data, isLoading, isError } = useWalletAssets(
    walletAssetsQueries.getAssetsByAddress,
    { address: activeWalletAddress },
    { enabled: !!activeWalletAddress }
  )

  const assetsData = useMemo(() => mapAssetsData(data), [data])

  const columns = useMemo(
    () => [
      {
        Header: 'Unit Name',
        accessor: 'unit',
        Cell: AssetCoinCell
      },
      {
        Header: 'Name',
        accessor: 'name',
        Cell: AssetNameCell
      },
      {
        Header: 'Total',
        accessor: 'total',
        Cell: AssetTotalCell
      },
      {
        Header: 'Available',
        accessor: 'available',
        Cell: AssetAvailableCell
      },
      {
        Header: 'In Order',
        accessor: 'in-order',
        Cell: AssetInOrderCell
      },
      {
        Header: 'Algo Value',
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
        {isLoading && <BodyCopyTiny color="gray.600">Loading&hellip;</BodyCopyTiny>}
        {isError && <BodyCopySm color="gray.400">Something went wrong.</BodyCopySm>}
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
