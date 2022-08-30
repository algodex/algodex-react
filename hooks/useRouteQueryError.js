import useUserStore from 'store/use-user-state'

/**
 * Route based on Error
 * @param isError
 * @param error
 * @param router
 * @returns {function(): boolean}
 */
export const useRouteQueryError = ({ isError, error, router, enabled = true }) => {
  const activeNetwork = useUserStore((state) => state.activeNetwork)
  if (enabled) {
    if (isError && error.message.match(404)) {
      router.push('/404')
    } else if (isError && error.message.match(500)) {
      // Do nothing. The component will handle this.
    } else if (isError && error.message.match(451) && activeNetwork === 'mainnet') {
      console.error({ error })
      router.push('/restricted/US')
    }
  }
}

export default useRouteQueryError
