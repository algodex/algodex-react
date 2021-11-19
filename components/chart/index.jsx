import Error from 'components/error'
import Spinner from 'components/spinner'
import millify from 'millify'
import PropTypes from 'prop-types'
import { useMemo } from 'react'
import { mapPriceData, mapVolumeData, getOhlc, getBidAskSpread } from './helpers'
import useStore, { getChartTimeInterval } from 'store/use-store'
import ChartView from './view'
import { useAssetChartQuery } from '../../hooks/useAlgodex'

// Common
const VOLUME_UP_COLOR = '#2fb16c2c'
const VOLUME_DOWN_COLOR = '#e53e3e2c'
const baseAsset = 'ALGO'

function Chart({ asset, ...rest }) {
  const orderBook = useStore((state) => state.orderBook)
  const { bid, ask, spread } = useMemo(() => getBidAskSpread(orderBook), [orderBook])
  const chartTimeInterval = useStore((state) => getChartTimeInterval(state))

  const { isLoading, isError, data } = useAssetChartQuery({
    asset,
    chartInterval: chartTimeInterval
  })

  const priceData = useMemo(() => mapPriceData(data), [data])
  const volumeData = useMemo(() => mapVolumeData(data, VOLUME_UP_COLOR, VOLUME_DOWN_COLOR), [data])
  const ohlc = useMemo(() => getOhlc(data), [data])

  const asaVolume = millify(data?.chart_data[data?.chart_data.length - 1]?.asaVolume || 0)

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
      spread={spread}
      asaVolume={asaVolume}
      asset={asset}
      ohlc={ohlc}
      priceData={priceData}
      volumeData={volumeData}
      {...rest}
    />
  )
}

export default Chart

Chart.propTypes = {
  asset: PropTypes.object.isRequired
}
