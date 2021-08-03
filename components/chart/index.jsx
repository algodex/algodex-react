import Error from 'components/error'
import Spinner from 'components/spinner'
import { fetchPriceData } from 'lib/api'
import millify from 'millify'
import PropTypes from 'prop-types'
import { useMemo, useEffect } from 'react'
import { useQuery, useQueryClient } from 'react-query'
import { mapPriceData, mapVolumeData, getOhlc, getBidAskSpread } from './helpers'
import useStore from 'store/use-store'
import ChartView from './view'

// Common
const VOLUME_UP_COLOR = '#2fb16c2c'
const VOLUME_DOWN_COLOR = '#e53e3e2c'
const baseAsset = 'ALGO'

function Chart(props) {
  const asset = useStore((state) => state.asset)
  const assetId = asset.id

  const orderBook = useStore((state) => state.orderBook)
  const { bid, ask, spread } = useMemo(() => getBidAskSpread(orderBook), [orderBook])

  const queryClient = useQueryClient()

  const { isLoading, isError, data } = useQuery(
    ['priceData', { assetId }],
    () => fetchPriceData(assetId),
    {
      // Refetch the data every second
      refetchInterval: 1000
    }
  )

  useEffect(() => {
    queryClient.invalidateQueries('priceData')
  }, [assetId, queryClient])

  const priceData = useMemo(() => mapPriceData(data), [data])
  const volumeData = useMemo(() => mapVolumeData(data, VOLUME_UP_COLOR, VOLUME_DOWN_COLOR), [data])
  const ohlc = useMemo(() => getOhlc(data), [data])

  const algoVolume = millify(data?.chart_data[data?.chart_data.length - 1]?.algoVolume || 0)

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
      algoVolume={algoVolume}
      asset={asset}
      ohlc={ohlc}
      priceData={priceData}
      volumeData={volumeData}
      initialChartMode="CANDLE"
      {...props}
    />
  )
}

export default Chart

Chart.propTypes = {
  assetId: PropTypes.number
}
