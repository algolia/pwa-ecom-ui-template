import { indexName as defaultIndexName } from '@/utils/env'

import { useRouter } from 'next/router';

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
  ...searchParameters
}: TrendingFacetsShowcaseProps) {

  const recommendClient = useAtomValue(recommendClientAtom)
  const facetAttribute = 'brand'
  
  return (
      <section className='trendingFacets'>
            <h4>The most trending brands</h4>
            <TrendingFacets<FacetHit>
            recommendClient={recommendClient}
            indexName={indexName}
            facetName={facetAttribute}
            itemComponent={({ item }) => (
            <Facet
                hit={item}
                facetAttribute={facetAttribute}
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

const Facet = ({hit, facetAttribute}) => {
    const router = useRouter()
    return (<div>
                <p onClick={(e) =>{
                router.pathname.includes('catalog') ? router.push(`?refinementList%5B${facetAttribute}%5D%5B0%5D=${e.target.innerHTML}`) : router.push(`/catalog?refinementList%5B${facetAttribute}%5D%5B0%5D=${e.target.innerHTML}`)}}>
                {hit.facetValue}
                </p>
            </div>)
}