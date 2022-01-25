import PropTypes from 'prop-types'
import { useCallback, useMemo } from 'react'
import styled from 'styled-components'
import useTranslation from 'next-translate/useTranslation'
import Link from 'next/link'
import { AssetId, AssetNameBlock } from '@/components/Asset/Typography'
import Table from '@/components/Table'
import useUserStore from '@/store/use-user-state'
import { useEventDispatch } from '@/hooks/useEvents'
import { withWalletAssetsQuery } from '@/hooks/withAlgodex'

const Container = styled.div`
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

const AssetCoin = styled.span`
  color: ${({ theme }) => theme.colors.gray['000']};
`
const AssetName = styled.span`
  color: ${({ theme }) => theme.colors.gray['000']};
`
const AssetTotal = styled.span`
  color: ${({ theme }) => theme.colors.gray['000']};
`

const AssetAvailable = styled.span`
  color: ${({ theme }) => theme.colors.gray['000']};
`
const AssetInOrder = styled.span`
  color: ${({ theme }) => theme.colors.gray['000']};
`
const AssetAlgoValue = styled.span`
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

export function AssetsTable({ assets }) {
  console.log(`AssetsTable(`, arguments[0], `)`)

  const { t } = useTranslation('orders')

  const walletAssetsTableState = useUserStore((state) => state.walletAssetsTableState)
  const setWalletAssetsTableState = useUserStore((state) => state.setWalletAssetsTableState)

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
    [t]
  )

  return (
    <Container style={{ height: '6rem' }}>
      <TableWrapper>
        <Table
          initialState={walletAssetsTableState}
          onStateChange={(state) => setWalletAssetsTableState(state)}
          columns={columns}
          data={assets || []}
        />
      </TableWrapper>
    </Container>
  )
}

AssetsTable.propTypes = {
  wallet: PropTypes.shape({
    address: PropTypes.string.isRequired
  }),
  assets: PropTypes.array.isRequired
}

AssetsTable.defaultProps = {
  assets: []
}

export default withWalletAssetsQuery(AssetsTable)
