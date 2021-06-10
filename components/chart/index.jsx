import PropTypes from 'prop-types'
import {
  Container,
  ChartLabel,
  AssetName,
  Price,
  Bid,
  Ask,
  Spread,
  VolumeContainer,
  TopRow,
  DailyChange,
  TimeIntervalSelector,
  OHLC,
  Open,
  High,
  Low,
  Close,
  AssetLabelContainer
} from './chart.css'
import { createChart, CrosshairMode } from 'lightweight-charts'
import { useEffect, useState } from 'react'
import { BodyCopyTiny, BodyCopyLg, BodyCopySm } from 'components/type'
import { ChevronDown } from 'react-feather'

const UP_COLOR = '#38A169'
const DOWN_COLOR = '#E53E3E'
const LINE_COLOR = '#1A202C'
const BACKGROUND_COLOR = '#171923'
const BORDER_COLOR = '#718096'
const TEXT_COLOR = '#CBD5E0'

function Chart({ bidAndAsk: { bid, ask }, priceData, volume, pair, dailyChange, ohlc }) {
  const [chartInterval, setChartInterval] = useState('1D')

  useEffect(() => {
    const chartContainer = document.getElementById('chart')

    const chart = createChart(chartContainer, {
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

    const candleSeries = chart.addCandlestickSeries({
      upColor: UP_COLOR,
      downColor: DOWN_COLOR,
      borderDownColor: DOWN_COLOR,
      borderUpColor: UP_COLOR,
      wickDownColor: DOWN_COLOR,
      wickUpColor: UP_COLOR
    })
    candleSeries.setData(priceData)
  }, [])

  return (
    <Container id="chart">
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
          </AssetLabelContainer>
          <TimeIntervalSelector>
            <BodyCopyTiny letterSpacing=".1rem" fontSize=".7rem" letterSpacing=".1rem" m={0} mr={1}>
              {chartInterval}
            </BodyCopyTiny>
            <ChevronDown size={12} />
          </TimeIntervalSelector>
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
      </ChartLabel>
    </Container>
  )
}

export default Chart

Chart.propTypes = {}
Chart.defaultProps = {}
