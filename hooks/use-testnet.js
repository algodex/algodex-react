import axios from 'axios'
import { API_HOST } from 'lib/api'
import { useState, useEffect } from 'react'

export const checkUserAccess = async (loginKey) => {
  const res = await axios.get(
    `${API_HOST}/algodex-backend/validate_login_id.php?loginKey=${loginKey}`
  )

  return res.data?.success
}

export function getQuery(query) {
  return new URLSearchParams(window.location.search).get(query)
}

export const useTestnet = () => {
  const [hasAccess, setHasAccess] = useState(false)

  useEffect(() => {
    let key = getQuery('loginKey')

    if (key) {
      checkUserAccess(key).then((result) => setHasAccess(result))
    }
  }, [])

  return hasAccess
}

export default useTestnet
