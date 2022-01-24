import { useQuery } from 'react-query'
import Spinner from 'components/Spinner'
import { Error as DefaultError } from 'components/Error'

/**
 * Base withQuery Abstraction
 *
 * Return an element based on Query State
 *
 * @param {JSX.Element | Function} Component Component to wrap
 * @param {Object} options Query Options
 * @param {Function} options.hook Callable Hook
 * @param {JSX.Element | Function} options.loading Loading Component
 * @param {JSX.Element | Function} options.error Error Component
 * @returns {JSX.Element} Return a composed component
 */
export const withQuery = (
  Component,
  { hook = useQuery, loading: Loading = Spinner, error: Error = DefaultError }
) => {
  function withQueryWrapper(props) {
    const { isSuccess, isLoading, isError, data, error } = hook(props)
    if (isSuccess) return <Component {...data} {...props} />
    if (isLoading) return <Loading flex />
    if (isError) return <Error message={error.message} />
  }
  withQueryWrapper.getInitialProps = Component.getInitialProps

  return withQueryWrapper
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
  } else if (isError && error.message.match(500)) {
    // Do nothing. The component will handle this.
  } else if (isError) {
    // router.push('/500')
    console.error({error})
    router.push('/restricted')
  }
}
export default withQuery
