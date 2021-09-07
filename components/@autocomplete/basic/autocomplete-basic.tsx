import type { OnStateChangeProps } from '@algolia/autocomplete-js'
import type { SearchClient } from 'algoliasearch/lite'
import { useUpdateAtom } from 'jotai/utils'
import { memo, useCallback, useMemo } from 'react'
import type { InstantSearchProps } from 'react-instantsearch-core'

import type { AutocompleteProps } from '@autocomplete/_default/autocomplete'
import { Autocomplete } from '@autocomplete/_default/autocomplete'
import { popularSearchesPluginCreator } from '@autocomplete/plugins/popular-searches/popular-searches'
import { recentSearchesPluginCreator } from '@autocomplete/plugins/recent-searches'
import { searchButtonPluginCreator } from '@autocomplete/plugins/search-button'
import { voiceCameraIconsPluginCreator } from '@autocomplete/plugins/voice-camera-icons'

import { searchStateAtom } from '@/components/@instantsearch/search'
import { createAnimatedPlaceholderPlugin } from '@/lib/autocomplete/plugins/createAnimatedPlaceholderPlugin'
import { createClearLeftPlugin } from '@/lib/autocomplete/plugins/createClearLeftPlugin'
import { createFocusBlurPlugin } from '@/lib/autocomplete/plugins/createFocusBlurPlugin'

export type AutocompleteBasicProps = AutocompleteProps & {
  searchClient: SearchClient
  placeholders?: string[]
  placeholderWordDelay?: number
  placeholderLetterDelay?: number
  onSelect?: (query: string) => void
  onFocusBlur?: (isFocused: boolean) => void
}

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
  const setSearchState = useUpdateAtom(searchStateAtom)

  const updateSearchState = useCallback(
    (nextSearchState: InstantSearchProps['searchState']) => {
      setSearchState(
        (currentSearchState: InstantSearchProps['searchState']) => ({
          ...currentSearchState,
          ...nextSearchState,
          page: 1,
        })
      )
    },
    [setSearchState]
  )

  const recentSearches = useMemo(
    () =>
      recentSearchesPluginCreator({
        onSelect({ item }) {
          if (typeof onSelect === 'function') onSelect(item.label)
        },
      }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  )

  const plugins = useMemo(
    () => [
      ...customPlugins,
      recentSearches,
      popularSearchesPluginCreator({
        searchClient,
        recentSearches,
        onSelect({ item }) {
          if (typeof onSelect === 'function') onSelect(item.query)
        },
      }),
      createAnimatedPlaceholderPlugin({
        placeholders,
        placeholderTemplate: (currentPlaceholder: string) =>
          `Search ${currentPlaceholder}`,
        wordDelay: placeholderWordDelay,
        letterDelay: placeholderLetterDelay,
      }),
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
      recentSearches,
      placeholders,
      placeholderWordDelay,
      placeholderLetterDelay,
    ]
  )

  const onSubmit = useCallback(
    ({ state }) => {
      if (typeof onSelect === 'function') onSelect(state.query)
    },
    [onSelect]
  )

  const onStateChange = useCallback(
    ({ prevState, state }: OnStateChangeProps<any>) => {
      if (
        prevState.query !== state.query &&
        typeof state.query !== 'undefined'
      ) {
        updateSearchState({ query: state.query })
      }
    },
    [updateSearchState]
  )

  return (
    <Autocomplete
      plugins={plugins}
      initialQuery={initialQuery}
      onSubmit={onSubmit}
      onStateChange={onStateChange}
      {...props}
    />
  )
}

export const AutocompleteBasic = memo(AutocompleteBasicComponent)
