import { useState, useEffect } from 'react'
import { addListener, removeListener } from 'resize-detector'
import theme from 'theme'
import moment from 'moment'
const UP_COLOR = theme.colors.green[500]
const DOWN_COLOR = theme.colors.red[500]
const LINE_COLOR = theme.colors.gray[800]
const BACKGROUND_COLOR = theme.colors.gray[900]
const BORDER_COLOR = theme.colors.gray[500]
const TEXT_COLOR = theme.colors.gray[300]

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
