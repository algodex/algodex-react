import { useCallback, useMemo } from 'react'
import styled from 'styled-components'
import useTranslation from 'next-translate/useTranslation'
import Link from 'next/link'

import { useWalletAssetsQuery, useEventDispatch } from 'hooks'
import useStore, { useStorePersisted } from 'store/use-store'
import useUserStore from 'store/use-user-state'

import { AssetId, AssetNameBlock } from 'components/Asset'
import { BodyCopyTiny, BodyCopySm } from 'components/Typography'
import Table from 'components/Table'
import PropTypes from 'prop-types'

/**
 * @deprecated
 * @param data
 * @returns {null|*}
 */
export const mapAssetsData = (data) => {
  if (!data || !data.allAssets || !data.allAssets.length) {
    return null
  }

  const { allAssets: assetsData } = data

  const assets = assetsData.map(
    ({
      unit_name,
      name,
      formattedTotalASAAmount,
      formattedASAAvailable,
      formattedASAInOrder,
      formattedTotalAlgoEquiv,
      assetId
    }) => {
      return {
        unit: unit_name,
        id: assetId,
        name,
        total: formattedTotalASAAmount || '',
        available: formattedASAAvailable || '',
        'in-order': formattedASAInOrder || '',
        'algo-value': formattedTotalAlgoEquiv || ''
      }
    }
  )

  return assets
}
export const Container = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1 1 0%;
  position: relative;
`

export const StatusContainer = styled.div`
  position: absolute;
  inset: 6.25rem 1.125rem 2rem;
`

export const TableWrapper = styled.div`
  padding: 0;
  position: absolute;
  inset: 0;
  overflow: scroll;
  scrollbar-width: none;

  &::-webkit-scrollbar {
    display: none;
  }
`

export const AssetCoin = styled.span`
  color: ${({ theme }) => theme.colors.gray['000']};
`
export const AssetName = styled.span`
  color: ${({ theme }) => theme.colors.gray['000']};
`
export const AssetTotal = styled.span`
  color: ${({ theme }) => theme.colors.gray['000']};
`

export const AssetAvailable = styled.span`
  color: ${({ theme }) => theme.colors.gray['000']};
`
export const AssetInOrder = styled.span`
  color: ${({ theme }) => theme.colors.gray['000']};
`
export const AssetAlgoValue = styled.span`
  color: ${({ theme }) => theme.colors.gray['000']};
`

const AssetCoinCell = (props) => {
  const dispatcher = useEventDispatch()
  const onClick = useCallback(() => {
    dispatcher('clicked', 'asset')
  }, [dispatcher])
  return (
    <Link href={`/trade/${props.row.original.id}`}>
      <button onClick={onClick}>
        <AssetNameBlock>
          <AssetName>{props.value}</AssetName>
          <br />
          <AssetId>{props.row.original.id}</AssetId>
        </AssetNameBlock>
      </button>
    </Link>
  )
}
AssetCoinCell.propTypes = { row: PropTypes.any, value: PropTypes.any }
const AssetNameCell = ({ value, row }) => {
  const dispatcher = useEventDispatch()
  const onClick = useCallback(() => {
    dispatcher('clicked', 'asset')
  }, [dispatcher])
  return (
    <Link href={`/trade/${row.original.id}`}>
      <button onClick={onClick}>
        <AssetCoin>{value}</AssetCoin>
      </button>
    </Link>
  )
}
AssetNameCell.propTypes = { row: PropTypes.any, value: PropTypes.any }
const AssetTotalCell = ({ value }) => <AssetTotal>{value}</AssetTotal>
AssetTotalCell.propTypes = { value: PropTypes.any }
const AssetAvailableCell = ({ value }) => <AssetAvailable>{value}</AssetAvailable>
AssetAvailableCell.propTypes = { value: PropTypes.any }
const AssetInOrderCell = ({ value }) => <AssetInOrder>{value}</AssetInOrder>
AssetInOrderCell.propTypes = { value: PropTypes.any }
const AssetAlgoValueCell = ({ value }) => <AssetAlgoValue>{value}</AssetAlgoValue>
AssetAlgoValueCell.propTypes = { value: PropTypes.any }
function AssetsTab() {
  const { t, lang } = useTranslation('orders')

  const activeWalletAddress = useStorePersisted((state) => state.activeWalletAddress)
  const isSignedIn = useStore((state) => state.isSignedIn)

  const walletAssetsTableState = useUserStore((state) => state.walletAssetsTableState)
  const setWalletAssetsTableState = useUserStore((state) => state.setWalletAssetsTableState)

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
        <Table
          initialState={walletAssetsTableState}
          onStateChange={(state) => setWalletAssetsTableState(state)}
          columns={columns}
          data={assetsData || []}
        />
      </TableWrapper>

      {renderStatus()}
    </Container>
  )
}

export default AssetsTab
