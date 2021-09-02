import type { SearchClient } from 'algoliasearch/lite'
import { atom, Provider } from 'jotai'
import { useAtomValue, useUpdateAtom } from 'jotai/utils'
import { useRouter } from 'next/router'
import type { Dispatch } from 'react'
import { memo, useCallback, useEffect } from 'react'
import isEqual from 'react-fast-compare'
import type { InstantSearchProps } from 'react-instantsearch-dom'
import { Configure, InstantSearch } from 'react-instantsearch-dom'

import { StateResults } from '@instantsearch/widgets/state-results/state-results'
import { VirtualSearchBox } from '@instantsearch/widgets/virtual-search-box/virtual-search-box'

import { configAtom } from '@/config/config'
import { useDeepCompareCallback } from '@/hooks/useDeepCompareCallback'
import { useDeepCompareEffect } from '@/hooks/useDeepCompareEffect'
import { useDeepCompareState } from '@/hooks/useDeepCompareSetState'
import { useScrollToTop } from '@/hooks/useScrollToTop'
import { useSearchClient } from '@/hooks/useSearchClient'
import { createInitialValues } from '@/utils/createInitialValues'
import { isObjectEmpty } from '@/utils/isObjectEmpty'
import { createURL, searchStateToUrl, urlToSearchState } from '@/utils/url'

export type SearchProps = {
  children: React.ReactNode
  appId: string
  searchApiKey: string
  indexName: string
  searchClient?: SearchClient
  resultsState?: InstantSearchProps['resultsState']
  searchState?: InstantSearchProps['searchState']
  onSearchStateChange?: InstantSearchProps['onSearchStateChange']
  createURL?: InstantSearchProps['createURL']
}

export type SearchAtomValue = {
  initialQuery: string
  setSearchState: Dispatch<InstantSearchProps['searchState']>
  searchClient: SearchClient
}

export const searchAtom = atom<SearchAtomValue>({} as SearchAtomValue)

export const Search = memo(function Search({
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
  const defaultSearchClient = useSearchClient({
    appId,
    searchApiKey,
  })
  const searchClient = customSearchClient ?? defaultSearchClient

  // Search state
  const initialSearchState = isObjectEmpty(customInitialSearchState)
    ? urlToSearchState(router?.asPath.slice(1))
    : customInitialSearchState

  const [searchState, setSearchState] =
    useDeepCompareState<InstantSearchProps['searchState']>(initialSearchState)

  // Update router url
  const updateRouterUrl = useCallback(
    (nextSearchState: InstantSearchProps['searchState']) => {
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
    (nextSearchState: InstantSearchProps['searchState']): void => {
      setSearchState(nextSearchState)
      updateRouterUrl(nextSearchState)
    },
    [setSearchState, updateRouterUrl]
  )

  useDeepCompareEffect(() => {
    updateRouterUrl(searchState)
  }, [updateRouterUrl, searchState])

  useScrollToTop([searchState.query])

  // Search atom
  const setSearch = useUpdateAtom(searchAtom)

  useEffect(() => {
    setSearch({
      initialQuery: initialSearchState?.query,
      setSearchState,
      searchClient,
    })
  }, [setSearch, initialSearchState?.query, setSearchState, searchClient])

  const { get, set } = createInitialValues()
  set(searchAtom, {
    initialQuery: initialSearchState?.query,
    setSearchState,
    searchClient,
  })

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
      <Provider initialValues={get()}>
        <Configure {...config.searchParameters} />
        <VirtualSearchBox />
        <StateResults />

        {children}
      </Provider>
    </InstantSearch>
  )
},
isEqual)
