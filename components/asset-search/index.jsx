/* eslint-disable react/prop-types, react/jsx-key  */
import { useState, useEffect, useMemo, useRef, useCallback } from 'react'
import PropTypes from 'prop-types'
import { useRouter } from 'next/router'
import { useQuery } from 'react-query'
import { searchAssets } from 'lib/api'
import { useTable, useSortBy } from 'react-table'
import SearchInput from './search'
import InfoFlyover from './info-flyover'
import { BodyCopyTiny, BodyCopySm } from 'components/type'
import SvgImage from 'components/svg-image'
import useTranslation from 'next-translate/useTranslation'
import useAssetsStore, { /*mapToQueryResult,*/ mapToSearchResults } from 'store/use-assets'
import { useUserStore } from 'store/index'
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

function AssetSearch({ gridSize, onInfoChange }) {
  // Persist User Settings
  // @todo Replace with PouchDB
  const searchState = useUserStore((state) => state.search)
  const setSearchState = useUserStore((state) => state.setSearch)
  const query = useUserStore((state) => state.query)
  const setQuery = useUserStore((state) => state.setQuery)
  // Persist Queries until PouchDB and/or React-Query v3
  // @see https://react-query.tanstack.com/plugins/persistQueryClient
  const assets = useAssetsStore((state) => state.assets)
  const setAssets = useAssetsStore((state) => state.setAssets)

  // Component State
  const { t, lang } = useTranslation('assets')
  const router = useRouter()

  //let options = {}

  /**
   * Client Rehydration
   *
   * Used when Query is not active on the initial render
   * @TODO: Rehydrate Query State
   */
  // if (Object.keys(assets).length > 0) {
  //   console.log(Object.keys(assets).length)
  //   options.initialData = Object.keys(assets)
  //     .map((key) => assets[key])
  //     .map(mapToQueryResult)
  // }
  /**
   * Search Results Query
   * Refetch Interval should be 20 seconds when there is a query, 3 seconds when using the base cached search
   * @see https://react-query.tanstack.com/reference/useQuery
   * @type {{refetchInterval: (number), staleTime: number, initialData: Array}}
   */
  const { status, data, error, isFetched } = useQuery(
    ['searchResults', { query }],
    () => searchAssets(query),
    {
      refetchInterval: query ? 20000 : 3000,
      staleTime: 3000
      // ...options
    }
  )

  /**
   * Search Query to LocalStorage
   *
   * Set the persistent localstorage with the latest fetched data.
   * This is used during the first render and when the user is offline.
   *
   * @todo Dehydrate Full Query state
   * @todo Migrate to PouchDB | persistQueryClient
   * @see https://react-query.tanstack.com/plugins/persistQueryClient
   */
  useEffect(() => {
    if (Array.isArray(data) && isFetched) {
      setAssets(
        data.map(mapToSearchResults).reduce((prev, item) => {
          if (typeof prev[item.id] === 'undefined') {
            prev[item.id] = item
          }
          return prev
        }, {})
      )
    }
  }, [data, setAssets, isFetched])

  /**
   * Handle Search Data
   * @type {Array}
   */
  const searchResultData = useMemo(() => {
    // Return nothing if no data exists
    if ((!data || !Array.isArray(data)) && Object.keys(assets).length === 0) {
      return []
    }
    // If there is data, use it
    if (data || Array.isArray(data)) {
      return data.map(mapToSearchResults)
    }
    // Return cache if still fetching
    else if (!isFetched) {
      return Object.keys(assets).map((key) => assets[key])
    }
  }, [data, assets, isFetched])
  /**
   * `isActive` determines flyout visibility on smaller screens and whether
   * asset rows are tab-navigable
   */
  const [isActive, setIsActive] = useState(false)
  const [searchHeight, setSearchHeight] = useState(0)
  const [assetInfo, setAssetInfo] = useState(null)

  const containerRef = useRef()
  const searchRef = useRef()
  /**
   * Get the client height
   */
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
    const isMobile = window.matchMedia('(max-width: 996px)').matches

    if (!isMobile) {
      setIsActive(isFixed)
      document.activeElement.blur()
    }
  }, [gridSize])

  /**
   *
   * @type {(function(): void)|*}
   */
  const handleSearchFocus = useCallback(() => {
    !isActive && setIsActive(true)
  }, [setIsActive, isActive])

  /**
   * Flyout is only hidden on smaller screens, triggered by external click
   * @type {(function(): void)|*}
   */
  const handleExternalClick = useCallback(() => {
    const isFixed = window.matchMedia('(min-width: 1536px)').matches
    !isFixed && setIsActive(false)
  }, [setIsActive])

  /**
   *
   * @type {(function(*): Promise<void>)|*}
   */
  const handleAssetClick = useCallback(
    async (row) => {
      const asset = assets[row.original.id]

      if (asset) {
        router.push(`/trade/${asset.id}`)
      }

      setIsActive(false)
    },
    [assets, router]
  )

  /**
   * React-Table Columns
   * @see https://react-table.tanstack.com/docs/api/useTable#column-options
   * @type {Object}
   */
  const columns = useMemo(
    () => [
      {
        Header: t('pair'),
        accessor: 'name',
        Cell: AssetNameCell
      },
      {
        Header: t('price'),
        accessor: 'price',
        Cell: AssetPriceCell
      },
      {
        Header: t('change'),
        accessor: 'change',
        Cell: AssetChangeCell
      }
    ],
    [lang]
  )

  /**
   *
   * @param row
   * @returns {*}
   */
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
      // data: Object.keys(assets).map((key) => assets[key]),
      data: searchResultData,
      autoResetSortBy: false,
      initialState: searchState
    },
    useSortBy
  )
  useEffect(() => {
    setSearchState(tableState)
  }, [tableState, setSearchState])
  const renderStatus = () => {
    if (status === 'success') {
      return null
    }
    return (
      <StatusContainer>
        {status === 'loading' && (
          <BodyCopyTiny color="gray.600">{t('loading')}&hellip;</BodyCopyTiny>
        )}
        {status === 'error' && <BodyCopySm color="gray.400">Error: {error.message}</BodyCopySm>}
      </StatusContainer>
    )
  }

  return (
    <Container isActive={isActive}>
      <AssetsContainer ref={containerRef} gridHeight={gridSize.height}>
        <div ref={searchRef}>
          <SearchInput
            initialText={query}
            onChange={(q) => setQuery(q)}
            onSearchFocus={handleSearchFocus}
            onExternalClick={handleExternalClick}
            containerRef={containerRef}
            isActive={isActive}
          />
        </div>
        <TableWrapper>
          <TableContainer>
            <table {...getTableProps()}>
              <thead>
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
