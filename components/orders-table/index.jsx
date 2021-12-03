/* eslint-disable react/jsx-key  */
import React from 'react'
import PropTypes from 'prop-types'
import { useTable, useSortBy } from 'react-table'
import { Container, SortIcon } from './orders-table.css'

/**
 * WARNING! This is also an Assets Table!
 * @param columns
 * @param data
 * @returns {JSX.Element}
 * @constructor
 */
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
                  {!column.disableSortBy && (
                    <SortIcon
                      use={
                        !column.isSorted ? 'sortNone' : column.isSortedDesc ? 'sortDesc' : 'sortAsc'
                      }
                      size={0.625}
                    />
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
