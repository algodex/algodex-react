import { useQuery } from 'react-query'
import Spinner from 'components/spinner'
import { default as DefaultError } from 'components/error'

/**
 * Base withQuery Abstraction
 *
 * Return an element based on Query State
 *
 * @param {JSX.Element | Function} Component Component to wrap
 * @param {Object} props Starting props to pass to Component
 * @param {Object} options Query Options
 * @param {Function} options.hook Callable Hook
 * @param {Array} options.args Hook Arguments
 * @param {JSX.Element | Function} options.loading Loading Component
 * @param {JSX.Element | Function} options.error Error Component
 * @returns {JSX.Element} Return a stateful component
 */
export const withQuery = (
  Component,
  props,
  { hook = useQuery, args = [], loading: Loading = Spinner, error: Error = DefaultError }
) => {
  const result = hook(...args)

  const render = {
    ...props,
    ...result
  }

  if (result.isSuccess) return <Component {...render} />
  if (result.isLoading) return <Loading flex />
  if (result.isError) return <Error message={result.error.message} />
}
/**
 * Route based on Error
 * @param isError
 * @param error
 * @param router
 * @returns {function(): boolean}
 */
export const routeQueryError = ({ isError, error, router }) => {
  if (isError && error.message.match(404)) {
    router.push('/404')
  } else if (isError && error.message.match(403)) {
    router.push('/unauthorized')
  } else if (isError) {
    // router.push('/500')
    console.error(error)
  }
}
export default withQuery
