import { useMemo } from 'react'
import type { InfiniteHitsProvided } from 'react-instantsearch-core'
import { connectInfiniteHits, Highlight } from 'react-instantsearch-dom'

import LoadMore from '@instantsearch/load-more/load-more'

import type { ProductGridCardProps } from '../product/product-grid'
import { ProductGrid } from '../product/product-grid'
import type { ProductTagType } from '../product/product-tag'

export type Hit = {
  objectID: string
  url: string
  image_link: string
  fullStock: boolean
  category: string
  name: string
  price: number
  newPrice: number
  reviewScore: number
  reviewCount: number
  hexColorCode: string
}

export type HitsProps = InfiniteHitsProvided<Hit>

export const Hits = connectInfiniteHits(({ hits }: HitsProps) => {
  const products = useMemo(
    () =>
      hits.map((hit) => {
        const parsedHit: ProductGridCardProps = {
          objectID: hit.objectID,
          url: `/${hit.url}`,
          image: hit.image_link,
          tags: [],
          label: hit.category,
          labelHighlighting() {
            return <Highlight attribute="category" tagName="mark" hit={hit} />
          },
          title: hit.name,
          titleHighlighting() {
            return <Highlight attribute="name" tagName="mark" hit={hit} />
          },
          colors: [],
          price: hit.newPrice ?? hit.price,
          originalPrice: hit.newPrice ? hit.price : undefined,
          rating: hit.reviewScore,
          reviews: hit.reviewCount,
          available: hit.fullStock,
        }

        if (hit.reviewCount >= 50) {
          parsedHit.tags?.push({
            label: 'popular',
            theme: 'popular',
          } as ProductTagType)
        }
        if (!hit.fullStock) {
          parsedHit.tags?.push({
            label: 'out of stock',
            theme: 'out-of-stock',
          } as ProductTagType)
        }

        if (hit.hexColorCode) {
          parsedHit.colors?.push(hit.hexColorCode.split('//')[1])
        }

        return parsedHit
      }),
    [hits]
  )

  return (
    <div className="w-full">
      <ProductGrid products={products} />
      <LoadMore />
    </div>
  )
})
