import { useQuery } from 'react-query'
import { fetchTradeHistory } from 'services/algodex'
import Spinner from 'components/spinner'
import Error from 'components/error'
import TradeHistoryView from './view'
import { floatToFixed } from 'services/display'
import PropTypes from 'prop-types'

export default function TradeHistory({ asset }) {
  const { status, data } = useQuery(
    ['tradeHistory', { assetId: asset?.id }],
    () => fetchTradeHistory(asset.id),
    {
      enabled: typeof asset !== 'undefined',
      refetchInterval: 5000,
      staleTime: 5000
    }
  )

  if (status === 'loading') {
    return <Spinner flex />
  }
  if (status === 'error') {
    return <Error message="Error loading trade history" flex />
  }

  const tradesData =
    data?.transactions.map((txn) => ({
      id: txn.PK_trade_history_id,
      type: txn.tradeType,
      price: floatToFixed(txn.formattedPrice),
      amount: txn.formattedASAAmount,
      timestamp: txn.unix_time * 1000
    })) || []

  if (!asset?.id) {
    return <Spinner flex />
  }
  return <TradeHistoryView asset={asset} tradesData={tradesData} />
}
TradeHistory.propTypes = {
  asset: PropTypes.object.isRequired
}
