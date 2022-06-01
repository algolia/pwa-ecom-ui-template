import { TrendingFacets } from '@algolia/recommend-react'
import { useAtomValue } from 'jotai/utils'
import { useRouter } from 'next/router'

import { recommendClientAtom } from '@/layouts/app-layout'
import { indexName as defaultIndexName } from '@/utils/env'

export type TrendingFacetsShowcaseProps = {
  title?: string
  indexName?: string
  indexId?: string
  className?: string
  // hitComponent: React.ComponentType<any>
  [index: string]: any
}
type FacetProps = {
  hit?: any
  facetAttribute?: string
}

function Facet({ hit, facetAttribute }: FacetProps) {
  const router = useRouter()
  return (
    <div>
      <button
        type="button"
        onClick={(e) =>
          router.pathname.includes('catalog')
            ? router.push(
                `?refinementList%5B${facetAttribute}%5D%5B0%5D=${e.currentTarget.innerHTML}`
              )
            : router.push(
                `/catalog?refinementList%5B${facetAttribute}%5D%5B0%5D=${e.currentTarget.innerHTML}`
              )
        }
      >
        {hit.facetValue}
      </button>
    </div>
  )
}

export function TrendingFacetsShowcase({
  indexName = defaultIndexName,
}: TrendingFacetsShowcaseProps) {
  const recommendClient = useAtomValue(recommendClientAtom)
  const facetAttribute = 'brand'

  return (
    <section className="trendingFacets">
      <h4>The most trending brands</h4>
      <TrendingFacets
        recommendClient={recommendClient}
        indexName={indexName}
        facetName={facetAttribute}
        itemComponent={({ item }) => (
          <Facet hit={item} facetAttribute={facetAttribute} />
        )}
        maxRecommendations={5}
        translations={{
          title: '',
        }}
      />
    </section>
  )
}
