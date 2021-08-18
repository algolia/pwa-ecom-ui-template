import type { SearchClient } from 'algoliasearch/lite'
import { useRouter } from 'next/dist/client/router'
import { memo, useCallback, useEffect, useMemo, useState } from 'react'
import isEqual from 'react-fast-compare'
import type { InstantSearchProps } from 'react-instantsearch-dom'
import { InstantSearch } from 'react-instantsearch-dom'

import { VirtualSearchBox } from '../_widgets/virtual-search-box/virtual-search-box'

import { SearchContext } from '@/contexts/SearchContext'
import { useSearchClient } from '@/hooks/useSearchClient'
import { isObjectEmpty } from '@/utils/misc'
import { createURL, searchStateToUrl, urlToSearchState } from '@/utils/url'

export type SearchProps = {
  children: React.ReactNode
  appId: string
  searchApiKey: string
  indexName: string
  searchClient?: SearchClient
  resultsState?: InstantSearchProps['resultsState']
  searchState?: SearchState
  onSearchStateChange?: InstantSearchProps['onSearchStateChange']
  createURL?: InstantSearchProps['createURL']
}

type SearchState = {
  [key: string]: any
}

export const Search = memo(
  function Search({
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
  }: SearchProps) {
    const router = useRouter()
    const searchClient = useSearchClient({
      appId,
      searchApiKey,
    })

    // Search state
    const initialSearchState = isObjectEmpty(customInitialSearchState)
      ? urlToSearchState(router?.asPath.slice(1))
      : customInitialSearchState

    const [searchState, setSearchState] =
      useState<SearchState>(initialSearchState)

    // Update router url
    const updateRouterUrl = useCallback(
      (nextSearchState: SearchState) => {
        const newRoute = searchStateToUrl(nextSearchState)

        if (newRoute !== router.asPath) {
          router.push(newRoute, undefined, {
            shallow: true,
          })
        }
      },
      [] // eslint-disable-line react-hooks/exhaustive-deps
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

      router.events.on('routeChangeComplete', handleRouteChange)

      return () => {
        router.events.off('routeChangeComplete', handleRouteChange)
      }
    }, [router, setSearchState])

    // Listen for InstantSearch state changes
    const onSearchStateChange = useCallback(
      (nextSearchState: SearchState): void => {
        setSearchState(nextSearchState)
        updateRouterUrl(nextSearchState)
      },
      [setSearchState, updateRouterUrl]
    )

    useEffect(() => {
      updateRouterUrl(searchState)
    }, [updateRouterUrl, searchState])

    // Search context
    const contextValue = useMemo(
      () => ({
        query: initialSearchState?.query,
        setSearchState,
        searchClient,
      }),
      [setSearchState, initialSearchState?.query, searchClient]
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
          <VirtualSearchBox />
        </SearchContext.Provider>
      </InstantSearch>
    )
  },
  (prevProps, nextProps) => isEqual(prevProps, nextProps)
)

Search.whyDidYouRender = true
