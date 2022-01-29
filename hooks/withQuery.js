import DefaultError from 'components/Error'
import Spinner from 'components/Spinner'
import { useQuery } from 'react-query'

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
export function withQuery(
  Component,
  { hook = useQuery, loading: Loading = Spinner /*, error: Error = DefaultError */ }
) {
  function withQueryWrapper(props) {
    const { isSuccess, isLoading, isError, data, error } = hook(props)
    if (isSuccess) return <Component {...data} {...props} />
    if (isLoading) return <Loading flex />
    if (isError) return <DefaultError message={error.message} />
  }
  withQueryWrapper.getInitialProps = Component.getInitialProps

  return withQueryWrapper
}
<<<<<<< HEAD

=======
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
    console.error({ error })
    router.push('/restricted')
  }
}
>>>>>>> next
export default withQuery
