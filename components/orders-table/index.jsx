import { Container, SortIcon } from './orders-table.css'
/* eslint-disable react/jsx-key  */
import React, { useEffect } from 'react'
import { useSortBy, useTable } from 'react-table'

import PropTypes from 'prop-types'
import _ from 'lodash'

/**
 * WARNING! This is also an Assets Table!
 * @param initialState
 * @param onStateChange
 * @param columns
 * @param data
 * @returns {JSX.Element}
 * @constructor
 */
function OrdersTable({ initialState, onStateChange, columns, data }) {
  const {
    state: tableState,
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow
  } = useTable(
    {
      columns,
      data,
      initialState
    },
    useSortBy
  )
  useEffect(() => {
    if (!_.isEqual(tableState, initialState)) {
      onStateChange(tableState)
    }
  }, [onStateChange, initialState, tableState])
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
  initialState: PropTypes.any.isRequired,
  onStateChange: PropTypes.func.isRequired,
  columns: PropTypes.array.isRequired,
  data: PropTypes.array.isRequired
}

export default OrdersTable
