import { useRouter } from 'next/router'
import { useQuery } from 'react-query'
import { fetchExplorerAssetInfo, fetchAlgorandPrice } from 'services/algoexplorer'
import { routeQueryError } from 'hooks/withQuery'
import { useEffect } from 'react'
const DEBUG = process.env.NEXT_DEBUG || process.env.DEBUG || false

/**
 * Use Asset
 * @param id
 * @param options
 * @param select
 * @returns {Object}
 * @todo: Refactor to use Algorand
 */
export const useExplorerAssetInfo = ({ id, options }) => {
  DEBUG && console.debug(`useExplorerAssetInfo(${id})`, options)
  const router = useRouter()

  const { data, isError, error, ...rest } = useQuery(
    ['explorerAsset', id],
    () => fetchExplorerAssetInfo(id),
    options
  )

  useEffect(() => {
    let mounted = true
    if (mounted) {
      routeQueryError({ isError, error, router })
    }
    return () => (mounted = false)
  }, [router, data, isError, error])

  return { data, isError, error, ...rest }
}
