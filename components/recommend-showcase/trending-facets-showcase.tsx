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
      {/* jsx-a11y/no-noninteractive-element-interactions */}
      {/* eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions */}
      <p
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
      </p>
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
      <h4>Trending Brands</h4>
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