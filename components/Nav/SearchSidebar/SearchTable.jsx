import {
  AssetId,
  AssetName,
  AssetNameBlock,
  NameVerifiedWrapper
} from '@/components/Asset/Typography'
import { mdiAlertCircleOutline, mdiCheckDecagram, mdiStar } from '@mdi/js'
import { useCallback, useMemo } from 'react'
import { useEffect, useRef, useState } from 'react'

import AlgoIcon from '@/components/Icon'
import { DelistedAssets } from '@/components/DelistedAssets'
import Icon from '@mdi/react'
import PropTypes from 'prop-types'
import SearchFlyover from './SearchFlyover'
import { StableAssets } from '@/components/StableAssets'
import Table from '@/components/Table'
import Tooltip from 'components/Tooltip'
import { flatten } from 'lodash'
// import { floatToFixedDynamic } from '@/services/display'
import floatToFixed from '@algodex/algodex-sdk/lib/utils/format/floatToFixed'
import { formatUSDPrice } from '@/components/helpers'
import { sortBy } from 'lodash'
import styled from '@emotion/styled'
import theme from 'theme'
import useTranslation from 'next-translate/useTranslation'
import useUserStore from '@/store/use-user-state'
import { withSearchResultsQuery } from '@algodex/algodex-hooks'

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
  name,
  unitName,
  isGeoBlocked,
  formattedASALiquidity,
  formattedAlgoLiquidity,
  isStable
}) => {
  const price = formattedPrice ? floatToFixed(formattedPrice) : hasOrders ? '--' : null

  const change = !isNaN(parseFloat(priceChg24Pct))
    ? floatToFixed(priceChg24Pct, 2)
    : hasOrders
    ? '--'
    : null

  return {
    id: assetId,
    name: name || unitName,
    fullName: assetName,
    verified: verified,
    hasBeenOrdered: isTraded || hasOrders,
    isGeoBlocked,
    liquidityAlgo: formattedAlgoLiquidity,
    liquidityAsa: formattedASALiquidity,
    price,
    change,
    isStable
  }
}

const TableWrapper = styled.div`
  position: absolute;
  inset: 0;
  // overflow-y: scroll;
  // -webkit-overflow-scrolling: touch;
  scrollbar-width: none;
  top: 85px;
  width: 100%;
  height: 85%;

  @media (max-width: 996px) {
    padding-bottom: 1.5rem;
  }

  @media (min-width: 996px) {
    top: 85px;
  }

  // @media (min-width: 1536px) {
  //   top: 35px;
  // }

  &::-webkit-scrollbar {
    display: none;
    width: 0px;
  }
`

const PairSlash = styled.span`
  letter-spacing: 0.125rem;
`

const AssetPrice = styled.span`
  color: ${({ theme }) => theme.palette.gray['000']};
`

const AssetChange = styled.span`
  color: ${({ theme, value }) => {
    if (value === null || value === '--') {
      return theme.palette.gray['400']
    }
    return value < 0 ? theme.palette.red['500'] : theme.palette.green['500']
  }};
`

const Algos = styled(AlgoIcon)`
  position: relative;
  margin-left: 0.225rem;
  fill: ${({ theme }) => theme.palette.gray['500']};
`

export const AssetChangeCell = ({ value, row }) => {
  const displayChange = () => {
    if (value === null) {
      return ''
    }
    if (value === '--') {
      return value
    }
    return (
      <span
        className={row?.original?.isGeoBlocked ? 'opacity-100' : 'opacity-100'}
      >{`${value}%`}</span>
    )
  }
  return (
    <AssetChange className="cursor-pointer" value={value} data-testid="asa-change-cell">
      {displayChange()}
    </AssetChange>
  )
}
AssetChangeCell.propTypes = {
  value: PropTypes.any,
  row: PropTypes.object
}

export const NavSearchTable = ({
  assetClick,
  assets,
  isListingVerifiedAssets,
  algoPrice,
  isFilteringByFavorites,
  setIsFilteringByFavorites,
  gridSize
}) => {
  const searchState = useUserStore((state) => state.search)
  const setSearchState = useUserStore((state) => state.setSearch)
  const toggleFavourite = useUserStore((state) => state.setFavourite)
  const favoritesState = useUserStore((state) => state.favorites)
  const [searchTableSize, setSearchTableSize] = useState({ width: 0, height: '100%' })
  const searchTableRef = useRef()
  const { t } = useTranslation('assets')

  const filterByFavoritesFn = useCallback(
    (e) => {
      e.stopPropagation()
      setIsFilteringByFavorites(!isFilteringByFavorites)
    },
    [setIsFilteringByFavorites, isFilteringByFavorites]
  )

  useEffect(() => {
    const handleResize = () => {
      /**
       * Wait all the event queue process
       */
      setTimeout(() => {
        if (searchTableRef?.current) {
          const { width, height } = searchTableRef.current.getBoundingClientRect()
          setSearchTableSize({ width, height })
        }
      })
    }
    window.addEventListener('resize', handleResize)
    handleResize()

    return () => removeEventListener('resize', handleResize)
  }, [searchTableRef, setSearchTableSize])

  const toggleFavoritesFn = useCallback(
    (assetId) => {
      toggleFavourite(assetId)
    },
    [toggleFavourite]
  )

  const handleFavoritesFn = useCallback(
    (id) => {
      return favoritesState[id] === true ? theme.palette.amber['400'] : theme.palette.gray['600']
    },
    [favoritesState]
  )
  const formattedStableAsa = {}
  const formattedAssets = StableAssets.forEach(
    (asa, index) => (formattedStableAsa[StableAssets[index]] = asa)
  )
  /**
   * Handle Search Data
   * @type {Array}
   */
  const searchResultData = useMemo(() => {
    // Return nothing if no data exists
    const bannedAssets = {}
    DelistedAssets.forEach((element) => {
      bannedAssets[element] = element
    })
    const _acceptedAssets = assets.filter((asset) => !(asset.assetId in bannedAssets))
    const filteredList = sortBy(_acceptedAssets, { isGeoBlocked: true })

    if (!filteredList || !Array.isArray(filteredList) || filteredList.length === 0) {
      return []
    } else if (isListingVerifiedAssets) {
      // Return only verified assets
      return filteredList.filter((asset) => asset.verified).map(mapToSearchResults)
    } else if (isFilteringByFavorites) {
      // Filter assets by favorites
      const result = Object.keys(favoritesState).map((assetId) => {
        return filteredList.filter((asset) => asset.assetId === parseInt(assetId, 10))
      })
      return flatten(result).map(mapToSearchResults)
    } else {
      // If there is data, use it
      return filteredList.map(mapToSearchResults)
    }
  }, [assets, favoritesState, isListingVerifiedAssets, isFilteringByFavorites])

  const AssetPriceCell = useCallback(
    ({ value, row }) => {
      return (
        <AssetPrice
          className={`${
            row.original.isGeoBlocked ? 'opacity-100' : 'opacity-100'
          } cursor-pointer font-semibold`}
        >
          {value}
          <br />
          <p className="text-gray-600">
            {value !== '--' ? <span>{formatUSDPrice(algoPrice * value)}&nbsp;USD</span> : ''}
          </p>
        </AssetPrice>
      )
    },
    [algoPrice]
  )
  AssetPriceCell.propTypes = {
    value: PropTypes.any,
    row: PropTypes.object
  }

  const AssetNameCell = useCallback(
    ({ value, row }) => {
      return (
        <div className="cursor-pointer flex flex-col">
          <div
            className={`${row.original.isGeoBlocked ? 'opacity-100' : 'opacity-100'} flex flex-col`}
          >
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
              {formattedStableAsa[row?.original.id] && (
                <AssetNameBlock>
                  <AssetName>ALGO</AssetName>
                  <PairSlash>{`/`}</PairSlash>
                  <NameVerifiedWrapper>
                    {value}
                    {/* {row.original.verified && <SvgImage use="verified" w={0.75} h={0.75} />} */}
                  </NameVerifiedWrapper>
                </AssetNameBlock>
              )}
              {!formattedStableAsa[row?.original.id] && (
                <AssetNameBlock>
                  <AssetName>{value}</AssetName>
                  <PairSlash>{`/`}</PairSlash>
                  <NameVerifiedWrapper>
                    ALGO
                    {/* {row.original.verified && <SvgImage use="verified" w={0.75} h={0.75} />} */}
                  </NameVerifiedWrapper>
                </AssetNameBlock>
              )}
            </div>
            <br />
            <div className="flex item-center -mt-3">
              <div className="ml-3">
                <AssetId>{row.original.id}</AssetId>
              </div>
              &nbsp;
              {row.original.verified && (
                <Icon
                  path={mdiCheckDecagram}
                  title="Verified asset"
                  size={0.5}
                  color={theme.palette.gray['500']}
                />
              )}
            </div>
          </div>
          {row.original.isGeoBlocked && (
            <div className="flex items-center">
              <Tooltip
                renderButton={(setTriggerRef) => (
                  <div className="flex items-center" ref={setTriggerRef}>
                    <Icon
                      path={mdiAlertCircleOutline}
                      title="Information asset"
                      className="mt-0.5"
                      size={0.4}
                      color={theme.palette.gray['600']}
                    />
                    &nbsp;
                    <p style={{ fontSize: '8px' }} className="text-gray-600 font-medium">
                      Restricted Trading (USA)
                    </p>
                  </div>
                )}
              >
                <div>
                  <p className="whitespace-normal text-white">
                    Some ASAs have restricted trading in your country for legal reasons. You can
                    view the chart and book but you will not be able to place any trades for this
                    asset.
                  </p>
                  {/* <p className="text-green-500 font-semibold text-xs">Learn more here</p> */}
                </div>
              </Tooltip>
            </div>
          )}
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
                  isFilteringByFavorites ? theme.palette.amber['400'] : theme.palette.gray['500']
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
              <Algos className="mt-0.5 ml-1" color="blue" use="algoLogo" size={0.625} />
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
    onClick: () => assetClick(row),
    onKeyDown: (e) => {
      if (e.key === ' ' || e.key === 'Enter') {
        assetClick(row)
      }
    }
  })

  return (
    <TableWrapper data-testid="asa-table-wrapper" ref={searchTableRef}>
      <Table
        flyover={true}
        components={{
          Flyover: SearchFlyover
        }}
        tableSizeOnMobile={searchTableSize}
        optionalGridInfo={gridSize}
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
  assetClick: PropTypes.func,
  isListingVerifiedAssets: PropTypes.bool,
  algoPrice: PropTypes.any,
  isFilteringByFavorites: PropTypes.bool,
  setIsFilteringByFavorites: PropTypes.func,
  gridSize: PropTypes.object
}
export default withSearchResultsQuery(NavSearchTable)
