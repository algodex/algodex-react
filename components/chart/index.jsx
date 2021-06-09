import PropTypes from 'prop-types'
import { Container, ChartLabel, AssetName, Price, Bid, Ask, Spread } from './chart.css'
import { createChart, CrosshairMode } from 'lightweight-charts'
import { useEffect } from 'react'
import { Subtitle } from 'components/type'

const UP_COLOR = '#38A169'
const DOWN_COLOR = '#E53E3E'
const LINE_COLOR = '#1A202C'
const BACKGROUND_COLOR = '#171923'

function Chart({ data }) {
  useEffect(() => {
    const chartContainer = document.getElementById('chart')

    const chart = createChart(chartContainer, {
      layout: {
        backgroundColor: BACKGROUND_COLOR,
        textColor: 'rgba(255, 255, 255, 0.9)',
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
        borderColor: '#718096'
      },
      timeScale: {
        borderColor: '#718096'
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
    candleSeries.setData(data)
  }, [])
  return (
    <Container id="chart">
      <ChartLabel>
        <AssetName>
          <Subtitle color="gray.100" letterSpacing=".2rem">
            FAME
          </Subtitle>
          <Subtitle color="gray.500" letterSpacing=".2rem" ml={1}>
            /ALGO
          </Subtitle>
        </AssetName>
        <Price>
          <Bid>191.84</Bid>
          <Spread>0.95</Spread>
          <Ask>192.79</Ask>
        </Price>
      </ChartLabel>
    </Container>
  )
}

export default Chart

Chart.propTypes = {}
Chart.defaultProps = {}
