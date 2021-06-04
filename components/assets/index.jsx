import { BodyCopySm, BodyCopyTiny } from 'components/type'
import { assets } from 'data/test-data'
import {
  AssetRow,
  AssetsWrapper,
  CoinContainer,
  Container,
  EmptyState,
  Header,
  WrapperContainer
} from './assets.css'

function Assets(props) {
  const renderAssets = (assetBalances) =>
    assetBalances.map((asset) => (
      <AssetRow>
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
  return (
    <Container>
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
          <EmptyState>
            <BodyCopySm color="gray.500">You have no assets in your wallet.</BodyCopySm>
          </EmptyState>
        )}
      </WrapperContainer>
    </Container>
  )
}

export default Assets

Assets.propTypes = {}
Assets.defaultProps = {}
