import type {
  AutocompleteState,
  OnStateChangeProps,
} from '@algolia/autocomplete-js'
import type { SearchClient } from 'algoliasearch/lite'
import { atom } from 'jotai'
import { useAtomValue, useUpdateAtom } from 'jotai/utils'
import { useRouter } from 'next/router'
import { memo, useCallback, useEffect, useMemo } from 'react'
import type { SearchState } from 'react-instantsearch-core'

import type { AutocompleteProps } from '@autocomplete/_default/autocomplete'
import { Autocomplete } from '@autocomplete/_default/autocomplete'
import { popularSearchesPluginCreator } from '@autocomplete/plugins/popular-searches/popular-searches'
import { recentSearchesPluginCreator } from '@autocomplete/plugins/recent-searches'
import { searchButtonPluginCreator } from '@autocomplete/plugins/search-button'
import { voiceCameraIconsPluginCreator } from '@autocomplete/plugins/voice-camera-icons'

import { searchStateAtom } from '@/components/@instantsearch/hooks/useUrlSync'
import { configAtom } from '@/config/config'
import { useDebouncedCallback } from '@/hooks/useDebouncedCallback'
import { createAnimatedPlaceholderPlugin } from '@/lib/autocomplete/plugins/createAnimatedPlaceholderPlugin'
import { createClearLeftPlugin } from '@/lib/autocomplete/plugins/createClearLeftPlugin'
import { createFocusBlurPlugin } from '@/lib/autocomplete/plugins/createFocusBlurPlugin'
import { isomorphicWindow } from '@/utils/browser'

export type AutocompleteBasicProps = AutocompleteProps & {
  searchClient: SearchClient
  placeholders?: string[]
  placeholderWordDelay?: number
  placeholderLetterDelay?: number
  onSelect?: (query: string) => void
  onFocusBlur?: (isFocused: boolean) => void
}

export const autocompleteStateAtom = atom<AutocompleteState<any> | null>(null)

function AutocompleteBasicComponent({
  searchClient,
  initialQuery,
  placeholders = [],
  placeholderWordDelay,
  placeholderLetterDelay,
  plugins: customPlugins = [],
  onSelect,
  onFocusBlur,
  ...props
}: AutocompleteBasicProps) {
  const router = useRouter()
  const isHomePage = useMemo(() => router?.pathname === '/', [router?.pathname])
  const { autocomplete: autocompleteConfig } = useAtomValue(configAtom)

  const _setSearchState = useUpdateAtom(searchStateAtom)

  const setSearchState = useDebouncedCallback(
    (nextSearchState: SearchState) => {
      _setSearchState((currentSearchState: SearchState) => ({
        ...currentSearchState,
        ...nextSearchState,
        page: 1,
      }))
    },
    autocompleteConfig.debouncing
  )

  const recentSearchesPlugin = useMemo(
    () =>
      recentSearchesPluginCreator({
        onSelect({ item }) {
          if (typeof onSelect === 'function') onSelect(item.label)
        },
      }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  )

  const animatedPlaceholderPlugin = useMemo(
    () =>
      createAnimatedPlaceholderPlugin({
        enabled: isHomePage,
        placeholders,
        placeholderTemplate: (currentPlaceholder: string) =>
          `Search ${currentPlaceholder}`,
        wordDelay: placeholderWordDelay,
        letterDelay: placeholderLetterDelay,
      }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [placeholders, placeholderWordDelay, placeholderLetterDelay]
  )

  useEffect(() => {
    animatedPlaceholderPlugin.data!.enabled = isHomePage
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isHomePage])

  const plugins = useMemo(
    () => [
      ...customPlugins,
      recentSearchesPlugin,
      popularSearchesPluginCreator({
        searchClient,
        recentSearchesPlugin,
        onSelect({ item }) {
          if (typeof onSelect === 'function') onSelect(item.query)
        },
      }),
      animatedPlaceholderPlugin,
      createClearLeftPlugin({ initialQuery }),
      voiceCameraIconsPluginCreator(),
      searchButtonPluginCreator({
        initialQuery,
        onClick({ state }) {
          if (typeof onSelect === 'function') onSelect(state.query)
        },
      }),
      createFocusBlurPlugin({
        onFocusBlur,
      }),
    ],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [
      searchClient,
      initialQuery,
      recentSearchesPlugin,
      animatedPlaceholderPlugin,
    ]
  )

  const onSubmit = useCallback(
    ({ state }) => {
      if (typeof onSelect === 'function') onSelect(state.query)
    },
    [onSelect]
  )

  const setAutocompleteState = useUpdateAtom(autocompleteStateAtom)
  useEffect(() => {
    if (initialQuery)
      setAutocompleteState({ query: initialQuery } as AutocompleteState<any>)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const onStateChange = useCallback(
    ({ prevState, state }: OnStateChangeProps<any>) => {
      setAutocompleteState(state)

      if (
        prevState.query !== state.query &&
        typeof state.query !== 'undefined'
      ) {
        const isDetached = isomorphicWindow?.matchMedia(
          autocompleteConfig.detachedMediaQuery
        ).matches

        if (!isDetached) setSearchState({ query: state.query })
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  )

  return (
    <Autocomplete
      initialQuery={initialQuery}
      plugins={plugins}
      detachedMediaQuery={autocompleteConfig.detachedMediaQuery}
      onSubmit={onSubmit}
      onStateChange={onStateChange}
      {...props}
    />
  )
}

export const AutocompleteBasic = memo(AutocompleteBasicComponent)
