import {
  AssetId,
  AssetName,
  AssetNameBlock,
  NameVerifiedWrapper
} from '@/components/Asset/Typography'
import { mdiCheckDecagram, mdiStar } from '@mdi/js'
import { useCallback, useMemo } from 'react'

import AlgoIcon from '@/components/Icon'
import Icon from '@mdi/react'
import PropTypes from 'prop-types'
import SearchFlyover from './SearchFlyover'
import Table from '@/components/Table'
import { flatten } from 'lodash'
import { floatToFixed } from '@/services/display'
import styled from '@emotion/styled'
import theme from 'theme'
import useTranslation from 'next-translate/useTranslation'
import useUserStore from '@/store/use-user-state'
import { withSearchResultsQuery } from '@/hooks/withAlgodex'

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

const TableWrapper = styled.div`
  // position: absolute;
  // inset: 0;
  // overflow-y: auto;
`

const PairSlash = styled.span`
  letter-spacing: 0.125rem;
`

const AssetPrice = styled.span`
  color: ${({ theme }) => theme.colors.gray['000']};
`

const AssetChange = styled.span`
  color: ${({ theme, value }) => {
    if (value === null || value === '--') {
      return theme.colors.gray['400']
    }
    return value < 0 ? theme.colors.red['500'] : theme.colors.green['500']
  }};
`

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

export const NavSearchTable = ({
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
  const { t } = useTranslation('assets')
  const filterByFavoritesFn = useCallback(
    (e) => {
      e.stopPropagation()
      setIsFilteringByFavorites(!isFilteringByFavorites)
    },
    [setIsFilteringByFavorites, isFilteringByFavorites]
  )

  const toggleFavoritesFn = useCallback(
    (assetId) => {
      toggleFavourite(assetId)
    },
    [toggleFavourite]
  )

  const handleFavoritesFn = useCallback(
    (id) => {
      return favoritesState[id] === true ? theme.colors.amber['400'] : theme.colors.gray['600']
    },
    [favoritesState]
  )
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
        return assets.filter((asset) => asset.assetId === parseInt(assetId, 10))
      })
      return flatten(result).map(mapToSearchResults)
    } else {
      // If there is data, use it
      return assets.map(mapToSearchResults)
    }
  }, [assets, favoritesState, isListingVerifiedAssets, isFilteringByFavorites])

  const AssetPriceCell = useCallback(
    ({ value }) => {
      return (
        <AssetPrice>
          {value}
          <br />
          {value !== '--' ? <span>{(algoPrice * value).toLocaleString()} USD</span> : ''}
        </AssetPrice>
      )
    },
    [algoPrice]
  )
  AssetPriceCell.propTypes = {
    value: PropTypes.any
  }

  // const AssetNameCell = ({ value, row }) => {

  // }

  const AssetNameCell = useCallback(
    ({ value, row }) => {
      return (
        <div className="flex items-center">
          <div className="flex flex-col">
            <div className="flex items-center">
              <Icon
                role="button"
                onClick={() => toggleFavoritesFn(row.original?.id)}
                onKeyDown={() => toggleFavoritesFn(row.original?.id)}
                tabIndex={0}
                className="mr-1"
                path={mdiStar}
                title="Favorite item"
                size={0.5}
                style={{ minWidth: '0.75rem' }}
                color={handleFavoritesFn(row?.original?.id)}
              />
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
              <div className="ml-3">
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
    },
    [handleFavoritesFn, toggleFavoritesFn]
  )

  AssetNameCell.propTypes = {
    value: PropTypes.any,
    row: PropTypes.object
  }

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
    [isFilteringByFavorites, AssetNameCell, AssetPriceCell, filterByFavoritesFn, t]
  )

  /**
   *
   * @param row
   * @returns {*}
   */
  const getRowProps = (row) => ({
    role: 'button',
    onClick: () => onAssetClick(row),
    onKeyDown: (e) => {
      if (e.key === ' ' || e.key === 'Enter') {
        onAssetClick(row)
      }
    }
  })

  return (
    <TableWrapper>
      <Table
        flyover={true}
        components={{
          Flyover: SearchFlyover
        }}
        initialState={searchState}
        onStateChange={(tableState) => setSearchState(tableState)}
        getRowProps={getRowProps}
        columns={columns}
        data={searchResultData || []}
      />
    </TableWrapper>
  )
}
NavSearchTable.propTypes = {
  query: PropTypes.string.isRequired,
  assets: PropTypes.array.isRequired,
  onAssetFocus: PropTypes.func,
  onAssetLeave: PropTypes.func,
  onAssetClick: PropTypes.func,
  isListingVerifiedAssets: PropTypes.bool,
  algoPrice: PropTypes.any,
  isFilteringByFavorites: PropTypes.bool,
  setIsFilteringByFavorites: PropTypes.func
}
export default withSearchResultsQuery(NavSearchTable)
