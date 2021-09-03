import type { SearchClient } from 'algoliasearch/lite'
import { useAtomValue } from 'jotai/utils'
import { useRouter } from 'next/router'
import { useCallback, useMemo } from 'react'

import type { AutocompleteProps } from '@autocomplete/_default/autocomplete'
import { Autocomplete } from '@autocomplete/_default/autocomplete'
import { popularSearchesPluginCreator } from '@autocomplete/plugins/popular-searches/popular-searches'
import { recentSearchesPluginCreator } from '@autocomplete/plugins/recent-searches'
import { searchButtonPluginCreator } from '@autocomplete/plugins/search-button'
import { voiceCameraIconsPluginCreator } from '@autocomplete/plugins/voice-camera-icons'

import { searchAtom } from '@/components/@instantsearch/search'
import { createAnimatedPlaceholderPlugin } from '@/lib/autocomplete/plugins/createAnimatedPlaceholderPlugin'
import { createClearLeftPlugin } from '@/lib/autocomplete/plugins/createClearLeftPlugin'

export type AutocompleteBasicProps = AutocompleteProps & {
  searchClient?: SearchClient
  placeholders?: string[]
  placeholderWordDelay?: number
  placeholderLetterDelay?: number
}

export function AutocompleteBasic({
  searchClient: customSearchClient,
  placeholders = [],
  placeholderWordDelay,
  placeholderLetterDelay,
  plugins: customPlugins = [],
  ...props
}: AutocompleteBasicProps) {
  const router = useRouter()
  const { searchClient: searchClientContext, initialQuery } =
    useAtomValue(searchAtom)

  const searchClient = customSearchClient ?? searchClientContext!

  const goToSearchPage = useCallback(
    (query: string) => router.push(`/search?query=${query}`),
    [router]
  )

  const recentSearches = useMemo(
    () =>
      recentSearchesPluginCreator({
        onSelect({ item }) {
          goToSearchPage(item.label)
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
          goToSearchPage(item.query)
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
          goToSearchPage(state.query)
        },
      }),
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

  const onSubmit = useCallback(
    ({ state }) => {
      goToSearchPage(state.query)
    },
    [goToSearchPage]
  )

  return (
    <Autocomplete
      plugins={plugins}
      initialQuery={initialQuery}
      onSubmit={onSubmit}
      {...props}
    />
  )
}
