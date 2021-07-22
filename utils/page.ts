import algoliasearch from 'algoliasearch/lite'
import type { InstantSearchProps } from 'react-instantsearch-dom'
import { findResultsState } from 'react-instantsearch-dom/server'

interface GetResultsStateParams {
  component: React.ComponentType
  searchState: InstantSearchProps['searchState']
  appId: string
  searchApiKey: string
  indexName: string
}

export async function getResultsState({
  component,
  searchState,
  appId,
  searchApiKey,
  indexName,
}: GetResultsStateParams): Promise<InstantSearchProps['resultsState']> {
  // Hook 'useSearchClient' is not used here as this function runs on server-side only
  const searchClient = algoliasearch(appId, searchApiKey)

  let resultsState = await findResultsState(component, {
    searchClient,
    indexName,
    searchState,
  })

  // Strips down unserializable values so Next.js doesn't show an error
  resultsState = JSON.parse(JSON.stringify(resultsState))

  return resultsState
}
