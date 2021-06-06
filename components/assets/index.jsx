import { BodyCopySm, BodyCopyTiny } from 'components/type'
import PropTypes from 'prop-types'
import {
  AssetRow,
  AssetsWrapper,
  Container,
  EmptyState,
  Header,
  WrapperContainer
} from './assets.css'

function Assets({ assets }) {
  const renderAssets = (assets) => {
    const sortedByTotal = assets.sort((a, b) => b.total - a.total)
    return sortedByTotal.map((asset) => (
      <AssetRow data-testid="assets-row" key={asset.name}>
        <BodyCopySm color="gray.100" my={2}>
          {asset.coin}
        </BodyCopySm>
        <BodyCopySm color="gray.100" my={2}>
          {asset.name}
        </BodyCopySm>
        <BodyCopySm color="gray.100" textAlign="right" my={2}>
          {asset.total}
        </BodyCopySm>
        <BodyCopySm color="gray.100" textAlign="right" my={2}>
          {asset.total - asset.inOrder}
        </BodyCopySm>
        <BodyCopySm color="gray.100" textAlign="right" my={2}>
          {asset.inOrder}
        </BodyCopySm>
        <BodyCopySm color="gray.100" textAlign="right" my={2}>
          {asset.algoValue}
        </BodyCopySm>
      </AssetRow>
    ))
  }
  return (
    <Container data-testid="assets">
      <Header>
        <BodyCopyTiny color="gray.500">Coin</BodyCopyTiny>
        <BodyCopyTiny color="gray.500">Name</BodyCopyTiny>
        <BodyCopyTiny color="gray.500" textAlign="right">
          Total
        </BodyCopyTiny>
        <BodyCopyTiny color="gray.500" textAlign="right">
          Available
        </BodyCopyTiny>
        <BodyCopyTiny color="gray.500" textAlign="right">
          In Order
        </BodyCopyTiny>
        <BodyCopyTiny color="gray.500" textAlign="right">
          ALGO Value
        </BodyCopyTiny>
      </Header>
      <WrapperContainer>
        {assets.length ? (
          <AssetsWrapper>{renderAssets(assets)}</AssetsWrapper>
        ) : (
          <EmptyState data-testid="empty-state">
            <BodyCopySm color="gray.500">You have no assets in your wallet.</BodyCopySm>
          </EmptyState>
        )}
      </WrapperContainer>
    </Container>
  )
}

export default Assets

Assets.propTypes = {
  assets: PropTypes.array.isRequired
}
Assets.defaultProps = {
  assets: []
}
