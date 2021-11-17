import { useRouter } from 'next/router'
import { useQuery } from 'react-query'
import { fetchExplorerAssetInfo } from 'lib/algoexplorer'
import { useEffect } from 'react'

/**
 * Use Asset
 * @param id
 * @param options
 * @param select
 * @returns {Object}
 * @todo: Refactor to use Algorand
 */
export const useExplorerAssetInfo = ({ id, options }) => {
  console.debug(`useExplorerAssetInfo ${id}`, options)
  const router = useRouter()

  const { data, isError, error, ...rest } = useQuery(
    ['explorerAsset', id],
    () => fetchExplorerAssetInfo(id),
    options
  )

  useEffect(() => {
    let mounted = true
    if (mounted) {
      if (isError && error.message.match(404)) {
        router.push('/404')
      } else if (isError && error.message.match(403)) {
        router.push('/403')
      } else if (isError) {
        console.log(error)
        // router.push('/500')
      }
    }
    return () => (mounted = false)
  }, [router, data, isError, error])

  return { data, isError, error, ...rest }
}
