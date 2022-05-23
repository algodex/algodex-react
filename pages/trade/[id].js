import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { fetchAssetPrice, fetchAssets } from '@/services/algodex'
import { getIsRestricted, getIsRestrictedCountry } from '@/utils/restrictedAssets'

import AssetInfo from '@/components/Asset/Asset'
import Chart from '@/components/Asset/Chart'
import Layout from '@/components/Layout/OriginalLayout'
import Page from '@/components/Page'
import PropTypes from 'prop-types'
import Spinner from '@/components/Spinner'
import { fetchExplorerAssetInfo } from '@/services/algoexplorer'
import { useAssetPriceQuery } from '@/hooks/useAlgodex'
import { useRouter } from 'next/router'
import useUserStore from '@/store/use-user-state'

/**
 * Fetch Traded Asset Paths
 * @returns {Promise<{paths: {params: {id: *}}[], fallback: boolean}>}
 */
export async function getStaticPaths() {
  const assets = await fetchAssets()
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
  try {
    staticExplorerAsset = await fetchExplorerAssetInfo(id)
  } catch ({ response: { status } }) {
    switch (status) {
      case 404:
        return {
          notFound: true
        }
    }
  }

  staticExplorerAsset.isRestricted = getIsRestricted(id)

  try {
    staticAssetPrice = await fetchAssetPrice(id)
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

  return {
    props: { staticExplorerAsset }
  }
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
 * @returns {JSX.Element}
 * @constructor
 */
function TradePage({ staticExplorerAsset }) {
  // eslint-disable-next-line no-undef
  console.debug(`TradePage(`, staticExplorerAsset, `)`)
  const title = 'Algodex | Algorand Decentralized Exchange'
  const prefix = staticExplorerAsset?.name ? `${staticExplorerAsset.name} to ALGO` : ''
  const showAssetInfo = useUserStore((state) => state.showAssetInfo)

  const { isFallback, query } = useRouter()
  // Add GeoBlocking
  staticExplorerAsset.isGeoBlocked =
    getIsRestrictedCountry(query) && staticExplorerAsset.isRestricted
  const [asset, setAsset] = useState(staticExplorerAsset)

  const [interval, setInterval] = useState('1h')
  const _asset = typeof staticExplorerAsset !== 'undefined' ? staticExplorerAsset : { id: query.id }

  const { data } = useAssetPriceQuery({ asset: _asset })
  const onChange = useCallback(
    (e) => {
      if (e.target.name === 'interval' && e.target.value !== interval) {
        setInterval(e.target.value)
      }
    },
    [setInterval, interval]
  )

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
    console.log(asset, data)
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
      <Layout asset={asset}>{renderContent()}</Layout>
    </Page>
  )
}

TradePage.propTypes = {
  staticExplorerAsset: PropTypes.object,
  staticAssetPrice: PropTypes.object
}
export default TradePage
