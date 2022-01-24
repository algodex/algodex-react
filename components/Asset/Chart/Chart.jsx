import Error from 'components/Error'
import Spinner from 'components/Spinner'
import millify from 'millify'
import PropTypes from 'prop-types'
import { useMemo, useRef, useState } from 'react'
import useStore, { getChartTimeInterval } from 'store/use-store'
import { useAssetChartQuery, useAssetOrdersQuery } from 'hooks/useAlgodex'
import useAreaChart from 'hooks/use-area-chart'
import useCandleChart from 'hooks/use-candle-chart'
import ReactDOM from 'react-dom'
import ChartOverlay from './ChartOverlay'
import ChartSettings from './ChartSettings'
import { floatToFixed } from 'services/display'
import Big from 'big.js'
import styled from 'styled-components'

const Container = styled.div`
  position: relative;
  background-color: ${({ theme }) => theme.colors.gray[900]};
  height: 100%;

  @media (min-width: 996px) {
    height: 100%;
  }
`

const AreaSeriesChart = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  bottom: 3.5rem;
  right: 0;
  visibility: ${({ isVisible }) => (isVisible === true ? 'visible' : 'hidden')};
  overflow: hidden;

  @media (min-width: 996px) {
    bottom: 2.75rem;
  }
`

const CandleStickChart = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  bottom: 3.5rem;
  right: 0;
  visibility: ${({ isVisible }) => (isVisible ? 'visible' : 'hidden')};
  overflow: hidden;

  @media (min-width: 996px) {
    bottom: 2.75rem;
  }
`

const SettingsContainer = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  height: 3.5rem;

  @media (min-width: 996px) {
    height: 2.75rem;
  }
`
const mapPriceData = (data) => {
  const prices =
    data?.chart_data.map(
      ({ formatted_open, formatted_high, formatted_low, formatted_close, unixTime }) => {
        const time = parseInt(unixTime)
        return {
          time: time,
          open: floatToFixed(formatted_open),
          high: floatToFixed(formatted_high),
          low: floatToFixed(formatted_low),
          close: floatToFixed(formatted_close)
        }
      }
    ) || []
  return prices.sort((a, b) => (a.time < b.time ? -1 : a.time > b.time ? 1 : 0))
}

const getOhlc = (data) => {
  const lastPriceData = data?.chart_data[0]

  return lastPriceData
    ? {
        open: floatToFixed(lastPriceData.formatted_open),
        high: floatToFixed(lastPriceData.formatted_high),
        low: floatToFixed(lastPriceData.formatted_low),
        close: floatToFixed(lastPriceData.formatted_close)
      }
    : {}
}

const mapVolumeData = (data, volUpColor, volDownColor) => {
  const mappedData = data?.chart_data?.map(({ asaVolume, unixTime }) => {
    const time = parseInt(unixTime)
    return {
      time: time,
      value: asaVolume
    }
  })
  const volumeColors = data?.chart_data.map(({ open, close }) =>
    open > close ? volDownColor : volUpColor
  )
  return mappedData?.map((md, i) => ({ ...md, color: volumeColors[i] })) || []
}

const getBidAskSpread = (orderBook) => {
  const { buyOrders, sellOrders } = orderBook

  const bidPrice = buyOrders.sort((a, b) => b.asaPrice - a.asaPrice)?.[0]?.formattedPrice || 0
  const askPrice = sellOrders.sort((a, b) => a.asaPrice - b.asaPrice)?.[0]?.formattedPrice || 0

  const bid = floatToFixed(bidPrice)
  const ask = floatToFixed(askPrice)
  const spread = floatToFixed(new Big(ask).minus(bid).abs())

  return { bid, ask, spread }
}
function autoScaleProvider(original, chart, priceData) {
  let visibleRange = chart.timeScale().getVisibleRange()
  if (!visibleRange) {
    return
  }
  const rangeStart = visibleRange.from
  const rangeEnd = visibleRange.to
  let max = 0
  let min = -1
  for (let i = 0; i < priceData.length; i++) {
    const priceItem = priceData[i]
    if (priceItem.time < rangeStart) {
      continue
    }
    max = Math.max(priceItem.close, max)
    max = Math.max(priceItem.open, max)
    max = Math.max(priceItem.high, max)
    if (min === -1) {
      min = priceItem.open
    }
    min = Math.min(priceItem.close, min)
    min = Math.min(priceItem.low, min)
    min = Math.min(priceItem.open, min)
    if (priceItem.time > rangeEnd) {
      break
    }
  }

  const res = original()
  if (res !== null && min !== -1) {
    res.priceRange.maxValue = max
    res.priceRange.minValue = min
  }

  return res
}

export function ChartView(props) {
  const { asset, volumeData, priceData } = props
  const [currentPrices, setCurrentPrices] = useState(props)
  const [currentLogical, setCurrentLogical] = useState(priceData.length - 1)

  useMemo(() => {
    setCurrentPrices(props)
    setCurrentLogical(priceData.length - 1)
  }, [asset, priceData, props])

  const candleChartRef = useRef()
  const areaChartRef = useRef()

  const { candleChart } = useCandleChart(candleChartRef, volumeData, priceData, autoScaleProvider)
  const { areaChart } = useAreaChart(areaChartRef, priceData, autoScaleProvider)

  const chartMode = useStore((state) => state.chartMode)
  const setChartMode = useStore((state) => state.setChartMode)

  const changeMode = (mode) => {
    setChartMode(mode)

    if (mode === 'candle') {
      const logicalRange = areaChart?.timeScale().getVisibleLogicalRange()
      candleChart?.timeScale().setVisibleLogicalRange(logicalRange)
    } else {
      const logicalRange = candleChart?.timeScale().getVisibleLogicalRange()
      areaChart?.timeScale().setVisibleLogicalRange(logicalRange)
    }
  }

  const updateHoverPrices = (logical) => {
    if (priceData == null || volumeData == null) {
      return
    }
    const priceEntry = priceData[logical]
    const volumeEntry = volumeData[logical]

    const prices = {
      ...currentPrices
    }
    prices.ohlc = {
      ...priceEntry
    }
    prices.asaVolume = volumeEntry != null ? millify(volumeEntry.value) : '0'

    setCurrentPrices(prices)
  }

  const mouseOut = () => {
    setCurrentPrices(props)
  }
  const mouseMove = (ev) => {
    const chart = chartMode === 'candle' ? candleChart : areaChart
    if (chart == null) {
      setCurrentPrices(props)
      return
    }

    /* eslint-disable */
    const rect = ReactDOM.findDOMNode(ev.target).getBoundingClientRect()
    const x = ev.clientX - rect.left
    const logical = candleChart.timeScale().coordinateToLogical(x)

    if (logical >= priceData.length || logical >= volumeData.length) {
      setCurrentPrices(props)
      return
    }

    if (logical !== currentLogical) {
      setCurrentLogical(logical)
      updateHoverPrices(logical)
    }
  }

  return (
      <Container onMouseMove={(ev) => mouseMove(ev)} onMouseOut={(ev) => mouseOut(ev)}>
        <>
          <CandleStickChart
              ref={candleChartRef}
              isVisible={chartMode === 'candle'}
              data-testid="candleStickChart"
          />

          <AreaSeriesChart
              ref={areaChartRef}
              isVisible={chartMode === 'area'}
              data-testid="areaChart"
          />
        </>
        <ChartOverlay
            asset={currentPrices.asset}
            ohlc={currentPrices.ohlc}
            bid={currentPrices.bid}
            ask={currentPrices.ask}
            spread={currentPrices.spread}
            volume={currentPrices.asaVolume}
        />
        <SettingsContainer>
          <ChartSettings chartMode={chartMode} onChartModeClick={(mode) => changeMode(mode)} />
        </SettingsContainer>
      </Container>
  )
}

ChartView.propTypes = {
  candleChartRef: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.shape({ current: PropTypes.any })
  ]),
  areaChartRef: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.shape({ current: PropTypes.any })
  ]),
  asset: PropTypes.object,
  asaVolume: PropTypes.string,
  ohlc: PropTypes.object,
  bid: PropTypes.string,
  ask: PropTypes.string,
  spread: PropTypes.string,
  volumeData: PropTypes.array,
  priceData: PropTypes.array
}

// Common
const VOLUME_UP_COLOR = '#2fb16c2c'
const VOLUME_DOWN_COLOR = '#e53e3e2c'
const baseAsset = 'ALGO'

function Chart({ asset, ...rest }) {
  const { data: assetOrders } = useAssetOrdersQuery({ asset })

  const orderBook = useMemo(
      () => ({
        buyOrders: assetOrders?.buyASAOrdersInEscrow || [],
        sellOrders: assetOrders?.sellASAOrdersInEscrow || []
      }),
      [assetOrders]
  )

  const { bid, ask, spread } = useMemo(() => getBidAskSpread(orderBook), [orderBook])
  const chartTimeInterval = useStore((state) => getChartTimeInterval(state))

  const { isLoading, isError, data } = useAssetChartQuery({
    asset,
    chartInterval: chartTimeInterval
  })

  const priceData = useMemo(() => mapPriceData(data), [data])
  const volumeData = useMemo(() => mapVolumeData(data, VOLUME_UP_COLOR, VOLUME_DOWN_COLOR), [data])
  const ohlc = useMemo(() => getOhlc(data), [data])

  const asaVolume = millify(data?.chart_data[data?.chart_data.length - 1]?.asaVolume || 0)

  if (isLoading) {
    return <Spinner flex />
  }

  if (isError) {
    return <Error message="Error loading chart" flex />
  }

  return (
      <ChartView
          bid={bid}
          ask={ask}
          baseAsset={baseAsset}
          spread={spread}
          asaVolume={asaVolume}
          asset={asset}
          ohlc={ohlc}
          priceData={priceData}
          volumeData={volumeData}
          {...rest}
      />
  )
}

export default Chart

Chart.propTypes = {
  asset: PropTypes.object.isRequired
}
