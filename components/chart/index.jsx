import PropTypes from 'prop-types'
import {
  Container,
  ChartLabel,
  AssetName,
  Price,
  Bid,
  Ask,
  Spread,
  VolumeContainer
} from './chart.css'
import { createChart, CrosshairMode } from 'lightweight-charts'
import { useEffect } from 'react'
import { BodyCopyTiny, Subtitle } from 'components/type'

const UP_COLOR = '#38A169'
const DOWN_COLOR = '#E53E3E'
const LINE_COLOR = '#1A202C'
const BACKGROUND_COLOR = '#171923'
const BORDER_COLOR = '#718096'
const TEXT_COLOR = '#CBD5E0'

function Chart({ bidAndAsk: { bid, ask }, priceData, volume, pair }) {
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
        <AssetName>
          <Subtitle color="gray.100" letterSpacing=".2rem">
            {pair[0]}
          </Subtitle>
          <Subtitle color="gray.500" letterSpacing=".2rem" ml={1}>
            {`/${pair[1]}`}
          </Subtitle>
        </AssetName>
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
