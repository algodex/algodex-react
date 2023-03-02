import React, { useRef, useState } from 'react'
import { SearchTable, TableColumnType } from './Sale/SearchTable'
import { styles } from './styles.css'

//MUI Components
import Box from '@mui/material/Box'

// Custom Styled Components
import OutlinedInput from '@/components/Input/OutlinedInput'

export const SearchInput = ({
  value,
  name,
  onChange,
  columns,
  rowData,
  placeholder
}: {
  value: string | number
  name: string
  onChange: (e: unknown) => void
  columns: TableColumnType[]
  rowData: unknown[]
  placeholder: string
}) => {
  const [showTable, setShowTable] = useState(false)
  const dropdownRef = useRef(null)

  return (
    <Box className="mb-4 px-4 relative" ref={dropdownRef}>
      <OutlinedInput
        type="text"
        placeholder={placeholder}
        name={name}
        value={value}
        onChange={(e) => onChange(e)}
        onFocus={() => setShowTable(true)}
        sx={styles.input}
      />
      <SearchTable
        columns={columns}
        rowData={rowData}
        showTable={showTable}
        setShowTable={setShowTable}
        dropdownRef={dropdownRef}
      />
    </Box>
  )
}
