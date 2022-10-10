import { useQuery } from 'react-query'
import { useAlgodex } from '@algodex/algodex-hooks'

/**
 *
 * @param {Wallet} wallet Wallet to search
 * @param {Object} [options] Options for Query
 * @return {UseQueryResult<Wallet, unknown>}
 */
export default function useAccountInfo(
  wallet,
  options = {
    refetchInterval: 3000
  }
) {
  if (typeof wallet === 'undefined' || typeof wallet.address === 'undefined') {
    throw new TypeError('Must have a valid wallet!')
  }

  const { algodex } = useAlgodex()
  return useQuery(
    ['fetchAccountInfo', wallet.address],
    () => algodex.http.indexer.fetchAccountInfo(wallet),
    options
  )
}
