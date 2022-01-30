import { useAlgorandPriceQuery } from '@/hooks/useAlgoExplorer'
import withQuery from '@/hooks/withQuery'
import Spinner from '@/components/Spinner'
import ServiceError from '@/components/ServiceError'
const components = {
  Loading: Spinner,
  ServiceError
}
/**
 * With Algorand Price Query
 * @param {JSX.Element| Function} Component Component to wrap
 * @param {object} [options] Options to pass to withQuery
 * @returns {JSX.Element}
 */
export function withAlgorandPriceQuery(Component, options) {
  return withQuery(Component, {
    hook: useAlgorandPriceQuery,
    components,
    ...options
  })
}
