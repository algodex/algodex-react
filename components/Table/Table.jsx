import React, { useCallback, useEffect, useState } from 'react'
import { useFlexLayout, useResizeColumns, useRowSelect, useSortBy, useTable } from 'react-table'

import { BrightGraySpan } from '@/components/Typography'
import Fade from '@mui/material/Fade'
import Icon from '@/components/Icon'
import InfoFlyover from './InfoFlyover'
import Popper from '@mui/material/Popper'
import PropTypes from 'prop-types'
import _ from 'lodash'
import { rgba } from 'polished'
import styled from '@emotion/styled'

// import { usePopperTooltip } from 'react-popper-tooltip'

const SortIcon = styled(Icon)`
  position: relative;
  top: -1px;
  margin-left: 0.25rem;
`

const Container = styled.div`
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

    & ::-webkit-scrollbar {
      display: none;
      width: 0px;
    }

    tr {
      &:hover {
        // cursor: pointer;
      }

      &:nth-child(odd) {
        td {
          background-color: ${({ theme }) => rgba(theme.palette.gray['000'], 0.01)};
        }
      }

      &:nth-child(odd),
      &:nth-child(even) {
        &:hover {
          td {
            background-color: ${({ theme }) => rgba(theme.palette.gray['000'], 0.04)};
          }
        }
      }
    }

    th,
    td {
      margin: 0;
      padding: 0.5rem 0.4rem;
      color: ${({ theme }) => theme.palette.gray['600']};
      font-size: 0.75rem;
      line-height: 1.25;

      &:first-child {
        padding-left: 1.125rem;
        box-sizing: border-box;
        flex: 45 0 auto;
        min-width: 45px;
        width: 45px;
      }
      padding-right: 0.5rem;
    }

    thead {
      position: sticky;
      tr {
        th {
          position: sticky;
          top: 0;
          padding: 0.75rem 0.4rem;
          background-color: ${({ theme }) => theme.palette.gray['800']};
          color: ${({ theme }) => theme.palette.gray['500']};
          text-align: left;
          text-transform: uppercase;
          font-weight: 500;
          user-select: none;
          white-space: nowrap;
          padding-right: 0.5rem;
        }
      }
    }
    tbody {
      position: absolute;
      width: 100%;
      height: ${({ optionalGridInfo }) => optionalGridInfo && `${optionalGridInfo.height}px`};
      overflow-y: scroll;
      @media (max-width: 996px) {
        height: ${({ tableSizeOnMobile }) => tableSizeOnMobile && `${tableSizeOnMobile.height}px`};
        padding-bottom: 4rem;
      }
      @media (max-width: 375px) {
        height: ${({ tableSizeOnMobile }) => tableSizeOnMobile && `${tableSizeOnMobile.height}px`};
        padding-bottom: 6rem;
      }
    }
  }
`
// height: ${({ optionalGridInfo }) => optionalGridInfo && `${optionalGridInfo.height - 126}px`};
export function DefaultCell({ value }) {
  return (
    <BrightGraySpan className="cursor-default" title={value} data-testid="default-cell">
      {value}
    </BrightGraySpan>
  )
}
DefaultCell.propTypes = { value: PropTypes.any }

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
  getRowProps,
  optionalGridInfo,
  tableSizeOnMobile
}) {
  const { Flyover = InfoFlyover } = components

  const [anchorEl, setAnchorEl] = useState(null)
  const [open, setOpen] = useState(false)
  const [itemInfo, setItemInfo] = useState({})

  const handleRowFocus = useCallback(
    (event, item) => {
      setItemInfo(item.original)
      setAnchorEl(anchorEl ? null : event.currentTarget)
      setOpen(true)
    },
    [setItemInfo]
  )

  const handleRowLeave = useCallback(() => {
    setItemInfo(null)
    setOpen(false)
    setAnchorEl(null)
  }, [])

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
    useSortBy,
    useFlexLayout,
    useResizeColumns,
    useRowSelect
  )
  useEffect(() => {
    if (!_.isEqual(tableState, initialState)) {
      onStateChange(tableState)
    }
  }, [onStateChange, initialState, tableState])
  return (
    <Container optionalGridInfo={optionalGridInfo} tableSizeOnMobile={tableSizeOnMobile}>
      <table {...getTableProps()} data-testid="data-table">
        <thead>
          {headerGroups.map((headerGroup, rowKey) => (
            <tr data-testid="header-row" key={rowKey} {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column, headerKey) => (
                <th
                  data-testid="header-item-col"
                  key={headerKey}
                  className="flex items-center border-r border-solid border-gray-700"
                  {...column.getHeaderProps(column.getSortByToggleProps())}
                >
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
              customProps.onMouseLeave = () => handleRowLeave()
              customProps.onMouseEnter = (event) => handleRowFocus(event, row)
            }
            return (
              <tr
                className="border-t border-solid border-gray-700"
                data-testid="row-item"
                key={rowKey}
                {...row.getRowProps(customProps)}
              >
                {row.cells.map((cell, cellKey) => {
                  return (
                    <td
                      data-testid="item"
                      className="whitespace-nowrap border-r border-solid border-gray-700"
                      key={cellKey}
                      {...cell.getCellProps()}
                    >
                      {cell.render('Cell')}
                    </td>
                  )
                })}
              </tr>
            )
          })}
        </tbody>
      </table>
      {itemInfo && (
        <Popper
          style={{ zIndex: '10' }}
          open={open}
          anchorEl={anchorEl}
          placement={flyoverPlacement}
          transition
        >
          {({ TransitionProps }) => (
            <Fade {...TransitionProps} timeout={0}>
              <div>
                <Flyover isLarge={true} row={itemInfo} {...componentsProps.Flyover} />
              </div>
            </Fade>
          )}
        </Popper>
      )}
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
  flyoverPlacement: PropTypes.string,
  optionalGridInfo: PropTypes.object,
  tableSizeOnMobile: PropTypes.object
}

Table.defaultProps = {
  components: { Flyover: InfoFlyover },
  componentsProps: {},
  flyover: false,
  flyoverPlacement: 'right',
  getRowProps: () => {
    return {}
  },
  optionalGridInfo: {},
  tableSizeOnMobile: {}
}

export default Table
