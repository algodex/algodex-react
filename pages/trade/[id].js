import React, { useCallback, useEffect, useMemo, useState } from 'react'

import AssetInfo from '@/components/Asset/Asset'
import Chart from '@/components/Asset/Chart'
import Page from '@/components/Page'
import PropTypes from 'prop-types'
import useUserStore from '@/store/use-user-state'

import Spinner from '@/components/Spinner'
import Layout from '@/components/Layout/OriginalLayout'
import { useRouter } from 'next/router'
import { useAssetPriceQuery } from '@algodex/algodex-hooks'
import AlgodexApi from '@algodex/algodex-sdk'

/**
 * Fetch Traded Asset Paths
 * @returns {Promise<{paths: {params: {id: *}}[], fallback: boolean}>}
 */
export async function getStaticPaths() {
  let api = new AlgodexApi(properties)
  const assets = await api.http.dexd.fetchAssets()
  const paths = assets
    .filter((asset) => asset.isTraded)
    .map((asset) => ({
      params: { id: asset.id.toString() }
    }))
  return { paths, fallback: true }
}

const properties = {
  config: {
    algod: {
      uri: 'https://testnet.algoexplorerapi.io',
      token: ''
    },
    indexer: {
      uri: 'https://algoindexer.testnet.algoexplorerapi.io',
      token: ''
    },
    dexd: {
      uri: 'https://testnet.algodex.com/algodex-backend',
      token: ''
    },
    tinyman: {
      uri: 'https://testnet.analytics.tinyman.org',
      token: ''
    }
  }
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
  let api = new AlgodexApi(properties)
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
  // console.debug(`TradePage(`, staticExplorerAsset, `)`)

  const title = 'Algodex | Algorand Decentralized Exchange'
  const prefix = staticExplorerAsset?.name ? `${staticExplorerAsset.name} to ALGO` : ''
  const showAssetInfo = useUserStore((state) => state.showAssetInfo)

  const { isFallback, query } = useRouter()

  // Use the static asset or fallback to the route id
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
