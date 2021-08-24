/* eslint-disable react/prop-types  */
import { useMemo } from 'react'
import { useQuery } from 'react-query'
import { BodyCopyTiny, BodyCopySm } from 'components/type'
import OrdersTable from 'components/orders-table'
import { useStorePersisted } from 'store/use-store'
import { fetchAssetsByByAddress } from 'lib/api/fetch'
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
