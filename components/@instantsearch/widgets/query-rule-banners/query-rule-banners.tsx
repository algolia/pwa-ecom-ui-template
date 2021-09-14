import { memo } from 'react'
import isEqual from 'react-fast-compare'
import type { QueryRuleCustomDataProvided } from 'react-instantsearch-core'
import { connectQueryRules } from 'react-instantsearch-core'

import { Banner } from '@/components/banner/banner'

export type QueryRuleBannersProps = QueryRuleCustomDataProvided

function QueryRuleBannersComponent({ items }: QueryRuleBannersProps) {
  if (!items.length) return null

  return (
    <div className="flex flex-col">
      {items.map(({ size, title, description, image }) => (
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
