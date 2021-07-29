import type { BaseItem } from '@algolia/autocomplete-core'
import type { AutocompleteApi } from '@algolia/autocomplete-js'
import { autocomplete } from '@algolia/autocomplete-js'
import { createQuerySuggestionsPlugin } from '@algolia/autocomplete-plugin-query-suggestions'
import { createLocalStorageRecentSearchesPlugin } from '@algolia/autocomplete-plugin-recent-searches'
import type { SearchOptions } from '@algolia/client-search'
import type { SearchClient } from 'algoliasearch/lite'
import type { ReactElement } from 'react'
import { useState, createElement, Fragment, useEffect, useRef } from 'react'
import { render } from 'react-dom'

import Button from '@/components/button/button'
import VirtualSearchBox from '@/components/virtual-search-box/virtual-search-box'
import { useSearchContext } from '@/hooks/useSearchContext'
import { useTailwindScreens } from '@/hooks/useTailwindScreens'

import AutocompleteIcons from './autocomplete-icons'
import createAnimatedPlaceholderPlugin from './plugins/createAnimatedPlaceholderPlugin'
import createCloseLeftPlugin from './plugins/createCloseLeftPlugin'

export interface AutocompleteProps {
  container?: string | HTMLElement
  searchClient?: SearchClient
  placeholders?: string[]
  placeholderWordDelay?: number
  placeholderLetterDelay?: number
  children?: React.ReactNode
}

export default function Autocomplete({
  container: customContainer,
  searchClient: customSearchClient,
  placeholders = [],
  placeholderWordDelay,
  placeholderLetterDelay,
  children,
  ...props
}: AutocompleteProps): JSX.Element {
  const searchRef = useRef<AutocompleteApi<BaseItem>>()
  const containerRef = useRef<HTMLDivElement>(null)
  const panelContainerRef = useRef<HTMLDivElement>(null)

  const { query, searchClient: searchClientContext } = useSearchContext()
  const { laptop } = useTailwindScreens()
  const [queryEmpty, setQueryEmpty] = useState(true)

  const searchClient = customSearchClient ?? searchClientContext

  useEffect(() => {
    if (!containerRef.current || !panelContainerRef.current) {
      return undefined
    }

    const recentSearchesPlugin = createLocalStorageRecentSearchesPlugin({
      key: 'search',
      limit: 3,
      transformSource({ source }) {
        return {
          ...source,
          templates: {
            ...source.templates,
            header() {
              return (
                <>
                  <span className="aa-SourceHeaderTitle">Recent Searches</span>
                  <div className="aa-SourceHeaderLine" />
                </>
              )
            },
          },
        }
      },
    })

    const querySuggestionsPlugin = createQuerySuggestionsPlugin({
      searchClient,
      indexName: 'instant_search_demo_query_suggestions',
      categoryAttribute: [
        'instant_search',
        'facets',
        'exact_matches',
        'categories',
      ],
      getSearchParams() {
        return recentSearchesPlugin.data?.getAlgoliaSearchParams({
          hitsPerPage: 8,
        }) as SearchOptions
      },

      transformSource({ source }) {
        return {
          ...source,
          templates: {
            ...source.templates,
            header() {
              return (
                <>
                  <span className="aa-SourceHeaderTitle">Popular Searches</span>
                  <div className="aa-SourceHeaderLine" />
                </>
              )
            },
          },
        }
      },
    })

    const plugins = [
      recentSearchesPlugin,
      querySuggestionsPlugin,
      createAnimatedPlaceholderPlugin({
        placeholders,
        placeholderTemplate: (currentPlaceholder: string) =>
          `Search ${currentPlaceholder}`,
        wordDelay: placeholderWordDelay,
        letterDelay: placeholderLetterDelay,
      }),
      createCloseLeftPlugin(),
    ]

    searchRef.current = autocomplete({
      container: customContainer ?? containerRef.current,
      panelContainer: panelContainerRef.current,
      panelPlacement: 'full-width',
      detachedMediaQuery: '(max-width: 1439px)',
      openOnFocus: true,
      initialState: {
        query,
      },
      classNames: {
        root: 'Root',
        form: 'Form',
        input: 'Input',
        submitButton: 'SubmitButton',
        loadingIndicator: 'LoadingIndicator',
        label: 'Label',
        panel: 'Panel',
        detachedSearchButton: 'DetachedSearchButton',
        detachedSearchButtonIcon: 'DetachedSearchButtonIcon',
        detachedSearchButtonPlaceholder: 'DetachedSearchButtonPlaceholder',
      },
      onStateChange({ state }) {
        setQueryEmpty(!state.query)
      },
      renderer: { createElement, Fragment },
      render({ children: acChildren }, root) {
        render(acChildren as ReactElement, root)
      },
      plugins,
      ...props,
    })

    return () => {
      searchRef.current?.destroy()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [customContainer])

  return (
    <>
      <VirtualSearchBox />

      <div className="w-full h-full flex items-center" ref={containerRef}>
        {laptop && <AutocompleteIcons />}
        {!queryEmpty && (
          <div className="absolute right-0 z-10 h-full pr-2 pt-2 pb-2">
            <Button type="tertiary" className="h-full">
              Search
            </Button>
          </div>
        )}
      </div>
      <div className="absolute w-full" ref={panelContainerRef}></div>

      {children}
    </>
  )
}
