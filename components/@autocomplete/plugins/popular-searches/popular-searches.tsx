import type { OnSelectParams } from '@algolia/autocomplete-core'
import { createQuerySuggestionsPlugin } from '@algolia/autocomplete-plugin-query-suggestions'
import type { AutocompleteQuerySuggestionsHit } from '@algolia/autocomplete-plugin-query-suggestions/dist/esm/types'
import type { createLocalStorageRecentSearchesPlugin } from '@algolia/autocomplete-plugin-recent-searches'
import type { SearchOptions } from '@algolia/client-search'
import type { SearchClient } from 'algoliasearch/lite'

import { indexName, querySuggestionsIndexName } from '@/utils/env'

type PopularSearchesPluginCreatorParams = {
  searchClient: SearchClient
  recentSearchesPlugin: ReturnType<
    typeof createLocalStorageRecentSearchesPlugin
  >
  onSelect?: (params: OnSelectParams<AutocompleteQuerySuggestionsHit>) => void
}

export function popularSearchesPluginCreator({
  searchClient,
  recentSearchesPlugin,
  onSelect: customOnSelect,
}: PopularSearchesPluginCreatorParams) {
  return createQuerySuggestionsPlugin({
    searchClient,
    indexName: querySuggestionsIndexName,
    categoryAttribute: [
      indexName,
      'facets',
      'exact_matches',
      'hierarchical_categories.lvl1',
    ],
    getSearchParams() {
      return recentSearchesPlugin.data?.getAlgoliaSearchParams({
        hitsPerPage: 8,
      }) as SearchOptions
    },
    transformSource({ source, onTapAhead }) {
      return {
        ...source,
        onSelect(params) {
          if (typeof customOnSelect === 'function') {
            customOnSelect(params)
          }
        },
        templates: {
          ...source.templates,
          header() {
            return (
              <span className="aa-SourceHeaderTitle">Popular Searches</span>
            )
          },
          item({ item, components }) {
            if (item.__autocomplete_qsCategory) {
              return (
                <div className="aa-ItemWrapper">
                  <div className="aa-ItemContent aa-ItemContent--indented">
                    <div className="aa-ItemContentSubtitle aa-ItemContentSubtitle--standalone">
                      <span className="aa-ItemContentSubtitleIcon" />
                      <span>
                        in{' '}
                        <span className="aa-ItemContentSubtitleCategory">
                          {item.__autocomplete_qsCategory}
                        </span>
                      </span>
                    </div>
                  </div>
                </div>
              )
            }

            return (
              <div className="aa-ItemWrapper">
                <div className="aa-ItemContent">
                  <div className="aa-ItemIcon aa-ItemIcon--noBorder">
                    <svg viewBox="0 0 24 24" fill="currentColor">
                      <path d="M19.8 18.8L15.6 14.6C16.6 13.4 17.1 12 17.1 10.5C17.1 6.9 14.2 4 10.6 4C6.9 4 4 6.9 4 10.5C4 14.1 6.9 17 10.5 17C12 17 13.4 16.5 14.6 15.5L18.8 19.7C18.9 19.8 19.1 19.9 19.3 19.9C19.5 19.9 19.7 19.8 19.8 19.7C19.9 19.6 20 19.4 20 19.2C20 19.1 19.9 18.9 19.8 18.8ZM10.5 15.6C7.7 15.6 5.4 13.3 5.4 10.5C5.4 7.7 7.7 5.4 10.5 5.4C13.3 5.4 15.6 7.7 15.6 10.5C15.6 13.4 13.4 15.6 10.5 15.6Z" />
                    </svg>
                  </div>
                  <div className="aa-ItemContentBody">
                    <div className="aa-ItemContentTitle">
                      <components.ReverseHighlight
                        hit={item}
                        attribute="query"
                      />
                    </div>
                  </div>
                </div>
                <div className="aa-ItemActions">
                  <button
                    type="button"
                    className="aa-ItemActionButton"
                    title={`Fill query with "${item.query}"`}
                    onClick={(event) => {
                      event.preventDefault()
                      event.stopPropagation()
                      onTapAhead(item)
                    }}
                  >
                    <svg viewBox="0 0 24 24" fill="currentColor">
                      <path d="M8 17v-7.586l8.293 8.293c0.391 0.391 1.024 0.391 1.414 0s0.391-1.024 0-1.414l-8.293-8.293h7.586c0.552 0 1-0.448 1-1s-0.448-1-1-1h-10c-0.552 0-1 0.448-1 1v10c0 0.552 0.448 1 1 1s1-0.448 1-1z" />
                    </svg>
                  </button>
                </div>
              </div>
            )
          },
        },
      }
    },
  })
}
