/* 
 * Algodex Frontend (algodex-react) 
 * Copyright (C) 2021 - 2022 Algodex VASP (BVI) Corp.
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as published
 * by the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.

 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Affero General Public License for more details.
 * You should have received a copy of the GNU Affero General Public License
 * along with this program.  If not, see <https://www.gnu.org/licenses/>.
 */

import {
  AssetId,
  AssetName,
  AssetNameBlock,
  NameVerifiedWrapper
} from '@/components/Asset/Typography'
import { getAssetTotalStatus, getIsRestricted, getIsRestrictedCountry } from '../../../utils/restrictedAssets'
import { mdiAlertCircleOutline, mdiCheckDecagram, mdiStar } from '@mdi/js'
import { useCallback, useMemo } from 'react'
import { useEffect, useRef, useState } from 'react'
import dayjs from 'dayjs'
import AlgoIcon from '@/components/Icon'
import { DelistedAssets } from '@/components/DelistedAssets'
import Icon from '@mdi/react'
import PropTypes from 'prop-types'
import SearchFlyover from './SearchFlyover'
import Table from '@/components/Table'
import Tooltip from 'components/Tooltip'
import { flatten } from 'lodash'
import floatToFixed from '@algodex/algodex-sdk/lib/utils/format/floatToFixed'
import {floatToFixedDisplay} from '@/services/display';
import { formatUSDPrice } from '@/components/helpers'
import { sortBy } from 'lodash'
import styled from '@emotion/styled'
import theme from 'theme'
import useMobileDetect from '@/hooks/useMobileDetect'
import { useRouter } from 'next/router'
import useTranslation from 'next-translate/useTranslation'
import useUserStore from '@/store/use-user-state'
import { withSearchResultsQuery } from '@/hooks'
import { testnetAssets, mainnetAssets } from '../../AgeOfProjects'
import { getActiveNetwork } from 'services/environment'

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
  decimals,
  formattedPrice,
  priceChg24Pct,
  hasOrders,
  isTraded,
  verified,
  name,
  unitName,
  isGeoBlocked,
  formattedASALiquidity,
  formattedAlgoLiquidity
}) => {
  const price = formattedPrice ? floatToFixedDisplay(formattedPrice) : hasOrders ? '--' : null

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
    decimals
  }
}

const TableWrapper = styled.div`
  position: absolute;
  inset: 0;
  // overflow-y: scroll;
  // -webkit-overflow-scrolling: touch;
  scrollbar-width: none;
  // top: ${({isFilterActive}) => isFilterActive ? '85px' : '10rem'};
  width: 100%;
  height: 85%;

  @media (max-width: 996px) {
    padding-bottom: 1.5rem;
  }

  @media (min-width: 996px) {
    top: ${({isFilterActive}) => isFilterActive ? '10rem' : '85px'};
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
  const displayChange = useCallback(() => {
    if (value === null) {
      return ''
    }
    if (value === '--') {
      return value
    }
    return (
      <span
        className={row?.original?.isGeoBlocked ? 'opacity-100' : 'opacity-100'}
      >{`${parseFloat(value).toFixed(2)}%`}</span>
    )
  }, [row?.original?.isGeoBlocked, value])
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
  gridSize,
  isFilterActive,
  searchFilters,
  setSearchFilterProps
}) => {
  const searchState = useUserStore((state) => state.search)
  const setSearchState = useUserStore((state) => state.setSearch)
  const toggleFavourite = useUserStore((state) => state.setFavourite)
  const favoritesState = useUserStore((state) => state.favorites)
  const [searchTableSize, setSearchTableSize] = useState({ width: 0, height: '100%' })
  const activeNetwork = getActiveNetwork();
  const isMobile = useMobileDetect()
  const TODAY = useMemo(() => dayjs().format('YYYY-MM-DD'), [])
  const searchTableRef = useRef()
  const router = useRouter()
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
  }, [searchTableRef, setSearchTableSize, gridSize])

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

  const handleRestrictedAsset = useCallback((assetsList) => {
    if (typeof assetsList !== 'undefined') {
      return {
        assets: assetsList.map((asset) => {
          const isRestricted =
            getIsRestricted(`${asset.assetId}`) && getAssetTotalStatus(asset.total)
          return {
            ...asset,
            isRestricted,
            isGeoBlocked: getIsRestrictedCountry(router.query) && isRestricted
          }
        })
      }
    } else {
      return assetsList
    }
  }, [router.query])

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
    
    // Remove banned assets
    const _acceptedAssets = assets.filter((asset) => !(asset.assetId in bannedAssets))
    // Geoformatted assets
    const geoFormattedAssets = handleRestrictedAsset(_acceptedAssets)
    // REVERT TO ADD SORTING FOR RESTRICTED
    // const filteredList = sortBy(geoFormattedAssets.assets, { isGeoBlocked: true })
    let filteredList = geoFormattedAssets.assets;
    // console.log(filteredList, 'filtered list')
    if (searchFilters.isFilteringAgeOfProject) {
      const assetsDateAndTime = activeNetwork === 'testnet' ? testnetAssets : mainnetAssets
      const updatedList = [...filteredList].map((asset) => {
        const formatDateOfFirstTrans = dayjs(assetsDateAndTime[`${asset.assetId}`]).format('YYYY-MM-DD')
        return {
          ...asset,
          ageOfProject: dayjs(TODAY).diff(dayjs(formatDateOfFirstTrans), 'day')
        }
      })
      const sortedListByAgeOfProject = sortBy(updatedList, o => o.ageOfProject);
      setSearchFilterProps({ 
        type: 'updateSliderValue', 
        field: 'ageOfProjectMax',
        value: sortedListByAgeOfProject[sortedListByAgeOfProject.length - 1].ageOfProject
      })
      
      filteredList = [...updatedList].filter((asset) => asset.ageOfProject <= searchFilters.ageOfProject)
    }

    // Filter Asset By price
    if (searchFilters.isFilteringPrice) {
      // Sort list by Price
      const sortedListByPrice = sortBy(filteredList, o => o.price);
      // Set max price for the price filter slider
      setSearchFilterProps({ 
        type: 'setPriceMax', 
        value: sortedListByPrice[sortedListByPrice.length - 1]?.price
      })
      const updatedList = [...filteredList].filter((asset) => asset.price < searchFilters.price)
      filteredList = updatedList
    }

    // Filter By NFT
    if (searchFilters.isFilteringNFTOnly) {
      const updatedList = [...filteredList].filter((asset) => asset.total === 1)
      filteredList = updatedList
    }    
    
    // Return List
    if (!filteredList || !Array.isArray(filteredList) || filteredList.length === 0) {
      return []
    } else if (isListingVerifiedAssets && isFilteringByFavorites) {
      // Listing verified favourited assets
      const result = Object.keys(favoritesState).map((assetId) => {
        return filteredList.filter((asset) => asset.assetId === parseInt(assetId, 10))
      })
      return flatten(result).filter((asset) => asset.verified).map(mapToSearchResults)
    } else if (isListingVerifiedAssets) {
      // Listing only verified assets
      return filteredList.filter((asset) => asset.verified).map(mapToSearchResults)
    } else if (isFilteringByFavorites) {
      // Listing only favourited assets
      const result = Object.keys(favoritesState).map((assetId) => {
        return filteredList.filter((asset) => asset.assetId === parseInt(assetId, 10))
      })
      return flatten(result).map(mapToSearchResults)
    } else {
      // If there is data, use it
      return filteredList.map(mapToSearchResults)
    }

  }, [assets, 
    handleRestrictedAsset,
    isListingVerifiedAssets, 
    isFilteringByFavorites, 
    favoritesState, 
    searchFilters.price,
    searchFilters.ageOfProject,
    searchFilters.isFilteringAgeOfProject,
    searchFilters.isFilteringNFTOnly,
    searchFilters.isFilteringPrice
  ])

  useEffect(() => {
    if (!searchFilters.isFilteringPrice) {
      setSearchFilterProps({ 
        type: 'updateSliderValue', 
        field: 'price',
        value: 0
      })
    }
    if (!searchFilters.isFilteringAgeOfProject) {
      setSearchFilterProps({ 
        type: 'updateSliderValue', 
        field: 'ageOfProject',
        value: 0
      })
    }
  }, [searchFilters.isFilteringPrice, searchFilters.isFilteringAgeOfProject])
  

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
        <div className="flex flex-col">
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
              <AssetNameBlock>
                <AssetName>{value}</AssetName>
                <PairSlash>{`/`}</PairSlash>
                <NameVerifiedWrapper>
                  ALGO
                  {/* {row.original.verified && <SvgImage use="verified" w={0.75} h={0.75} />} */}
                </NameVerifiedWrapper>
              </AssetNameBlock>
            </div>
            {/* <br /> */}
            <div className="flex item-center mt-0.5">
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
  const getRowProps = useCallback((row) => ({
    role: 'button',
    className: 'cursor-pointer',
    onClick: (e) => {
      e.preventDefault()
      assetClick(row)
    },
    onKeyDown: (e) => {
      if (e.key === ' ' || e.key === 'Enter') {
        e.preventDefault()
        assetClick(row)
      }
    }
  }), [assetClick])

  useEffect(() => {
    // Prefetch the top assets
    searchResultData.slice(0,30).map(result => {
      const assetId = result.id
      // console.log('zprefetching: ' + assetId)
      router.prefetch('/trade/'+assetId)
    })
  }, [router, searchResultData])
  
  return (
    <TableWrapper isFilterActive={isFilterActive} data-testid="asa-table-wrapper" ref={searchTableRef}>
      <Table
        flyover={isMobile ? false : true}
        components={{
          Flyover: SearchFlyover
        }}
        tableSizeOnMobile={gridSize}
        optionalGridInfo={gridSize}
        initialState={searchState}
        isFilterActive={isFilterActive}
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
  assets: PropTypes.array,
  assetClick: PropTypes.func,
  isListingVerifiedAssets: PropTypes.bool,
  algoPrice: PropTypes.any,
  isFilteringByFavorites: PropTypes.bool,
  setIsFilteringByFavorites: PropTypes.func,
  gridSize: PropTypes.object,
  isFilterActive: PropTypes.bool,
  searchFilters: PropTypes.object,
  setSearchFilterProps: PropTypes.func
}
export default withSearchResultsQuery(NavSearchTable)
