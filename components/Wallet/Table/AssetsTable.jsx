import PropTypes from 'prop-types'
import { useCallback, useMemo } from 'react'
import styled from '@emotion/styled'
import useTranslation from 'next-translate/useTranslation'
import Link from 'next/link'
import { BrightGraySpan } from '@/components/Typography'
import { AssetId, AssetNameBlock } from '@/components/Asset/Typography'
import Table, { DefaultCell, AssetNameCell } from '@/components/Table'
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

export const AssetCoinCell = (props) => {
  const dispatcher = useEventDispatch()
  const onClick = useCallback(() => {
    dispatcher('clicked', 'asset')
  }, [dispatcher])
  return (
    <Link href={`/trade/${props.row.original.id}`}>
      <button onClick={onClick}>
        <AssetNameBlock data-testid="asset-coin-cell">
          <BrightGraySpan>{props.value}</BrightGraySpan>
          <br />
          <AssetId>{props.row.original.id}</AssetId>
        </AssetNameBlock>
      </button>
    </Link>
  )
}
AssetCoinCell.propTypes = { row: PropTypes.any, value: PropTypes.any }

export function AssetsTable({ assets }) {
  // console.log(`AssetsTable(`, arguments[0], `)`)

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
        Cell: DefaultCell
      },
      {
        Header: t('available'),
        accessor: 'available',
        Cell: DefaultCell
      },
      {
        Header: t('in-order'),
        accessor: 'in-order',
        Cell: DefaultCell
      },
      {
        Header: t('algo-value'),
        accessor: 'algo-value',
        Cell: DefaultCell
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
