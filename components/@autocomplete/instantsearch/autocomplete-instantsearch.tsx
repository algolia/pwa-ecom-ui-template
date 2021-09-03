import type { OnStateChangeProps } from '@algolia/autocomplete-js'
import type { SearchClient } from 'algoliasearch/lite'
import { useAtomValue } from 'jotai/utils'
import { useCallback, useMemo } from 'react'
import type { InstantSearchProps } from 'react-instantsearch-dom'

import type { AutocompleteProps } from '@autocomplete/_default/autocomplete'
import { Autocomplete } from '@autocomplete/_default/autocomplete'
import { searchButtonPluginCreator } from '@autocomplete/plugins/search-button'
import { voiceCameraIconsPluginCreator } from '@autocomplete/plugins/voice-camera-icons'

import { searchAtom } from '@/components/@instantsearch/search'
import { createAnimatedPlaceholderPlugin } from '@/lib/autocomplete/plugins/createAnimatedPlaceholderPlugin'
import { createClearLeftPlugin } from '@/lib/autocomplete/plugins/createClearLeftPlugin'

export type AutocompleteInstantSearchProps = AutocompleteProps & {
  searchClient?: SearchClient
  placeholders?: string[]
  placeholderWordDelay?: number
  placeholderLetterDelay?: number
}

export function AutocompleteInstantSearch({
  placeholders = [],
  placeholderWordDelay,
  placeholderLetterDelay,
  plugins: customPlugins = [],
  ...props
}: AutocompleteInstantSearchProps) {
  const { setSearchState, initialQuery } = useAtomValue(searchAtom)

  const plugins = useMemo(
    () => [
      ...customPlugins,
      createAnimatedPlaceholderPlugin({
        placeholders,
        placeholderTemplate: (currentPlaceholder: string) =>
          `Search ${currentPlaceholder}`,
        wordDelay: placeholderWordDelay,
        letterDelay: placeholderLetterDelay,
      }),
      createClearLeftPlugin({ initialQuery }),
      voiceCameraIconsPluginCreator(),
      searchButtonPluginCreator({ initialQuery }),
    ],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [placeholders, placeholderWordDelay, placeholderLetterDelay]
  )

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

  const onSubmit = useCallback(
    ({ state }) => {
      updateSearchState({ query: state.query })
    },
    [updateSearchState]
  )

  const onStateChange = useCallback(
    ({ prevState, state }: OnStateChangeProps<any>) => {
      if (prevState.query !== state.query) {
        updateSearchState({ query: state.query })
      }
    },
    [updateSearchState]
  )

  return (
    <Autocomplete
      plugins={plugins}
      initialQuery={initialQuery}
      hidePanel={true}
      onSubmit={onSubmit}
      onStateChange={onStateChange}
      {...props}
    />
  )
}
