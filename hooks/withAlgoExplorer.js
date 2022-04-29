import { useAlgorandPriceQuery, useExplorerAssetInfo } from '@/hooks/useAlgoExplorer'

import ServiceError from '@/components/ServiceError'
import Spinner from '@/components/Spinner'
import withQuery from '@/hooks/withQuery'

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

export function withExplorerAssetInfo(Component, options) {
  return withQuery(Component, {
    hook: useExplorerAssetInfo,
    components,
    ...options
  })
}
