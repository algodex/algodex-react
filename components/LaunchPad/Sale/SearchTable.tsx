import React from 'react'

//MUI components
import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell, { tableCellClasses } from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import { styled } from '@mui/material/styles'

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    color: theme.palette.primary.light,
    border: '0.1px solid',
    borderColor: theme.palette.primary.light,
    fontSize: 15,
    fontWeight: 600
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
    color: theme.palette.secondary.contrastText,
    border: '0.1px solid',
    borderColor: theme.palette.primary.light
  }
}))

type columnType = {
  id: string
  label: string
  align?: 'left' | 'center' | 'right' | 'justify' | 'inherit'
  minWidth?: number
}

export const SearchTable = ({
  columns,
  rowData
}: {
  columns: Array<columnType>
  rowData: Array<unknown>
}) => {
  if (rowData.length === 0) {
    return null
  }

  return (
    <Paper
      sx={{
        width: '100%',
        overflow: 'hidden',
        backgroundColor: 'transparent',
        border: '1px solid',
        borderColor: 'primary.light'
      }}
    >
      <TableContainer sx={{ maxHeight: 400 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((item) => (
                <StyledTableCell
                  key={item.id}
                  align={item.align}
                  sx={{
                    backgroundColor: 'gray.550'
                  }}
                >
                  {item.label}
                </StyledTableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rowData.map((row, index) => {
              return (
                <TableRow
                  hover
                  tabIndex={-1}
                  key={index}
                  sx={{
                    cursor: 'pointer',
                    '&:nth-of-type(odd)': {
                      backgroundColor: 'gray.650'
                    }
                  }}
                >
                  {columns.map((column) => {
                    const value = row[column.id]
                    return (
                      <StyledTableCell
                        key={column.id}
                        align={column.align}
                        data-testid={`column-${column.id}-${value}`}
                      >
                        {value}
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
