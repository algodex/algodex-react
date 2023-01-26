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
// import '@/wdyr';

import React, { useCallback, useEffect, useMemo, useState, useContext } from 'react'
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
import { getAlgodexApi } from '@/services/environment'
import detectMobileDisplay from '@/utils/detectMobileDisplay'
import { useAssetPriceQuery } from '@/hooks/useAssetPriceQuery'
import useWallets from '../../hooks/useWallets'
// import { useAssetPriceQuery } from '@/hooks/useAlgodex'
import useDebounce from '@/hooks/useDebounce'
import { useRouter } from 'next/router'
import useUserStore from '@/store/use-user-state'
// import useWallets from '@/hooks/useWallets'
import NFTView from '@/components/Asset/NFTView'
import { WalletReducerContext } from '../../hooks/WalletsReducerProvider'
import useMyAlgoConnector from '../../hooks/useMyAlgoConnector'
/**
 * Fetch Traded Asset Paths
 * @returns {Promise<{paths: {params: {id: *}}[], fallback: boolean}>}
 */
export async function getStaticPaths() {
  const api = getAlgodexApi()
  const assets = await api.http.dexd.fetchAssets()
  const assetSearch = await api.http.dexd.searchAssets('')
  const assetIdToSearch = assetSearch.assets.reduce((map, asset) => {
    map.set(asset.assetId, asset)
    return map
  }, new Map())

  const pathsFull = assets
    .filter((asset) => asset.isTraded)
    // .filter(asset =>
    //   asset.id === 452399768 ||
    //   asset.id === 793124631 ||
    //   asset.id === 724480511 ||
    //   asset.id === 31566704 ||
    //   asset.id === 694432641
    // )
    .filter((asset) => {
      if (
        asset.id === parseInt(process.env.NEXT_PUBLIC_DEFAULT_ASSET) ||
        asset.price24Change !== 0
      ) {
        return true
      }

      const algoLiquidity = assetIdToSearch.get(asset.id)?.formattedAlgoLiquidity || 0
      // console.log(asset.id + ' ' + algoLiquidity);
      if (parseFloat(algoLiquidity) > 100) {
        return true
      }
      return false
    })
    .map((asset) => ({
      params: { id: asset.id.toString() }
    }))

  // const paths = pathsFull.slice(0, 10)
  const paths = pathsFull
  console.log('STATIC PATHS: ' + JSON.stringify(paths, null, 2))
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
  let originalStaticExplorerAsset
  let staticAssetPrice = {}

  const api = getAlgodexApi()
  try {
    staticExplorerAsset = await api.http.explorer.fetchExplorerAssetInfo(id)
    originalStaticExplorerAsset = staticExplorerAsset
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

  const propsOuter = {
    props: { staticExplorerAsset, originalStaticExplorerAsset },
    revalidate: 600 //10 minutes
  }
  return propsOuter
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
function TradePage({ staticExplorerAsset, originalStaticExplorerAsset, deviceType }) {
  // eslint-disable-next-line no-undef
  // console.debug(`TradePage(`, staticExplorerAsset, `)`)

  const title = ' | Algodex'
  const prefix = staticExplorerAsset?.name ? `${staticExplorerAsset.name} to ALGO` : ''
  const showAssetInfo = useUserStore((state) => state.showAssetInfo)
  const { isFallback, query } = useRouter()
  const { wallet } = useWallets()
  const [activeView, setActiveView] = useState('chart')
  // TODO: refactor all state into useReducer

  // console.log('logging: ', {routerId: query.id, staticId: originalStaticExplorerAsset?.id})
  // const myAlgoConnector = useRef(null)

  const [realStaticExplorerAsset, setRealStaticExplorerAsset] = useState(undefined)

  const getAndSetRealStaticExplorerAsset = useCallback(
    async (assetId) => {
      if (realStaticExplorerAsset && realStaticExplorerAsset === assetId) {
        return
      }

      if (originalStaticExplorerAsset.id === assetId) {
        setRealStaticExplorerAsset(originalStaticExplorerAsset)
        return
      }

      const api = getAlgodexApi()

      try {
        const _realStaticExplorerAsset = await api.http.explorer.fetchExplorerAssetInfo(assetId)
        _realStaticExplorerAsset.isRestricted =
          getIsRestricted(assetId) && getAssetTotalStatus(_realStaticExplorerAsset.total)
        setRealStaticExplorerAsset(_realStaticExplorerAsset)
      } catch (e) {
        console.error(e)
      }
    },
    [originalStaticExplorerAsset, realStaticExplorerAsset]
  )

  useEffect(() => {
    if (
      realStaticExplorerAsset !== undefined &&
      realStaticExplorerAsset.id === parseInt(query.id)
    ) {
      setRealStaticExplorerAsset(realStaticExplorerAsset)
      return
    }

    if (query.id === undefined) {
      return
    }

    getAndSetRealStaticExplorerAsset(parseInt(query.id))
  }, [realStaticExplorerAsset, query.id, getAndSetRealStaticExplorerAsset])

  const {
    setMyAlgoAddresses,
    setAddressesNew,
    setActiveWallet,
    addressesNew,
    peraWallet,
    setPeraWallet
  } = useContext(WalletReducerContext)
  // const { myAlgoConnector, peraConnector } = useWallets()
  const { peraConnector } = useWallets()
  const myAlgoConnector = useMyAlgoConnector()

  useEffect(() => {
    const _myAlgoAddresses = JSON.parse(localStorage.getItem('myAlgoAddresses'))
    const _peraWallet = JSON.parse(localStorage.getItem('peraWallet'))

    if (
      _peraWallet?.type === 'wallet-connect' &&
      peraWallet === null &&
      typeof peraConnector.current !== 'undefined'
    ) {
      const _rehyrdratedPeraWallet = { ..._peraWallet, connector: peraConnector.current }
      setPeraWallet(_rehyrdratedPeraWallet)
      setAddressesNew({ type: 'peraWallet', addresses: [_rehyrdratedPeraWallet] })
      setActiveWallet(_rehyrdratedPeraWallet)
    }

    if (
      addressesNew.length === 0 &&
      Array.isArray(_myAlgoAddresses) &&
      _myAlgoAddresses.length > 0 &&
      myAlgoConnector !== null
    ) {
      myAlgoConnector.connected = true
      const _rehydratedMyAlgo = _myAlgoAddresses.map((addrObj) => {
        return { ...addrObj, connector: myAlgoConnector }
      })
      setMyAlgoAddresses(_rehydratedMyAlgo)
      setAddressesNew({ type: 'myAlgo', addresses: _rehydratedMyAlgo })
      setActiveWallet(_rehydratedMyAlgo[0])
    }
  }, [myAlgoConnector, peraConnector])

  //TODO: useEffect and remove this from the compilation
  if (typeof staticExplorerAsset !== 'undefined') {
    // Add GeoBlocking
    staticExplorerAsset.isGeoBlocked =
      getIsRestrictedCountry(query) && staticExplorerAsset.isRestricted
  }
  const [interval, setInterval] = useState('1h')
  const [asset, setAsset] = useState({...realStaticExplorerAsset})

  const _asset = useMemo(() => {
    if (
      typeof staticExplorerAsset !== 'undefined' &&
      staticExplorerAsset.id !== parseInt(query.id)
    ) {
      console.error('ID mismatch! ', { staticExplorerAsset }, { queryId: parseInt(query.id) })
    }

    let _asset = undefined
    if (
      typeof staticExplorerAsset !== 'undefined' &&
      staticExplorerAsset.id === parseInt(query.id)
    ) {
      _asset = staticExplorerAsset
      if (realStaticExplorerAsset?.name && realStaticExplorerAsset?.id === parseInt(query.id)) {
        _asset.name = realStaticExplorerAsset.name
      }
    } else if (query.id) {
      _asset = { ...realStaticExplorerAsset, id: parseInt(query.id) }
    } else {
      _asset = { ...realStaticExplorerAsset }
    }
    setAsset(_asset)

    return _asset
  }, [query.id, realStaticExplorerAsset, staticExplorerAsset])

  const isMobile = useMobileDetect(deviceType === 'mobile')

  const outerData = useAssetPriceQuery({ asset: _asset })
  const data = outerData.data

  useMemo(() => {
    const __asset = data?.asset
    if (
      outerData?.isSuccess &&
      typeof __asset !== 'undefined' &&
      typeof __asset.id !== 'undefined' &&
      __asset.id === asset?.id
    ) {
      setAsset(__asset)
    }
  }, [data, outerData, setAsset, asset?.id])

  const isTraded = asset?.price_info?.isTraded || data?.asset?.price_info?.isTraded

  const onChange = useCallback(
    (e) => {
      if (e.target.name === 'interval' && e.target.value !== interval) {
        setInterval(e.target.value)
      }
    },
    [setInterval, interval]
  )

  const renderContent = useCallback(() => {
    // Display spinner when invalid state
    if (isFallback) return <Spinner flex />
    // Render AssetInfo if showAssetInfo is selected or the asset is not traded
    if (showAssetInfo || !isTraded) {
      return asset.total === 1 ? <NFTView activeView={activeView} setActiveView={setActiveView} asset={asset}/> : <AssetInfo asset={asset} /> 
    } else return activeView === 'chart' ? <Chart setActiveView={setActiveView} activeView={activeView} asset={asset} interval={interval} onChange={onChange} /> : <NFTView activeView={activeView} setActiveView={setActiveView} asset={asset}/>
  }, [activeView, asset, asset?.id, asset?.name, 
      interval, isFallback, isTraded, onChange, showAssetInfo])

  return useMemo(() => {
    return (
      <>
        <Page
          title={`${prefix} ${title}`}
          description={'Decentralized exchange for trading Algorand ASAs'}
          noFollow={true}
        >
          {!isMobile && <Layout asset={asset}>{renderContent()}</Layout>}
          {isMobile && <MobileLayout asset={asset}>{renderContent()}</MobileLayout>}
        </Page>
      </>
    )
  }, [asset?.price_info, asset, asset?.id, asset?.name, isMobile, prefix, renderContent])
}
// TradePage.whyDidYouRender = true

TradePage.propTypes = {
  originalStaticExplorerAsset: PropTypes.object,
  staticExplorerAsset: PropTypes.object,
  staticAssetPrice: PropTypes.object,
  deviceType: PropTypes.string
}
export default TradePage
