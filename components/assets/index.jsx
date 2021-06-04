import { BodyCopySm, BodyCopyTiny } from 'components/type'
import { assets } from 'data/test-data'
import {
  AssetRow,
  AssetsWrapper,
  CoinContainer,
  Container,
  EmptyState,
  Header,
  SmallButton,
  WrapperContainer
} from './assets.css'

function Assets(props) {
  const renderAssets = (assetBalances) =>
    assetBalances.map((asset) => (
      <AssetRow>
        <CoinContainer>
          <BodyCopySm color="gray.100" ml={2}>
            {asset.coin}
          </BodyCopySm>
        </CoinContainer>
        <BodyCopySm color="gray.100">{asset.name}</BodyCopySm>
        <BodyCopySm color="gray.100" textAlign="right">
          {asset.total}
        </BodyCopySm>
        <BodyCopySm color="gray.100" textAlign="right">
          {asset.total - asset.inOrder}
        </BodyCopySm>
        <BodyCopySm color="gray.100" textAlign="right">
          {asset.inOrder}
        </BodyCopySm>
        <BodyCopySm color="gray.100" textAlign="right">
          {asset.algoValue}
        </BodyCopySm>
        <SmallButton color="gray.100" textAlign="right">
          Deposit
        </SmallButton>
        <SmallButton color="gray.100" textAlign="right" variant="outline">
          Withdraw
        </SmallButton>
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
