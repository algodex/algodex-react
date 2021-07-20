import useStore from 'store/use-store'
import { useQuery } from 'react-query'
import { fetchTradeHistory } from 'lib/api'
import Spinner from 'components/spinner'
import Error from 'components/error'
import TradeHistoryView from './view'
import { convertFromBaseUnits, convertFromAsaLimitPrice } from 'services/convert'

export default function TradeHistory() {
  const asset = useStore((state) => state.asset)

  const { status, data } = useQuery(
    ['tradeHistory', { assetId: asset.id }],
    () => fetchTradeHistory(asset.id),
    { refetchInterval: 5000 }
  )

  if (status === 'loading') {
    return <Spinner flex />
  }
  if (status === 'error') {
    return <Error message="Error loading trade history" flex />
  }

  const tradesData = data.transactions.map((txn) => ({
    id: txn.PK_trade_history_id,
    type: txn.tradeType,
    price: convertFromAsaLimitPrice(txn.asaPrice, asset.decimals),
    amount: convertFromBaseUnits(txn.asaAmount, asset.decimals),
    timestamp: txn.unix_time * 1000
  }))

  return <TradeHistoryView asset={asset} tradesData={tradesData} />
}
