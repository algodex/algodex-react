import { useCallback, useMemo } from 'react'

import Big from 'big.js'
import Icon from '@mdi/react'
import { Info } from 'react-feather'
import PropTypes from 'prop-types'
import floatToFixed from '@algodex/algodex-sdk/lib/utils/format/floatToFixed'
import { mdiCheckDecagram } from '@mdi/js'
import styled from '@emotion/styled'
import theme from 'theme'
import { useUserStore } from 'store'

export const Container = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 6rem;
  z-index: 10;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  pointer-events: none;
`

export const Header = styled.header`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  margin-left: 1.75rem;
  margin-top: 1.25rem;
  margin-bottom: 0.125rem;
`

export const TradingPair = styled.h3`
  margin-right: 1.5em;
  margin-bottom: 0.375em;
  font-family: ${({ theme }) => theme.fontFamilies.body};
  font-size: 1rem;
  font-weight: 600;
  margin-block-start: 0;
  margin-block-end: 0;
  color: ${({ theme }) => theme.palette.gray[500]};
  white-space: nowrap;

  span {
    color: ${({ theme }) => theme.palette.gray[100]};
  }

  display: flex;
  align-items: center;

  @media (min-width: 1024px) {
    font-size: 1.25rem;
  }
`
TradingPair.defaultProps = {
  'data-testid': 'trading-pair'
}
export const IconButton = styled.button`
  cursor: pointer;
  pointer-events: all;
  border: none;
  background: transparent;
  color: ${({ theme }) => theme.palette.gray[100]};
  margin-left: 0.125rem;
  padding: 0;

  svg {
    height: 16px;
    position: relative;
    left: -2px;
    top: -5px;
  }
`

export const OhlcList = styled.dl`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  margin-block-start: 0;
  margin-block-end: 0;
  dd {
    margin-inline-start: 0;
  }
`

export const OhlcItem = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 0.5em;
  font-family: ${({ theme }) => theme.fontFamilies.monospace};
  font-size: 0.6875rem;
  line-height: 1;
  white-space: nowrap;

  &:not(:last-child) {
    margin-right: 2em;
  }

  dt {
    color: ${({ theme }) => theme.palette.gray[100]};
    margin-right: 0.375em;
  }

  dd {
    color: ${({ theme, value }) =>
      parseFloat(value) < 0 ? theme.palette.red[500] : theme.palette.green[500]};
  }

  @media (min-width: 1024px) {
    font-size: 0.75rem;
  }
`

export const BidAskSpreadContainer = styled.div`
  display: flex;
  align-items: center;
  font-family: ${({ theme }) => theme.fontFamilies.monospace};
  font-size: 0.6875rem;
  line-height: 1;
  white-space: nowrap;
  margin-left: 1.75rem;
  margin-bottom: 0.875em;

  @media (min-width: 1024px) {
    font-size: 0.75rem;
  }
`

const BidAskSpreadItem = styled.span`
  color: ${({ theme }) => theme.palette.gray[100]};
  padding: 0.25em 0.625em;
  border-radius: 2px;

  &:not(:last-child) {
    margin-right: 1em;
  }
`

export const Bid = styled(BidAskSpreadItem)`
  background-color: ${({ theme }) => theme.palette.green[800]};
`
Bid.defaultProps = {
  'data-testid': 'bid'
}
export const Ask = styled(BidAskSpreadItem)`
  background-color: ${({ theme }) => theme.palette.red[800]};
`
Ask.defaultProps = {
  'data-testid': 'ask'
}
export const Spread = styled(BidAskSpreadItem)`
  background-color: ${({ theme }) => theme.palette.gray[900]};
  padding-left: 0.375em;
  padding-right: 0.375em;
`
Spread.defaultProps = {
  'data-testid': 'spread'
}
export const VolumeContainer = styled.dl`
  display: flex;
  align-items: center;
  margin-left: 1.75rem;
  margin-block-start: 0;
  margin-block-end: 0;
`

export const Volume = styled.div`
  display: flex;
  align-items: center;
  font-family: ${({ theme }) => theme.fontFamilies.monospace};
  font-size: 0.6875rem;
  line-height: 1;
  white-space: nowrap;

  dt {
    color: ${({ theme }) => theme.palette.gray[100]};
    margin-right: 0.375em;
  }

  dd {
    color: ${({ theme }) => theme.palette.gray[100]};
    margin-inline-start: 0px;
  }

  @media (min-width: 1024px) {
    font-size: 0.75rem;
  }
`

function ChartOverlay(props) {
  const { asset, ohlc, bid, ask, spread, volume } = props
  const setShowAssetInfo = useUserStore((state) => state.setShowAssetInfo)
  const currentPrice = asset.price_info?.price ? new Big(asset.price_info?.price) : new Big(0)
  const changeAmt = asset.price_info?.price24Change
    ? currentPrice
        .sub(currentPrice.div(new Big(1 + asset.price_info?.price24Change / 100)))
        .toString()
    : '0'
  const changePct = asset.price_info?.price24Change
    ? new Big(asset.price_info?.price24Change)
    : new Big(0)

  const openCloseChange = useMemo(() => {
    const symbol = new Big(changeAmt).gt(0) ? '+' : ''
    return `${symbol}${floatToFixed(changeAmt)} (${symbol}${floatToFixed(changePct, 2)}%)`
  }, [asset, changeAmt])

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
              color={theme.palette.gray['500']}
            />
          )}
          {!asset.isStable && (
            <div>
              &nbsp;<span>{`${asset.name} `}</span> / ALGO
            </div>
          )}
          {asset.isStable && (
            <div>
              <span>ALGO</span> / {`${asset.name} `}
            </div>
          )}
          <div>
            <IconButton onClick={onClick} type="button">
              <Info />
            </IconButton>
          </div>
        </TradingPair>
        <OhlcList>
          <OhlcItem value={ohlc.open}>
            <dt>O:</dt>
            <dd data-testid="open24hr">{ohlc.open}</dd>
          </OhlcItem>
          <OhlcItem value={ohlc.high}>
            <dt>H:</dt>
            <dd data-testid="high24hr">{ohlc.high}</dd>
          </OhlcItem>
          <OhlcItem value={ohlc.low}>
            <dt>L:</dt>
            <dd data-testid="low24hr">{ohlc.low}</dd>
          </OhlcItem>
          <OhlcItem value={ohlc.close}>
            <dt>C:</dt>
            <dd data-testid="close24hr">{ohlc.close}</dd>
          </OhlcItem>
          <OhlcItem value={changeAmt}>
            <dd data-testid="dailyChange">{openCloseChange}</dd>
          </OhlcItem>
          {/* <OhlcItem value={volume}>
            <dt>Volume:</dt>
            <dd data-testid="volume">{volume}</dd>
          </OhlcItem> */}
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
          {/* <dd>{`${volume} ${asset.name}`}</dd> */}
          {asset.isStable && <dd>{`${volume} ALGO`}</dd>}
          {!asset.isStable && <dd>{`${volume} ${asset.name}`}</dd>}
        </Volume>
      </VolumeContainer>
    </Container>
  )
}

ChartOverlay.propTypes = {
  asset: PropTypes.object.isRequired,
  ohlc: PropTypes.object.isRequired,
  bid: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  ask: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  spread: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  volume: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
}
export default ChartOverlay
