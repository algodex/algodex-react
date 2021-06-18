import Error from 'components/error'
import Spinner from 'components/spinner'
import { fetchPriceData } from 'lib/api'
import millify from 'millify'

import { useMemo, useRef, useState } from 'react'
import { useQuery } from 'react-query'
import { getAssetInfo, mapPriceData, mapVolumeData, relDiff, getOhlc } from './helpers'
import useAreaChart from './use-area-chart'
import useCandleChart from './use-candle-chart'
import ChartView from './view'

// Common
const LOADER_COLOR = '#2D3748 '
const VOLUME_UP_COLOR = '#2fb16c2c'
const VOLUME_DOWN_COLOR = '#e53e3e2c'
const baseAsset = 'ALGO'
// Demo
const assetId = 15322902
const bidAndAsk = { bid: 0, ask: 0 }
function Chart() {
  const [intervalMs, setIntervalMs] = useState(1000)

  const { data, isLoading, isError } = useQuery(['priceData', { assetId }], fetchPriceData, {
    // Refetch the data every second
    refetchInterval: intervalMs
  })

  const priceData = useMemo(() => mapPriceData(data), [data])
  const volumeData = useMemo(() => mapVolumeData(data, VOLUME_UP_COLOR, VOLUME_DOWN_COLOR), [data])
  const assetInfo = useMemo(() => getAssetInfo(data), [data])
  const assetName = assetInfo?.asset?.params['unit-name'] || 'ALGO'
  const ohlc = useMemo(() => getOhlc(data), [data])

  const lastPriceData = priceData[priceData.length - 1] || {}
  const secondLastPriceData = priceData[priceData.length - 2] || {}
  const dailyChange = relDiff(lastPriceData.open, secondLastPriceData.open)
  const algoVolume = millify(data?.chart_data[data?.chart_data.length - 1]?.algoVolume || 0)
  const bid = bidAndAsk.bid.toFixed(4)
  const ask = bidAndAsk.ask.toFixed(4)
  const spread = Math.abs(bidAndAsk.ask - bidAndAsk.bid).toFixed(4)

  const candleChartRef = useRef()
  const areaChartRef = useRef()

  const { candleChart } = useCandleChart(candleChartRef, volumeData, priceData, data)
  const { areaChart } = useAreaChart(areaChartRef, volumeData, priceData, data)

  const chartModes = {
    CANDLE: 'CANDLE',
    AREA: 'AREA'
  }
  const { CANDLE, AREA } = chartModes
  const [chartMode, setChartMode] = useState(CANDLE)

  const changeMode = () => {
    if (chartMode === AREA) {
      setChartMode(CANDLE)
      const logicalRange = areaChart?.timeScale().getVisibleLogicalRange()
      candleChart?.timeScale().setVisibleLogicalRange(logicalRange)
      return
    }

    if (chartMode === CANDLE) {
      setChartMode(AREA)
      const logicalRange = candleChart?.timeScale().getVisibleLogicalRange()
      areaChart?.timeScale().setVisibleLogicalRange(logicalRange)
      return
    }
  }

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
      dailyChange={dailyChange}
      chartModes={chartModes}
      spread={spread}
      algoVolume={algoVolume}
      candleChart={candleChart}
      areaChart={areaChart}
      assetName={assetName}
      ohlc={ohlc}
      candleChartRef={candleChartRef}
      areaChartRef={areaChartRef}
      toggleChartMode={changeMode}
      chartMode={chartMode}
    />
  )
}

export default Chart
