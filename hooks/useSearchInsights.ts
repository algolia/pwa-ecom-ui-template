import { useEffect, useRef } from 'react'
import searchInsights from 'search-insights'

export type SetUserToken = (
  generatedUserToken: string,
  setToken: (userToken: string) => void
) => void

export type SearchInsightsHookOptions = {
  appId: string
  searchApiKey: string
  setUserToken: SetUserToken
}

export function useSearchInsights({
  appId,
  searchApiKey,
  setUserToken,
}: SearchInsightsHookOptions) {
  const userTokenRef = useRef<string | undefined>(undefined)

  useEffect(() => {
    searchInsights('init', {
      appId,
      apiKey: searchApiKey,
      useCookie: true,
    })

    if (typeof setUserToken === 'function') {
      searchInsights('getUserToken', null, (_, generatedUserToken) => {
        setUserToken(generatedUserToken, (userToken) => {
          searchInsights('setUserToken', userToken)
          userTokenRef.current = userToken
        })
      })
    }
  }, [appId, searchApiKey, setUserToken])

  return { searchInsights, userToken: userTokenRef.current }
}
