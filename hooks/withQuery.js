import { useQuery } from 'react-query'
import { isUndefined } from 'lodash/lang'

/**
 * Base withQuery Abstraction
 *
 * Return an element based on Query State
 *
 * @param {JSX.Element | function} Component Component to wrap
 * @param {object} options Query Options
 * @param {function} options.hook Callable Hook
 * @param {object} options.components Hook Components
 * @param {JSX.Element | function} options.components.Loading Loading Component
 * @param {JSX.Element | function} options.components.ServiceError Error Component
 * @returns {JSX.Element} Return a composed component
 */
export function withQuery(
  Component,
  { hook = useQuery, components: { Loading, ServiceError } = {} } = {}
) {
  if (isUndefined(Loading) || isUndefined(ServiceError))
    throw new Error('Must have Loading and Error components')

  function withQueryWrapper(props) {
    const { isSuccess, isLoading, isError, data, error } = hook(props)
    if (isSuccess) return <Component {...data} {...props} />
    if (isLoading) return <Loading flex />
    if (isError) return <ServiceError message={error.message} />
  }

  withQueryWrapper.getInitialProps = Component.getInitialProps

  return withQueryWrapper
}

export default withQuery
