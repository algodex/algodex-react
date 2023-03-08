import React, { MutableRefObject, useEffect, useMemo, useState } from 'react'
import Icon from '@/components/Icon'

//MUI components
import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell, { tableCellClasses } from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import { styled } from '@mui/material/styles'
import Box from '@mui/material/Box'
import TableSortLabel from '@mui/material/TableSortLabel'
import { selectedAsset } from '@/components/types'

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  color: 'gray.800',
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: 'white',
    border: '0.1px solid',
    borderColor: theme.palette.primary.light,
    fontSize: 10,
    textTransform: 'uppercase',
    paddingBlock: '3px'
  },
  [`&.${tableCellClasses.body}`]: {
    fontWeight: 600,
    fontSize: 14,
    border: '0.1px solid',
    borderColor: theme.palette.primary.light,
    paddingBlock: '8px'
  }
}))

const SortIcon = styled(Icon)`
  margin-left: 0.25rem;
`

export type TableColumnType = {
  id: string
  label: string
  align?: 'left' | 'center' | 'right' | 'justify' | 'inherit'
  minWidth?: number
  format?: (val: number) => string
}

export const SearchTable = ({
  columns,
  rowData,
  showTable,
  setShowTable,
  dropdownRef,
  setSelectedAsset
}: {
  columns: Array<TableColumnType>
  rowData: Array<unknown>
  showTable: boolean
  setShowTable: (v: boolean) => void
  dropdownRef: MutableRefObject<Element>
  setSelectedAsset: React.Dispatch<React.SetStateAction<selectedAsset>>
}) => {
  const [order, setOrder] = useState<'asc' | 'desc'>('desc')
  const [orderBy, setOrderBy] = useState('assetName')

  const createSortHandler = (property: string) => {
    const isAsc = orderBy === property && order === 'asc'
    setOrder(isAsc ? 'desc' : 'asc')
    setOrderBy(property)
  }

  const sortedData = useMemo(() => {
    if (order === 'asc') {
      return rowData.sort((a, b) => `${a[orderBy]}`.localeCompare(`${b[orderBy]}`))
    } else {
      return rowData.sort((a, b) => `${b[orderBy]}`.localeCompare(`${a[orderBy]}`))
    }
  }, [rowData, order, orderBy])

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setShowTable(false)
    }
  }

  useEffect(() => {
    document.addEventListener('click', handleClickOutside, true)
    return () => {
      document.removeEventListener('click', handleClickOutside, true)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  if (rowData.length === 0 || !showTable) {
    return null
  }

  return (
    <Paper
      sx={{
        width: '95%',
        overflow: 'hidden',
        backgroundColor: 'white',
        border: '1px solid',
        borderColor: 'primary.light',
        position: 'absolute',
        zIndex: 1
      }}
    >
      <TableContainer sx={{ maxHeight: 400 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((col) => (
                <StyledTableCell
                  key={col.id}
                  //                   align={col.align}
                  sortDirection={orderBy === col.id ? order : false}
                >
                  <TableSortLabel
                    active={orderBy === col.id}
                    direction={orderBy === col.id ? order : 'asc'}
                    onClick={() => createSortHandler(col.id)}
                    sx={{
                      '.css-1vweko9-MuiSvgIcon-root-MuiTableSortLabel-icon, .css-3l415a-MuiSvgIcon-root-MuiTableSortLabel-icon, .css-s6n6v6, .css-tqymag':
                        {
                          display: 'none'
                        }
                    }}
                  >
                    {col.label}
                    <Box component="span">
                      <SortIcon
                        use={
                          orderBy !== col.id
                            ? 'sortNone'
                            : order === 'desc'
                            ? 'sortDesc'
                            : 'sortAsc'
                        }
                        size={0.625}
                      />
                    </Box>
                  </TableSortLabel>
                </StyledTableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {sortedData.map((row, index) => {
              return (
                <TableRow
                  hover
                  tabIndex={-1}
                  key={index}
                  sx={{
                    cursor: 'pointer'
                  }}
                  onClick={() => {
                    setSelectedAsset(row as selectedAsset)
                    setShowTable(false)
                  }}
                >
                  {columns.map((column) => {
                    return (
                      <StyledTableCell
                        key={column.id}
                        align={column.align}
                        sx={{
                          color: 'gray.800'
                        }}
                      >
                        {column.format && typeof row[column.id] === 'number'
                          ? column.format(row[column.id])
                          : row[column.id]}
                      </StyledTableCell>
                    )
                  })}
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  )
}
