import { useState, useEffect } from 'react'
import { addListener, removeListener } from 'resize-detector'

const LINE_COLOR = '#1A202C'
const BACKGROUND_COLOR = '#171923'
const BORDER_COLOR = '#718096'
const TEXT_COLOR = '#CBD5E0'

const TOP_COLOR = '#248350'
const TOP_LINE_COLOR = '#38A169'
const BOTTOM_COLOR = '#38a16911'
const LINE_WIDTH = 2

export default function useAreaChart(containerRef, priceData) {
  const [areaChart, setAreaChart] = useState()

  useEffect(() => {
    const chartContainer = containerRef?.current

    const initializeChart = async () => {
      const { createChart, CrosshairMode } = await import('lightweight-charts')

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
          areaChart.chart.resize(el.offsetWidth, el.offsetHeight - 1)
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
      areaChart.chart.timeScale().fitContent()
    }
  }, [areaChart, containerRef, priceData])

  return {
    areaChart: areaChart?.chart
  }
}
