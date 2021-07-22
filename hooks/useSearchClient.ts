import type { SearchClient } from 'algoliasearch/lite'
import algoliasearch from 'algoliasearch/lite'
import { useMemo } from 'react'

interface SearchClientHookOptions {
  appId: string | undefined
  searchApiKey: string | undefined
}

export function useSearchClient({
  appId,
  searchApiKey,
}: SearchClientHookOptions): SearchClient {
  if (typeof appId === 'undefined' || typeof searchApiKey === 'undefined') {
    throw new Error(`'useSearchClient': 'appId' or 'searchApiKey' missing.`)
  }

  return useMemo<SearchClient>(
    () => algoliasearch(appId, searchApiKey),
    [appId, searchApiKey]
  )
}
