import PropTypes from 'prop-types'
import { HeaderSm, BodyCopySm } from 'components/Typography'
import SvgImage from 'components/SvgImage'
import styled from 'styled-components'
export const Container = styled.div`
  flex: 1 1 0%;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  background-color: ${({ theme }) => theme.colors.background.dark};
  padding: 0.875rem 0 1rem;
`

export const EmptyState = styled.div`
  position: relative;
  flex: 1 1 0%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 1.25rem 1.125rem;
  text-align: center;
`

export const Arrow = styled.div`
  display: none;
  position: absolute;
  top: 50%;
  right: 2.5rem;
  transform: translateY(4.5rem);

  svg {
    transform: scale(-1) scaleY(-1) rotate(-115deg);
  }

  @media (min-width: 1024px) {
    display: block;
  }

  @media (min-width: 1024px) and (orientation: portrait) {
    display: none;
  }

  @media (min-width: 1536px) {
    display: block;
  }
`

export const PairSlash = styled.span`
  letter-spacing: 0.125rem;
`
function FirstOrderMsg(props) {
  const { asset, isSignedIn } = props

  const renderMessage = () => {
    if (isSignedIn) {
      return (
        <BodyCopySm color="gray.500" m={0}>
          Place a maker buy/sell order to add liquidity for this trading&nbsp;pair
        </BodyCopySm>
      )
    }
    return (
      <BodyCopySm color="gray.500" m={0}>
        Connect your wallet and place an order to add liquidity for this trading&nbsp;pair
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
          Place the first limit order for {asset.name}
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
