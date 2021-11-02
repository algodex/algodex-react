import PropTypes from 'prop-types'
import Big from 'big.js'
import { floatToFixed } from '@algodex/common/lib/utility/display.js'
import { Info } from 'react-feather'

import {
  Container,
  Header,
  TradingPair,
  OhlcList,
  OhlcItem,
  BidAskSpreadContainer,
  Bid,
  Ask,
  Spread,
  VolumeContainer,
  Volume,
  IconButton
} from './chart-overlay.css'
import useStore from 'store/use-store'

function ChartOverlay(props) {
  const { asset, ohlc, bid, ask, spread, volume } = props

  const setShowAssetInfo = useStore((state) => state.setShowAssetInfo)
  const currentPrice = asset.price ? new Big(asset.price) : new Big(0)
  const changeAmt = asset.priceChange24hr
    ? currentPrice.sub(currentPrice.div(new Big(1 + asset.priceChange24hr / 100))).toString()
    : '0'
  const changePct = asset.priceChange24hr ? new Big(asset.priceChange24hr) : new Big(0)

  const openCloseChange = () => {
    const symbol = new Big(changeAmt).gt(0) ? '+' : ''

    return `${symbol}${floatToFixed(changeAmt)} (${symbol}${floatToFixed(changePct, 2)}%)`
  }

  return (
    <Container>
      <Header>
        <TradingPair>
          <div>
            <span>{`${asset.name} `}</span> / ALGO
          </div>
          <IconButton type="button" onClick={() => setShowAssetInfo(true)}>
            <Info />
          </IconButton>
        </TradingPair>
        <OhlcList>
          <OhlcItem value={ohlc.open}>
            <dt>O:</dt>
            <dd>{ohlc.open}</dd>
          </OhlcItem>
          <OhlcItem value={ohlc.high}>
            <dt>H:</dt>
            <dd>{ohlc.high}</dd>
          </OhlcItem>
          <OhlcItem value={ohlc.low}>
            <dt>L:</dt>
            <dd>{ohlc.low}</dd>
          </OhlcItem>
          <OhlcItem value={ohlc.close}>
            <dt>C:</dt>
            <dd>{ohlc.close}</dd>
          </OhlcItem>
          <OhlcItem value={changeAmt}>
            <dd>{openCloseChange()}</dd>
          </OhlcItem>
        </OhlcList>
      </Header>
      <BidAskSpreadContainer>
        <Bid>{bid}</Bid>
        <Spread>{spread}</Spread>
        <Ask>{ask}</Ask>
      </BidAskSpreadContainer>
      <VolumeContainer>
        <Volume>
          <dt>Vol:</dt>
          <dd>{`${volume} ${asset.name}`}</dd>
        </Volume>
      </VolumeContainer>
    </Container>
  )
}

ChartOverlay.propTypes = {
  asset: PropTypes.object.isRequired,
  ohlc: PropTypes.object.isRequired,
  bid: PropTypes.string,
  ask: PropTypes.string,
  spread: PropTypes.string,
  volume: PropTypes.string
}

export default ChartOverlay
