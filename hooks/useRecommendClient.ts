import type { RecommendClient } from '@algolia/recommend'
import recommend from '@algolia/recommend'
import { useMemo } from 'react'

// eslint-disable-next-line import/extensions
import packageJson from '@/package.json'

export type RecommendClientHookOptions = {
  appId: string
  recommendApiKey: string
}

export function getRecommendClient(
  appId: string,
  recommendApiKey: string
): RecommendClient {
  const client = recommend(appId, recommendApiKey)
  client.addAlgoliaAgent(`pwa-ecom-react-ui-template (${packageJson.version})`)

  return client
}

export function useRecommendClient({
  appId,
  recommendApiKey,
}: RecommendClientHookOptions): RecommendClient {
  return useMemo<RecommendClient>(
    () => getRecommendClient(appId, recommendApiKey),
    [appId, recommendApiKey]
  )
}
