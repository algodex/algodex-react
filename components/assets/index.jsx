/* eslint-disable react/prop-types  */
import { useMemo } from 'react'
// import { useQuery } from 'react-query'
import { BodyCopyTiny, BodyCopySm } from 'components/type'
import OrdersTable from 'components/orders-table'

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

function Assets({ assets }) {
  // const { status, data, error } = useQuery('openOrders', fetchOpenOrders)

  const error = {}

  const columns = useMemo(
    () => [
      {
        Header: 'Coin',
        accessor: 'coin',
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

  const data = useMemo(
    () => [
      {
        coin: 'YLDY',
        name: 'Yieldly',
        total: '500',
        available: '42',
        'in-order': '456',
        'algo-value': '250'
      },
      {
        coin: 'MCAU',
        name: 'Meld Gold',
        total: '1000',
        available: '420',
        'in-order': '580',
        'algo-value': '12000'
      }
    ],
    []
  )

  const renderStatus = () => {
    if (status === 'success') {
      return null
    }
    return (
      <StatusContainer>
        {status === 'loading' && <BodyCopyTiny color="gray.600">Loading&hellip;</BodyCopyTiny>}
        {status === 'error' && <BodyCopySm color="gray.400">Error: {error.message}</BodyCopySm>}
      </StatusContainer>
    )
  }

  return (
    <Container>
      <TableWrapper>
        <OrdersTable columns={columns} data={data} />
      </TableWrapper>

      {renderStatus()}
    </Container>
  )
}

export default Assets
