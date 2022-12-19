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

import React, { useCallback, useMemo, useState } from 'react'
import { useFlexLayout, useResizeColumns, useRowSelect, useSortBy, useTable } from 'react-table'

import Fade from '@mui/material/Fade'
import Icon from '@/components/Icon'
import InfoFlyover from './InfoFlyover'
import Popper from '@mui/material/Popper'
import PropTypes from 'prop-types'
// import { Typography } from '@/components/Typography'
import Typography from '@mui/material/Typography'
import _ from 'lodash'
import { css } from '@emotion/react'
import { rgba } from 'polished'
import styled from '@emotion/styled'
import { useInversionStatus } from '@/hooks/utils/useInversionStatus'
import { useRouter } from 'next/router'
import { floatToFixedDisplay } from '@/services/display';

// import { usePopperTooltip } from 'react-popper-tooltip'

const styleReset = css`
  margin: 0;
  padding: 0;
  // border: 0;
  font-size: 100%;
  font: inherit;
  vertical-align: baseline;
`
const UPPERBODYHEIGHT = 125

const SortIcon = styled(Icon)`
  position: relative;
  top: -1px;
  margin-left: 0.25rem;
`

const Container = styled.div`
  margin: 0;
  padding: 0;
  border: 0;
  font-size: 100%;
  font: inherit;
  vertical-align: baseline;

  // min-width: 600px;
  // overflow: hidden;
  p,
  table,
  tbody,
  tfoot,
  thead,
  tr,
  th,
  td {
    ${styleReset}
  }
  display: flex;
  height: 100%;
  table {
    position: relative;
    border-spacing: 0;
    border: none;
    width: 100%;
    scrollbar-width: none;
    height: inherit;
    & ::-webkit-scrollbar {
      display: none;
      width: 0px;
    }

    tr {
      &:hover {
        // cursor: pointer;
      }

      &:nth-of-type(odd) {
        td {
          background-color: ${({ theme }) => rgba(theme.palette.gray['000'], 0.01)};
        }
      }

      &:nth-of-type(odd),
      &:nth-of-type(even) {
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
      border-right: solid 1px ${({ theme }) => theme.palette.gray['700']};
      border-bottom: solid 1px ${({ theme }) => theme.palette.gray['700']};
      &:first-of-type {
        padding-left: 1.125rem;
        box-sizing: border-box;
        flex: 45 0 auto;
        min-width: 45px;
        width: 45px;
      }
    }

    thead {
      position: sticky;
      tr {
        border: none;
        th {
          border: none;
          position: sticky;
          top: 0;
          padding: 0.75rem 0.4rem;
          background-color: ${({ theme }) => theme.palette.gray['800']};
          color: ${({ theme }) => theme.palette.gray['500']};
          border: solid 1px ${({ theme }) => theme.palette.gray['700']};
          // border-bottom: solid 1px ${({ theme }) => theme.palette.gray['700']};
          text-align: left;
          text-transform: uppercase;
          font-weight: 500;
          user-select: none;
          white-space: nowrap;
        }
      }
    }
    tbody {
      scrollbar-width: none;
      scrollbar-display: none;
      
      tr {
        border: 0;
      }
      position: absolute;
      top: 37px;
      width: 100%;
      height: ${({ optionalGridInfo }) => {
    return optionalGridInfo && (optionalGridInfo.height - UPPERBODYHEIGHT) > 0 ? `${optionalGridInfo.height - UPPERBODYHEIGHT}px` : `inherit`
  }};
      overflow-y: scroll;
      @media (max-width: 996px) {
        height: ${({ tableSizeOnMobile }) => tableSizeOnMobile && `${tableSizeOnMobile.height - 128}px`};
        padding-bottom: 3rem;
      }
      @media (max-width: 375px) {
        height: ${({ tableSizeOnMobile }) => tableSizeOnMobile && `${tableSizeOnMobile.height - 75}px`};
        padding-bottom: 6rem;
      }
    }
  }
`
// height: ${({ optionalGridInfo }) => optionalGridInfo && `${optionalGridInfo.height - 126}px`};
// export function DefaultCell({ value, row }) {
//   const isInverted = useInversionStatus(row.original.id)
//   const assetId = useMemo(() => row?.original?.asset?.id || row?.original?.id,
//     [row?.original?.asset?.id, row?.original?.id])
//   const { query } = useRouter()
//   const formattedValue = useMemo(() => {
//     if (isInverted && parseInt(query.id) === assetId && !isNaN(parseFloat(value))) {
//       const val = 1 / value
//       if (value == 0) {
//         return value
//       } else {
//         return isInverted && parseInt(query.id) === assetId ? parseFloat(val).toFixed(6) : value
//       }
//     } else {
//       return value
//     }
//   }, [isInverted, value])
//   return (
//     <Typography
//       variant="body_small"
//       color="gray.000"
//       className="cursor-default"
//       title={value}
//       data-testid="default-cell"
//     >
//       {formattedValue}
//     </Typography>
//   )
// }
// DefaultCell.propTypes = { value: PropTypes.any, row: PropTypes.object }

export function PriceCell({ value, row }) {
  const isInverted = useInversionStatus(row.original.id)
  const assetId = useMemo(() => row?.original?.asset?.id || row?.original?.id,
    [row?.original?.asset?.id, row?.original?.id])
  const { query } = useRouter()
  const {price, amount} = row.original
  const formattedValue = useMemo(() => {
    if (isInverted && parseInt(query.id) === assetId) {
      return parseFloat(amount/(price * amount))?.toFixed(6)
    } else {
      return value
    }
  }, [isInverted, value])
  return (
    <Typography
      variant="body_small"
      color="gray.000"
      className="cursor-default"
      title={value}
      data-testid="default-cell"
    >
      {formattedValue}
    </Typography>
  )
}
PriceCell.propTypes = { value: PropTypes.any, row: PropTypes.object }

export function DefaultCell({ value }) {
  return (
    <Typography
      variant="body_small"
      color="gray.000"
      className="cursor-default"
      title={value}
      data-testid="default-cell"
    >
      {value}
    </Typography>
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
  useMemo(() => {
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
                  className="flex items-center"
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
              <tr data-testid="row-item" key={rowKey} {...row.getRowProps(customProps)}>
                {row.cells.map((cell, cellKey) => {
                  return (
                    <td
                      data-testid="item"
                      className="whitespace-nowrap"
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
