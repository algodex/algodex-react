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
import theme from '@/theme/index'
import moment from 'moment'

const LINE_COLOR = theme.palette.gray[800]
const BACKGROUND_COLOR = theme.palette.gray[900]
const BORDER_COLOR = theme.palette.gray[500]
const TEXT_COLOR = theme.palette.gray[300]

const TOP_COLOR = '#248350'
const TOP_LINE_COLOR = theme.palette.green[500]
const BOTTOM_COLOR = 'rgba(56, 161, 105, 0.17)'
const LINE_WIDTH = 2

export default function useAreaChart(containerRef, priceData, autoScaleProvider) {
  const [areaChart, setAreaChart] = useState()

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

      const areaSeries = chart.addAreaSeries({
        topColor: TOP_COLOR,
        bottomColor: BOTTOM_COLOR,
        lineColor: TOP_LINE_COLOR,
        lineWidth: LINE_WIDTH
      })

      areaSeries.applyOptions({
        priceFormat: {
          precision: 6,
          minMove: 0.000001
        }
      })

      setAreaChart({
        chart,
        areaSeries
      })
    }

    if (chartContainer) {
      if (!areaChart) {
        initializeChart()
      } else if (chartContainer.getAttribute('data-event-resize') !== 'true') {
        // add resize listener
        addListener(chartContainer, (el) => {
          el.setAttribute('data-event-resize', 'true')
          areaChart.chart.resize(el.offsetWidth, el.offsetHeight)
        })

        // cleanup
        return () => removeListener(chartContainer)
      }
    }
  }, [areaChart, containerRef])

  useEffect(() => {
    if (areaChart) {
      const areaSeriesData = priceData?.map(({ time, close }) => ({
        time,
        value: close
      }))
      areaChart.areaSeries.setData(areaSeriesData)

      // Scale Chart to appropriate time range
      const dataPointsToShow = 28
      const lastDataPoint = priceData.length - 1
      areaChart.chart
        .timeScale()
        .setVisibleLogicalRange({ from: lastDataPoint - dataPointsToShow, to: lastDataPoint })
      areaChart.areaSeries.applyOptions({
        autoscaleInfoProvider: (original) => {
          return autoScaleProvider(original, areaChart.chart, priceData)
        }
      })
      if (priceData.length <= dataPointsToShow) {
        // If not enough data points, scale to fit chart size
        areaChart.chart.timeScale().fitContent()
      }
    }
  }, [areaChart, containerRef, priceData])

  return {
    areaChart: areaChart?.chart
  }
}
