import { useAtomValue } from 'jotai/utils'
import { memo } from 'react'
import isEqual from 'react-fast-compare'
import type { QueryRuleCustomDataProvided } from 'react-instantsearch-core'
import { connectQueryRules } from 'react-instantsearch-dom'

import { withDebugLayer } from '@/components/@dev/debug-layer/debug-layer'
import { Banner } from '@/components/banner/banner'
import { useIsMounted } from '@/hooks/useIsMounted'
import { useTailwindScreens } from '@/hooks/useTailwindScreens'
import { searchResultsAtom } from '@instantsearch/widgets/virtual-state-results/virtual-state-results'

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
  const isLaptop = laptop && isMounted

  if (!items.length || searchResults?.nbHits === 0) return null

  const slicedItems = items.slice(0, limit)

  return (
    <div className="flex flex-col">
      {slicedItems.map(
        ({
          title,
          description,
          image,
          overlay = true,
          gradient = true,
          size = isLaptop ? 'l' : 's',
        }) => (
          <Banner
            key={image}
            size={size}
            title={title}
            description={description}
            image={isLaptop ? image.desktop : image.mobile}
            imageAlt={title}
            fullWidth={true}
            overlay={overlay}
            gradient={gradient}
          />
        )
      )}
    </div>
  )
}

export const QueryRuleBanners = connectQueryRules(
  memo(
    withDebugLayer(QueryRuleBannersComponent, 'QueryRuleBannersWidget'),
    isEqual
  )
)
