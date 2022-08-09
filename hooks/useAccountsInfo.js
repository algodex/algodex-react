import { useAlgodex } from '@algodex/algodex-hooks'
import { useQuery } from 'react-query'

/**
 * Bulk Fetch Account Info
 * @return {UseQueryResult<Object, unknown>}
 */
export default function useAccountsInfo(addresses) {
  const { algodex } = useAlgodex()

  const hasAddresses =
    typeof algodex !== 'undefined' && typeof addresses !== 'undefined' && addresses.length > 0

  // TODO move to a proper useAllAccountsInfo
  return useQuery(['fetchAccounts'], () => algodex.http.indexer.fetchAccounts(addresses), {
    enabled: hasAddresses,
    refetchInterval: 3000
  })
}
