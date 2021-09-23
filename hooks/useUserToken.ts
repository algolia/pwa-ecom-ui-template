import { useEffect, useRef } from 'react'
import searchInsights from 'search-insights'

export function useUserToken() {
  const userTokenRef = useRef<string | undefined>(undefined)

  useEffect(() => {
    searchInsights('onUserTokenChange', (userToken) => {
      userTokenRef.current = userToken
    })
  }, [])

  return userTokenRef.current
}
