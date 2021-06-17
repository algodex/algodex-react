import { useState, useEffect } from 'react'
import { addListener, removeListener } from 'resize-detector'

const UP_COLOR = '#38A169'
const DOWN_COLOR = '#E53E3E'
const LINE_COLOR = '#1A202C'
const BACKGROUND_COLOR = '#171923'
const BORDER_COLOR = '#718096'
const TEXT_COLOR = '#CBD5E0'

export default function useCandleChart(containerRef, volumeData, priceData) {
  const [chart, setChart] = useState()

  useEffect(() => {
    const initializeChart = async () => {
      const { createChart, CrosshairMode } = await import('lightweight-charts')

      setChart(
        createChart(containerRef.current, {
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
      )
    }
    containerRef?.current && !chart && initializeChart()
  }, [chart, containerRef])

  useEffect(() => {
    const chartContainer = containerRef?.current

    if (chart) {
      const candleSeries = chart.addCandlestickSeries({
        upColor: UP_COLOR,
        downColor: DOWN_COLOR,
        borderDownColor: DOWN_COLOR,
        borderUpColor: UP_COLOR,
        wickDownColor: DOWN_COLOR,
        wickUpColor: UP_COLOR
      })
      const volumeSeries = chart.addHistogramSeries({
        color: UP_COLOR,
        priceFormat: {
          type: 'volume'
        },
        priceScaleId: '',
        scaleMargins: {
          top: 0.8,
          bottom: 0
        }
      })
      volumeSeries.setData(volumeData)
      candleSeries.setData(priceData)
      chart.timeScale().fitContent()

      if (chartContainer) {
        addListener(chartContainer, () =>
          chart.resize(chartContainer.offsetWidth, chartContainer.offsetHeight)
        )
      }

      return () => removeListener(chartContainer)
    }
  }, [chart, containerRef, volumeData, priceData])

  return {
    candleChart: chart
  }
}
