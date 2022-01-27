import withQuery from './withQuery'
import { useFetchAlgorandPriceQuery } from './useAlgoExplorer'

/**
 * With Algorand Price Query
 * @param {JSX.Element| Function} Component Component to wrap
 * @param {object} options Options to pass to withQuery
 * @returns {JSX.Element}
 */
export const withAlgorandPriceQuery = (Component, options) =>
  withQuery(Component, {
    hook: useFetchAlgorandPriceQuery,
    ...options
  })
