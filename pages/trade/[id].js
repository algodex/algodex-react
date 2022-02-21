import { fetchAssets } from '@/services/algodex'
import { useCallback, useState } from 'react'

import { fetchExplorerAssetInfo } from '@/services/algoexplorer'

import AssetInfo from '@/components/Asset/Asset'
import Chart from '@/components/Asset/Chart'
import Page from '@/components/Page'
import PropTypes from 'prop-types'
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
  let staticExplorerAsset

  try {
    staticExplorerAsset = await fetchExplorerAssetInfo(id)
    console.log(staticExplorerAsset)
  } catch ({ response: { status } }) {
    switch (status) {
      case 404:
        return {
          notFound: true
        }
    }
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

  const [interval, setInterval] = useState('1h')
  const onChange = useCallback(
    (e) => {
      if (e.target.name === 'interval' && e.target.value !== interval) {
        setInterval(e.target.value)
      }
    },
    [setInterval, interval]
  )

  return (
    <Page
      title={`${prefix} ${title}`}
      description={'Decentralized exchange for trading Algorand ASAs'}
      staticExplorerAsset={staticExplorerAsset}
      noFollow={true}
    >
      {({ asset }) =>
        showAssetInfo ? (
          <AssetInfo asset={asset} />
        ) : (
          <Chart asset={asset} interval={interval} onChange={onChange} />
        )
      }
    </Page>
  )
}

TradePage.propTypes = {
  staticExplorerAsset: PropTypes.object,
  staticAssetPrice: PropTypes.object
}
export default TradePage
