import { TrendingItems } from '@algolia/recommend-react'
import { useAtomValue } from 'jotai/utils'

import { Container } from '@/components/container/container'
import { recommendClientAtom } from '@/layouts/app-layout'
import { indexName as defaultIndexName } from '@/utils/env'

import {
  currentRefinementAtom,
  currentHierarchicalAtom,
  currentBrandAtom,
} from '../@instantsearch/widgets/current-refinements/current-refinements'

export type TrendingShowcaseProps = {
  title?: string
  indexName?: string
  indexId?: string
  className?: string
  hitComponent: React.ComponentType<any>
  [index: string]: any
}

export function TrendingShowcase({
  indexName = defaultIndexName,
  hitComponent,
  ...searchParameters
}: TrendingShowcaseProps) {
  const recommendClient = useAtomValue(recommendClientAtom)
  const currentRefinement = useAtomValue(currentRefinementAtom)
  const currentHierarchical = useAtomValue(currentHierarchicalAtom)
  const currentHBrand = useAtomValue(currentBrandAtom)

  return (
    <Container>
      <TrendingItems
        recommendClient={recommendClient}
        indexName={indexName}
        // @ts-expect-error
        itemComponent={hitComponent}
        facetName={
          currentHierarchical
            ? currentHierarchical
            : // @ts-expect-error
              currentRefinement.attribute
        }
        facetValue={
          // @ts-expect-error
          currentHBrand ? currentHBrand : currentRefinement.currentRefinement
        }
        {...searchParameters}
      />
    </Container>
  )
}
