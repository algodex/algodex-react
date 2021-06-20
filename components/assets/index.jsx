import React, { useMemo, useRef } from 'react'
import { useTable, useSortBy } from 'react-table'
import { BodyCopyTiny, BodyCopySm } from 'components/type'
import dayjs from 'dayjs'
// import { useQuery } from 'react-query'
import {
  AssetCoin,
  AssetName,
  AssetTotal,
  AssetAvailable,
  AssetInOrder,
  AssetAlgoValue,
  StatusContainer,
  TableWrapper,
  Container,
  TableContainer,
  TableHeader,
  SortIcon
} from './assets.css'

const AssetCoinCell = ({ value }) => <AssetCoin>{value}</AssetCoin>

const AssetNameCell = ({ value }) => <AssetName>{value}</AssetName>

const AssetTotalCell = ({ value }) => <AssetTotal>{value}</AssetTotal>

const AssetAvailableCell = ({ value }) => <AssetAvailable>{value}</AssetAvailable>

const AssetInOrderCell = ({ value }) => <AssetInOrder>{value}</AssetInOrder>

const AssetAlgoValueCell = ({ value }) => <AssetAlgoValue>{value}</AssetAlgoValue>

function OpenOrders({ gridSize, openOrders }) {
  // const { status, data, error } = useQuery('openOrders', fetchOpenOrders)

  const error = {}
  const priceData = [
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
  ]

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

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = useTable({
    columns,
    data: priceData
  })

  const containerRef = useRef()

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
    <Container ref={containerRef} gridHeight={gridSize.height}>
      <TableWrapper>
        <TableContainer>
          <table {...getTableProps()}>
            <thead>
              {headerGroups.map((headerGroup) => (
                <tr {...headerGroup.getHeaderGroupProps()} key={headerGroup}>
                  {headerGroup.headers.map((column) => (
                    <TableHeader key={column} searchHeight={false}>
                      {column.render('Header')}
                      {!column.isSorted ? (
                        <SortIcon use="sortNone" size={0.625} />
                      ) : column.isSortedDesc ? (
                        <SortIcon use="sortDesc" size={0.625} />
                      ) : (
                        <SortIcon use="sortAsc" size={0.625} />
                      )}
                    </TableHeader>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody {...getTableBodyProps()}>
              {rows.map((row) => {
                prepareRow(row)
                return (
                  <tr {...row.getRowProps(row)} key={row}>
                    {row.cells.map((cell) => {
                      return (
                        <td {...cell.getCellProps()} key={cell}>
                          {cell.render('Cell')}
                        </td>
                      )
                    })}
                  </tr>
                )
              })}
            </tbody>
          </table>
        </TableContainer>
      </TableWrapper>

      {renderStatus()}
    </Container>
  )
}

export default OpenOrders
