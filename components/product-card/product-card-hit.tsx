import { memo, useCallback } from 'react'
import isEqual from 'react-fast-compare'
import type { WrappedInsightsClient } from 'react-instantsearch-core'
import { connectHitInsights } from 'react-instantsearch-core'
import { Highlight, Snippet } from 'react-instantsearch-dom'
import searchInsights from 'search-insights'

import type { ProductCardProps } from '@/components/product-card/product-card'
import { ProductCard } from '@/components/product-card/product-card'
import type { ProductTagType } from '@/components/product/product-tag'
import type { ViewMode } from '@/components/view-modes/view-modes'
import type { HitComponentProps, ProductHit } from '@/typings/hits'

export type ProductCardHitProps = HitComponentProps<ProductHit> & {
  insights: WrappedInsightsClient
  insightsEventName?: string
  viewMode?: ViewMode
  highlighting?: boolean
}

export function ProductCardHitComponent({
  hit,
  insights,
  insightsEventName = 'PLP: Product Clicked',
  viewMode,
  highlighting = true,
}: ProductCardHitProps) {
  const product: ProductCardProps = {
    url: `/product/${hit.objectID}?queryID=${hit.__queryID}`,
    image: hit.image_link,
    tags: [],
    label: hit.category,
    title: hit.name,
    description: hit.description,
    descriptionSnippeting() {
      return <Snippet attribute="description" tagName="mark" hit={hit} />
    },
    colors: [],
    price: hit.price,
    rating: hit.reviewScore,
    reviews: hit.reviewCount,
    available: Boolean(hit.fullStock),
  }

  // Highlighting
  if (highlighting) {
    product.labelHighlighting = () => (
      <Highlight attribute="category" tagName="mark" hit={hit} />
    )

    product.titleHighlighting = () => (
      <Highlight attribute="name" tagName="mark" hit={hit} />
    )
  }

  // Tags
  if (product.reviews && product.reviews >= 50) {
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

  // Colors
  if (hit.hexColorCode) {
    product.colors?.push(hit.hexColorCode.split('//')[1])
  }

  const handleLinkClick = useCallback(() => {
    insights('clickedObjectIDsAfterSearch', {
      eventName: insightsEventName,
    })
  }, [insights, insightsEventName])

  return (
    <ProductCard view={viewMode} onLinkClick={handleLinkClick} {...product} />
  )
}

export const ProductCardHit = connectHitInsights<ProductCardHitProps>(
  searchInsights
)(memo(ProductCardHitComponent, isEqual))

export function ProductCardHitShowcase(props: ProductCardHitProps) {
  return (
    <ProductCardHit
      {...props}
      highlighting={false}
      insightsEventName="Showcase: Product Clicked"
    />
  )
}
