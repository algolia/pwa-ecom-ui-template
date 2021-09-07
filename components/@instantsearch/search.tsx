import type { SearchClient } from 'algoliasearch/lite'
import { atom, useAtom } from 'jotai'
import { selectAtom, useAtomValue } from 'jotai/utils'
import { useRouter } from 'next/router'
import { memo, useCallback, useEffect } from 'react'
import isEqual from 'react-fast-compare'
import type { InstantSearchProps } from 'react-instantsearch-dom'
import { Configure, InstantSearch } from 'react-instantsearch-dom'

import { VirtualSearchBox } from '@instantsearch/widgets/virtual-search-box/virtual-search-box'
import { VirtualStateResults } from '@instantsearch/widgets/virtual-state-results/virtual-state-results'
import { VirtualStats } from '@instantsearch/widgets/virtual-stats/virtual-stats'

import { configAtom } from '@/config/config'
import { useDeepCompareCallback } from '@/hooks/useDeepCompareCallback'
import { useDeepCompareEffect } from '@/hooks/useDeepCompareEffect'
import { useSearchClient } from '@/hooks/useSearchClient'
import { isObjectEmpty } from '@/utils/isObjectEmpty'
import { scrollToTop } from '@/utils/scrollToTop'
import { createURL, searchStateToUrl, urlToSearchState } from '@/utils/url'

export type SearchState = Record<string, any>

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

export const initialSearchStateAtom = atom<SearchState | null>(null)
export const searchStateAtom = atom<SearchState>({})
export const searchQueryAtom = selectAtom<SearchState, string>(
  searchStateAtom,
  ({ query }) => query
)

function SearchComponent({
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
  const config = useAtomValue(configAtom)
  const router = useRouter()

  // Search client
  const defaultSearchClient = useSearchClient({
    appId,
    searchApiKey,
  })
  const searchClient = customSearchClient ?? defaultSearchClient

  // Search state
  const initialSearchState = isObjectEmpty(customInitialSearchState)
    ? urlToSearchState(router?.asPath.slice(1))
    : customInitialSearchState

  const [initialSearchStateFromAtom, setInitialSearchState] = useAtom(
    initialSearchStateAtom
  )
  const [searchState, setSearchState] = useAtom(searchStateAtom)

  useEffect(() => {
    if (!initialSearchStateFromAtom) setInitialSearchState(initialSearchState)
    setSearchState(initialSearchState)
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  // Update router url
  const updateRouterUrl = useCallback(
    (nextSearchState: SearchState) => {
      const newRoute = searchStateToUrl(nextSearchState)
      if (router.asPath !== newRoute) {
        router.push(newRoute, undefined, {
          shallow: true,
        })
      }
    },
    [router?.asPath] // eslint-disable-line react-hooks/exhaustive-deps
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
  }, [router?.events, setSearchState])

  // Listen for InstantSearch state changes
  const onSearchStateChange = useDeepCompareCallback(
    (nextSearchState: SearchState) => {
      setSearchState(nextSearchState)
      updateRouterUrl(nextSearchState)
    },
    [setSearchState, updateRouterUrl]
  )

  useDeepCompareEffect(() => {
    updateRouterUrl(searchState)
  }, [updateRouterUrl, searchState])

  // Scroll to top if query is updated
  useEffect(() => {
    if (router.route === '/search') {
      scrollToTop('smooth')
    }
  }, [searchState.query, router?.route])

  return (
    <InstantSearch
      searchClient={searchClient}
      indexName={indexName}
      resultsState={resultsState}
      searchState={searchState}
      createURL={customCreateURL ?? createURL}
      onSearchStateChange={customOnSearchStateChange ?? onSearchStateChange}
      {...props}
    >
      <Configure {...config.searchParameters} />

      <VirtualSearchBox />
      <VirtualStateResults />
      <VirtualStats />

      {children}
    </InstantSearch>
  )
}

export const Search = memo(SearchComponent, isEqual)
