import { indexName as defaultIndexName } from '@/utils/env'

import { Container } from '@/components/container/container'

import { TrendingItems } from '@algolia/recommend-react';

import { recommendClientAtom } from '@/layouts/app-layout'

import { useAtomValue } from 'jotai/utils'


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
  indexId,
  title,
  className,
  hitComponent,
  ...searchParameters
}: TrendingShowcaseProps) {

  const recommendClient = useAtomValue(recommendClientAtom)

  return (
    <Container>
      <TrendingItems
        recommendClient={recommendClient}
        indexName={indexName}
        itemComponent={hitComponent}
        {...searchParameters}
      />
    </Container>
  )
}
