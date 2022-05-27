import { indexName as defaultIndexName } from '@/utils/env'

import { Container } from '@/components/container/container'
import { useRouter } from 'next/router';

// import { TrendingItems } from '@algolia/recommend-react';

import { recommendClientAtom } from '@/layouts/app-layout'

import { currentRefinementAtom, currentHierarchicalAtom, currentBrandAtom } from '../@instantsearch/widgets/current-refinements/current-refinements';

import { useAtomValue } from 'jotai/utils'

import insights from 'search-insights';

import {
    TrendingFacets,
  } from '@algolia/recommend-react';


export type TrendingFacetsShowcaseProps = {
  title?: string
  indexName?: string
  indexId?: string
  className?: string
  hitComponent: React.ComponentType<any>
  [index: string]: any
}

export function TrendingFacetsShowcase({
  indexName = defaultIndexName,
  indexId,
//   className,
//   hitComponent,
  ...searchParameters
}: TrendingFacetsShowcaseProps) {

  const recommendClient = useAtomValue(recommendClientAtom)
  const currentRefinement = useAtomValue(currentRefinementAtom)
  const currentHierarchical = useAtomValue(currentHierarchicalAtom)
  const currentHBrand = useAtomValue(currentBrandAtom)


  return (
      <section className='trendingFacets'>

            <h4>The most trending brands</h4>
            <TrendingFacets<FacetHit>
            recommendClient={recommendClient}
            indexName={indexName}
            facetName="brand"
            itemComponent={({ item }) => (
            <Facet
                hit={item}

                // onSelect={(facetHits) => {
                //   setSelectedFacetValue(
                //     facetHits.facetValue === selectedFacetValue?.facetValue
                //       ? undefined
                //       : facetHits
                //   );
                // }}
                // indexName={indexName}
            />
            )}
            maxRecommendations={5}
            translations={{
            title: '',
            }}
        />
     
    </section>
  )
}

const Facet = ({hit}) => {
    const router = useRouter()
    return <div><p onClick={() => router.push('/catalog/[[...slugs]]')}>{hit.facetValue}</p></div>
}