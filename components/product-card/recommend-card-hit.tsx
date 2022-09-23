import { memo, useCallback } from 'react'
import isEqual from 'react-fast-compare'
import { Highlight, Snippet } from 'react-instantsearch-dom'
import searchInsights from 'search-insights'

import type { ProductCardProps } from '@/components/product-card/product-card'
import { ProductCard } from '@/components/product-card/product-card'
import type { ProductTagType } from '@/components/product/product-tag'
import type { ViewMode } from '@/components/view-modes/view-modes'
import type { ProductHit } from '@/typings/hits'
import { indexName } from '@/utils/env'

export type RecommendCardHitProps = {
  item: ProductHit
  insightsEventName?: string
  viewMode?: ViewMode
  highlighting?: boolean
  snipetting?: boolean
}

export function RecommendCardHitComponent({
  item: hit,
  insightsEventName = 'Recommended Product Clicked',
  viewMode,
  highlighting = true,
  snipetting = true,
}: RecommendCardHitProps) {
  const product: ProductCardProps = {
    url: `/product/${hit.objectID}`,
    image: hit.image_urls[0],
    tags: [],
    colors: [],
    price: hit.price.value,
    currency: {
      symbol: hit.price.currency === 'EUR' ? '€' : '$',
      position: hit.price.currency === 'EUR' ? 'suffix' : 'prefix',
    },
    rating: hit.reviews.rating,
    reviews: hit.reviews.count,
  }

  // On sales
  if (hit.price.on_sales) {
    product.originalPrice = hit.price.value
    product.price = hit.price.discounted_value

    product.tags?.push({
      label: `on sale ${hit.price.discount_level}%`,
      theme: 'on-sale',
    } as ProductTagType | any)
  }

  // Highlighting
  if (highlighting) {
    product.labelHighlighting = () => (
      <Highlight attribute="brand" tagName="mark" item={hit} />
    )

    product.titleHighlighting = () => (
      <Highlight attribute="name" tagName="mark" item={hit} />
    )
  } else {
    product.label = hit.brand
    product.title = hit.name
  }

  // Snipetting
  if (snipetting) {
    product.descriptionSnippeting = () => (
      <Snippet attribute="description" hit={hit} />
    )
  } else {
    product.description = hit.description
  }

  // Tags
  if (product.reviews && product.reviews >= 90) {
    product.tags?.push({
      label: 'popular',
      theme: 'popular',
    } as ProductTagType)
  }

  // Colors
  if (hit.color.filter_group) {
    product.colors?.push(hit.color.filter_group.split(';')[1])
  }

  const handleLinkClick = useCallback(() => {
    searchInsights('clickedObjectIDs', {
      eventName: insightsEventName,
      index: indexName,
      objectIDs: [hit.objectID],
    })
  }, [insightsEventName, hit.objectID])

  return (
    <ProductCard view={viewMode} onLinkClick={handleLinkClick} {...product} />
  )
}

export const RecommendCardHit = memo(RecommendCardHitComponent, isEqual)
