/* eslint-disable react/prop-types, react/jsx-key  */
import { useState, useEffect, useMemo, useRef, createRef } from 'react'
import PropTypes from 'prop-types'
import { useTable, useSortBy, useFilters, useGlobalFilter } from 'react-table'
import Search from 'components/search'

import makeData from './demo'

import {
  Container,
  AssetsContainer,
  TableWrapper,
  AssetName,
  PairSlash,
  AssetPrice,
  AssetChange,
  SortIcon,
  TableHeader,
  TableContainer
} from './asset-search.css'

const AssetNameCell = ({ value }) => (
  <>
    <AssetName>{value}</AssetName>
    <PairSlash>{`/`}</PairSlash>
    ALGO
  </>
)

const AssetPriceCell = ({ value }) => <AssetPrice>{value.toFixed(3)}</AssetPrice>

const AssetChangeCell = ({ value }) => (
  <AssetChange value={value}>{`${value < 0 ? '' : '+'}${value}%`}</AssetChange>
)

function GlobalFilter({
  globalFilter,
  setGlobalFilter,
  onSearchFocus,
  onExternalClick,
  containerRef,
  isActive
}) {
  const [value, setValue] = useState(globalFilter)

  /**
   * This ref is forwarded to the search input
   */
  const inputRef = createRef()

  /**
   * Blur search bar (if focused) when flyout is hidden
   */
  useEffect(() => {
    !isActive && inputRef?.current?.blur()
  }, [inputRef, isActive])

  const onChange = (value) => {
    setGlobalFilter(value || undefined)
  }

  /**
   * If the user clicks outside the expanded flyout, it should close, and click
   * listener can be removed
   */
  const handleClick = (e) => {
    if (!containerRef?.current.contains(e.target)) {
      onExternalClick()
      window.removeEventListener('click', handleClick)
    }
  }

  /**
   * Focusing on the search input triggers the flyout to appear. A listener is
   * added to detect clicks outside the expanded flyout.
   */
  const handleFocus = () => {
    onSearchFocus()
    window.addEventListener('click', handleClick)
  }

  return (
    <Search
      ref={inputRef}
      value={value || ''}
      onChange={(e) => {
        setValue(e.target.value)
        onChange(e.target.value)
      }}
      onCancel={() => {
        setValue(undefined)
        setGlobalFilter(undefined)
      }}
      onFocus={handleFocus}
      placeholder="Search"
    />
  )
}

function AssetSearch(props) {
  const { gridSize } = props

  /**
   * `isActive` determines flyout visibility on smaller screens and whether
   * asset rows are tab-navigable
   */
  const [isActive, setIsActive] = useState(false)
  const [searchHeight, setSearchHeight] = useState(0)

  const data = useMemo(() => makeData(), [])

  const containerRef = useRef()
  const searchRef = useRef()

  useEffect(() => {
    if (searchRef.current) {
      const height = searchRef.current.offsetHeight
      setSearchHeight(height)
    }
  }, [searchRef])

  /**
   * The `gridSize` prop changes on window resize, so this is equivalent to a
   * resize listener callback. On large screens, `isActive` is always true.
   * The active (focused) element is blurred so an asset row can't remain
   * focused when flyout is hidden.
   */
  useEffect(() => {
    const isFixed = window.matchMedia('(min-width: 1536px)').matches
    setIsActive(isFixed)
    document.activeElement.blur()
  }, [gridSize])

  const handleSearchFocus = () => {
    !isActive && setIsActive(true)
  }

  /**
   * Flyout is only hidden on smaller screens, triggered by external click
   */
  const handleExternalClick = () => {
    const isFixed = window.matchMedia('(min-width: 1536px)').matches
    !isFixed && setIsActive(false)
  }

  const handleAssetClick = (name) => {
    alert(`Navigate to https://algodex.com/trade/${name}-ALGO/`)
  }

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

  const getRowProps = (row) => ({
    role: 'button',
    tabIndex: isActive ? '0' : '-1', // tab-navigable only when rows are visible
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
    <Container isActive={isActive}>
      <AssetsContainer ref={containerRef} gridHeight={gridSize.height}>
        <TableWrapper>
          <TableContainer>
            <table {...getTableProps()}>
              <thead>
                <tr>
                  <th ref={searchRef} colSpan={visibleColumns.length}>
                    <GlobalFilter
                      globalFilter={state.globalFilter}
                      setGlobalFilter={setGlobalFilter}
                      onSearchFocus={handleSearchFocus}
                      onExternalClick={handleExternalClick}
                      containerRef={containerRef}
                      isActive={isActive}
                    />
                  </th>
                </tr>
                {headerGroups.map((headerGroup) => (
                  <tr {...headerGroup.getHeaderGroupProps()}>
                    {headerGroup.headers.map((column) => (
                      <TableHeader
                        searchHeight={searchHeight}
                        {...column.getHeaderProps(column.getSortByToggleProps())}
                      >
                        {column.render('Header')}

                        {!column.isSorted ? (
                          <SortIcon use="sortNone" size={0.625} />
                        ) : column.isSortedDesc ? (
                          <SortIcon use="sortDesc" size={0.625} />
                        ) : (
                          <SortIcon use="sortAsc" size={0.625} />
                        )}
                      </TableHeader>
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

AssetSearch.propTypes = {
  gridSize: PropTypes.object.isRequired
}

export default AssetSearch
