import useStore from 'store/use-store'
import { useQuery } from 'react-query'
import { fetchTradeHistory } from 'lib/api'
import Spinner from 'components/spinner'
import Error from 'components/error'
import TradeHistoryView from './view'

export default function TradeHistory() {
  const { id, name, decimals } = useStore((state) => state.asset)

  const { status, data } = useQuery(['tradeHistory', { assetId: id }], () => fetchTradeHistory(id))

  if (status === 'loading') {
    return <Spinner flex />
  }
  if (status === 'error') {
    return <Error message="Error loading trade history" flex />
  }

  const convertAmount = (amount, decimals = 6) => {
    return amount / 10 ** decimals
  }

  const tradesData = data.transactions.map((txn) => ({
    id: txn.PK_trade_history_id,
    type: txn.tradeType,
    price: parseFloat(txn.asaPrice).toFixed(3),
    amount: convertAmount(txn.asaAmount, decimals).toFixed(3),
    timestamp: txn.unix_time * 1000
  }))

  return <TradeHistoryView assetName={name} tradesData={tradesData} />
}
