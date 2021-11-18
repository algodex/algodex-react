import PropTypes from 'prop-types'
import styled from 'styled-components'
import { fetchExplorerAssetInfo } from 'lib/algoexplorer'
import { fetchAssets } from 'lib/api'
import Page from 'components/Page'
import AssetInfo from 'components/asset-info'

export const Container = styled.div`
  display: flex;
  flex-direction: column;

  overflow: hidden;
  max-height: calc(var(--vh, 1vh) * 100);
  height: calc(var(--vh, 1vh) * 100);

  @media (min-width: 996px) {
    overflow: scroll;
    max-height: none;
  }

  // for demo
  p.demo {
    flex: 1 1 0%;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
    margin: 0;
    color: ${({ theme }) => theme.colors.gray['600']};
    font-size: 0.9rem;
    font-weight: 500;
    text-transform: uppercase;
  }
`

export const StatusContainer = styled.div`
  flex: 1 1 0%;
  display: flex;
`

/**
 * Get all Verified Assets and Traded Assets
 * Fallback to react-query
 * @returns {Promise<{paths: [{params: {id: string}}], fallback: boolean}>}
 */
export async function getStaticPaths() {
  const assets = await fetchAssets()
  const paths = assets.map((asset) => ({
    params: { id: asset.id.toString() }
  }))
  return { paths, fallback: true }
}

/**
 * Asset By ID Props
 *
 * Generate Static Props for an Asset
 *
 * @param id
 * @returns {Promise<{props: {staticExplorerAsset: {circulating, total, decimals, name, verified, txid, fullName, id, url, timestamp, txns}}}|{notFound: boolean}>}
 */
export async function getStaticProps({ params: { id } }) {
  let staticExplorerAsset
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

  return {
    props: { staticExplorerAsset }
  }
}

/**
 * Asset Page
 *
 * Has prerender support for Verified and Traded Assets.
 * An asset page will fallback to Algorand Indexer v2
 *
 *
 * @param {Object} staticAsset
 * @returns {JSX.Element}
 * @constructor
 */
const AssetPage = ({ staticExplorerAsset }) => {
  console.debug(`Asset Page Render: ${staticExplorerAsset?.id || 'Missing'}`)

  // Page Title
  const title = 'Algodex | Algorand Decentralized Exchange'
  const prefix = staticExplorerAsset?.name ? `${staticExplorerAsset.name} Information` : ''

  return (
    <Page title={`${title} | ${prefix}`} staticExplorerAsset={staticExplorerAsset}>
      {({ asset }) => <AssetInfo explorerAsset={asset} />}
    </Page>
  )
}
AssetPage.propTypes = {
  staticExplorerAsset: PropTypes.object
}
export default AssetPage
