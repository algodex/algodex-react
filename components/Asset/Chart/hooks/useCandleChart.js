/* 
 * Algodex Frontend (algodex-react) 
 * Copyright (C) 2022 Algodex VASP (BVI) Corp.
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

import { useState, useEffect } from 'react'
import { addListener, removeListener } from 'resize-detector'
import theme from '@/theme'
import moment from 'moment'
const UP_COLOR = theme.palette.green[500]
const DOWN_COLOR = theme.palette.red[500]
const LINE_COLOR = theme.palette.gray[800]
const BACKGROUND_COLOR = theme.palette.gray[900]
const BORDER_COLOR = theme.palette.gray[500]
const TEXT_COLOR = theme.palette.gray[300]

export default function useCandleChart(containerRef, volumeData, priceData, autoScaleProvider) {
  const [candleChart, setCandleChart] = useState()

  useEffect(() => {
    const chartContainer = containerRef?.current

    const initializeChart = async () => {
      const { createChart, CrosshairMode } = await import('lightweight-charts')

      const chart = createChart(chartContainer, {
        localization: {
          timeFormatter: (unixTime) => {
            const s = new Date(unixTime * 1000)
            const m = moment(s).format('lll')
            return m
          }
        },
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
          borderColor: BORDER_COLOR,
          timeVisible: true,
          tickMarkFormatter: (time, tickMarkType) => {
            const date = new Date(time * 1000)
            let m = null
            if (tickMarkType == 3) {
              m = moment(date).format('LT')
            } else {
              m = moment(date).format('ll')
            }
            return m
          }
        }
      })

      let candleSeries = chart.addCandlestickSeries({
        upColor: UP_COLOR,
        downColor: DOWN_COLOR,
        borderDownColor: DOWN_COLOR,
        borderUpColor: UP_COLOR,
        wickDownColor: DOWN_COLOR,
        wickUpColor: UP_COLOR
      })

      candleSeries.applyOptions({
        priceFormat: {
          precision: 6,
          minMove: 0.000001
        }
      })

      const volumeSeries = chart.addHistogramSeries({
        base: 0,
        color: UP_COLOR,
        priceFormat: {
          type: 'volume'
        },
        priceScaleId: '',
        position: 'left',
        mode: 2,
        autoScale: false,
        invertScale: true,
        alignLabels: false,
        scaleMargins: {
          top: 0.9983,
          bottom: 0
        }
      })

      setCandleChart({
        chart,
        candleSeries,
        volumeSeries
      })
    }

    if (chartContainer) {
      if (!candleChart) {
        initializeChart()
      } else if (chartContainer.getAttribute('data-event-resize') !== 'true') {
        // add resize listener
        addListener(chartContainer, (el) => {
          el.setAttribute('data-event-resize', 'true')
          candleChart.chart.resize(el.offsetWidth, el.offsetHeight)
        })

        // cleanup
        return () => removeListener(chartContainer)
      }
    }
  }, [candleChart, containerRef])

  useEffect(() => {
    if (candleChart) {
      candleChart.volumeSeries.setData(volumeData)
      candleChart.candleSeries.setData(priceData)

      // Scale Chart to appropriate time range
      const dataPointsToShow = 28
      const lastDataPoint = priceData.length - 1
      candleChart.chart
        .timeScale()
        .setVisibleLogicalRange({ from: lastDataPoint - dataPointsToShow, to: lastDataPoint })

      if (priceData.length <= dataPointsToShow) {
        // If not enough data points, scale to fit chart size
        candleChart.chart.timeScale().fitContent()
      }

      candleChart.candleSeries.applyOptions({
        autoscaleInfoProvider: (original) => {
          return autoScaleProvider(original, candleChart.chart, priceData)
        }
      })
    }
  }, [candleChart, containerRef, priceData, volumeData])

  return {
    candleChart: candleChart?.chart
  }
}
