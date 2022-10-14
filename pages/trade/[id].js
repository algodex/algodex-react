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

import React, { useCallback, useEffect, useMemo, useState } from 'react'
// import { fetchAssetPrice, fetchAssets } from '@/services/cms'
import {
  getAssetTotalStatus,
  getIsRestricted,
  getIsRestrictedCountry
} from '@/utils/restrictedAssets'

import AlgodexApi from '@algodex/algodex-sdk'
import AssetInfo from '@/components/Asset/Asset'
import Chart from '@/components/Asset/Chart'
import Layout from '@/components/Layout/OriginalLayout'
import MobileLayout from '@/components/Layout/MobileLayout'
import Page from '@/components/Page'
import PropTypes from 'prop-types'
import Spinner from '@/components/Spinner'
import config from '@/config.json'
import detectMobileDisplay from '@/utils/detectMobileDisplay'
import { useAssetPriceQuery } from '@algodex/algodex-hooks'
// import { useAssetPriceQuery } from '@/hooks/useAlgodex'
import useDebounce from '@/hooks/useDebounce'
import { useRouter } from 'next/router'
import useUserStore from '@/store/use-user-state'
import useWallets from '@/hooks/useWallets'

/**
 * Fetch Traded Asset Paths
 * @returns {Promise<{paths: {params: {id: *}}[], fallback: boolean}>}
 */
export async function getStaticPaths() {
  const configEnv =
    process.env.NEXT_PUBLIC_ALGORAND_NETWORK === 'mainnet' ? config.mainnet : config.testnet
  const api = new AlgodexApi({ config: configEnv })
  const assets = await api.http.dexd.fetchAssets()
  const paths = assets
    .filter((asset) => asset.isTraded)
    .map((asset) => ({
      params: { id: asset.id.toString() }
    }))
  return { paths, fallback: true }
}

/**
 * Get Explorer Asset Info
 *
 * @param id
 * @returns {object} Response Object or Redirect Object
 */
export async function getStaticProps({ params: { id } }) {
  let staticExplorerAsset = { id }
  let staticAssetPrice = {}
  const configEnv =
    process.env.NEXT_PUBLIC_ALGORAND_NETWORK === 'mainnet' ? config.mainnet : config.testnet
  const api = new AlgodexApi({ config: configEnv })
  try {
    staticExplorerAsset = await api.http.explorer.fetchExplorerAssetInfo(id)
  } catch ({ response: { status } }) {
    switch (status) {
      case 404:
        return {
          notFound: true
        }
    }
  }

  staticExplorerAsset.isRestricted =
    getIsRestricted(id) && getAssetTotalStatus(staticExplorerAsset.total)

  try {
    staticAssetPrice = await api.http.dexd.fetchAssetPrice(id)
  } catch (error) {
    if (typeof staticAssetPrice.isTraded === 'undefined') {
      staticAssetPrice = {
        isTraded: false,
        id: staticExplorerAsset.id
      }
    }
  }

  if (typeof staticAssetPrice.isTraded !== 'undefined') {
    staticExplorerAsset.price_info = staticAssetPrice
  }

  if (typeof staticExplorerAsset.name === 'undefined') {
    staticExplorerAsset.name = ''
  }

  return {
    props: { staticExplorerAsset }
  }
}

/**
 * Detect Mobile
 * @returns {unknown}
 */
function useMobileDetect(isMobileSSR = false) {
  const [isMobile, setIsMobile] = useState(isMobileSSR)
  const debounceIsMobile = useDebounce(isMobile, 500)
  useEffect(() => {
    function handleResize() {
      setIsMobile(detectMobileDisplay())
    }

    window.addEventListener('resize', handleResize)

    handleResize()

    return () => window.removeEventListener('resize', handleResize)
  }, [debounceIsMobile])

  return isMobile
}

/**
 * Trade Page
 *
 * Display a chart of historical orders. Takes an Algorand Asset
 * and displays a chart. If an asset is not traded it will route to
 * /asset/{asset.id} then fallback to 404 if /asset/{asset.id} is not
 * found
 *
 * @param {object} staticExplorerAsset The Explorer Response
 * @param {object} deviceType Browser Device: mobile or desktop
 * @returns {JSX.Element}
 * @constructor
 */
function TradePage({ staticExplorerAsset, deviceType }) {
  // eslint-disable-next-line no-undef
  // console.debug(`TradePage(`, staticExplorerAsset, `)`)

  const title = ' | Algodex'
  const prefix = staticExplorerAsset?.name ? `${staticExplorerAsset.name} to ALGO` : ''
  const showAssetInfo = useUserStore((state) => state.showAssetInfo)
  const { isFallback, query } = useRouter()
  const { wallet } = useWallets()
  const [asset, setAsset] = useState(staticExplorerAsset)
  //TODO: useEffect and remove this from the compilation
  if (typeof staticExplorerAsset !== 'undefined') {
    // Add GeoBlocking
    staticExplorerAsset.isGeoBlocked =
      getIsRestrictedCountry(query) && staticExplorerAsset.isRestricted
  }
  // console.log(wallet, 'wallet rendering')
  const [interval, setInterval] = useState('1h')
  const _asset = useMemo(() => {
    if (typeof staticExplorerAsset !== 'undefined' && staticExplorerAsset.id !== parseInt(query.id)) {
      console.error('ID mismatch! ', { staticExplorerAsset }, {queryId: parseInt(query.id)})
    }

    if (typeof staticExplorerAsset !== 'undefined' && (staticExplorerAsset.id === parseInt(query.id))) {
      return staticExplorerAsset
    }
    return  { id: parseInt(query.id) }  
  }, [query.id, staticExplorerAsset])

  const isMobile = useMobileDetect(deviceType === 'mobile')

  const { data } = useAssetPriceQuery({ asset: _asset })
  const onChange = useCallback(
    (e) => {
      if (e.target.name === 'interval' && e.target.value !== interval) {
        setInterval(e.target.value)
      }
    },
    [setInterval, interval]
  )

  useMemo(() => {
    if (typeof data !== 'undefined' && typeof data.id !== 'undefined' && data.id !== asset?.id) {
      setAsset(data)
    } else if (
        typeof staticExplorerAsset !== 'undefined' &&
        typeof staticExplorerAsset.id !== 'undefined' &&
        staticExplorerAsset.id !== asset?.id
      ) {
        setAsset(staticExplorerAsset)
      }
  }, [data, setAsset, asset?.id, staticExplorerAsset])

  const isTraded = useMemo(() => {
    return asset?.price_info?.isTraded || data?.asset?.price_info?.isTraded
  }, [asset, data])

  const renderContent = () => {
    // Display spinner when invalid state
    if (isFallback) return <Spinner flex />
    // Render AssetInfo if showAssetInfo is selected or the asset is not traded
    if (showAssetInfo || !isTraded) return <AssetInfo asset={asset} />
    else return <Chart asset={asset} interval={interval} onChange={onChange} />
  }

  return (
    <Page
      title={`${prefix} ${title}`}
      description={'Decentralized exchange for trading Algorand ASAs'}
      noFollow={true}
    >
      {!isMobile && <Layout asset={asset}>{renderContent()}</Layout>}
      {isMobile && <MobileLayout asset={asset}>{renderContent()}</MobileLayout>}
    </Page>
  )
}

TradePage.propTypes = {
  staticExplorerAsset: PropTypes.object,
  staticAssetPrice: PropTypes.object,
  deviceType: PropTypes.string
}
export default TradePage
