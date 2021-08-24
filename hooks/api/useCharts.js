import { useState, useEffect } from 'react'
import { useQuery } from 'react-query'
import { API_ERRORS } from 'lib/api/constants'

export default function useCharts(queryConfig, params) {
  const [etag, setEtag] = useState(null)

  const { key, fetchFunction, options } = queryConfig

  const retryFunction = (failureCount, error) => {
    if (error.message === API_ERRORS.NOT_MODIFIED) {
      return true
    }
    return 6
  }

  const query = useQuery([key, { etag, ...params }], fetchFunction, {
    retry: retryFunction,
    keepPreviousData: true,
    ...options
  })

  const responseEtag = query.data?.metadata?.headers?.etag

  useEffect(() => {
    if (responseEtag) {
      setEtag(responseEtag)
    }
  }, [responseEtag])

  return query
}
