import { useAtomValue } from 'jotai/utils'
import { memo } from 'react'
import isEqual from 'react-fast-compare'
import type { QueryRuleCustomDataProvided } from 'react-instantsearch-core'
import { connectQueryRules } from 'react-instantsearch-core'

import { searchResultsAtom } from '@instantsearch/widgets/virtual-state-results/virtual-state-results'

import { withDebugLayer } from '@/components/@dev/debug-layer/debug-layer'
import { Banner } from '@/components/banner/banner'
import { useIsMounted } from '@/hooks/useIsMounted'
import { useTailwindScreens } from '@/hooks/useTailwindScreens'

export type QueryRuleBannersProps = QueryRuleCustomDataProvided & {
  limit?: number
}

function QueryRuleBannersComponent({
  items,
  limit = Infinity,
}: QueryRuleBannersProps) {
  const searchResults = useAtomValue(searchResultsAtom)
  const { laptop } = useTailwindScreens()
  const isMounted = useIsMounted()

  if (!items.length || searchResults?.nbHits === 0) return null

  const slicedItems = items.slice(0, limit)

  return (
    <div className="flex flex-col">
      {slicedItems.map(({ title, description, image }) => (
        <Banner
          key={image}
          size={laptop && isMounted() ? 'l' : 's'}
          title={title}
          description={description}
          image={laptop ? image.desktop : image.mobile}
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
  memo(
    withDebugLayer(QueryRuleBannersComponent, 'QueryRuleBannersWidget'),
    isEqual
  )
)
