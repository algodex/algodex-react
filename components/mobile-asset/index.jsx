import PropTypes from 'prop-types'
import { Container, LeftColumn, RightColumn } from './mobile-asset.css'
import { BodyCopySm, BodyCopyTiny } from 'components/type'

function MobileAsset({ name, token, amount }) {
  return (
    <Container>
      <LeftColumn>
        <BodyCopySm color="gray.100">{token}</BodyCopySm>
        <BodyCopyTiny color="gray.500">{name}</BodyCopyTiny>
      </LeftColumn>
      <RightColumn>
        <BodyCopySm color="gray.100">{amount}</BodyCopySm>
        <BodyCopyTiny color="gray.100">{token}</BodyCopyTiny>
      </RightColumn>
    </Container>
  )
}

export default MobileAsset

MobileAsset.propTypes = {}
MobileAsset.defaultProps = {}
