import { useAssetPriceQuery, useSearchResultsQuery } from './useAlgodex'

import { useFetchAlgorandPriceQuery } from './useAlgoExplorer'
import { withQuery } from './withQuery'

/**
 * With Search Results Query
 * @param {JSX.Element| Function} Component Component to wrap
 * @param {object} options Options to pass to withQuery
 * @returns {JSX.Element}
 */
export const withSearchResultsQuery = (Component, options) =>
  withQuery(Component, {
    hook: useSearchResultsQuery,
    ...options
  })
/**
 * With Asset Price Query
 * @param {JSX.Element| Function} Component Component to wrap
 * @param {object} options withQuery Options
 * @returns {JSX.Element}
 */
export const withAssetPriceQuery = (Component, options) =>
  withQuery(Component, {
    hook: useAssetPriceQuery,
    ...options
  })

/**
 * With Algorand Price Query
 * @param {JSX.Element| Function} Component Component to wrap
 * @param {object} options Options to pass to withQuery
 * @returns {JSX.Element}
 */
export const withfetchAlgorandPriceQuery = (Component, options) =>
  withQuery(Component, {
    hook: useFetchAlgorandPriceQuery,
    ...options
  })
