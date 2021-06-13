import { BodyCopyTiny, BodyCopyLg } from 'components/type'
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
  StatsChartIcon
} from './chart.css'
import { useState, useEffect } from 'react'
import { addListener } from 'resize-detector'

const UP_COLOR = '#38A169'
const DOWN_COLOR = '#E53E3E'
const LINE_COLOR = '#1A202C'
const BACKGROUND_COLOR = '#171923'
const BORDER_COLOR = '#718096'
const TEXT_COLOR = '#CBD5E0'

const CHART_INTERVALS = ['1D', '4H', '1H', '15m', '3m', '1m']
const CHART_MODES = ['CANDLE', 'LINE']

function Chart({ bidAndAsk: { bid, ask }, priceData, volume, pair, dailyChange, ohlc }) {
  const [chartInterval, setChartInterval] = useState(CHART_INTERVALS[0])
  const [chartMode, setChartMode] = useState(CHART_MODES[1])

  const areaSeriesData = priceData.map(({ time, close }) => ({
    time,
    value: close
  }))

  function changeMode(currentMode) {
    currentMode === CHART_MODES[1] ? setChartMode(CHART_MODES[0]) : setChartMode(CHART_MODES[1])
  }

  let candleStickChartContainer, areaSeriesChartContainer, candleStickChart, areaSeriesChart

  useEffect(async () => {
    const { createChart, CrosshairMode } = await import('lightweight-charts')
    candleStickChartContainer = document.getElementById('candleStickChart')
    areaSeriesChartContainer = document.getElementById('areaSeriesChart')

    candleStickChart = createChart(candleStickChartContainer, {
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
    const candleSeries = candleStickChart.addCandlestickSeries({
      upColor: UP_COLOR,
      downColor: DOWN_COLOR,
      borderDownColor: DOWN_COLOR,
      borderUpColor: UP_COLOR,
      wickDownColor: DOWN_COLOR,
      wickUpColor: UP_COLOR
    })
    candleSeries.setData(priceData)
    candleStickChart.timeScale().fitContent()

    addListener(candleStickChartContainer, () =>
      candleStickChart.resize(
        candleStickChartContainer.offsetWidth,
        candleStickChartContainer.offsetHeight
      )
    )

    areaSeriesChart = createChart(areaSeriesChartContainer, {
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
    const areaSeries = areaSeriesChart.addAreaSeries({
      topColor: '#248350',
      bottomColor: '#38a16911',
      lineColor: '#38A169',
      lineWidth: 2
    })

    areaSeries.setData(areaSeriesData)
    areaSeriesChart.timeScale().fitContent()

    addListener(areaSeriesChartContainer, () =>
      areaSeriesChart.resize(
        areaSeriesChartContainer.offsetWidth,
        areaSeriesChartContainer.offsetHeight
      )
    )
  }, [])

  useEffect(() => {
    if (areaSeriesChart) {
      const areaSeries = areaSeriesChart.addAreaSeries({
        topColor: 'rgba(33, 150, 243, 0.56)',
        bottomColor: 'rgba(33, 150, 243, 0.04)',
        lineColor: 'rgba(33, 150, 243, 1)',
        lineWidth: 2
      })
      areaSeries.setData(areaSeriesData)
      areaSeriesChart.timeScale().fitContent()

      const barSpacing = candleStickChart.timeScale().getBarSpacing()
      const rightOffset = candleStickChart.timeScale().scrollPosition()
      areaSeriesChart.timeScale().applyOptions({ rightOffset, barSpacing })
    }

    if (candleStickChart) {
      const candleSeries = candleStickChart.addCandlestickSeries({
        upColor: UP_COLOR,
        downColor: DOWN_COLOR,
        borderDownColor: DOWN_COLOR,
        borderUpColor: UP_COLOR,
        wickDownColor: DOWN_COLOR,
        wickUpColor: UP_COLOR
      })
      candleSeries.setData(priceData)
      candleStickChart.timeScale().fitContent()

      const barSpacing = areaSeriesChart.timeScale().getBarSpacing()
      const rightOffset = areaSeriesChart.timeScale().scrollPosition()
      candleStickChart.timeScale().applyOptions({ rightOffset, barSpacing })
    }
  }, [chartMode])

  return (
    <Container>
      <CandleStickChart id="candleStickChart" display={chartMode === 'LINE' ? true : false} />
      <AreaSeriesChart id="areaSeriesChart" display={chartMode === 'CANDLE' ? true : false} />
      <ChartLabel>
        <TopRow>
          <AssetLabelContainer>
            <AssetName>
              <BodyCopyLg color="gray.100" letterSpacing=".2rem" mb={0}>
                {pair[0]}
              </BodyCopyLg>
              <BodyCopyLg color="gray.500" letterSpacing=".2rem" ml={1} mb={0}>
                {`/${pair[1]}`}
              </BodyCopyLg>
            </AssetName>
            <DailyChange dailyChange={dailyChange}>
              <BodyCopyTiny fontSize=".7rem" letterSpacing=".1rem" mb={1}>
                {dailyChange > 0 ? `+${dailyChange}%` : `-${dailyChange}%`}
              </BodyCopyTiny>
            </DailyChange>
            <IntervalWrapper>
              <IntervalSelector>
                {CHART_INTERVALS.map((interval) => (
                  <Interval key={interval}>{interval}</Interval>
                ))}
              </IntervalSelector>
              <Chevron />
            </IntervalWrapper>
          </AssetLabelContainer>

          <OHLC>
            <Open>
              <BodyCopyTiny color="gray.100" m={1}>
                O:
              </BodyCopyTiny>
              <BodyCopyTiny color="green.500" m={1} ml={0}>
                {ohlc.open}
              </BodyCopyTiny>
            </Open>
            <High>
              <BodyCopyTiny color="gray.100" m={1}>
                H:
              </BodyCopyTiny>
              <BodyCopyTiny color="green.500" m={1} ml={0}>
                {ohlc.high}
              </BodyCopyTiny>
            </High>
            <Low>
              <BodyCopyTiny color="gray.100" m={1}>
                L:
              </BodyCopyTiny>
              <BodyCopyTiny color="green.500" m={1} ml={0}>
                {ohlc.low}
              </BodyCopyTiny>
            </Low>
            <Close>
              <BodyCopyTiny color="gray.100" m={1}>
                C:
              </BodyCopyTiny>
              <BodyCopyTiny color="green.500" m={1} ml={0}>
                {ohlc.close}
              </BodyCopyTiny>
            </Close>
          </OHLC>
        </TopRow>
        <Price>
          <Bid>{bid.toFixed(4)}</Bid>
          <Spread>{Math.abs(ask - bid).toFixed(4)}</Spread>
          <Ask>{ask.toFixed(4)}</Ask>
        </Price>
        <VolumeContainer>
          <BodyCopyTiny color="gray.100" letterSpacing=".1rem">
            VOL(ALGO):
          </BodyCopyTiny>
          <BodyCopyTiny color="gray.100" letterSpacing=".1rem" ml={1}>
            {volume}
          </BodyCopyTiny>
        </VolumeContainer>
        <ChartModeButton onClick={() => changeMode(chartMode)}>
          {chartMode === 'LINE' ? (
            <TrendingUpIcon color="#f2f2f2" width="1rem" height="1rem" />
          ) : (
            <StatsChartIcon color="#f2f2f2" width="1rem" height="1rem" />
          )}
        </ChartModeButton>
      </ChartLabel>
    </Container>
  )
}

export default Chart

Chart.propTypes = {}
Chart.defaultProps = {}
