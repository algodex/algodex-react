import { HeaderSm, BodyCopySm } from 'components/type'
import SvgImage from 'components/svg-image'
import useStore from 'store/use-store'

import { Container, EmptyState, Arrow, PairSlash } from './first-order-msg.css'

export default function FirstOrderMsg() {
  const asset = useStore((state) => state.asset)

  return (
    <Container>
      <EmptyState>
        <Arrow>
          <SvgImage use="walletArrow" h={4} color="gray.600" />
        </Arrow>
        <HeaderSm color="gray.100" m={0} mb={16}>
          Place the first limit order for {asset.name}
          {` `}
          <PairSlash>{`/`}</PairSlash>ALGO
        </HeaderSm>
        <BodyCopySm color="gray.500" m={0}>
          Create a maker buy/sell order to add liquidity for this trading&nbsp;pair
        </BodyCopySm>
      </EmptyState>
    </Container>
  )
}
