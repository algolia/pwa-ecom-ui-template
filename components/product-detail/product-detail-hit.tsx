import { useRouter } from 'next/router'
import { useCallback } from 'react'
import searchInsights from 'search-insights'

import type { ProductDetailProps } from './product-detail'
import { ProductDetail } from './product-detail'

import type { ProductTagType } from '@/components/product/product-tag'
import type { HitComponentProps, ProductHit } from '@/typings/hits'
import { indexName } from '@/utils/env'

export type ProductDetailHitProps = HitComponentProps<ProductHit>

export function ProductDetailHit({ hit }: ProductDetailHitProps) {
  const product: ProductDetailProps = {
    image: hit.image_link,
    label: hit.category,
    title: hit.name,
    description: hit.description,
    tags: [],
    rating: hit.reviewScore,
    reviews: hit.reviewCount,
    available: Boolean(hit.fullStock),
    sizes: [],
    price: hit.price,
  }

  // Tags
  if (product.reviews && product.reviews >= 50) {
    product.popular = true
    product.tags?.push({
      label: 'popular',
      theme: 'popular',
    } as ProductTagType)
  }

  if (!hit.fullStock) {
    product.tags?.push({
      label: 'out of stock',
      theme: 'out-of-stock',
    } as ProductTagType)
  }

  // Sizes
  if (hit.sizes?.size?.length) {
    hit.sizes.size.forEach((size) =>
      product.sizes?.push({
        size,
        available: hit.sizeFilter?.indexOf(size) !== -1,
      })
    )
  }

  const router = useRouter()
  const queryID = router.query?.queryID as string

  const handleCheckoutClick = useCallback(() => {
    searchInsights(
      queryID ? 'convertedObjectIDsAfterSearch' : 'convertedObjectIDs',
      {
        index: indexName,
        eventName: queryID
          ? 'PDP: Product Added to Cart after Search'
          : 'PDP: Product Added to Cart',
        objectIDs: [hit.objectID],
        queryID,
      }
    )
  }, [queryID, hit.objectID])

  return <ProductDetail {...product} onCheckoutClick={handleCheckoutClick} />
}
