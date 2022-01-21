import React, { useEffect, useState, useCallback } from 'react'
import { useSortBy, useTable } from 'react-table'

import PropTypes from 'prop-types'
import _ from 'lodash'
import styled from 'styled-components'
import { rgba } from 'polished'
import Icon from 'components/Icon'
import InfoFlyover from './InfoFlyover'
import { usePopperTooltip } from 'react-popper-tooltip'

export const SortIcon = styled(Icon)`
  position: relative;
  top: -1px;
  margin-left: 0.25rem;
`

export const Container = styled.div`
  // min-width: 600px;
  // overflow: hidden;

  table {
    position: relative;
    border-spacing: 0;
    border: none;
    width: 100%;
    @media only (min-width: 996px) {
      min-width: unset;
    }

    tr {
      &:hover {
        cursor: pointer;
      }

      &:nth-child(odd) {
        td {
          background-color: ${({ theme }) => rgba(theme.colors.gray['000'], 0.01)};
        }
      }

      &:nth-child(odd),
      &:nth-child(even) {
        &:hover {
          td {
            background-color: ${({ theme }) => rgba(theme.colors.gray['000'], 0.04)};
          }
        }
      }
    }

    th,
    td {
      margin: 0;
      padding: 0.5rem 0;
      color: ${({ theme }) => theme.colors.gray['600']};
      font-size: 0.75rem;
      line-height: 1.25;

      &:first-child {
        padding-left: 1.125rem;
      }
      padding-right: 0.5rem;
    }

    thead {
      position: sticky;
      tr {
        th {
          position: sticky;
          top: 0;
          padding: 0.75rem 0;
          background-color: ${({ theme }) => theme.colors.gray['800']};
          color: ${({ theme }) => theme.colors.gray['500']};
          text-align: left;
          text-transform: uppercase;
          font-weight: 500;
          user-select: none;
          white-space: nowrap;
          padding-right: 0.5rem;
        }
      }
    }
  }
`
// const AbsoluteTemp = styled.div`
//   position: absolute;
// `

/**
 * Table Component
 *
 * Uses react-table and provides an easy way to create a tables
 *
 * @see https://react-table.tanstack.com/
 *
 * @param {object} props Component Properties
 * @param {object} props.initialState Initial <Table> State
 * @param {function} props.onStateChange Triggered when the tableState is mutated
 * @param {Array<Column>} props.columns Array of columns for the <Table>
 * @param {Array<any>>} props.data Data to display in the <Table>
 * @returns {JSX.Element}
 * @constructor
 */
function Table({
  components,
  componentsProps,
  flyover,
  flyoverPlacement,
  initialState,
  onStateChange,
  columns,
  data,
  getRowProps
}) {
  const { Flyover = InfoFlyover } = components

  const { getArrowProps, getTooltipProps, setTooltipRef, setTriggerRef, visible } =
    usePopperTooltip({ placement: flyoverPlacement, visible: true })

  const [itemInfo, setItemInfo] = useState({})

  const handleRowFocus = useCallback(
    (item) => {
      setItemInfo(item.original)
    },
    [setItemInfo]
  )

  const handleRowLeave = useCallback(() => {
    setItemInfo({})
  }, [setItemInfo])

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
    <Container ref={setTriggerRef}>
      <table {...getTableProps()}>
        <thead>
          {headerGroups.map((headerGroup, rowKey) => (
            <tr key={rowKey} {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column, headerKey) => (
                <th key={headerKey} {...column.getHeaderProps(column.getSortByToggleProps())}>
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
          {rows.map((row, rowKey) => {
            prepareRow(row)
            const customProps = getRowProps(row)
            if (flyover) {
              customProps.onMouseLeave = () => handleRowLeave(row)
              customProps.onMouseEnter = () => handleRowFocus(row)
            }
            return (
              <tr key={rowKey} {...row.getRowProps(customProps)}>
                {row.cells.map((cell, cellKey) => {
                  return (
                    <td key={cellKey} {...cell.getCellProps()}>
                      {cell.render('Cell')}
                    </td>
                  )
                })}
              </tr>
            )
          })}
        </tbody>
      </table>
      {/*<AbsoluteTemp>*/}
      {visible && (
        <div ref={setTooltipRef} {...getTooltipProps({ className: 'tooltip-container' })}>
          {console.log(itemInfo)}
          <Flyover row={itemInfo} {...componentsProps.Flyover} />
          <div {...getArrowProps({ className: 'tooltip-arrow' })} />
        </div>
      )}
      {/*</AbsoluteTemp>*/}
    </Container>
  )
}

Table.propTypes = {
  components: PropTypes.object,
  componentsProps: PropTypes.object,
  initialState: PropTypes.any.isRequired,
  onStateChange: PropTypes.func.isRequired,
  columns: PropTypes.array.isRequired,
  data: PropTypes.array.isRequired,
  getRowProps: PropTypes.func,
  flyover: PropTypes.bool,
  flyoverPlacement: PropTypes.string
}

Table.defaultProps = {
  components: { Flyover: InfoFlyover },
  componentsProps: {},
  flyover: false,
  flyoverPlacement: 'right',
  getRowProps: () => {
    return {}
  }
}

export default Table
