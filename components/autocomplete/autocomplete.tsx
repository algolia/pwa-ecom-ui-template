import { autocomplete } from '@algolia/autocomplete-js'
import { createQuerySuggestionsPlugin } from '@algolia/autocomplete-plugin-query-suggestions'
import type { SearchClient } from 'algoliasearch/lite'
import type { ReactElement } from 'react'
import {
  createElement,
  Fragment,
  useCallback,
  useEffect,
  useMemo,
  useRef,
} from 'react'
import { render } from 'react-dom'
import type { InstantSearchProps } from 'react-instantsearch-dom'

import VirtualSearchBox from '@/components/virtual-search-box/virtual-search-box'
import { useSearchContext } from '@/hooks/useSearchContext'
import debounce from '@/utils/debounce'

import Placeholder from './placeholder'

export interface AutocompleteProps {
  container?: string | HTMLElement
  searchClient?: SearchClient
  placeholders?: string[]
  placeholderWordDelay?: number
  placeholderLetterDelay?: number
}

export default function Autocomplete({
  container: customContainer,
  searchClient: customSearchClient,
  placeholders,
  placeholderWordDelay,
  placeholderLetterDelay,
  ...props
}: AutocompleteProps): JSX.Element {
  const containerRef = useRef<HTMLDivElement>(null)

  const {
    query,
    setSearchState,
    searchClient: searchClientContext,
  } = useSearchContext()

  const debouncedSetSearchState = useMemo(
    () => debounce(setSearchState, 300),
    [setSearchState]
  )

  const searchClient = customSearchClient ?? searchClientContext

  const onSubmit = useCallback(
    ({ state }) => {
      debouncedSetSearchState(
        (currentSearchState: InstantSearchProps['searchState']) => ({
          ...currentSearchState,
          query: state.query,
        })
      )
    },
    [debouncedSetSearchState]
  )

  const onReset = useCallback(() => {
    debouncedSetSearchState(
      (currentSearchState: InstantSearchProps['searchState']) => ({
        ...currentSearchState,
        query: '',
      })
    )
  }, [debouncedSetSearchState])

  const plugins = useMemo(
    () => [
      createQuerySuggestionsPlugin({
        searchClient,
        indexName: 'instant_search_demo_query_suggestions',
      }),
    ],
    [searchClient]
  )

  useEffect(() => {
    if (!containerRef.current) {
      return undefined
    }

    let container = customContainer ?? containerRef.current
    if (customContainer && typeof customContainer === 'string') {
      container = document.querySelector(customContainer) as HTMLElement
    }

    const search = autocomplete({
      container,
      placeholder: '',
      renderer: { createElement, Fragment },
      render({ children }, root) {
        render(children as ReactElement, root)
      },
      openOnFocus: true,
      initialState: {
        query,
      },
      onStateChange({ prevState, state }) {
        if (prevState.query !== state.query) {
          onSubmit({ state })
        }
      },
      onSubmit,
      onReset,
      plugins,
      ...props,
    })

    return (): void => {
      search.destroy()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [customContainer])

  return (
    <>
      <VirtualSearchBox />
      {containerRef.current && (
        <Placeholder
          placeholders={placeholders}
          autocompleteContainer={containerRef.current}
          wordDelay={placeholderWordDelay}
          letterDelay={placeholderLetterDelay}
        />
      )}
      <div className="w-full h-full" ref={containerRef} />
    </>
  )
}
