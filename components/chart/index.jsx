import { BodyCopyTiny, BodyCopy, BodyCopyLg } from 'components/type'
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
  ChartOptions,
  LoadingContainer
} from './chart.css'
import { useState, useRef, useMemo } from 'react'
import millify from 'millify'
import useCandleChart from './use-candle-chart'
import useAreaChart from './use-area-chart'
import { useQuery } from 'react-query'
import { fetchPriceData } from 'lib/api'
import PulseLoader from 'react-spinners/PulseLoader'

import dayjs from 'dayjs'

// Common
const MODE_ICON_COLOR = '#f2f2f2'
const LOADER_COLOR = '#2D3748 '
const VOLUME_UP_COLOR = '#2fb16c2c'
const VOLUME_DOWN_COLOR = '#e53e3e2c'
const CHART_INTERVALS = ['1D', '4H', '1H', '15m', '3m', '1m']
const CHART_MODES = {
  CANDLE: 'CANDLE',
  AREA: 'AREA'
}
const { CANDLE, AREA } = CHART_MODES
const basePair = 'ALGO'
const FIXED_DECIMALS = 4

// Demo
const assetId = 15322902

function Chart({ bidAndAsk: { bid, ask }, initialMode }) {
  const [intervalMs, setIntervalMs] = useState(1000)

  const { data, isLoading } = useQuery(['priceData', { assetId }], fetchPriceData, {
    // Refetch the data every second
    // refetchInterval: intervalMs
  })

  function mapPriceData(data) {
    const prices =
      data?.chart_data.map(({ date, open, high, low, close }) => {
        const time = dayjs(new Date(date)).format('YYYY-MM-DD')
        return {
          time,
          open: parseFloat(open),
          high: parseFloat(high),
          low: parseFloat(low),
          close: parseFloat(close)
        }
      }) || []
    return prices.sort((a, b) => (a.time < b.time ? -1 : a.time > b.time ? 1 : 0))
  }

  function mapVolumeData(data) {
    const mappedData = data?.chart_data?.map(({ date, asaVolume }) => {
      const time = dayjs(new Date(date)).format('YYYY-MM-DD')
      return {
        time,
        value: asaVolume
      }
    })
    const volumeColors = data?.chart_data.map(({ open, close }) =>
      open > close ? VOLUME_DOWN_COLOR : VOLUME_UP_COLOR
    )
    const volumeData = mappedData?.map((md, i) => ({ ...md, color: volumeColors[i] })) || []
    return volumeData
  }

  function getAssetInfo(data) {
    return data?.asset_info || {}
  }

  const [chartInterval, setChartInterval] = useState('1D')
  const [chartMode, setChartMode] = useState(initialMode)
  const priceData = useMemo(() => mapPriceData(data), [data])
  const volumeData = useMemo(() => mapVolumeData(data), [data])
  const assetInfo = useMemo(() => getAssetInfo(data), [data])

  const latestPriceData = priceData[priceData.length - 1] || {}
  const secondLatestPriceData = priceData[priceData.length - 2] || {}

  function relDiff(a, b) {
    return 100 * Math.abs((a - b) / ((a + b) / 2))
  }

  const dailyChange = relDiff(latestPriceData.open, secondLatestPriceData.open)

  const candleChartRef = useRef()
  const areaChartRef = useRef()

  const { candleChart } = useCandleChart(candleChartRef, volumeData, priceData, data)
  const { areaChart } = useAreaChart(areaChartRef, volumeData, priceData, data)

  const formattedVolume = millify(data?.chart_data[data?.chart_data.length - 1]?.algoVolume || 0)
  const formattedBid = bid.toFixed(4)
  const formattedAsk = ask.toFixed(4)
  const formattedSpread = Math.abs(ask - bid).toFixed(4)
  const formattedDailyChange =
    dailyChange > 0 ? `+${dailyChange.toFixed(2)}%` : `-${dailyChange.toFixed(2)}%`

  function changeMode(currentMode) {
    if (currentMode === AREA) {
      setChartMode(CANDLE)
      const logicalRange = areaChart?.timeScale().getVisibleLogicalRange()
      candleChart?.timeScale().setVisibleLogicalRange(logicalRange)
      return
    }

    if (currentMode === CANDLE) {
      setChartMode(AREA)
      const logicalRange = candleChart?.timeScale().getVisibleLogicalRange()
      areaChart?.timeScale().setVisibleLogicalRange(logicalRange)
      return
    }
  }

  return (
    <Container>
      {isLoading ? (
        <LoadingContainer>
          <PulseLoader color={LOADER_COLOR} loading={isLoading} size={15} />
        </LoadingContainer>
      ) : (
        <>
          <CandleStickChart
            ref={candleChartRef}
            isVisible={chartMode === CANDLE ? true : false}
            data-testid="candleStickChart"
          />
          <AreaSeriesChart
            ref={areaChartRef}
            isVisible={chartMode === AREA ? true : false}
            data-testid="AREAChart"
          />
        </>
      )}
      {!isLoading && (
        <ChartLabel>
          <TopRow>
            <AssetLabelContainer>
              <AssetName>
                <BodyCopy color="gray.100" letterSpacing=".1rem" mb={0} data-testid="primaryAsset">
                  {assetInfo?.asset?.params['unit-name'] || 'ALGO'}
                </BodyCopy>
                <BodyCopy
                  color="gray.500"
                  letterSpacing=".1rem"
                  ml={1}
                  mb={0}
                  data-testid="secondaryAsset"
                >
                  {`/${basePair}`}
                </BodyCopy>
              </AssetName>
              <DailyChange dailyChange={dailyChange}>
                <BodyCopyTiny
                  fontSize=".7rem"
                  letterSpacing=".1rem"
                  mb={1}
                  data-testid="dailyChange"
                >
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
                  {latestPriceData.open.toFixed(FIXED_DECIMALS)}
                </BodyCopyTiny>
              </Open>
              <High>
                <BodyCopyTiny color="gray.100" m={1}>
                  H:
                </BodyCopyTiny>
                <BodyCopyTiny color="green.500" m={1} ml={0} data-testid="high24hr">
                  {latestPriceData.high.toFixed(FIXED_DECIMALS)}
                </BodyCopyTiny>
              </High>
              <Low>
                <BodyCopyTiny color="gray.100" m={1}>
                  L:
                </BodyCopyTiny>
                <BodyCopyTiny color="green.500" m={1} ml={0} data-testid="low24hr">
                  {latestPriceData.low.toFixed(FIXED_DECIMALS)}
                </BodyCopyTiny>
              </Low>
              <Close>
                <BodyCopyTiny color="gray.100" m={1}>
                  C:
                </BodyCopyTiny>
                <BodyCopyTiny color="green.500" m={1} ml={0} data-testid="close24hr">
                  {latestPriceData.close.toFixed(FIXED_DECIMALS)}
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
      )}
    </Container>
  )
}

export default Chart

Chart.propTypes = {
  bidAndAsk: PropTypes.object,
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
