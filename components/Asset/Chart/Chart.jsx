/* 
 * Algodex Frontend (algodex-react) 
 * Copyright (C) 2021 - 2022 Algodex VASP (BVI) Corp.
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as published
 * by the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.

 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Affero General Public License for more details.
 * You should have received a copy of the GNU Affero General Public License
 * along with this program.  If not, see <https://www.gnu.org/licenses/>.
 */

import * as ReactDOM from 'react-dom'

import { useCallback, useEffect, useRef, useState, useMemo } from 'react'

import ChartOverlay from './ChartOverlay'
import ChartSettings from './ChartSettings'
import PropTypes from 'prop-types'
import millify from 'millify'
import styled from '@emotion/styled'
import useAreaChart from './hooks/useAreaChart'
import useCandleChart from './hooks/useCandleChart'
import { withAssetChartQuery } from '@/hooks'
import floatToFixed from '@algodex/algodex-sdk/lib/utils/format/floatToFixed'
import { useInversionStatus } from '@/hooks/utils/useInversionStatus'

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
  const isInverted = useInversionStatus(asset.id)
  // console.log(isInverted, 'is inverted')
  const formatedPriceData = useMemo(
    () => {
      if (isInverted) {
        const formatedPriceClone = [...ohlc]
        const formattedPrice = formatedPriceClone.reduce(
          (accumulator, currentValue) => {
            accumulator.push({
              ...currentValue,
              close: currentValue.close !== 0 ? floatToFixed(1 / currentValue.close) : 'Invalid',
              high: currentValue.high !== 0 ? floatToFixed(1 / currentValue.high) : 'Invalid',
              low: currentValue.low !== 0 ? floatToFixed(1 / currentValue.low) : 'Invalid',
              open: currentValue.open !== 0 ? floatToFixed(1 / currentValue.open) : 'Invalid'
            })
            return accumulator
          }, []);
        return formattedPrice
      } else {
        return ohlc
      }
    },
    [isInverted, ohlc],
  )

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

  const autoScaleProvider = useCallback((original, chart, priceData) => {
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
  }, [])

  const { candleChart } = useCandleChart(candleChartRef, volume, formatedPriceData, autoScaleProvider)
  const { areaChart } = useAreaChart(areaChartRef, formatedPriceData, autoScaleProvider)
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
      // if (asset.isInverted) {
      //   if (ohlc == null || algoVolume == null) {
      //     return
      //   }
      // } else {
      //   if (ohlc == null || volume == null) {
      //     return
      //   }
      // }

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
    // setOverlay(_overlay)
    if (isInverted) {
      const __overlay = { ...overlay, ..._overlay }
      setOverlay(__overlay)
    } else {
      setOverlay(_overlay)
    }
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

      // if (isInverted) {
      //   if (logical >= ohlc.length || logical >= algoVolume.length) {
      //     // setOverlay(_overlay)
      //     return
      //   }
      // } else {
      //   if (logical >= ohlc.length || logical >= volume.length) {
      //     // setOverlay(_overlay)
      //     return
      //   }
      // }

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
      asset.isInverted,
      ohlc
    ]
  )

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
          volume={overlay.volume}
        // volume={asset.isInverted ? overlay.algoVolume : overlay.volume}
        />
      )}
      {typeof overlay.ohlc === 'undefined' && (
        <ChartOverlay
          asset={asset}
          ohlc={_overlay.ohlc}
          bid={_overlay.orderbook.bid}
          ask={_overlay.orderbook.ask}
          spread={_overlay.orderbook.spread}
          volume={_overlay.volume}
        // volume={asset.isInverted ? overlay.algoVolume : overlay.volume}
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
    isInverted: PropTypes.bool
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
    orderbook: PropTypes.shape({
      bid: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      ask: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      spread: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
    })
  }),
  ohlc: PropTypes.array.isRequired,
  volume: PropTypes.array.isRequired,
  onChange: PropTypes.func
}

Chart.defaultProps = {
  mode: 'candle',
  interval: '1h'
  // onChange: ()=>console.log('Chart Change')
}

export default withAssetChartQuery(Chart)
