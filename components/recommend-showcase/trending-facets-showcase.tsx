import { TrendingFacets } from '@algolia/recommend-react'
import classNames from 'classnames'
import { useAtomValue } from 'jotai/utils'
import { useRouter } from 'next/router'
import { stringify } from 'qs'
import { useCallback, useMemo } from 'react'

import { recommendClientAtom } from '@/layouts/app-layout'
import { indexName as defaultIndexName } from '@/utils/env'

import { Button } from '../@ui/button/button'

type FacetProps = {
  hit?: any
  facetAttribute: string
}

function Facet({ hit, facetAttribute }: FacetProps) {
  const router = useRouter()

  const filterUrlParams = useMemo(
    () => ({
      refinementList: {
        [facetAttribute]: [hit.facetValue],
      },
      p: 1,
    }),
    [facetAttribute, hit.facetValue]
  )

  const onFacetClick = useCallback(() => {
    router.push(`/catalog?${stringify(filterUrlParams)}`)
  }, [filterUrlParams, router])

  return <Button onClick={onFacetClick}>{hit.facetValue}</Button>
}

export type TrendingFacetsShowcaseProps = {
  facetAttribute: string
  className?: string
  indexName?: string
  title?: string
}

export function TrendingFacetsShowcase({
  indexName = defaultIndexName,
  facetAttribute,
  className,
  title,
  ...props
}: TrendingFacetsShowcaseProps) {
  const recommendClient = useAtomValue(recommendClientAtom)

  return (
    <section className={classNames('trendingFacets', className)}>
      {title && <h4 className="pt-2">{title}</h4>}

      <TrendingFacets
        recommendClient={recommendClient}
        indexName={indexName}
        facetName={facetAttribute}
        itemComponent={({ item }) => (
          <Facet hit={item} facetAttribute={facetAttribute} />
        )}
        maxRecommendations={5}
        headerComponent={() => null as any}
        {...props}
      />
    </section>
  )
}
