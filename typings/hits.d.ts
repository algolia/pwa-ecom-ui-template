import type { Hit } from 'react-instantsearch-core'

export type HitComponentProps<T> = {
  hit: Hit<T>
}

export type ProductHit = {
  available_sizes: string[]
  brand: string
  category_page_id: string[]
  color: { filter_group: string; original_name: string }
  created_at: number
  description: string
  gender: string
  hierarchical_categories: { lvl0: string; lvl1: string; lvl2: string }
  image_blurred: string
  image_urls: string[]
  list_categories: string[]
  name: string
  objectID: string
  parentID: string
  price: {
    currency: string
    discounted_value: number
    discount_level: number
    on_sales: boolean
    value: number
  }
  related_products: ProductHit[] | null
  reviews: {
    bayesian_avg: number
    count: number
    rating: number
  }
  sku: string
  slug: string
  units_in_stock: number
  updated_at: number
  variants: Array<{
    abbreviated_size: string
    in_stock: boolean
    sku: string
  }>
  __queryID: string
}
