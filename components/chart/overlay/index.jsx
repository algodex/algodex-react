import {
  Ask,
  Bid,
  BidAskSpreadContainer,
  Container,
  Header,
  IconButton,
  OhlcItem,
  OhlcList,
  Spread,
  TradingPair,
  Volume,
  VolumeContainer
} from './chart-overlay.css'

import Big from 'big.js'
import Icon from '@mdi/react'
import { Info } from 'react-feather'
import PropTypes from 'prop-types'
import { floatToFixed } from 'services/display'
import { mdiCheckDecagram } from '@mdi/js'
import theme from '../../../theme'
import { useCallback } from 'react'
import { useUserStore } from '../../../store'

function ChartOverlay(props) {
  const { asset, ohlc, bid, ask, spread, volume } = props
  const setShowAssetInfo = useUserStore((state) => state.setShowAssetInfo)
  const currentPrice = asset.price ? new Big(asset.price) : new Big(0)
  const changeAmt = asset.priceChange24hr
    ? currentPrice.sub(currentPrice.div(new Big(1 + asset.priceChange24hr / 100))).toString()
    : '0'
  const changePct = asset.priceChange24hr ? new Big(asset.priceChange24hr) : new Big(0)

  const openCloseChange = () => {
    const symbol = new Big(changeAmt).gt(0) ? '+' : ''

    return `${symbol}${floatToFixed(changeAmt)} (${symbol}${floatToFixed(changePct, 2)}%)`
  }
  const onClick = useCallback(() => {
    setShowAssetInfo(true)
  }, [asset])

  return (
    <Container>
      <Header>
        <TradingPair className="flex item-center">
          {asset?.verified && (
            <Icon
              path={mdiCheckDecagram}
              title="Verified Asset"
              size={0.7}
              color={theme.colors.gray['500']}
            />
          )}
          <div>
            &nbsp;<span>{`${asset.name} `}</span> / ALGO
          </div>
          <div>
            <IconButton onClick={onClick} type="button">
              <Info />
            </IconButton>
          </div>
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
