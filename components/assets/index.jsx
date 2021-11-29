import {
  AssetAlgoValue,
  AssetAvailable,
  AssetCoin,
  AssetInOrder,
  AssetName,
  AssetTotal,
  Container,
  StatusContainer,
  TableWrapper
} from './assets.css'
import { AssetId, AssetNameBlock } from 'components/asset-search/asset-search.css.js'
import { BodyCopySm, BodyCopyTiny } from 'components/type'
import useStore, { useStorePersisted } from 'store/use-store'

import OrdersTable from 'components/orders-table'
import { mapAssetsData } from './helpers'
/* eslint-disable react/prop-types  */
import { useMemo } from 'react'
import useTranslation from 'next-translate/useTranslation'
import { useWalletAssetsQuery } from 'hooks/useAlgodex'

const AssetCoinCell = (props) => {
  return (
    <AssetNameBlock>
      <AssetName>{props.value}</AssetName>
      <br />
      <AssetId>{props.row.original.id}</AssetId>
    </AssetNameBlock>
  )
}

const AssetNameCell = ({ value }) => <AssetCoin>{value}</AssetCoin>

const AssetTotalCell = ({ value }) => <AssetTotal>{value}</AssetTotal>

const AssetAvailableCell = ({ value }) => <AssetAvailable>{value}</AssetAvailable>

const AssetInOrderCell = ({ value }) => <AssetInOrder>{value}</AssetInOrder>

const AssetAlgoValueCell = ({ value }) => <AssetAlgoValue>{value}</AssetAlgoValue>

function Assets() {
  const { t, lang } = useTranslation('orders')

  const activeWalletAddress = useStorePersisted((state) => state.activeWalletAddress)
  const isSignedIn = useStore((state) => state.isSignedIn)
  const { data, isLoading, isError } = useWalletAssetsQuery({
    wallet: { address: activeWalletAddress },
    options: {
      enabled: isSignedIn,
      refetchInterval: 3000
    }
  })

  const assetsData = useMemo(() => mapAssetsData(data), [data])

  const columns = useMemo(
    () => [
      {
        Header: t('unit-name'),
        accessor: 'unit',
        Cell: AssetCoinCell
      },
      {
        Header: t('name'),
        accessor: 'name',
        Cell: AssetNameCell
      },
      {
        Header: t('total'),
        accessor: 'total',
        Cell: AssetTotalCell
      },
      {
        Header: t('available'),
        accessor: 'available',
        Cell: AssetAvailableCell
      },
      {
        Header: t('in-order'),
        accessor: 'in-order',
        Cell: AssetInOrderCell
      },
      {
        Header: t('algo-value'),
        accessor: 'algo-value',
        Cell: AssetAlgoValueCell
      }
    ],
    [lang]
  )

  const renderStatus = () => {
    if (!isLoading && !isError) {
      return null
    }
    return (
      <StatusContainer>
        {isLoading && <BodyCopyTiny color="gray.600">{t('loading')}&hellip;</BodyCopyTiny>}
        {isError && <BodyCopySm color="gray.400">{t('error')}</BodyCopySm>}
      </StatusContainer>
    )
  }

  return (
    <Container style={{ height: '6rem' }}>
      <TableWrapper>
        <OrdersTable columns={columns} data={assetsData || []} />
      </TableWrapper>

      {renderStatus()}
    </Container>
  )
}

export default Assets
