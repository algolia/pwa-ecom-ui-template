import type { SearchClient } from 'algoliasearch/lite'
import { atom, Provider } from 'jotai'
import { useUpdateAtom } from 'jotai/utils'
import { useRouter } from 'next/dist/client/router'
import type { Dispatch } from 'react'
import { memo, useCallback, useEffect, useState } from 'react'
import isEqual from 'react-fast-compare'
import type { InstantSearchProps } from 'react-instantsearch-dom'
import { InstantSearch } from 'react-instantsearch-dom'

import { VirtualSearchBox } from '@instantsearch/_widgets/virtual-search-box/virtual-search-box'

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
      useState<InstantSearchProps['searchState']>(initialSearchState)

    // Update router url
    const updateRouterUrl = useCallback(
      (nextSearchState: InstantSearchProps['searchState']) => {
        const newRoute = searchStateToUrl(nextSearchState)
        router.push(newRoute, undefined, {
          shallow: true,
        })
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
      (nextSearchState: InstantSearchProps['searchState']): void => {
        setSearchState(nextSearchState)
        updateRouterUrl(nextSearchState)
      },
      [setSearchState, updateRouterUrl]
    )

    useEffect(() => {
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
          {children}
          <VirtualSearchBox />
        </Provider>
      </InstantSearch>
    )
  },
  (prevProps, nextProps) => isEqual(prevProps, nextProps)
)
