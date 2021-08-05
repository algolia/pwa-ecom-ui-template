import type { OnStateChangeProps } from '@algolia/autocomplete-js'
import type { SearchClient } from 'algoliasearch/lite'
import { useCallback, useMemo } from 'react'
import type { InstantSearchProps } from 'react-instantsearch-dom'

import VirtualSearchBox from '@/components/@instantsearch/virtual-search-box/virtual-search-box'
import { useSearchContext } from '@/hooks/useSearchContext'
import createAnimatedPlaceholderPlugin from '@/lib/autocomplete/plugins/createAnimatedPlaceholderPlugin'
import createClearLeftPlugin from '@/lib/autocomplete/plugins/createClearLeftPlugin'

import type { AutocompleteProps } from '../_default/autocomplete'
import Autocomplete from '../_default/autocomplete'
import searchButtonPluginCreator from '../plugins/search-button'
import voiceCameraIconsPluginCreator from '../plugins/voice-camera-icons'

export interface AutocompleteInstantSearchProps extends AutocompleteProps {
  searchClient?: SearchClient
  placeholders?: string[]
  placeholderWordDelay?: number
  placeholderLetterDelay?: number
}

export default function AutocompleteInstantSearch({
  searchClient: customSearchClient,
  placeholders = [],
  placeholderWordDelay,
  placeholderLetterDelay,
  plugins: customPlugins = [],
  ...props
}: AutocompleteInstantSearchProps): JSX.Element {
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
      searchButtonPluginCreator(),
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

  const onReset = useCallback(() => {
    setSearchState((currentSearchState: InstantSearchProps['searchState']) => ({
      ...currentSearchState,
      query: '',
      page: 1,
    }))
  }, [setSearchState])

  const onStateChange = useCallback(
    ({ prevState, state }: OnStateChangeProps<any>) => {
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
      onReset={onReset}
      onStateChange={onStateChange}
      {...props}
    >
      <VirtualSearchBox />
    </Autocomplete>
  )
}
