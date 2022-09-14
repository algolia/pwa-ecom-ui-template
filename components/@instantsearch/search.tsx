import { memo } from 'react'
import isEqual from 'react-fast-compare'
import type { InstantSearchProps } from 'react-instantsearch-dom'
import { Configure, InstantSearch } from 'react-instantsearch-dom'

import { QueryRuleRedirect } from '@instantsearch/widgets/query-rule-redirect/query-rule-redirect'
import { VirtualSearchBox } from '@instantsearch/widgets/virtual-search-box/virtual-search-box'
import { VirtualStateResults } from '@instantsearch/widgets/virtual-state-results/virtual-state-results'
import { VirtualStats } from '@instantsearch/widgets/virtual-stats/virtual-stats'

export type SearchProps = InstantSearchProps & {
  children: React.ReactNode
  searchParameters?: Record<string, any>
}

function SearchComponent({
  children,
  searchParameters,
  ...props
}: SearchProps) {
  return (
    <InstantSearch {...props}>
      <Configure {...searchParameters} />

      <VirtualSearchBox />
      <VirtualStateResults />
      <VirtualStats />

      <QueryRuleRedirect />

      {children}
    </InstantSearch>
  )
}

export const Search = memo(SearchComponent, isEqual)
