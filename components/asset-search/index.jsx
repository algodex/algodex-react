/* eslint-disable react/jsx-key */
import { useState, useMemo } from 'react'
// import PropTypes from 'prop-types'
import { useTable, useSortBy, useFilters, useGlobalFilter, useAsyncDebounce } from 'react-table'
import Search from 'components/search'

import makeData from './demo'

import {
  Container,
  SearchContainer,
  AssetsContainer,
  TableWrapper,
  AssetName,
  PairSlash,
  AssetPrice,
  AssetChange,
  SortIcon,
  TableContainer
} from './asset-search.css'

// eslint-disable-next-line react/prop-types
const AssetNameCell = ({ value }) => (
  <>
    <AssetName>{value}</AssetName>
    <PairSlash>{`/`}</PairSlash>
    ALGO
  </>
)

// eslint-disable-next-line react/prop-types
const AssetPriceCell = ({ value }) => <AssetPrice>{value.toFixed(3)}</AssetPrice>

// eslint-disable-next-line react/prop-types
const AssetChangeCell = ({ value }) => (
  <AssetChange value={value}>{`${value < 0 ? '' : '+'}${value}%`}</AssetChange>
)

// eslint-disable-next-line react/prop-types
function GlobalFilter({ globalFilter, setGlobalFilter }) {
  const [value, setValue] = useState(globalFilter)
  const onChange = useAsyncDebounce((value) => {
    setGlobalFilter(value || undefined)
  }, 200)

  return (
    <Search
      value={value || ''}
      onChange={(e) => {
        setValue(e.target.value)
        onChange(e.target.value)
      }}
      placeholder="Search"
    />
  )
}

function AssetSearch() {
  const [searchText, setSearchText] = useState('') // State for small screen search
  const data = useMemo(() => makeData(), [])

  const columns = useMemo(
    () => [
      {
        Header: 'Pair',
        accessor: 'name',
        Cell: AssetNameCell
      },
      {
        Header: 'Price',
        accessor: 'price',
        Cell: AssetPriceCell
      },
      {
        Header: 'Change',
        accessor: 'change',
        Cell: AssetChangeCell
      }
    ],
    []
  )

  const filterTypes = useMemo(
    () => ({
      text: (rows, id, filterValue) => {
        return rows.filter((row) => {
          const rowValue = row.values[id]
          return rowValue !== undefined
            ? String(rowValue).toLowerCase().startsWith(String(filterValue).toLowerCase())
            : true
        })
      }
    }),
    []
  )

  const handleAssetClick = (name) => {
    alert(`Navigate to https://algodex.com/trade/${name}-ALGO/`)
  }

  const getRowProps = (row) => ({
    role: 'button',
    tabIndex: '0',
    onClick: () => handleAssetClick(row.original.name),
    onKeyDown: (e) => {
      if (e.key === ' ' || e.key === 'Enter') {
        handleAssetClick(row.original.name)
      }
    }
  })

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    state,
    visibleColumns,
    setGlobalFilter
  } = useTable(
    {
      columns,
      data,
      filterTypes
    },
    useFilters,
    useGlobalFilter,
    useSortBy
  )

  return (
    <Container>
      {/* This is for smaller screen sizes, not sure how it will work/look yet */}
      <SearchContainer>
        <Search
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          placeholder="Search"
        />
      </SearchContainer>

      {/* This appears on > 1536px screens, uses React Table */}
      <AssetsContainer>
        <TableWrapper>
          <TableContainer>
            <table {...getTableProps()}>
              <thead>
                <tr>
                  <th colSpan={visibleColumns.length}>
                    <GlobalFilter
                      globalFilter={state.globalFilter}
                      setGlobalFilter={setGlobalFilter}
                    />
                  </th>
                </tr>
                {headerGroups.map((headerGroup) => (
                  <tr {...headerGroup.getHeaderGroupProps()}>
                    {headerGroup.headers.map((column) => (
                      // Add the sorting props to control sorting. For this example
                      // we can add them into the header props
                      <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                        {column.render('Header')}
                        {/* Add a sort direction indicator */}
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
                    <tr {...row.getRowProps(getRowProps(row))}>
                      {row.cells.map((cell) => {
                        return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                      })}
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </TableContainer>
        </TableWrapper>
      </AssetsContainer>
    </Container>
  )
}

// AssetSearch.propTypes = {}

export default AssetSearch
