import type { SearchClient } from 'algoliasearch/lite'
import { useRouter } from 'next/dist/client/router'
import { useCallback, useEffect, useMemo, useState } from 'react'
import type { InstantSearchProps } from 'react-instantsearch-dom'
import { InstantSearch } from 'react-instantsearch-dom'

import SearchContext from '@/contexts/SearchContext'
import { useSearchClient } from '@/hooks/useSearchClient'
import debounce from '@/utils/debounce'
import { createURL, searchStateToURL } from '@/utils/url'

interface SearchProps {
  children: React.ReactNode
  appId: string
  searchApiKey: string
  indexName: string
  searchClient?: SearchClient
  resultsState: InstantSearchProps['resultsState']
  searchState?: InstantSearchProps['searchState']
  onSearchStateChange?: InstantSearchProps['onSearchStateChange']
  createURL?: InstantSearchProps['createURL']
}

export default function Search({
  children,
  appId,
  searchApiKey,
  indexName,
  searchClient: customSearchClient,
  resultsState,
  searchState: initialSearchState,
  onSearchStateChange: customOnSearchStateChange,
  createURL: customCreateURL,
  ...props
}: SearchProps): JSX.Element {
  const [searchState, setSearchState] = useState(initialSearchState ?? {})

  const searchClient = useSearchClient({
    appId,
    searchApiKey,
  })

  // Update router url
  const router = useRouter()
  const updateRouterUrl = useCallback(
    (nextSearchState: InstantSearchProps['searchState']) => {
      router.push(searchStateToURL(nextSearchState), undefined, {
        shallow: true,
      })
    },
    [] // eslint-disable-line react-hooks/exhaustive-deps
  )

  // Listen for InstantSearch state changes
  const onSearchStateChange = useCallback(
    (nextSearchState: InstantSearchProps['searchState']): void => {
      setSearchState(nextSearchState)
    },
    []
  )

  // Listen for search state changes
  const debouncedUpdateRouterUrl = useMemo(
    () => debounce(updateRouterUrl, 700),
    [updateRouterUrl]
  )

  useEffect(() => {
    debouncedUpdateRouterUrl(searchState)
  }, [debouncedUpdateRouterUrl, searchState])

  // Search context
  const contextValue = useMemo(
    () => ({
      query: initialSearchState?.query,
      setSearchState,
      searchClient,
    }),
    [initialSearchState?.query, setSearchState, searchClient]
  )

  return (
    <InstantSearch
      searchClient={customSearchClient ?? searchClient}
      indexName={indexName}
      resultsState={resultsState}
      searchState={searchState}
      createURL={customCreateURL ?? createURL}
      onSearchStateChange={customOnSearchStateChange ?? onSearchStateChange}
      {...props}
    >
      <SearchContext.Provider value={contextValue}>
        {children}
      </SearchContext.Provider>
    </InstantSearch>
  )
}
