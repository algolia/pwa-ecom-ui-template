import { useAtomValue } from 'jotai/utils'
import { memo } from 'react'
import isEqual from 'react-fast-compare'
import type { QueryRuleCustomDataProvided } from 'react-instantsearch-core'
import { connectQueryRules } from 'react-instantsearch-core'

import { searchResultsAtom } from '@instantsearch/widgets/virtual-state-results/virtual-state-results'

import { Banner } from '@/components/banner/banner'

export type QueryRuleBannersProps = QueryRuleCustomDataProvided & {
  limit?: number
}

function QueryRuleBannersComponent({
  items,
  limit = Infinity,
}: QueryRuleBannersProps) {
  const searchResults = useAtomValue(searchResultsAtom)

  if (!items.length || searchResults?.nbHits === 0) return null

  const slicedItems = items.slice(0, limit)

  return (
    <div className="flex flex-col">
      {slicedItems.map(({ size, title, description, image }) => (
        <Banner
          key={image}
          size={size}
          title={title}
          description={description}
          image={image.desktop}
          imageAlt={title}
          fullWidth={true}
          overlay={true}
          gradient={true}
        />
      ))}
    </div>
  )
}

export const QueryRuleBanners = connectQueryRules(
  memo(QueryRuleBannersComponent, isEqual)
)
