import type { OnSelectParams } from '@algolia/autocomplete-core'
import { createLocalStorageRecentSearchesPlugin } from '@algolia/autocomplete-plugin-recent-searches'
import type { RecentSearchesItem } from '@algolia/autocomplete-plugin-recent-searches/dist/esm/types'
import CloseIcon from '@material-design-icons/svg/outlined/close.svg'

import { Icon } from '@/components/@ui/icon/icon'

type RecentSearchesPluginCreatorParams = {
  onSelect?: (params: OnSelectParams<RecentSearchesItem>) => void
}

export function recentSearchesPluginCreator({
  onSelect: customOnSelect,
}: RecentSearchesPluginCreatorParams) {
  return createLocalStorageRecentSearchesPlugin({
    key: 'search',
    limit: 3,
    transformSource({ source, onRemove, onTapAhead }) {
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
            return <span className="aa-SourceHeaderTitle">Your Searches</span>
          },
          item({ item, components }) {
            return (
              <div className="aa-ItemWrapper">
                <div className="aa-ItemContent">
                  <div className="aa-ItemIcon aa-ItemIcon--noBorder">
                    <svg viewBox="0 0 24 24" fill="currentColor">
                      <path d="M5.334 5.834l1.96 1.96a6.63 6.63 0 00-1.96 4.707 6.674 6.674 0 006.667 6.666 6.674 6.674 0 006.666-6.666 6.674 6.674 0 00-6.666-6.667v1.333a5.34 5.34 0 015.333 5.334 5.34 5.34 0 01-5.333 5.333 5.34 5.34 0 01-5.334-5.333c0-1.471.6-2.802 1.567-3.767L10 10.5V5.834H5.334z" />
                    </svg>
                  </div>
                  <div className="aa-ItemContentBody">
                    <div className="aa-ItemContentTitle">
                      <components.ReverseHighlight
                        hit={item}
                        attribute="label"
                      />
                      {item.category && (
                        <span className="aa-ItemContentSubtitle aa-ItemContentSubtitle--inline">
                          <span className="aa-ItemContentSubtitleIcon" /> in{' '}
                          <span className="aa-ItemContentSubtitleCategory">
                            {item.category}
                          </span>
                        </span>
                      )}
                    </div>
                  </div>
                </div>
                <div className="aa-ItemActions">
                  <button
                    type="button"
                    className="aa-ItemActionButton"
                    title="Remove this search"
                    onClick={(event) => {
                      event.preventDefault()
                      event.stopPropagation()
                      onRemove(item.id)
                    }}
                  >
                    <Icon icon={CloseIcon} />
                  </button>
                  <button
                    type="button"
                    className="aa-ItemActionButton"
                    title={`Fill query with "${item.label}"`}
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
