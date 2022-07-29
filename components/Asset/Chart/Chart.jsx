import * as ReactDOM from 'react-dom'

import { useCallback, useEffect, useRef, useState } from 'react'

import ChartOverlay from './ChartOverlay'
import ChartSettings from './ChartSettings'
import PropTypes from 'prop-types'
import millify from 'millify'
import styled from '@emotion/styled'
import useAreaChart from '@/hooks/use-area-chart'
import useCandleChart from '@/hooks/use-candle-chart'
import { withAssetChartQuery } from '@/hooks/withAlgodex'

const Container = styled.div`
  position: relative;
  background-color: ${({ theme }) => theme.palette.gray[900]};
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
export function Chart({
  asset,
  interval: _interval,
  mode: _mode,
  volume,
  ohlc,
  overlay: _overlay,
  onChange
}) {
  // console.log(`Chart(`, arguments[0], `)`)
  const [interval, setInterval] = useState(_interval)
  const [overlay, setOverlay] = useState(_overlay)
  const [chartMode, setChartMode] = useState(_mode)
  const [currentLogical, setCurrentLogical] = useState(ohlc.length - 1)

  useEffect(() => {
    setOverlay(_overlay)
    setCurrentLogical(ohlc.length - 1)
  }, [ohlc, _overlay, setOverlay])

  useEffect(() => {
    setInterval(_interval)
  }, [_interval, setInterval])

  useEffect(() => {
    setChartMode(_mode)
  }, [_mode, setChartMode])

  const candleChartRef = useRef()
  const areaChartRef = useRef()

  const { candleChart } = useCandleChart(candleChartRef, volume, ohlc, autoScaleProvider)
  const { areaChart } = useAreaChart(areaChartRef, ohlc, autoScaleProvider)

  const onSettingsChange = useCallback(
    (e) => {
      if (e?.target?.name === 'mode') {
        setChartMode(e.target.value)

        if (e.target.value === 'candle') {
          const logicalRange = areaChart?.timeScale().getVisibleLogicalRange()
          candleChart?.timeScale().setVisibleLogicalRange(logicalRange)
        } else {
          const logicalRange = candleChart?.timeScale().getVisibleLogicalRange()
          areaChart?.timeScale().setVisibleLogicalRange(logicalRange)
        }
      } else {
        onChange(e)
      }
    },
    [setChartMode, candleChart, areaChart, onChange]
  )

  const updateHoverPrices = useCallback(
    (logical) => {
      if (ohlc == null || volume == null) {
        return
      }
      const priceEntry = ohlc[logical]
      const volumeEntry = volume[logical]

      setOverlay({
        ...overlay,
        ohlc: priceEntry,
        volume: volumeEntry != null ? millify(volumeEntry.value) : '0'
      })
    },
    [ohlc, volume, setOverlay, overlay]
  )

  const mouseOut = useCallback(() => {
    setOverlay(_overlay)
  }, [setOverlay, _overlay])

  const mouseMove = useCallback(
    (ev) => {
      const chart = chartMode === 'candle' ? candleChart : areaChart
      if (chart == null) {
        setOverlay(_overlay)
        return
      }
      // eslint-disable-next-line react/no-find-dom-node
      const rect = ReactDOM.findDOMNode(ev.target).getBoundingClientRect()
      const x = ev.clientX - rect.left
      const logical = candleChart.timeScale().coordinateToLogical(x)

      if (logical >= ohlc.length || logical >= volume.length) {
        setOverlay(_overlay)
        return
      }

      if (logical !== currentLogical) {
        setCurrentLogical(logical)
        updateHoverPrices(logical)
      }
    },
    [
      chartMode,
      currentLogical,
      candleChart,
      areaChart,
      setOverlay,
      _overlay,
      setCurrentLogical,
      updateHoverPrices,
      volume,
      ohlc
    ]
  )

  console.log('asset.isStable: ', asset.isStable)

  return (
    <Container onMouseMove={(ev) => mouseMove(ev)} onMouseOut={() => mouseOut()}>
      {/*{!isFetched && isFetching && <Spinner flex={true}/> }*/}
      {/*{isFetched && <>*/}
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

      {typeof overlay?.ohlc !== 'undefined' && (
        <ChartOverlay
          asset={asset}
          ohlc={overlay.ohlc}
          bid={overlay.orderbook.bid}
          ask={overlay.orderbook.ask}
          spread={overlay.orderbook.spread}
          volume={asset.isStable ? overlay.algoVolume : overlay.volume}
        />
      )}
      {typeof overlay.ohlc === 'undefined' && (
        <ChartOverlay
          asset={asset}
          ohlc={_overlay.ohlc}
          bid={_overlay.orderbook.bid}
          ask={_overlay.orderbook.ask}
          spread={_overlay.orderbook.spread}
          volume={asset.isStable ? _overlay.algoVolume : _overlay.volume}
        />
      )}
      <SettingsContainer>
        <ChartSettings interval={interval} mode={chartMode} onChange={(e) => onSettingsChange(e)} />
      </SettingsContainer>
    </Container>
  )
}

Chart.propTypes = {
  asset: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    decimals: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    isStable: PropTypes.bool
  }).isRequired,
  interval: PropTypes.string.isRequired,
  mode: PropTypes.string.isRequired,
  overlay: PropTypes.shape({
    ohlc: PropTypes.shape({
      open: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      high: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      low: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      close: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
    }),
    volume: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    algoVolume: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    orderbook: PropTypes.shape({
      bid: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      ask: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      spread: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
    })
  }),
  ohlc: PropTypes.array.isRequired,
  volume: PropTypes.array.isRequired,
  algoVolume: PropTypes.array,
  onChange: PropTypes.func
}

Chart.defaultProps = {
  mode: 'candle',
  interval: '1h'
  // onChange: ()=>console.log('Chart Change')
}

export default withAssetChartQuery(Chart)
