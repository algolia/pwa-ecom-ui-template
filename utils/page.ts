import algoliasearch from 'algoliasearch/lite'
import type { ComponentType } from 'react'
import { createElement } from 'react'
import { renderToString } from 'react-dom/server'
import type { InstantSearchProps } from 'react-instantsearch-dom'
import { findResultsState } from 'react-instantsearch-dom/server'

interface GetResultsStateParams {
  component: React.ComponentType
  searchState: InstantSearchProps['searchState']
  appId: string
  searchApiKey: string
  indexName: string
}

export function getWidgetsCount(component: ComponentType) {
  const widgets = []
  renderToString(
    createElement<any>(component, {
      widgetsCollector: (widget: any) => widgets.push(widget),
    })
  )
  return widgets.length
}

export async function getResultsState({
  component,
  searchState,
  appId,
  searchApiKey,
  indexName,
}: GetResultsStateParams): Promise<InstantSearchProps['resultsState']> {
  // 'useSearchClient' hook is not used here as this function runs on server-side only
  const searchClient = algoliasearch(appId, searchApiKey)
  let resultsState = { state: {}, results: [], rawResults: [], metadata: [] }

  // Get results state if there is at least a widget
  if (getWidgetsCount(component) > 0) {
    resultsState = await findResultsState(component, {
      searchClient,
      indexName,
      searchState,
    })

    // Strips down unserializable values so Next.js doesn't show an error
    resultsState = JSON.parse(JSON.stringify(resultsState))
  }

  return resultsState
}
