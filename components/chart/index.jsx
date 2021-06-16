import { BodyCopyTiny, BodyCopy } from 'components/type'
import PropTypes from 'prop-types'
import {
  Ask,
  Bid,
  ChartLabel,
  Close,
  Container,
  High,
  Low,
  OHLC,
  Open,
  Price,
  Spread,
  TopRow,
  VolumeContainer,
  AssetLabelContainer,
  AssetName,
  DailyChange,
  IntervalWrapper,
  IntervalSelector,
  Interval,
  Chevron,
  ChartModeButton,
  CandleStickChart,
  AreaSeriesChart,
  TrendingUpIcon,
  StatsChartIcon,
  ChartOptions
} from './chart.css'
import { useState, useRef } from 'react'
import millify from 'millify'
import useCandleChart from './use-candle-chart'
import useAreaChart from './use-area-chart'

// Common
const MODE_ICON_COLOR = '#f2f2f2'
const CHART_INTERVALS = ['1D', '4H', '1H', '15m', '3m', '1m']
const CHART_MODES = {
  CANDLE: 'CANDLE',
  LINE: 'LINE'
}
const { CANDLE, LINE } = CHART_MODES

function Chart({
  bidAndAsk: { bid, ask },
  priceData,
  volume24hr,
  pair,
  dailyChange,
  ohlc,
  volumeData,
  initialMode
}) {
  const [chartInterval, setChartInterval] = useState(CHART_INTERVALS[0])
  const [chartMode, setChartMode] = useState(initialMode)

  const candleChartRef = useRef()
  const { candleChart } = useCandleChart(candleChartRef, volumeData, priceData)

  const areaChartRef = useRef()
  const { areaChart } = useAreaChart(areaChartRef, volumeData, priceData)

  const formattedVolume = millify(volume24hr)
  const formattedBid = bid.toFixed(4)
  const formattedAsk = ask.toFixed(4)
  const formattedSpread = Math.abs(ask - bid).toFixed(4)
  const formattedDailyChange =
    dailyChange > 0 ? `+${dailyChange.toFixed(4)}%` : `-${dailyChange.toFixed(4)}%`

  function changeMode(currentMode) {
    if (currentMode === LINE) {
      const logicalRange = areaChart.timeScale().getVisibleLogicalRange()
      candleChart.timeScale().setVisibleLogicalRange(logicalRange)
      setChartMode(CANDLE)
      return
    }

    if (currentMode === CANDLE) {
      const logicalRange = candleChart.timeScale().getVisibleLogicalRange()
      areaChart.timeScale().setVisibleLogicalRange(logicalRange)
      setChartMode(LINE)
      return
    }
  }

  return (
    <Container>
      <CandleStickChart
        ref={candleChartRef}
        isVisible={chartMode === CANDLE ? true : false}
        data-testid="candleStickChart"
      />
      <AreaSeriesChart
        ref={areaChartRef}
        isVisible={chartMode === LINE ? true : false}
        data-testid="lineChart"
      />
      <ChartLabel>
        <TopRow>
          <AssetLabelContainer>
            <AssetName>
              <BodyCopy color="gray.100" letterSpacing=".1rem" mb={0} data-testid="primaryAsset">
                {pair[0]}
              </BodyCopy>
              <BodyCopy
                color="gray.500"
                letterSpacing=".1rem"
                ml={1}
                mb={0}
                data-testid="secondaryAsset"
              >
                {`/${pair[1]}`}
              </BodyCopy>
            </AssetName>
            <DailyChange dailyChange={dailyChange}>
              <BodyCopyTiny fontSize=".7rem" letterSpacing=".1rem" mb={1} data-testid="dailyChange">
                {formattedDailyChange}
              </BodyCopyTiny>
            </DailyChange>
          </AssetLabelContainer>

          <OHLC>
            <Open>
              <BodyCopyTiny color="gray.100" m={1}>
                O:
              </BodyCopyTiny>
              <BodyCopyTiny color="green.500" m={1} ml={0} data-testid="open24hr">
                {ohlc.open}
              </BodyCopyTiny>
            </Open>
            <High>
              <BodyCopyTiny color="gray.100" m={1}>
                H:
              </BodyCopyTiny>
              <BodyCopyTiny color="green.500" m={1} ml={0} data-testid="high24hr">
                {ohlc.high}
              </BodyCopyTiny>
            </High>
            <Low>
              <BodyCopyTiny color="gray.100" m={1}>
                L:
              </BodyCopyTiny>
              <BodyCopyTiny color="green.500" m={1} ml={0} data-testid="low24hr">
                {ohlc.low}
              </BodyCopyTiny>
            </Low>
            <Close>
              <BodyCopyTiny color="gray.100" m={1}>
                C:
              </BodyCopyTiny>
              <BodyCopyTiny color="green.500" m={1} ml={0} data-testid="close24hr">
                {ohlc.close}
              </BodyCopyTiny>
            </Close>
          </OHLC>
        </TopRow>
        <Price>
          <Bid data-testid="bid">{formattedBid}</Bid>
          <Spread data-testid="spread">{formattedSpread}</Spread>
          <Ask data-testid="ask">{formattedAsk}</Ask>
        </Price>
        <VolumeContainer>
          <BodyCopyTiny color="gray.100" letterSpacing=".1rem">
            VOL(ALGO):
          </BodyCopyTiny>
          <BodyCopyTiny color="gray.100" letterSpacing=".1rem" ml={1} data-testid="volume24hr">
            {formattedVolume}
          </BodyCopyTiny>
        </VolumeContainer>
        <ChartOptions>
          <IntervalWrapper>
            <IntervalSelector
              onChange={(e) => setChartInterval(e.target.value)}
              data-testid="intervalSelector"
            >
              {CHART_INTERVALS.map((interval) => (
                <Interval key={interval}>{interval}</Interval>
              ))}
            </IntervalSelector>
            <Chevron />
          </IntervalWrapper>
          <ChartModeButton onClick={() => changeMode(chartMode)}>
            {chartMode === CANDLE ? (
              <TrendingUpIcon color={MODE_ICON_COLOR} width="1rem" height="1rem" />
            ) : (
              <StatsChartIcon color={MODE_ICON_COLOR} width="1rem" height="1rem" />
            )}
          </ChartModeButton>
        </ChartOptions>
      </ChartLabel>
    </Container>
  )
}

export default Chart

Chart.propTypes = {
  bidAndAsk: PropTypes.object,
  priceData: PropTypes.array,
  volume24hr: PropTypes.number,
  pair: PropTypes.array,
  dailyChange: PropTypes.number,
  ohlc: PropTypes.object,
  volumeData: PropTypes.array,
  initialMode: PropTypes.string
}

Chart.defaultProps = {
  bidAndAsk: {
    bid: 0,
    ask: 0
  },
  priceData: [],
  volume24hr: 0,
  pair: ['ALGO', 'ALGO'],
  dailyChange: 0,
  ohlc: {
    open: 0,
    high: 0,
    low: 0,
    close: 0
  },
  volumeData: [],
  initialMode: 'CANDLE'
}
