import { useAlgodex } from '@algodex/algodex-hooks'
import { useQuery } from 'react-query'

/**
 * Bulk Fetch Account Info
 * @return {UseQueryResult<Object, unknown>}
 */
export default function useAccountsInfo() {
  const { algodex } = useAlgodex()

  const hasAddresses =
    typeof algodex !== 'undefined' &&
    typeof algodex.addresses !== 'undefined' &&
    algodex.addresses.length > 0

  // TODO move to a proper useAllAccountsInfo
  return useQuery(
    ['fetchAccounts', algodex.addresses?.map((w) => w.address)],
    () => algodex.http.indexer.fetchAccounts(algodex.addresses),
    {
      enabled: hasAddresses,
      refetchInterval: 3000
    }
  )
}
