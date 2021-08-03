import type { SearchClient } from 'algoliasearch/lite'
import { useMemo } from 'react'

import { useSearchContext } from '@/hooks/useSearchContext'
import createAnimatedPlaceholderPlugin from '@/lib/autocomplete/plugins/createAnimatedPlaceholderPlugin'
import createClearLeftPlugin from '@/lib/autocomplete/plugins/createClearLeftPlugin'

import type { AutocompleteProps } from '../_default/autocomplete'
import Autocomplete from '../_default/autocomplete'
import popularSearchesPluginCreator from '../plugins/popular-searches'
import recentSearchesPluginCreator from '../plugins/recent-searches'
import searchButtonPluginCreator from '../plugins/search-button'
import voiceCameraIconsPluginCreator from '../plugins/voice-camera-icons'

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

  const recentSearches = useMemo(() => recentSearchesPluginCreator(), [])

  const plugins = useMemo(
    () => [
      ...customPlugins,
      recentSearches,
      popularSearchesPluginCreator(searchClient, recentSearches),
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
    [
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
