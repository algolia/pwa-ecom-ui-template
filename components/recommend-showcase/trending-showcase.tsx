import { TrendingItems } from '@algolia/recommend-react'
import { useAtomValue } from 'jotai/utils'
import { createElement, useMemo } from 'react'

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
  headerComponent?: React.ComponentType<any>
  [index: string]: any
}

function HeaderComponentDefault({ title }: { title?: string }) {
  return (
    <h2 className="text-sm font-semibold tracking-[2px] uppercase mb-3 laptop:mb-6 laptop:ml-3 laptop:heading-3">
      {title || 'Trending items'}
    </h2>
  )
}

export function TrendingShowcase({
  indexName = defaultIndexName,
  hitComponent,
  headerComponent,
  title,
  ...searchParameters
}: TrendingShowcaseProps) {
  const recommendClient = useAtomValue(recommendClientAtom)
  const currentRefinement = useAtomValue(currentRefinementAtom)
  const currentHierarchical = useAtomValue(currentHierarchicalAtom)
  const currentHBrand = useAtomValue(currentBrandAtom)

  const header = useMemo(() => {
    // eslint-disable-next-line react/display-name, react/function-component-definition
    return () =>
      headerComponent ? (
        createElement(headerComponent)
      ) : (
        <HeaderComponentDefault title={title} />
      )
  }, [headerComponent, title])

  return (
    <TrendingItems
      recommendClient={recommendClient}
      headerComponent={header}
      indexName={indexName}
      // @ts-expect-error
      itemComponent={hitComponent}
      // @ts-expect-error
      facetName={currentHierarchical || currentRefinement.attribute}
      // @ts-expect-error
      facetValue={currentHBrand || currentRefinement.currentRefinement}
      {...searchParameters}
    />
  )
}
