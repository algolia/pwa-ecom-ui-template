import type { Hit } from 'react-instantsearch-core'

export type HitComponentProps<T> = {
  hit: Hit<T>
}

export type ProductHit = {
  availabilityDetail: string
  category: string
  colors: string[]
  colourFilter: string
  default_variant: string
  description: string
  dynamic_attributes: string[]
  fullStock: true
  genderFilter: string
  gender_category_size: string[]
  hexColorCode: string
  hierarchical_categories: { lvl0: string; lvl1: string; lvl2: string }
  image_link: string
  keywords: string[]
  margin: number
  name: string
  non_numeric_attributes: Record<string, any>
  numeric_attributes: Record<string, any>
  objectID: string
  position: number
  price: number
  priceFilter: string
  reviewCount: number
  reviewScore: number
  reviewScoreBlended: number
  sizeFilter: string[]
  sizes: { size: string[] }
  url: string
  __queryID: string
}
