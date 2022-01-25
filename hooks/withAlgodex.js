import {
  useAssetOrdersQuery,
  useAssetOrderbookQuery,
  useAssetPriceQuery,
  useAssetTradeHistoryQuery,
  useSearchResultsQuery,
  useAssetChartQuery,
  useWalletAssetsQuery
} from '@/hooks/useAlgodex'

import { useFetchAlgorandPriceQuery } from '@/hooks/useAlgoExplorer'
import { withQuery } from '@/hooks/withQuery'
import Spinner from '@/components/Spinner'
import ServiceError from '@/components/ServiceError'

const components = {
  Loading: Spinner,
  ServiceError
}
/**
 * With Search Results Query
 * @param {JSX.Element| Function} Component Component to wrap
 * @param {Object} [options] Options to pass to withQuery
 * @returns {JSX.Element}
 */
export function withSearchResultsQuery(Component, options) {
  return withQuery(Component, {
    hook: useSearchResultsQuery,
    components,
    ...options
  })
}
/**
 *
 * @param {JSX.Element| Function} Component Component to wrap
 * @param {Object} [options]
 * @returns {JSX.Element}
 */
export function withAssetOrdersQuery(Component, options) {
  return withQuery(Component, {
    hook: useAssetOrdersQuery,
    components,
    ...options
  })
}

export function withAssetOrderbookQuery(Component, options) {
  return withQuery(Component, {
    hook: useAssetOrderbookQuery,
    components,
    ...options
  })
}

export function withAssetChartQuery(Component, options) {
  return withQuery(Component, {
    hook: useAssetChartQuery,
    components,
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
    components,
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
    components,
    ...options
  })
}

export function withWalletAssetsQuery(Component, options) {
  return withQuery(Component, {
    hook: useWalletAssetsQuery,
    components,
    ...options
  })
}

/**
 * With Algorand Price Query
 * @param {JSX.Element| Function} Component Component to wrap
 * @param {object} [options] Options to pass to withQuery
 * @returns {JSX.Element}
 */
export function withfetchAlgorandPriceQuery(Component, options) {
  return withQuery(Component, {
    hook: useFetchAlgorandPriceQuery,
    components,
    ...options
  })
}
