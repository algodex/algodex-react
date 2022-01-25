import {
  useAssetOrdersQuery,
  useAssetPriceQuery,
  useAssetTradeHistoryQuery,
  useSearchResultsQuery
} from '@/hooks/useAlgodex'

import { useFetchAlgorandPriceQuery } from '@/hooks/useAlgoExplorer'

import { useQuery } from 'react-query'
import Spinner from '@/components/Spinner'
import DefaultError from '@/components/Error'
/**
 * Base withQuery Abstraction
 *
 * Return an element based on Query State
 *
 * @param {JSX.Element | Function} Component Component to wrap
 * @param {Object} [options] Query Options
 * @param {Function} options.hook Callable Hook
 * @param {JSX.Element | Function} options.loading Loading Component
 * @param {JSX.Element | Function} options.error Error Component
 * @returns {JSX.Element} Return a composed component
 */
export function withQuery(
  Component,
  { hook = useQuery /*, loading: Loading = Spinner , error: Error = DefaultError */ }
) {
  function withQueryWrapper(props) {
    const { isSuccess, isLoading, isError, data, error } = hook(props)
    if (isSuccess) return <Component {...data} {...props} />
    if (isLoading) return <Spinner flex />
    if (isError) return <DefaultError message={error.message} />
    return <div>What</div>
  }
  withQueryWrapper.getInitialProps = Component.getInitialProps

  return withQueryWrapper
}
/**
 * With Search Results Query
 * @param {JSX.Element| Function} Component Component to wrap
 * @param {object} options Options to pass to withQuery
 * @returns {JSX.Element}
 */
export function withSearchResultsQuery(Component, options) {
  return withQuery(Component, {
    hook: useSearchResultsQuery,
    ...options
  })
}
/**
 *
 * @param Component
 * @param [options]
 * @returns {JSX.Element}
 */
export function withAssetOrdersQuery(Component, options) {
  return withQuery(Component, {
    hook: useAssetOrdersQuery,
    ...options
  })
}
/**
 *
 * @param Component React Component
 * @param [options] Extra options for hooks
 * @returns {JSX.Element}
 */
export function withAssetTradeHistoryQuery(Component, options) {
  return withQuery(Component, {
    hook: useAssetTradeHistoryQuery,
    ...options
  })
}

/**
 * With Asset Price Query
 * @param {JSX.Element| Function} Component Component to wrap
 * @param {object} [options] withQuery Options
 * @returns {JSX.Element}
 */
export function withAssetPriceQuery(Component, options) {
  return withQuery(Component, {
    hook: useAssetPriceQuery,
    ...options
  })
}

/**
 * With Algorand Price Query
 * @param {JSX.Element| Function} Component Component to wrap
 * @param {object} options Options to pass to withQuery
 * @returns {JSX.Element}
 */
export function withfetchAlgorandPriceQuery(Component, options) {
  return withQuery(Component, {
    hook: useFetchAlgorandPriceQuery,
    ...options
  })
}
