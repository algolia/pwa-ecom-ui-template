import { memo, useCallback } from 'react'
import isEqual from 'react-fast-compare'
import { Highlight } from 'react-instantsearch-dom'
import searchInsights from 'search-insights'

import type { ProductCardProps } from '@/components/product-card/product-card'
import { ProductCard } from '@/components/product-card/product-card'
import type { ProductTagType } from '@/components/product/product-tag'
import type { ViewMode } from '@/components/view-modes/view-modes'
import { capitalize } from '@/utils/capitalize'
import { indexName } from '@/utils/env'

export type RelatedProductCardProps = {
  item: any
  insightsEventName?: string
  viewMode?: ViewMode
  highlighting?: boolean
}

export function RelatedProductCardComponent({
  item: hit,
  insightsEventName = 'Related Product Clicked',
  viewMode,
  highlighting = true,
}: RelatedProductCardProps): JSX.Element {
  const product: ProductCardProps = {
    url: `/product/${hit.objectID}`,
    image: hit.image_urls?.[0],
    tags: undefined,
    colors: undefined,
    price: hit.price.value,
    rating: hit.reviews.rating,
    reviews: hit.reviews.count,
  }

  // Highlighting
  if (highlighting) {
    product.labelHighlighting = () => (
      <Highlight attribute="brand" tagName="mark" hit={hit} />
    )

    product.titleHighlighting = () => (
      <Highlight attribute="name" tagName="mark" hit={hit} />
    )
  } else {
    product.label = hit.brand?.replace(/_/g, ' ')
    product.title = capitalize(hit.name)
  }

  // Tags
  if (product.reviews && product.reviews >= 50) {
    product.tags?.push({
      label: 'popular',
      theme: 'popular',
    } as ProductTagType)
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

export const RelatedProductCard = memo(RelatedProductCardComponent, isEqual)
