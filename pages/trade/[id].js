import React, { useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react'
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
import { WalletsContext } from '@/hooks/useWallets'
import config from '@/config.json'
import detectMobileDisplay from '@/utils/detectMobileDisplay'
import signer from '@algodex/algodex-sdk/lib/wallet/signers/MyAlgoConnect'
import { useAlgodex } from '@algodex/algodex-hooks'
import { useAssetPriceQuery } from '@algodex/algodex-hooks'
// import { useAssetPriceQuery } from '@/hooks/useAlgodex'
import useDebounce from '@/hooks/useDebounce'
import { useRouter } from 'next/router'
import useUserStore from '@/store/use-user-state'

/**
 * Fetch Traded Asset Paths
 * @returns {Promise<{paths: {params: {id: *}}[], fallback: boolean}>}
 */
export async function getStaticPaths() {
  let api = new AlgodexApi(config)
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
  let api = new AlgodexApi(config)
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
  const [locStorage, setLocStorage] = useState([])
  const context = useContext(WalletsContext)
  const myAlgoConnector = useRef(null)
  const { setWallet, wallet } = useAlgodex()

  // useEffect(() => {
  //   if (myAlgoConnector.current === null) {
  //     const reConnectMyAlgoWallet = async () => {
  //       // '@randlabs/myalgo-connect' is imported dynamically
  //       // because it uses the window object
  //       const MyAlgoConnect = (await import('@randlabs/myalgo-connect')).default
  //       MyAlgoConnect.prototype.sign = signer
  //       myAlgoConnector.current = new MyAlgoConnect()
  //       myAlgoConnector.current.connected = true
  //     }

  //     reConnectMyAlgoWallet()
  //   }
  // }, [])
  const [addresses, setAddresses, walletConnect] = useContext(WalletsContext)

  // useEffect(() => {
  //   const storedAddrs = JSON.parse(localStorage.getItem('addresses'))

  //   if (locStorage.length === 0 && storedAddrs?.length > 0) {
  //     setLocStorage(storedAddrs)
  //   }
  // }, [myAlgoConnector.current, addresses])

  const [asset, setAsset] = useState(staticExplorerAsset)
  //TODO: useEffect and remove this from the compilation
  if (typeof staticExplorerAsset !== 'undefined') {
    // Add GeoBlocking
    staticExplorerAsset.isGeoBlocked =
      getIsRestrictedCountry(query) && staticExplorerAsset.isRestricted
  }
  // console.log(wallet, 'wallet rendering')
  const [interval, setInterval] = useState('1h')
  const _asset = typeof staticExplorerAsset !== 'undefined' ? staticExplorerAsset : { id: query.id }
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

  // useEffect(() => {
  //   if (locStorage.length > 0) {
  //     const reHydratedAddresses = locStorage.map((wallet) => {
  //       if (wallet.type === 'my-algo-wallet' && myAlgoConnector.current) {
  //         return {
  //           ...wallet,
  //           connector: myAlgoConnector.current
  //         }
  //       } else {
  //         return {
  //           ...wallet,
  //           connector: walletConnect.current
  //         }
  //         // return wallet
  //       }
  //     })
  //     setAddresses(reHydratedAddresses)
  //     setWallet(reHydratedAddresses[0])
  //   }
  // }, [locStorage, myAlgoConnector.current])

  useEffect(() => {
    if (typeof data !== 'undefined' && typeof data.id !== 'undefined' && data.id !== asset?.id) {
      setAsset(data)
    }
  }, [data, setAsset, staticExplorerAsset])

  useEffect(() => {
    if (
      typeof staticExplorerAsset !== 'undefined' &&
      typeof staticExplorerAsset.id !== 'undefined' &&
      staticExplorerAsset.id !== asset?.id
    ) {
      setAsset(staticExplorerAsset)
    }
  }, [asset, setAsset, staticExplorerAsset])

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

  // useEffect(() => {
  //   const reConnectMyAlgoWallet = async () => {
  //     // '@randlabs/myalgo-connect' is imported dynamically
  //     // because it uses the window object
  //     const MyAlgoConnect = (await import('@randlabs/myalgo-connect')).default
  //     MyAlgoConnect.prototype.sign = signer
  //     myAlgoConnector.current = new MyAlgoConnect()
  //     myAlgoConnector.current.connected = true
  //     const mappedAddresses = addresses.map((addr) => {
  //       if (addr.type === 'my-algo-wallet') {
  //         return {
  //           ...addr,
  //           connector: myAlgoConnector.current
  //         }
  //       } else {
  //         // return addr
  //         return {
  //           ...addr,
  //           connector: walletConnect.current
  //         }
  //       }
  //     })
  //     if (mappedAddresses.length && !wallet?.connector) {
  //       console.log(mappedAddresses[0], 'hello hereeee')
  //       // setWallet(mappedAddresses[0])
  //     }
  //   }
  //   reConnectMyAlgoWallet()
  // }, [myAlgoConnector.current, walletConnect.current])

  // console.log(wallet, 'please update')
  // useEffect(() => {
  //   if (addresses.length === 0 && locStorage.length > 0) {
  //     const reHydratedAddresses = locStorage.map((wallet) => {
  //       if (wallet.type === 'my-algo-wallet') {
  //         return {
  //           ...wallet,
  //           connector: myAlgoConnector.current
  //         }
  //       } else {
  //         return {
  //           ...wallet,
  //           connector: walletConnect.current
  //         }
  //       }
  //     })
  //     setAddresses(reHydratedAddresses)
  //     setWallet(reHydratedAddresses[0])
  //   }
  // }, [locStorage, myAlgoConnector.current])

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
