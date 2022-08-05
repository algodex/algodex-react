import { useAlgodex } from '@algodex/algodex-hooks'
import { useQuery } from 'react-query'

/**
 * Use Search Results Query
 * @param {Object} props The props of the parent
 * @param {string} props.query Search Query
 * @param {Object} [props.options] useQuery Options
 * @return {object}
 */
export function useOrders({
  type = 'wallet',
  id,
  options = {
    refetchInterval: 3000
  }
} = {}) {
  const { http } = useAlgodex()
  const { data, isError, error, ...rest } = useQuery(
    ['fetchOrders', { type, id }],
    () => http.dexd.fetchOrders(type, id),
    options
  )

  return { data, isError, error, ...rest }
}
export default useOrders
