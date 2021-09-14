import classNames from 'classnames'
import { Configure, Index } from 'react-instantsearch-core'

import { InfiniteHits } from '@instantsearch/widgets/infinite-hits/infinite-hits'

import { Container } from '@/components/container/container'
import { ProductHitWithoutHighlighting } from '@/components/product/product-hit'
import { indexName as defaultIndexName } from '@/utils/env'

export type ProductsShowcaseProps = {
  indexName?: string
  indexId?: string
  title?: string
  className?: string
  [index: string]: any
}

export function ProductsShowcase({
  indexName = defaultIndexName,
  indexId,
  title,
  className,
  ...searchParameters
}: ProductsShowcaseProps) {
  return (
    <Index indexName={indexName} indexId={indexId}>
      <Configure {...searchParameters} />
      <section className={classNames('py-4 laptop:py-16', className)}>
        <Container>
          {title && (
            <h3 className="text-sm uppercase mb-3 laptop:mb-6 laptop:ml-3 laptop:heading-3">
              {title}
            </h3>
          )}
          <InfiniteHits
            hitComponent={ProductHitWithoutHighlighting}
            gridClassName="grid-cols-2 laptop:grid-cols-6"
          />
        </Container>
      </section>
    </Index>
  )
}
