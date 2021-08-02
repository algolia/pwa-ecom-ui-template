import type { SearchClient } from 'algoliasearch/lite'
import { useMemo } from 'react'

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
  const { searchClient: searchClientContext, query: initialQuery } =
    useSearchContext()

  const searchClient = customSearchClient ?? searchClientContext

  const recentSearches = useMemo(() => recentSearchesPlugin(), [])

  const plugins = useMemo(
    () => [
      ...customPlugins,
      recentSearches,
      popularSearchesPlugin(searchClient, recentSearches),
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
      placeholders,
      placeholderWordDelay,
      placeholderLetterDelay,
    ]
  )

  return (
    <Autocomplete plugins={plugins} initialQuery={initialQuery} {...props} />
  )
}
