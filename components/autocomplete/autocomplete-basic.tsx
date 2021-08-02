import type { SearchClient } from 'algoliasearch/lite'
import { useCallback, useMemo } from 'react'
import type { InstantSearchProps } from 'react-instantsearch-dom'

import VirtualSearchBox from '@/components/virtual-search-box/virtual-search-box'
import { useSearchContext } from '@/hooks/useSearchContext'
import createAnimatedPlaceholderPlugin from '@/lib/autocomplete/plugins/createAnimatedPlaceholderPlugin'
import createCloseLeftPlugin from '@/lib/autocomplete/plugins/createCloseLeftPlugin'

import type { AutocompleteProps } from './autocomplete'
import Autocomplete from './autocomplete'
import popularSearchesPlugin from './plugins/popular-searches'
import recentSearchesPlugin from './plugins/recent-searches'

export interface AutocompleteBasicProps extends AutocompleteProps {
  searchClient?: SearchClient
  placeholders?: string[]
  placeholderWordDelay?: number
  placeholderLetterDelay?: number
}

export default function AutocompleteBasic({
  searchClient: customSearchClient,
  placeholders = [],
  placeholderWordDelay,
  placeholderLetterDelay,
  plugins: customPlugins = [],
  ...props
}: AutocompleteBasicProps): JSX.Element {
  const {
    searchClient: searchClientContext,
    query: initialQuery,
    setSearchState,
  } = useSearchContext()

  const searchClient = customSearchClient ?? searchClientContext

  const recentSearches = useMemo(
    () => recentSearchesPlugin(setSearchState),
    [setSearchState]
  )

  const plugins = useMemo(
    () => [
      ...customPlugins,
      recentSearches,
      popularSearchesPlugin(searchClient, recentSearches, setSearchState),
      createAnimatedPlaceholderPlugin({
        placeholders,
        placeholderTemplate: (currentPlaceholder: string) =>
          `Search ${currentPlaceholder}`,
        wordDelay: placeholderWordDelay,
        letterDelay: placeholderLetterDelay,
      }),
      createCloseLeftPlugin(),
    ],
    [
      customPlugins,
      searchClient,
      recentSearches,
      setSearchState,
      placeholders,
      placeholderWordDelay,
      placeholderLetterDelay,
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

  return (
    <Autocomplete
      plugins={plugins}
      initialQuery={initialQuery}
      onSubmit={onSubmit}
      onReset={onReset}
      {...props}
    >
      <VirtualSearchBox />
    </Autocomplete>
  )
}
