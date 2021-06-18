import { BodyCopy, BodyCopyTiny } from 'components/type'
import { useState } from 'react'
import PropTypes from 'prop-types'
import {
  AreaSeriesChart,
  Ask,
  AssetLabelContainer,
  AssetName,
  Bid,
  CandleStickChart,
  ChartLabel,
  ChartModeButton,
  ChartOptions,
  Chevron,
  Close,
  Container,
  DailyChange,
  High,
  Interval,
  IntervalSelector,
  IntervalWrapper,
  Low,
  OHLC,
  Open,
  Price,
  Spread,
  StatsChartIcon,
  TopRow,
  TrendingUpIcon,
  VolumeContainer
} from './chart.css'

function ChartView({
  candleChartRef,
  areaChartRef,
  assetName,
  dailyChange,
  algoVolume,
  baseAsset,
  ohlc,
  bid,
  ask,
  spread,
  toggleChartMode,
  chartMode,
  chartModes
}) {
  const MODE_ICON_COLOR = '#f2f2f2'
  const formattedDailyChange =
    dailyChange > 0 ? `+${dailyChange.toFixed(2)}%` : `-${dailyChange.toFixed(2)}%`
  const { CANDLE, AREA } = chartModes
  const CHART_INTERVALS = ['1D', '4H', '1H', '15m', '3m', '1m']

  return (
    <Container>
      <>
        <CandleStickChart
          ref={candleChartRef}
          isVisible={chartMode === CANDLE ? true : false}
          data-testid="candleStickChart"
        />
        <AreaSeriesChart
          ref={areaChartRef}
          isVisible={chartMode === AREA ? true : false}
          data-testid="areaChart"
        />
      </>
      <ChartLabel>
        <TopRow>
          <AssetLabelContainer>
            <AssetName>
              <BodyCopy color="gray.100" letterSpacing=".1rem" mb={0} data-testid="primaryAsset">
                {assetName}
              </BodyCopy>
              <BodyCopy
                color="gray.500"
                letterSpacing=".1rem"
                ml={1}
                mb={0}
                data-testid="secondaryAsset"
              >
                {`/${baseAsset}`}
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
          <Bid data-testid="bid">{bid}</Bid>
          <Spread data-testid="spread">{spread}</Spread>
          <Ask data-testid="ask">{ask}</Ask>
        </Price>
        <VolumeContainer>
          <BodyCopyTiny color="gray.100" letterSpacing=".1rem">
            VOL(ALGO):
          </BodyCopyTiny>
          <BodyCopyTiny color="gray.100" letterSpacing=".1rem" ml={1} data-testid="volume24hr">
            {algoVolume}
          </BodyCopyTiny>
        </VolumeContainer>
        <ChartOptions>
          <IntervalWrapper>
            <IntervalSelector onChange={(e) => {}} data-testid="intervalSelector">
              {CHART_INTERVALS.map((interval) => (
                <Interval key={interval}>{interval}</Interval>
              ))}
            </IntervalSelector>
            <Chevron />
          </IntervalWrapper>
          <ChartModeButton onClick={toggleChartMode}>
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

export default ChartView

ChartView.propTypes = {
  candleChartRef: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.shape({ current: PropTypes.instanceOf(PropTypes.any) })
  ]),
  areaChartRef: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.shape({ current: PropTypes.instanceOf(PropTypes.any) })
  ]),
  candleChart: PropTypes.any,
  areaChart: PropTypes.any,
  assetName: PropTypes.string,
  dailyChange: PropTypes.number,
  algoVolume: PropTypes.number,
  baseAsset: PropTypes.string,
  chartModes: PropTypes.object,
  ohlc: PropTypes.object,
  bid: PropTypes.number,
  ask: PropTypes.number,
  spread: PropTypes.number
}
