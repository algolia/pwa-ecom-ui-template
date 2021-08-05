import type { SearchClient } from 'algoliasearch/lite'
import { useRouter } from 'next/dist/client/router'
import { useCallback, useEffect, useMemo, useState } from 'react'
import type { InstantSearchProps } from 'react-instantsearch-dom'
import { InstantSearch } from 'react-instantsearch-dom'

import SearchContext from '@/contexts/SearchContext'
import { useSearchClient } from '@/hooks/useSearchClient'
import debounce from '@/utils/debounce'
import { isObjectEmpty } from '@/utils/misc'
import { createURL, searchStateToUrl, urlToSearchState } from '@/utils/url'

interface SearchProps {
  children: React.ReactNode
  appId: string
  searchApiKey: string
  indexName: string
  searchClient?: SearchClient
  resultsState: InstantSearchProps['resultsState']
  searchState?: SearchState
  onSearchStateChange?: InstantSearchProps['onSearchStateChange']
  createURL?: InstantSearchProps['createURL']
}

interface SearchState {
  [key: string]: any
}

export default function Search({
  children,
  appId,
  searchApiKey,
  indexName,
  searchClient: customSearchClient,
  resultsState,
  searchState: customInitialSearchState,
  onSearchStateChange: customOnSearchStateChange,
  createURL: customCreateURL,
  ...props
}: SearchProps): JSX.Element {
  const router = useRouter()

  const initialSearchState = isObjectEmpty(customInitialSearchState)
    ? urlToSearchState(router?.asPath.slice(1))
    : customInitialSearchState

  const [searchState, setSearchState] =
    useState<SearchState>(initialSearchState)

  const searchClient = useSearchClient({
    appId,
    searchApiKey,
  })

  // Update router url
  const updateRouterUrl = useCallback(
    (nextSearchState: SearchState) => {
      router.push(searchStateToUrl(nextSearchState), undefined, {
        shallow: true,
      })
    },
    [] // eslint-disable-line react-hooks/exhaustive-deps
  )

  const debouncedUpdateRouterUrl = useMemo(
    () => debounce(updateRouterUrl, 700),
    [updateRouterUrl]
  )

  // Listen for route changes
  useEffect(() => {
    const handleRouteChange = (
      url: string,
      { shallow }: { shallow: boolean }
    ) => {
      if (!shallow) {
        setSearchState(urlToSearchState(url))
      }
    }

    router.events.on('routeChangeStart', handleRouteChange)

    return () => {
      router.events.off('routeChangeStart', handleRouteChange)
    }
  }, [router])

  // Listen for InstantSearch state changes
  const onSearchStateChange = useCallback(
    (nextSearchState: SearchState): void => {
      setSearchState(nextSearchState)
      debouncedUpdateRouterUrl(nextSearchState)
    },
    [debouncedUpdateRouterUrl]
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
    [initialSearchState?.query, searchClient]
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
