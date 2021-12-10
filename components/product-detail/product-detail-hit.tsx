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
    image: hit.image_urls[0],
    label: hit.brand,
    title: hit.name,
    description: hit.description,
    tags: [],
    sizes: [],
    rating: hit.reviews.rating,
    reviews: hit.reviews.count,
    price: hit.price.value,
    currency: {
      symbol: hit.price.currency === 'EUR' ? '€' : '$',
      position: hit.price.currency === 'EUR' ? 'suffix' : 'prefix',
    },
  }

  // On sales
  if (hit.price.on_sales) {
    product.originalPrice = hit.price.value
    product.price = hit.price.discounted_value

    product.tags?.push({
      label: `on sale ${hit.price.discount_level}%`,
      theme: 'on-sale',
    } as ProductTagType)
  }

  // Tags
  if (product.reviews && product.reviews >= 90) {
    product.popular = true
    product.tags?.push({
      label: 'popular',
      theme: 'popular',
    } as ProductTagType)
  }

  // Sizes
  if (hit.available_sizes.length) {
    product.sizes?.push(
      ...hit.available_sizes.map((size) => ({ size, available: true }))
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
