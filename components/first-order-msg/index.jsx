import PropTypes from 'prop-types'
import { HeaderSm, BodyCopySm } from 'components/type'
import SvgImage from 'components/svg-image'
import useTranslation from 'next-translate/useTranslation'
import { Container, EmptyState, Arrow, PairSlash } from './first-order-msg.css'

function FirstOrderMsg(props) {
  const { asset, isSignedIn } = props
  const { t } = useTranslation('common')
  const renderMessage = () => {
    if (isSignedIn) {
      return (
        <BodyCopySm color="gray.500" m={0}>
          {t('place-maker-description')}
        </BodyCopySm>
      )
    }
    return (
      <BodyCopySm color="gray.500" m={0}>
        {t('connect-wallet-liquidity')}
      </BodyCopySm>
    )
  }

  return (
    <Container>
      <EmptyState>
        {isSignedIn && (
          <Arrow>
            <SvgImage use="walletArrow" h={4} color="gray.600" />
          </Arrow>
        )}
        <HeaderSm color="gray.100" m={0} mb={16}>
          {t('place-first')} {asset.name}
          {` `}
          <PairSlash>{`/`}</PairSlash>ALGO
        </HeaderSm>
        {renderMessage()}
      </EmptyState>
    </Container>
  )
}

FirstOrderMsg.propTypes = {
  asset: PropTypes.object,
  isSignedIn: PropTypes.bool
}

export default FirstOrderMsg
