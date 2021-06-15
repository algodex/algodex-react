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
import { useState, useEffect } from 'react'
import { addListener } from 'resize-detector'
import millify from 'millify'

// Candlestick chart colors
const UP_COLOR = '#38A169'
const DOWN_COLOR = '#E53E3E'
const LINE_COLOR = '#1A202C'
const BACKGROUND_COLOR = '#171923'
const BORDER_COLOR = '#718096'
const TEXT_COLOR = '#CBD5E0'

// Line chart colors
const TOP_COLOR = '#248350'
const TOP_LINE_COLOR = '#38A169'
const BOTTOM_COLOR = '#38a16911'
const LINE_WIDTH = 2

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
  const [candleStickChart, setCandleStickChart] = useState()
  const [areaSeriesChart, setAreaSeriesChart] = useState()

  let candleStickChartContainer, areaSeriesChartContainer

  const areaSeriesData = priceData.map(({ time, close }) => ({
    time,
    value: close
  }))

  const formattedVolume = millify(volume24hr)
  const formattedBid = bid.toFixed(4)
  const formattedAsk = ask.toFixed(4)
  const formattedSpread = Math.abs(ask - bid).toFixed(4)
  const formattedDailyChange =
    dailyChange > 0 ? `+${dailyChange.toFixed(4)}%` : `-${dailyChange.toFixed(4)}%`

  function changeMode(currentMode) {
    if (currentMode === LINE) {
      const logicalRange = areaSeriesChart.timeScale().getVisibleLogicalRange()
      candleStickChart.timeScale().setVisibleLogicalRange(logicalRange)
      setChartMode(CANDLE)
      return
    }

    if (currentMode === CANDLE) {
      const logicalRange = candleStickChart.timeScale().getVisibleLogicalRange()
      areaSeriesChart.timeScale().setVisibleLogicalRange(logicalRange)
      setChartMode(LINE)
      return
    }
  }

  useEffect(() => {
    if (candleStickChart) {
      const candleSeries = candleStickChart.addCandlestickSeries({
        upColor: UP_COLOR,
        downColor: DOWN_COLOR,
        borderDownColor: DOWN_COLOR,
        borderUpColor: UP_COLOR,
        wickDownColor: DOWN_COLOR,
        wickUpColor: UP_COLOR
      })
      const volumeSeries = candleStickChart.addHistogramSeries({
        color: UP_COLOR,
        priceFormat: {
          type: 'volume'
        },
        priceScaleId: '',
        scaleMargins: {
          top: 0.8,
          bottom: 0
        }
      })
      volumeSeries.setData(volumeData)
      candleSeries.setData(priceData)
      candleStickChart.timeScale().fitContent()

      if (candleStickChartContainer) {
        addListener(candleStickChartContainer, () =>
          candleStickChart.resize(
            candleStickChartContainer.offsetWidth,
            candleStickChartContainer.offsetHeight
          )
        )
      }
    }
  }, [candleStickChart])

  useEffect(() => {
    if (areaSeriesChart) {
      const areaSeries = areaSeriesChart.addAreaSeries({
        topColor: TOP_COLOR,
        bottomColor: BOTTOM_COLOR,
        lineColor: TOP_LINE_COLOR,
        lineWidth: LINE_WIDTH
      })

      areaSeries.setData(areaSeriesData)
      areaSeriesChart.timeScale().fitContent()

      if (areaSeriesChartContainer) {
        addListener(areaSeriesChartContainer, () =>
          areaSeriesChart.resize(
            areaSeriesChartContainer.offsetWidth,
            areaSeriesChartContainer.offsetHeight
          )
        )
      }
    }
  }, [areaSeriesChart])

  useEffect(async () => {
    const { createChart, CrosshairMode } = await import('lightweight-charts')
    candleStickChartContainer = document.getElementById('candleStickChart')
    areaSeriesChartContainer = document.getElementById('areaSeriesChart')

    setCandleStickChart(
      createChart(candleStickChartContainer, {
        layout: {
          backgroundColor: BACKGROUND_COLOR,
          textColor: TEXT_COLOR,
          fontFamily: 'Inter'
        },
        grid: {
          vertLines: {
            color: LINE_COLOR
          },
          horzLines: {
            color: LINE_COLOR
          }
        },
        crosshair: {
          mode: CrosshairMode.Normal
        },
        rightPriceScale: {
          borderColor: BORDER_COLOR
        },
        timeScale: {
          borderColor: BORDER_COLOR
        }
      })
    )

    setAreaSeriesChart(
      createChart(areaSeriesChartContainer, {
        layout: {
          backgroundColor: BACKGROUND_COLOR,
          textColor: TEXT_COLOR,
          fontFamily: 'Inter'
        },
        grid: {
          vertLines: {
            color: LINE_COLOR
          },
          horzLines: {
            color: LINE_COLOR
          }
        },
        crosshair: {
          mode: CrosshairMode.Normal
        },
        rightPriceScale: {
          borderColor: BORDER_COLOR
        },
        timeScale: {
          borderColor: BORDER_COLOR
        }
      })
    )
  }, [])

  return (
    <Container>
      <CandleStickChart
        id="candleStickChart"
        display={chartMode === CANDLE ? true : false}
        data-testid="candleStickChart"
      />
      <AreaSeriesChart
        id="areaSeriesChart"
        display={chartMode === LINE ? true : false}
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
  bidAndAsk: {
    bid: PropTypes.number,
    ask: PropTypes.number
  },
  priceData: PropTypes.array,
  volume24hr: PropTypes.number,
  pair: PropTypes.array,
  dailyChange: PropTypes.number,
  ohlc: {
    open: PropTypes.number,
    high: PropTypes.number,
    low: PropTypes.number,
    close: PropTypes.number
  },
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
