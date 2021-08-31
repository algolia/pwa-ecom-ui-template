import { memo, useMemo, useRef } from 'react'
import isEqual from 'react-fast-compare'
import type { InfiniteHitsProvided } from 'react-instantsearch-core'
import { connectInfiniteHits, Highlight } from 'react-instantsearch-dom'

import { LoadMore } from '@instantsearch/_widgets/load-more/load-more'

import type { ProductGridCardProps } from '../product/product-grid'
import { ProductGrid } from '../product/product-grid'
import type { ProductTagType } from '../product/product-tag'

export type ProductHit = {
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

export type ProductsProps = InfiniteHitsProvided<ProductHit>

function ProductsComponent({ hits }: ProductsProps) {
  const productsCache = useRef<Record<string, ProductGridCardProps>>({})

  const products = useMemo(
    () =>
      hits.map((hit) => {
        let parsedHit: ProductGridCardProps

        if (!productsCache.current[hit.objectID]) {
          parsedHit = {
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

          productsCache.current[parsedHit.objectID] = parsedHit
        } else {
          parsedHit = productsCache.current[hit.objectID]
        }

        return parsedHit
      }),
    [hits]
  )

  return (
    <section className="w-full">
      <ProductGrid products={products} />
      <LoadMore />
    </section>
  )
}

export const Products = connectInfiniteHits(
  memo(ProductsComponent, (prevProps, nextProps) =>
    isEqual(prevProps.hits, nextProps.hits)
  )
)
