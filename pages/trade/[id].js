import { fetchAssetPrice, fetchAssets } from 'services/algodex'

import { AssetInfo } from 'components/Asset/Asset'
import Chart from 'components/Asset/Chart'
import Page from 'components/Page'
import PropTypes from 'prop-types'
import { fetchExplorerAssetInfo } from 'services/algoexplorer'
import { useUserStore } from 'store'

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
  let staticExplorerAsset,
    staticAssetPrice = {}

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

  return {
    props: { staticExplorerAsset, staticAssetPrice }
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
 * @param {object} staticAssetPrice The Asset Price Response
 * @returns {JSX.Element}
 * @constructor
 */
const TradePage = ({ staticExplorerAsset, staticAssetPrice }) => {
  console.debug('Trade Page Render')
  const title = 'Algodex | Algorand Decentralized Exchange'
  const prefix = staticExplorerAsset?.name ? `${staticExplorerAsset.name} to ALGO` : ''
  const showAssetInfo = useUserStore((state) => state.showAssetInfo)
  return (
    <Page
      title={`${prefix} ${title}`}
      description={'Decentralized exchange for trading Algorand ASAs'}
      staticExplorerAsset={staticExplorerAsset}
      noFollow={true}
    >
      {({ asset }) =>
        showAssetInfo || !staticAssetPrice?.isTraded ? (
          <AssetInfo asset={asset} price={staticAssetPrice} />
        ) : (
          <Chart asset={asset} />
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
