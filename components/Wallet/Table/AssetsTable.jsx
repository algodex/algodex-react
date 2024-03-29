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

import { AssetId, AssetNameBlock } from '@/components/Asset/Typography'
import Table, { AssetNameCell, DefaultCell } from '@/components/Table'
import { useCallback, useMemo } from 'react'

import Link from 'next/link'
import PropTypes from 'prop-types'
// import { Typography } from '@/components/Typography'
import Typography from '@mui/material/Typography'
import styled from '@emotion/styled'
import { useEventDispatch } from '@/hooks/useEvents'
import useTranslation from 'next-translate/useTranslation'
import useUserStore from '@/store/use-user-state'
import { withWalletAssetsQuery } from '@/hooks'

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
      <AssetNameBlock
        onClick={onClick}
        className="cursor-pointer text-left"
        data-testid="asset-coin-cell"
      >
        <Typography variant="body_small" color="gray.000">
          {props.value}
        </Typography>
        <br />
        <AssetId>{props.row.original.id}</AssetId>
      </AssetNameBlock>
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
