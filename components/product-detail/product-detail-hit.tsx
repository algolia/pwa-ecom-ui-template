import { useRouter } from 'next/router'
import { useCallback } from 'react'
import searchInsights from 'search-insights'

import type { ProductDetailProps } from './product-detail'
import { ProductDetail } from './product-detail'

import type { ProductTagType } from '@/components/product/product-tag'
import type { HitComponentProps, ProductHit } from '@/typings/hits'
import { capitalize } from '@/utils/capitalize'
import { indexName } from '@/utils/env'

export type ProductDetailHitProps = HitComponentProps<ProductHit>

export function ProductDetailHit({ hit }: ProductDetailHitProps) {
  const product: ProductDetailProps = {
    image: hit.full_url_image,
    label: hit.category?.replace(/_/g, ' '),
    title: capitalize(hit.name),
    tags: [],
    rating: hit.reviewScore,
    reviews: hit.reviewCount,
    sizes: [],
    price: hit.unformated_price,
  }

  // Tags
  if (product.reviews && product.reviews >= 50) {
    product.popular = true
    product.tags?.push({
      label: 'popular',
      theme: 'popular',
    } as ProductTagType)
  }

  // Sizes
  if (hit.sizeFilter.length) {
    product.sizes?.push(
      ...hit.sizeFilter.map((size) => ({ size, available: true }))
    )
  }

  const router = useRouter()
  const queryID = router?.query?.queryID as string

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
