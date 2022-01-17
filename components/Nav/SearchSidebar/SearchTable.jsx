import { BodyCopySm, BodyCopyTiny } from 'components/Typography'
import { mdiCheckDecagram, mdiStar } from '@mdi/js'
import { useEffect, useMemo } from 'react'
import { useFlexLayout, useRowSelect, useSortBy, useTable } from 'react-table'
import { AssetNameBlock, AssetId, AssetName, NameVerifiedWrapper } from 'components/Asset'
import AlgoIcon from 'components/Icon'
import Icon from '@mdi/react'
import Link from 'next/link'
import PropTypes from 'prop-types'
import { flatten } from 'lodash'
import theme from 'theme'
import useTranslation from 'next-translate/useTranslation'
import useUserStore from 'store/use-user-state'
import { withSearchResultsQuery } from 'hooks/withAlgodex'
import styled from 'styled-components'
import { rgba } from 'polished'
import { floatToFixed } from 'services/display'

/**
 * Map a Query Result to a Search Result
 * @todo: Fix API response and don't map on client
 * @param assetId
 * @param assetName
 * @param formattedPrice
 * @param priceChg24Pct
 * @param hasOrders
 * @param isTraded
 * @param verified
 * @param unitName
 * @param formattedASALiquidity
 * @param formattedAlgoLiquidity
 * @returns {Object}
 */
export const mapToSearchResults = ({
  assetId,
  assetName,
  formattedPrice,
  priceChg24Pct,
  hasOrders,
  isTraded,
  verified,
  unitName,
  formattedASALiquidity,
  formattedAlgoLiquidity
}) => {
  const price = formattedPrice ? floatToFixed(formattedPrice) : hasOrders ? '--' : null

  const change = !isNaN(parseFloat(priceChg24Pct))
    ? floatToFixed(priceChg24Pct, 2)
    : hasOrders
    ? '--'
    : null

  return {
    id: assetId,
    name: unitName,
    fullName: assetName,
    verified: verified,
    hasBeenOrdered: isTraded || hasOrders,
    liquidityAlgo: formattedAlgoLiquidity,
    liquidityAsa: formattedASALiquidity,
    price,
    change
  }
}

export const Container = styled.div`
  flex: 1 1 0%;
  display: flex;
  background-color: ${({ theme }) => theme.colors.background.dark};
  position: relative;
  overflow: ${({ isActive }) => (isActive ? 'visible' : 'hidden')};
  height: 51px;

  @media (min-width: 1536px) {
    flex-direction: column;
    height: auto;
  }
`

export const SearchContainer = styled.div`
  padding: 0.5rem 1.125rem;
  width: 319px;

  @media (min-width: 1536px) {
    display: none;
  }
`

export const SearchTableHeader = styled.th`
  border-bottom: 1px solid ${({ theme }) => theme.colors.gray['700']};
`

export const AssetsContainer = styled.div`
  position: absolute;
  width: 100%;
  height: ${({ gridHeight }) => `${gridHeight}px`};
  background-color: ${({ theme }) => theme.colors.gray['800']};
  box-shadow: 3px 64px 3px 3px ${({ theme }) => rgba(theme.colors.gray['900'], 0.25)};
  z-index: 1000;

  @media (min-width: 1536px) {
    position: static;
    display: block;
    flex: 1 1 0%;
    position: relative;
    width: auto;
    height: auto;
    background-color: transparent;
    box-shadow: none;
  }
`

export const StatusContainer = styled.div`
  position: absolute;
  inset: 6.25rem 1.125rem 2rem;
`

export const TableWrapper = styled.div`
  position: absolute;
  inset: 0;
  overflow: hidden scroll;
  scrollbar-width: none;
  top: 51px;

  @media (min-width: 996px) {
    top: 51px;
  }

  @media (min-width: 1536px) {
    top: 35px;
  }

  &::-webkit-scrollbar {
    display: none;
  }
`

export const PairSlash = styled.span`
  letter-spacing: 0.125rem;
`

export const AssetPrice = styled.span`
  color: ${({ theme }) => theme.colors.gray['000']};
`

export const AssetChange = styled.span`
  color: ${({ theme, value }) => {
    if (value === null || value === '--') {
      return theme.colors.gray['400']
    }
    return value < 0 ? theme.colors.red['500'] : theme.colors.green['500']
  }};
`

export const SortIcon = styled(Icon)``

export const TableHeader = styled.th`
  border-right: 1px solid ${({ theme }) => theme.colors.gray['700']};
  top: ${({ searchHeight }) => (searchHeight ? `${searchHeight}px` : '51px')};
`

export const TableContainer = styled.div`
  table {
    position: relative;
    border-spacing: 0;
    border: none;
    width: 100%;

    tr {
      &:hover {
        cursor: pointer;
      }

      &:focus {
        outline: 0;
        box-shadow: inset 0 0 0 0.2rem rgba(121, 255, 156, 0.5);
        border-radius: 3px;
      }

      &:nth-child(odd) {
        td {
          background-color: ${({ theme }) => rgba(theme.colors.gray['000'], 0.01)};
        }
      }

      &:nth-child(odd),
      &:nth-child(even) {
        &:hover {
          td {
            background-color: ${({ theme }) => rgba(theme.colors.gray['000'], 0.04)};
          }
        }
      }
    }

    th,
    td {
      margin: 0;
      padding: 0.5rem;
      color: ${({ theme }) => theme.colors.gray['600']};
      font-size: 0.75rem;
      line-height: 1.25;

      &:first-child {
        padding-left: 1.125rem;
      }
    }

    thead {
      tr {
        th {
          position: sticky;
          padding: 0.75rem 0.5rem;
          background-color: ${({ theme }) => theme.colors.gray['800']};
        }

        &:first-child {
          th {
            top: 0;
            padding: 0.5rem -1rem;
            border-bottom: 1px solid ${({ theme }) => theme.colors.gray['700']};

            &::before {
              content: '';
              position: absolute;
              bottom: 0;
              left: 0;
              right: 0;
              height: 1px;
              background-color: ${({ theme }) => theme.colors.gray['800']};
            }

            &::after {
              content: '';
              position: absolute;
              bottom: -1px;
              left: 0;
              right: 0;
              height: 1px;
              background-color: ${({ theme }) => theme.colors.gray['700']};
            }
          }
        }

        &:last-child {
          ${TableHeader} {
            color: ${({ theme }) => theme.colors.gray['500']};
            text-align: left;
            text-transform: uppercase;
            font-weight: 500;
            user-select: none;
            word-break: break-all;

            ${SortIcon} {
              position: relative;
              top: -1px;
              margin-left: 0.25rem;
            }
          }
        }
      }
    }
  }
`

export const TableData = styled.td`
  border-right: solid 1px #2d3747;
  // width: 9rem;
  // max-width: 9rem;
`

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
        <br />
        <div className="flex item-center -mt-3">
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

const NavSearchTable = ({
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
NavSearchTable.propTypes = {
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
export default withSearchResultsQuery(NavSearchTable, { loading: Loading, error: Error })
