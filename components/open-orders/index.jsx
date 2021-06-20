import React, { useMemo, useRef } from 'react'
import { useTable, useSortBy } from 'react-table'
import { BodyCopyTiny, BodyCopySm } from 'components/type'
import dayjs from 'dayjs'
// import { useQuery } from 'react-query'
import {
  OrderDate,
  OrderPrice,
  OrderPair,
  OrderType,
  OrderAmount,
  OrderFilled,
  OrderTotal,
  StatusContainer,
  TableWrapper,
  OpenOrdersContainer,
  TableContainer,
  TableHeader,
  SortIcon
} from './open-orders.css'

const OrderDateCell = ({ value }) => <OrderDate>{value}</OrderDate>

const OrderPriceCell = ({ value }) => <OrderPrice>{value}</OrderPrice>

const OrderPairCell = ({ value }) => <OrderPair>{value}</OrderPair>

const OrderTypeCell = ({ value }) => <OrderType value={value}>{value}</OrderType>

const OrderAmountCell = ({ value }) => <OrderAmount>{value}</OrderAmount>

const OrderFilledCell = ({ value }) => <OrderFilled>{value}</OrderFilled>

const OrderTotalCell = ({ value }) => <OrderTotal>{value}</OrderTotal>

function OpenOrders({ gridSize, openOrders }) {
  // const { status, data, error } = useQuery('openOrders', fetchOpenOrders)

  const error = {}
  const priceData = [
    {
      date: dayjs(new Date()).format('YYYY-MM-DD HH:mm:ss'),
      price: '0.458',
      pair: 'YLDY/ALGO',
      type: 'BUY',
      amount: '1000',
      filled: '125',
      total: '458'
    },
    {
      date: dayjs(new Date()).format('YYYY-MM-DD HH:mm:ss'),
      price: '0.501',
      pair: 'MCAU/ALGO',
      type: 'SELL',
      amount: '9000',
      filled: '3000',
      total: '4600'
    }
  ]

  const columns = useMemo(
    () => [
      {
        Header: 'Date',
        accessor: 'date',
        Cell: OrderDateCell
      },
      {
        Header: 'Pair',
        accessor: 'pair',
        Cell: OrderPairCell
      },
      {
        Header: 'Price (ALGO)',
        accessor: 'price',
        Cell: OrderPriceCell
      },
      {
        Header: 'Type',
        accessor: 'type',
        Cell: OrderTypeCell
      },
      {
        Header: 'Amount',
        accessor: 'amount',
        Cell: OrderAmountCell
      },
      {
        Header: 'Filled',
        accessor: 'filled',
        Cell: OrderFilledCell
      },
      {
        Header: 'Total',
        accessor: 'total',
        Cell: OrderTotalCell
      }
    ],
    []
  )

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = useTable(
    {
      columns,
      data: priceData
    }
    // useSortBy
  )

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
    <OpenOrdersContainer ref={containerRef} gridHeight={gridSize.height}>
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
    </OpenOrdersContainer>
  )
}

export default OpenOrders
