/* eslint-disable react/jsx-key  */
import React from 'react'
import PropTypes from 'prop-types'
import { useTable, useSortBy } from 'react-table'

import { Container, SortIcon } from './orders-table.css'

function OrdersTable({ columns, data }) {
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = useTable(
    {
      columns,
      data
    },
    useSortBy
  )

  return (
    <Container>
      <table {...getTableProps()}>
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                  {column.render('Header')}
                  {!column.isSorted ? (
                    <SortIcon use="sortNone" size={0.625} />
                  ) : column.isSortedDesc ? (
                    <SortIcon use="sortDesc" size={0.625} />
                  ) : (
                    <SortIcon use="sortAsc" size={0.625} />
                  )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map((row) => {
            prepareRow(row)
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map((cell) => {
                  return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                })}
              </tr>
            )
          })}
        </tbody>
      </table>
    </Container>
  )
}

OrdersTable.propTypes = {
  columns: PropTypes.array.isRequired,
  data: PropTypes.array.isRequired
}

export default OrdersTable
