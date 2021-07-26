import { useState, useEffect } from 'react'
import { addListener, removeListener } from 'resize-detector'
import Big from 'big.js'

const UP_COLOR = '#38A169'
const DOWN_COLOR = '#E53E3E'
const LINE_COLOR = '#1A202C'
const BACKGROUND_COLOR = '#171923'
const BORDER_COLOR = '#718096'
const TEXT_COLOR = '#CBD5E0'

export default function useCandleChart(containerRef, volumeData, priceData, data, asset) {
  const [chart, setChart] = useState()
  const [candleSeries, setCandleSeries] = useState()
  const [volumeSeries, setVolumeSeries] = useState()

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

    if (containerRef?.current && !chart) {
      initializeChart()
    }
  }, [chart, containerRef, data])

  useEffect(() => {
    const chartContainer = containerRef?.current

    if (chart && !candleSeries) {
      setCandleSeries(
        chart.addCandlestickSeries({
          upColor: UP_COLOR,
          downColor: DOWN_COLOR,
          borderDownColor: DOWN_COLOR,
          borderUpColor: UP_COLOR,
          wickDownColor: DOWN_COLOR,
          wickUpColor: UP_COLOR
        })
      )

      setVolumeSeries(
        chart.addHistogramSeries({
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
      )
    }

    if (chart && chartContainer) {
      addListener(chartContainer, () =>
        chart.resize(chartContainer.offsetWidth, chartContainer.offsetHeight - 1)
      )
      return () => removeListener(chartContainer)
    }
  }, [chart, containerRef, volumeData, priceData, data, candleSeries])

  useEffect(() => {
    if (chart) {
      if (volumeData?.length) {
        volumeSeries?.setData(volumeData)
      }
      if (priceData?.length) {
        candleSeries?.setData(priceData)
        candleSeries?.applyOptions({
          priceFormat: {
            precision: asset.decimals,
            minMove: new Big(10).pow(asset.decimals * -1).toNumber()
          }
        })
        chart.timeScale().fitContent()
      }
    }
  }, [volumeSeries, candleSeries, data, chart, volumeData, priceData, asset.decimals])

  return {
    candleChart: chart
  }
}
