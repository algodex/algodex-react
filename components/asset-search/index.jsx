/* eslint-disable react/prop-types, react/jsx-key  */
import { useState, useEffect, useMemo, useRef } from 'react'
import PropTypes from 'prop-types'
import { useRouter } from 'next/router'
import { useQuery } from 'react-query'
import { searchAssets } from 'lib/api'
import { floatToFixed } from 'services/display'
import { useTable, useSortBy } from 'react-table'
import SearchInput from './search'
import InfoFlyover from './info-flyover'
import { BodyCopyTiny, BodyCopySm } from 'components/type'
import SvgImage from 'components/svg-image'

import {
  Container,
  AssetsContainer,
  StatusContainer,
  TableWrapper,
  AssetNameBlock,
  NameVerifiedWrapper,
  AssetName,
  PairSlash,
  AssetId,
  AssetPrice,
  AssetChange,
  SortIcon,
  TableHeader,
  TableContainer
} from './asset-search.css'

const AssetNameCell = (props) => {
  return (
    <AssetNameBlock>
      <AssetName>{props.value}</AssetName>
      <PairSlash>{`/`}</PairSlash>
      <NameVerifiedWrapper>
        ALGO
        {props.row.original.verified && <SvgImage use="verified" w={0.75} h={0.75} />}
      </NameVerifiedWrapper>
      <br />
      <AssetId>{props.row.original.id}</AssetId>
    </AssetNameBlock>
  )
}

const AssetPriceCell = ({ value }) => <AssetPrice>{value}</AssetPrice>

const AssetChangeCell = ({ value }) => {
  const displayChange = () => {
    if (value === null) {
      return ''
    }
    if (value === '--') {
      return value
    }
    return `${value}%`
  }
  return <AssetChange value={value}>{displayChange()}</AssetChange>
}

function AssetSearch(props) {
  const { gridSize, onInfoChange } = props

  const router = useRouter()

  const [query, setQuery] = useState('')

  const { status, data, error } = useQuery(['searchResults', { query }], () => searchAssets(query))

  const searchResultsData = useMemo(() => {
    const results = data || []

    return results.map((result) => {
      const price = result.formattedPrice
        ? floatToFixed(result.formattedPrice)
        : result.hasOrders
        ? '--'
        : null

      const change = !isNaN(parseFloat(result.priceChg24Pct))
        ? floatToFixed(result.priceChg24Pct, 2)
        : result.hasOrders
        ? '--'
        : null

      return {
        id: result.assetId,
        name: result.unitName,
        fullName: result.assetName,
        verified: result.verified,
        liquidityAlgo: result.formattedAlgoLiquidity,
        liquidityAsa: result.formattedASALiquidity,
        price,
        change
      }
    })
  }, [data])

  /**
   * `isActive` determines flyout visibility on smaller screens and whether
   * asset rows are tab-navigable
   */
  const [isActive, setIsActive] = useState(false)
  const [searchHeight, setSearchHeight] = useState(0)
  const [assetInfo, setAssetInfo] = useState(null)

  const containerRef = useRef()
  const searchRef = useRef()

  useEffect(() => {
    if (searchRef.current) {
      const height = Math.floor(searchRef.current.getBoundingClientRect().height)
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

  const handleAssetClick = async (row) => {
    const asset = searchResultsData.find((asset) => asset.id === row.original.id)

    if (asset) {
      router.push(`/trade/${asset.id}`)
    }
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

  const getRowProps = (row) => ({
    role: 'button',
    tabIndex: isActive ? '0' : '-1', // tab-navigable only when rows are visible
    onClick: () => handleAssetClick(row),
    onKeyDown: (e) => {
      if (e.key === ' ' || e.key === 'Enter') {
        handleAssetClick(row)
      }
    },
    onMouseEnter: () => {
      setAssetInfo(row.original)
      onInfoChange(true)
    },
    onMouseLeave: () => {
      setAssetInfo(null)
      onInfoChange(false)
    }
  })

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow, visibleColumns } =
    useTable(
      {
        columns,
        data: searchResultsData
      },
      useSortBy
    )

  const renderStatus = () => {
    if (status === 'success') {
      return null
    }
    return (
      <StatusContainer>
        {status === 'loading' && <BodyCopyTiny color="gray.600">Loading&hellip;</BodyCopyTiny>}
        {status === 'error' && <BodyCopySm color="gray.400">Error: {error.message}</BodyCopySm>}
      </StatusContainer>
    )
  }

  return (
    <Container isActive={isActive}>
      <AssetsContainer ref={containerRef} gridHeight={gridSize.height}>
        <TableWrapper>
          <TableContainer>
            <table {...getTableProps()}>
              <thead>
                <tr>
                  <th ref={searchRef} colSpan={visibleColumns.length}>
                    <SearchInput
                      onChange={(q) => setQuery(q)}
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

        {renderStatus()}
      </AssetsContainer>
      <InfoFlyover assetInfo={assetInfo} searchHeight={searchHeight} />
    </Container>
  )
}

AssetSearch.propTypes = {
  gridSize: PropTypes.object.isRequired,
  onInfoChange: PropTypes.func.isRequired
}

export default AssetSearch
