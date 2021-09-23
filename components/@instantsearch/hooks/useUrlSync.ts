import { atom } from 'jotai'
import { selectAtom, useAtomValue } from 'jotai/utils'
import { useRouter } from 'next/router'
import { useCallback, useEffect, useMemo } from 'react'
import type { SearchState } from 'react-instantsearch-core'

import {
  searchStateToUrl,
  urlToSearchState,
  createURL,
} from '@instantsearch/utils/url'

import { autocompleteAtom } from '@/components/@autocomplete/_default/autocomplete'
import { autocompleteStateAtom } from '@/components/@autocomplete/basic/autocomplete-basic'
import { configAtom } from '@/config/config'
import { useDebouncedCallback } from '@/hooks/useDebouncedCallback'
import { useDeepCompareEffect } from '@/hooks/useDeepCompareEffect'
import { useDeepUpdateAtom } from '@/hooks/useDeepUpdateAtom'
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
    () => router?.pathname === '/catalog/[[...slugs]]',
    [router?.pathname]
  )

  // Internal search state
  const [searchState, _setSearchState] = useDeepUpdateAtom(searchStateAtom)

  const setSearchState = useCallback(
    (nextSearchState: SearchState) =>
      _setSearchState((currentSearchState) => ({
        ...currentSearchState,
        ...nextSearchState,
      })),
    [_setSearchState]
  )

  // Push new route based on the search state
  const pushRoute = useCallback(
    (nextSearchState: SearchState) => {
      if (!isCatalogPage) return

      const newRoute = `/catalog${searchStateToUrl(nextSearchState)}`
      if (router.asPath !== newRoute) {
        router.push(newRoute, newRoute, { shallow: true })
      }
    },
    [router?.asPath] // eslint-disable-line react-hooks/exhaustive-deps
  )

  const { url: urlConfig } = useAtomValue(configAtom)
  const debouncedPushRoute = useDebouncedCallback(
    pushRoute,
    urlConfig.debouncing
  )

  // Listen for route changes and update search state accordingly
  const autocomplete = useAtomValue(autocompleteAtom)
  const autocompleteState = useAtomValue(autocompleteStateAtom)
  useEffect(() => {
    const handleRouteChange = () => {
      const newSearchState = urlToSearchState(window.location.href)
      setSearchState(newSearchState)

      if (!newSearchState.query) {
        autocomplete?.setQuery('')
      }
    }

    router.events.on('routeChangeComplete', handleRouteChange)

    return () => {
      router.events.off('routeChangeComplete', handleRouteChange)
    }
  }, [router?.events, setSearchState, autocomplete, autocompleteState?.query])

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
