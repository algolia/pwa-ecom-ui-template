import { useAtomValue } from 'jotai/utils'
import { memo, useMemo } from 'react'
import isEqual from 'react-fast-compare'
import type { InfiniteHitsProvided } from 'react-instantsearch-core'
import { connectInfiniteHits, Highlight } from 'react-instantsearch-dom'

import { LoadMore } from '@instantsearch/widgets/load-more/load-more'

import type { ProductGridCardProps } from '@/components/product/product-grid'
import { ProductGrid } from '@/components/product/product-grid'
import type { ProductTagType } from '@/components/product/product-tag'
import { viewModeAtom } from '@/components/view-modes/view-modes'

export type ProductHit = {
  objectID: string
  url: string
  image_link: string
  fullStock: boolean
  category: string
  name: string
  description: string
  price: number
  newPrice: number
  reviewScore: number
  reviewCount: number
  hexColorCode: string
}

export type ProductsProps = InfiniteHitsProvided<ProductHit>

function ProductsComponent({ hits }: ProductsProps) {
  const viewMode = useAtomValue(viewModeAtom)

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
          description: hit.description,
          descriptionHighlighting() {
            return (
              <Highlight attribute="description" tagName="mark" hit={hit} />
            )
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
    <section className="w-full">
      <ProductGrid products={products} view={viewMode} />
      <LoadMore />
    </section>
  )
}

export const Products = connectInfiniteHits(
  memo(ProductsComponent, (prevProps, nextProps) =>
    isEqual(prevProps.hits, nextProps.hits)
  )
)
