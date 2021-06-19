import Error from 'components/error'
import Spinner from 'components/spinner'
import { fetchPriceData } from 'lib/api'
import millify from 'millify'
import PropTypes from 'prop-types'
import { useMemo, useState } from 'react'
import { useQuery } from 'react-query'
import { getAssetInfo, mapPriceData, mapVolumeData, relDiff, getOhlc } from './helpers'

import ChartView from './view'

// Common
const VOLUME_UP_COLOR = '#2fb16c2c'
const VOLUME_DOWN_COLOR = '#e53e3e2c'
const baseAsset = 'ALGO'

const bidAndAsk = { bid: 0, ask: 0 }
function Chart(props) {
  const { assetId, ...rest } = props
  console.log('ASSET ID: ', assetId)
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
      spread={spread}
      algoVolume={algoVolume}
      assetName={assetName}
      ohlc={ohlc}
      priceData={priceData}
      volumeData={volumeData}
      data={data}
      initialChartMode="CANDLE"
      {...rest}
    />
  )
}

export default Chart

Chart.propTypes = {
  assetId: PropTypes.number
}
