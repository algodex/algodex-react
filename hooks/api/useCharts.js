import { useState, useEffect } from 'react'
import { useQuery } from 'react-query'
import axios from 'axios'

export const API_HOST = process.env.NEXT_PUBLIC_API || 'https://api-testnet.algodex.com'

export const APIErrors = {
  notModified: 'Request failed with status code 304'
}

export const queries = {
  getPriceData: {
    key: 'priceData',
    fetchFunction: fetchPriceData,
    fetchInterval: 1000
  }
}

export async function fetchPriceData({ queryKey }) {
  const { etag, assetId } = queryKey[1]
  const endpoint = `${API_HOST}/algodex-backend/charts.php?assetId=${assetId}`

  const res = await axios.get(endpoint, {
    headers: {
      'if-none-match': etag
    }
  })

  const data = {
    ...res.data,
    metadata: {
      headers: res.headers
    }
  }

  return data
}

export default function useCharts(queryConfig, params) {
  const [etag, setEtag] = useState(null)

  const retryFunction = (failureCount, error) => {
    if (error.message === APIErrors.notModified) {
      return true
    }
    return 6
  }

  const query = useQuery([queryConfig.key, { etag, ...params }], queryConfig.fetchFunction, {
    refetchInterval: queryConfig.interval,
    retry: retryFunction,
    retryDelay: queryConfig.interval,
    keepPreviousData: true
  })

  const responseEtag = query.data?.metadata?.headers?.etag

  useEffect(() => {
    if (responseEtag) {
      setEtag(responseEtag)
    }
  }, [responseEtag])

  return query
}
