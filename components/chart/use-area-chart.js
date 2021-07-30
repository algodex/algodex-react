import { useState, useEffect } from 'react'
import { addListener, removeListener } from 'resize-detector'
import Big from 'big.js'

const LINE_COLOR = '#1A202C'
const BACKGROUND_COLOR = '#171923'
const BORDER_COLOR = '#718096'
const TEXT_COLOR = '#CBD5E0'

const TOP_COLOR = '#248350'
const TOP_LINE_COLOR = '#38A169'
const BOTTOM_COLOR = '#38a16911'
const LINE_WIDTH = 2

export default function useAreaChart(containerRef, volumeData, priceData, data, asset) {
  const [chart, setChart] = useState()
  const [areaSeries, setAreaSeries] = useState()

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

    if (chart && !areaSeries) {
      setAreaSeries(
        chart.addAreaSeries({
          topColor: TOP_COLOR,
          bottomColor: BOTTOM_COLOR,
          lineColor: TOP_LINE_COLOR,
          lineWidth: LINE_WIDTH
        })
      )
    }

    if (chart && chartContainer) {
      addListener(chartContainer, () =>
        chart.resize(chartContainer.offsetWidth, chartContainer.offsetHeight - 1)
      )
      return () => removeListener(chartContainer)
    }
  }, [chart, containerRef, volumeData, priceData, data, areaSeries])

  useEffect(() => {
    const areaSeriesData = priceData?.map(({ time, close }) => ({
      time,
      value: close
    }))
    if (chart) {
      if (priceData?.length) {
        areaSeries?.setData(areaSeriesData)
        areaSeries?.applyOptions({
          priceFormat: {
            precision: asset.decimals,
            minMove: new Big(10).pow(asset.decimals * -1).toNumber()
          }
        })
        chart.timeScale().fitContent()
      }
    }
  }, [areaSeries, data, chart, priceData, asset.decimals])

  return {
    areaChart: chart
  }
}
