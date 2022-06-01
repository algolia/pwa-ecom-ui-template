import recommend from '@algolia/recommend'
import { useMemo } from 'react'

export type RecommendClientHookOptions = {
  appId: string
  recommendApiKey: string
}

export function getRecommendClient(appId: string, recommendApiKey: string) {
  return recommend(appId, recommendApiKey)
}

export function useRecommendClient({
  appId,
  recommendApiKey,
}: RecommendClientHookOptions): any {
  return useMemo<any>(
    () => getRecommendClient(appId, recommendApiKey),
    [appId, recommendApiKey]
  )
}
