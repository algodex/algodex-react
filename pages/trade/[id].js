import { fetchAssetPrice, fetchAssets } from '@/services/algodex'
import React, { useCallback, useEffect, useState } from 'react'

import AssetInfo from '@/components/Asset/Asset'
import Chart from '@/components/Asset/Chart'
import Page from '@/components/Page'
import PropTypes from 'prop-types'
import { fetchExplorerAssetInfo } from '@/services/algoexplorer'
import useUserStore from '@/store/use-user-state'

import Spinner from '@/components/Spinner'
import Layout from '@/components/Layout/OriginalLayout'
import { useExplorerAssetInfo } from '@/hooks/useAlgoExplorer'
import { useRouter } from 'next/router'

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
  let staticExplorerAsset
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
const TradePage = ({ staticExplorerAsset }) => {
  // eslint-disable-next-line no-undef
  console.debug(`TradePage(`, arguments[0], `)`)
  const title = 'Algodex | Algorand Decentralized Exchange'
  const prefix = staticExplorerAsset?.name ? `${staticExplorerAsset.name} to ALGO` : ''
  const showAssetInfo = useUserStore((state) => state.showAssetInfo)

  const { query } = useRouter()
  const id = parseInt(query.id)
  // Use the static asset or
  const [asset, setAsset] = useState(staticExplorerAsset || { id })

  const isRouted = typeof query.id !== 'undefined'
  const isShallow = isRouted && id !== asset?.id
  const isStatic = isRouted && id === staticExplorerAsset?.id

  let options = {
    enabled: isRouted || isShallow || typeof staticExplorerAsset === 'undefined',
    refetchInterval: 200000
  }

  if (isStatic) {
    options.initialData = staticExplorerAsset
  }

  const { data: explorerAsset, isLoading: isExplorerInfoLoading } = useExplorerAssetInfo({
    asset: { id: query.id || asset?.id },
    options
  })

  const [interval, setInterval] = useState('1h')
  const onChange = useCallback(
    (e) => {
      if (e.target.name === 'interval' && e.target.value !== interval) {
        setInterval(e.target.value)
      }
    },
    [setInterval, interval]
  )

  // Effects for AlgoExplorer
  useEffect(() => {
    if (
      typeof explorerAsset !== 'undefined' &&
      typeof explorerAsset.id !== 'undefined' &&
      explorerAsset.id !== asset?.id
    ) {
      setAsset(explorerAsset)
    }
  }, [asset, setAsset, explorerAsset])

  const isLoading = isExplorerInfoLoading

  const renderContent = () => {
    if (isLoading || !asset?.id) return <Spinner flex />
    if (showAssetInfo || !asset.price_info.isTraded) return <AssetInfo asset={asset} />
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
