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