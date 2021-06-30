import PropTypes from 'prop-types'
import { Container, LeftColumn, RightColumn } from './mobile-asset.css'
import { BodyCopySm, BodyCopyTiny } from 'components/type'

function MobileAsset({ asset: { name, token, amount } }) {
  return (
    <Container data-testid="asset-row" className="asset-row">
      <LeftColumn>
        <BodyCopySm color="gray.100" data-testid="token-lg">
          {token}
        </BodyCopySm>
        <BodyCopyTiny color="gray.500" data-testid="name">
          {name}
        </BodyCopyTiny>
      </LeftColumn>
      <RightColumn>
        <BodyCopySm color="gray.100" data-testid="amount">
          {amount}
        </BodyCopySm>
        <BodyCopyTiny color="gray.100" data-testid="token-sm">
          {token}
        </BodyCopyTiny>
      </RightColumn>
    </Container>
  )
}

export default MobileAsset

MobileAsset.propTypes = {
  asset: PropTypes.shape({
    name: PropTypes.string,
    token: PropTypes.string,
    amount: PropTypes.number
  }).isRequired
}
