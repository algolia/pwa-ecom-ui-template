import type { SearchClient } from 'algoliasearch/lite'
import { useCallback, useMemo } from 'react'
import type { InstantSearchProps } from 'react-instantsearch-dom'

import VirtualSearchBox from '@/components/virtual-search-box/virtual-search-box'
import { useSearchContext } from '@/hooks/useSearchContext'
import createAnimatedPlaceholderPlugin from '@/lib/autocomplete/plugins/createAnimatedPlaceholderPlugin'
import createCloseLeftPlugin from '@/lib/autocomplete/plugins/createCloseLeftPlugin'

import type { AutocompleteProps } from './autocomplete'
import Autocomplete from './autocomplete'

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
      createCloseLeftPlugin(),
    ],
    [customPlugins, placeholders, placeholderWordDelay, placeholderLetterDelay]
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
      hidePanel={true}
      onSubmit={onSubmit}
      onReset={onReset}
      {...props}
    >
      <VirtualSearchBox />
    </Autocomplete>
  )
}
