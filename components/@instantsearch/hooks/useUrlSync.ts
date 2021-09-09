import { atom, useAtom } from 'jotai'
import { selectAtom, useAtomValue } from 'jotai/utils'
import { useRouter } from 'next/router'
import { useCallback, useEffect, useMemo } from 'react'
import isEqual from 'react-fast-compare'
import type { SearchState } from 'react-instantsearch-core'

import {
  searchStateToUrl,
  urlToSearchState,
  createURL,
} from '@instantsearch/utils/url'

import { autocompleteAtom } from '@/components/@autocomplete/_default/autocomplete'
import { useDebouncedCallback } from '@/hooks/useDebouncedCallback'
import { useDeepCompareEffect } from '@/hooks/useDeepCompareEffect'
import { isomorphicWindow } from '@/utils/browser'
import { scrollToTop } from '@/utils/scrollToTop'

// Atoms
export const searchStateAtom = atom<SearchState>(
  urlToSearchState(isomorphicWindow?.location.href)
)
export const searchQueryAtom = selectAtom<SearchState, string | undefined>(
  searchStateAtom,
  ({ query }) => query
)

export function useUrlSync() {
  // Router
  const router = useRouter()
  const isCatalogPage = useMemo(
    () => router?.route === '/catalog/[[...slugs]]',
    [router?.route]
  )

  // Internal search state
  const [searchState, setSearchState] = useAtom(searchStateAtom)

  // Push new route based on the search state
  const pushRoute = useCallback(
    (nextSearchState: SearchState) => {
      if (!isCatalogPage) return

      const newRoute = `/catalog${searchStateToUrl(nextSearchState)}`
      if (router.asPath !== newRoute) {
        router.push(newRoute, undefined, { shallow: true })
      }
    },
    [router?.asPath, router?.route] // eslint-disable-line react-hooks/exhaustive-deps
  )

  const debouncedPushRoute = useDebouncedCallback(pushRoute, 400)

  // Listen for route changes and update search state accordingly
  const autocomplete = useAtomValue(autocompleteAtom)
  useEffect(() => {
    const handleRouteChange = () => {
      const newSearchState = urlToSearchState(window.location.href)

      // Make sure search state has changed
      if (!isEqual(searchState, newSearchState)) {
        setSearchState(newSearchState)
        autocomplete?.setQuery(newSearchState.query ?? '')
      }
    }

    router.events.on('routeChangeComplete', handleRouteChange)

    return () => {
      router.events.off('routeChangeComplete', handleRouteChange)
    }
  }, [router?.events, setSearchState, searchState, autocomplete])

  // Sync internal search state with InstantSearch and push new route
  const onSearchStateChange = useCallback(
    (nextSearchState: SearchState) => {
      setSearchState(nextSearchState)
      debouncedPushRoute(nextSearchState)
    },
    [setSearchState, debouncedPushRoute]
  )

  // Push new route when search state changes
  useDeepCompareEffect(() => {
    debouncedPushRoute(searchState)
  }, [debouncedPushRoute, searchState])

  // Scroll to top when search query changes
  useEffect(() => {
    if (isCatalogPage) {
      scrollToTop('smooth')
    }
  }, [isCatalogPage, searchState.query])

  return {
    searchState,
    onSearchStateChange,
    createURL,
  }
}
