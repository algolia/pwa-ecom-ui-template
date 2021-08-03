import type { OnStateChangeProps } from '@algolia/autocomplete-js'
import type { SearchClient } from 'algoliasearch/lite'
import { useCallback, useMemo } from 'react'
import type { InstantSearchProps } from 'react-instantsearch-dom'

import VirtualSearchBox from '@/components/virtual-search-box/virtual-search-box'
import { useSearchContext } from '@/hooks/useSearchContext'
import createAnimatedPlaceholderPlugin from '@/lib/autocomplete/plugins/createAnimatedPlaceholderPlugin'
import createCloseLeftPlugin from '@/lib/autocomplete/plugins/createCloseLeftPlugin'

import type { AutocompleteProps } from './autocomplete'
import Autocomplete from './autocomplete'
import searchButtonPluginCreator from './plugins/search-button'
import voiceCameraIconsPluginCreator from './plugins/voice-camera-icons'

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
      createCloseLeftPlugin({ initialQuery }),
      voiceCameraIconsPluginCreator(),
      searchButtonPluginCreator(),
    ],
    [
      customPlugins,
      placeholders,
      placeholderWordDelay,
      placeholderLetterDelay,
      initialQuery,
    ]
  )

  const onSubmit = useCallback(
    ({ state }) => {
      setSearchState(
        (currentSearchState: InstantSearchProps['searchState']) => ({
          ...currentSearchState,
          query: state.query,
        })
      )
    },
    [setSearchState]
  )

  const onReset = useCallback(() => {
    setSearchState((currentSearchState: InstantSearchProps['searchState']) => ({
      ...currentSearchState,
      query: '',
    }))
  }, [setSearchState])

  const onStateChange = useCallback(
    ({ prevState, state }: OnStateChangeProps<any>) => {
      if (prevState.query !== state.query) {
        setSearchState(
          (currentSearchState: InstantSearchProps['searchState']) => ({
            ...currentSearchState,
            query: state.query,
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
