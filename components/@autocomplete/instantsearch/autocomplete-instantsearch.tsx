import type { OnStateChangeProps } from '@algolia/autocomplete-js'
import type { SearchClient } from 'algoliasearch/lite'
import { useCallback, useMemo } from 'react'
import type { InstantSearchProps } from 'react-instantsearch-dom'

import type { AutocompleteProps } from '../_default/autocomplete'
import { Autocomplete } from '../_default/autocomplete'
import { searchButtonPluginCreator } from '../plugins/search-button'
import { voiceCameraIconsPluginCreator } from '../plugins/voice-camera-icons'

import { useSearchContext } from '@/hooks/useSearchContext'
import { createAnimatedPlaceholderPlugin } from '@/lib/autocomplete/plugins/createAnimatedPlaceholderPlugin'
import { createClearLeftPlugin } from '@/lib/autocomplete/plugins/createClearLeftPlugin'

export type AutocompleteInstantSearchProps = AutocompleteProps & {
  searchClient?: SearchClient
  placeholders?: string[]
  placeholderWordDelay?: number
  placeholderLetterDelay?: number
}

export function AutocompleteInstantSearch({
  searchClient: customSearchClient,
  placeholders = [],
  placeholderWordDelay,
  placeholderLetterDelay,
  plugins: customPlugins = [],
  ...props
}: AutocompleteInstantSearchProps) {
  const { query: initialQuery, setSearchState } = useSearchContext()

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

  const onSubmit = useCallback(
    ({ state }) => {
      setSearchState(
        (currentSearchState: InstantSearchProps['searchState']) => ({
          ...currentSearchState,
          query: state.query,
          page: 1,
        })
      )
    },
    [setSearchState]
  )

  const onStateChange = useCallback(
    (stateChangeProps: OnStateChangeProps<any>) => {
      const prevState = stateChangeProps.prevState
      const state = stateChangeProps.state
      if (prevState.query !== state.query) {
        setSearchState(
          (currentSearchState: InstantSearchProps['searchState']) => ({
            ...currentSearchState,
            query: state.query,
            page: 1,
          })
        )
      }
    },
    [setSearchState]
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
