import styled from 'styled-components'
import PropTypes from 'prop-types'
import Chart from '../../components/chart'
import Page from 'components/Page'
import { fetchExplorerAssetInfo } from '../../lib/algoexplorer'
import { fetchAssets } from '../../lib/api'

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

export async function getStaticPaths() {
  const assets = await fetchAssets()
  const paths = assets
    .filter((asset) => asset.isTraded)
    .map((asset) => ({
      params: { id: asset.id.toString() }
    }))
  return { paths, fallback: true }
  // return { paths: [{ params: { id: `21401037` } }], fallback: true }
}

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

const TradePage = ({ staticExplorerAsset }) => {
  console.debug('Trade Page Render')
  //
  const title = 'Algodex | Algorand Decentralized Exchange'
  const prefix = staticExplorerAsset?.name ? `${staticExplorerAsset.name} to ALGO` : ''

  return (
    <Page
      title={`${prefix} ${title}`}
      description={'Decentralized exchange for trading Algorand ASAs'}
      staticExplorerAsset={staticExplorerAsset}
    >
      {({ asset }) => <Chart asset={asset} />}
    </Page>
  )
}

TradePage.propTypes = {
  staticExplorerAsset: PropTypes.object
}
export default TradePage
