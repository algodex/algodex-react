import {
  AssetChange,
  AssetId,
  AssetName,
  AssetNameBlock,
  AssetPrice,
  NameVerifiedWrapper,
  PairSlash,
  SortIcon,
  TableContainer,
  TableData,
  TableHeader,
  TableWrapper
} from './asset-search.css'
import { BodyCopySm, BodyCopyTiny } from '../type'
import { mdiCheckDecagram, mdiStar } from '@mdi/js'
import { useEffect, useMemo } from 'react'
import { useFlexLayout, useRowSelect, useSortBy, useTable } from 'react-table'

import AlgoIcon from 'components/icon'
import Icon from '@mdi/react'
import Link from 'next/link'
import PropTypes from 'prop-types'
import { flatten } from 'lodash'
import { mapToSearchResults } from './helpers'
import theme from '../../theme'
import useTranslation from 'next-translate/useTranslation'
import useUserStore from 'store/use-user-state'
import { withSearchResultsQuery } from 'hooks/withAlgodex'

const Loading = () => {
  const { t } = useTranslation('assets')
  return <BodyCopyTiny color="gray.600">{t('loading')}&hellip;</BodyCopyTiny>
}
const Error = ({ message }) => <BodyCopySm color="gray.400">Error: {message}</BodyCopySm>

Error.propTypes = {
  message: PropTypes.string
}
const AssetNameCell = ({ value, row }) => {
  return (
    <div className="flex items-start">
      <div className="flex flex-col">
        <div>
          <AssetNameBlock>
            <AssetName>{value}</AssetName>
            <PairSlash>{`/`}</PairSlash>
            <NameVerifiedWrapper>
              ALGO
              {/* {row.original.verified && <SvgImage use="verified" w={0.75} h={0.75} />} */}
            </NameVerifiedWrapper>
          </AssetNameBlock>
        </div>
        <div className="flex item-center">
          <div className="mr-1">
            <AssetId>{row.original.id}</AssetId>
          </div>
          {row.original.verified && (
            <Icon
              path={mdiCheckDecagram}
              title="Verified asset"
              size={0.5}
              color={theme.colors.gray['500']}
            />
          )}
        </div>
      </div>
    </div>
  )
}

AssetNameCell.propTypes = {
  value: PropTypes.any,
  row: PropTypes.object
}
const AssetPriceCell = ({ value }) => <AssetPrice>{value}</AssetPrice>
AssetPriceCell.propTypes = {
  value: PropTypes.any
}
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
AssetChangeCell.propTypes = {
  value: PropTypes.any
}

const AssetSearchTable = ({
  searchHeight,
  isActive,
  onAssetFocus,
  onAssetLeave,
  onAssetClick,
  assets,
  isListingVerifiedAssets,
  algoPrice,
  isFilteringByFavorites,
  setIsFilteringByFavorites
}) => {
  const searchState = useUserStore((state) => state.search)
  const setSearchState = useUserStore((state) => state.setSearch)
  const toggleFavourite = useUserStore((state) => state.setFavourite)
  const favoritesState = useUserStore((state) => state.favorites)
  const { t, lang } = useTranslation('assets')

  /**
   * Handle Search Data
   * @type {Array}
   */
  const searchResultData = useMemo(() => {
    // Return nothing if no data exists
    if (!assets || !Array.isArray(assets)) {
      return []
    } else if (isListingVerifiedAssets) {
      // Return only verified assets
      return assets.filter((asset) => asset.verified).map(mapToSearchResults)
    } else if (isFilteringByFavorites) {
      // Filter assets by favorites
      const result = Object.keys(favoritesState).map((assetId) => {
        return assets.filter((asset) => asset.assetId == parseInt(assetId, 10))
      })
      return flatten(result).map(mapToSearchResults)
    } else {
      // If there is data, use it
      return assets.map(mapToSearchResults)
    }
  }, [assets, favoritesState, isListingVerifiedAssets, isFilteringByFavorites])

  /**
   * React-Table Columns
   * @see https://react-table.tanstack.com/docs/api/useTable#column-options
   * @type {Object}
   */
  const columns = useMemo(
    () => [
      {
        Header: () => {
          return (
            <div className="inline-flex">
              <Icon
                onClick={(e) => filterByFavoritesFn(e)}
                className="mr-1"
                path={mdiStar}
                title="View favourited items"
                size={0.5}
                color={
                  isFilteringByFavorites ? theme.colors.amber['400'] : theme.colors.gray['500']
                }
              />
              {t('pair')}
            </div>
          )
        },
        accessor: 'name',
        minWidth: 45,
        width: 45,
        maxWidth: 45,
        Cell: AssetNameCell
      },
      {
        Header: () => {
          return (
            <div className="inline-flex">
              {t('price')}
              <AlgoIcon className="mt-0.5 ml-1" use="algoLogo" size={0.625} />
            </div>
          )
        },
        accessor: 'price',
        minWidth: 35,
        width: 35,
        maxWidth: 35,
        Cell: AssetPriceCell
      },
      {
        Header: () => {
          return <div className="inline-flex">{t('change')}</div>
        },
        accessor: 'change',
        minWidth: 35,
        width: 35,
        maxWidth: 35,
        Cell: AssetChangeCell
      }
    ],
    [lang, isFilteringByFavorites]
  )

  const filterByFavoritesFn = (e) => {
    e.stopPropagation()
    setIsFilteringByFavorites(!isFilteringByFavorites)
  }

  /**
   *
   * @param row
   * @returns {*}
   */
  const getRowProps = (row) => ({
    role: 'button',
    tabIndex: isActive ? '0' : '-1', // tab-navigable only when rows are visible
    onClick: () => onAssetClick(row),
    onKeyDown: (e) => {
      if (e.key === ' ' || e.key === 'Enter') {
        onAssetClick(row)
      }
    },
    onMouseEnter: () => {
      onAssetFocus(row.original)
    },
    onMouseLeave: onAssetLeave
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
    useSortBy,
    useRowSelect,
    useFlexLayout
  )
  useEffect(() => {
    setSearchState(tableState)
  }, [tableState, setSearchState])

  const toggleFavoritesFn = (assetId) => {
    toggleFavourite(assetId)
  }

  const handleFavoritesFn = (id) => {
    return favoritesState[id] === true ? theme.colors.amber['400'] : theme.colors.gray['600']
  }

  const renderTableData = (cell, idx) => {
    if (idx === 0) {
      return (
        <TableData
          className="flex item-center"
          key={idx}
          style={{
            boxSizing: 'border-box',
            flex: '45 0 auto',
            minWidth: '45px',
            width: '45px'
          }}
        >
          <Icon
            role="button"
            onClick={() => toggleFavoritesFn(cell?.row.original?.id)}
            onKeyDown={() => toggleFavoritesFn(cell?.row.original?.id)}
            tabIndex={0}
            className="mr-1"
            path={mdiStar}
            title="Favorite item"
            size={0.5}
            style={{ minWidth: '0.75rem' }}
            color={handleFavoritesFn(cell?.row?.original?.id)}
          />
          {cell.render('Cell')}
        </TableData>
      )
    } else if (idx === 1) {
      return (
        <TableData key={idx} {...cell.getCellProps()}>
          <span>{cell.render('Cell')}</span>
          <br />
          {cell?.value != '--' ? <span>{(algoPrice * cell.value).toLocaleString()} USD</span> : ''}
        </TableData>
      )
    } else {
      return (
        <TableData key={idx} {...cell.getCellProps()}>
          {cell.render('Cell')}
        </TableData>
      )
    }
  }

  return (
    <TableWrapper className="mt-12">
      <TableContainer>
        <table {...getTableProps()}>
          <thead>
            {headerGroups.map((headerGroup, h) => (
              <tr key={h} {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column, c) => (
                  <TableHeader
                    key={c}
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
            {rows.map((row, r) => {
              prepareRow(row)
              return (
                <Link key={r} href={`/trade/${row.original.id}`}>
                  <tr key={r} {...row.getRowProps(getRowProps(row))}>
                    {row.cells.map((cell, rc) => {
                      return renderTableData(cell, rc)
                    })}
                  </tr>
                </Link>
              )
            })}
          </tbody>
        </table>
      </TableContainer>
    </TableWrapper>
  )
}
AssetSearchTable.propTypes = {
  searchHeight: PropTypes.number,
  query: PropTypes.string.isRequired,
  assets: PropTypes.array.isRequired,
  isActive: PropTypes.bool,
  onAssetFocus: PropTypes.func,
  onAssetLeave: PropTypes.func,
  onAssetClick: PropTypes.func,
  isListingVerifiedAssets: PropTypes.bool,
  algoPrice: PropTypes.any,
  isFilteringByFavorites: PropTypes.bool,
  setIsFilteringByFavorites: PropTypes.func
}
export default withSearchResultsQuery(AssetSearchTable, { loading: Loading, error: Error })
