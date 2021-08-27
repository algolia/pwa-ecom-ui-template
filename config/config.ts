import { atom } from 'jotai'

export type RefinementType =
  | 'hierarchical'
  | 'list'
  | 'size'
  | 'color'
  | 'rating'

export type Refinement = {
  type: RefinementType
  header: string
  label: string
  isExpanded?: boolean
  options: Record<string, any>
}

export type Config = typeof config

const refinements: Refinement[] = [
  {
    type: 'hierarchical',
    header: 'Categories',
    label: 'Category',
    isExpanded: true,
    options: {
      attributes: [
        'hierarchical_categories.lvl0',
        'hierarchical_categories.lvl1',
        'hierarchical_categories.lvl2',
      ],
    },
  },
  {
    type: 'list',
    header: 'Price',
    label: 'Price',
    options: {
      attribute: 'priceFilter',
    },
  },
  {
    type: 'size',
    header: 'Sizes',
    label: 'Size',
    options: {
      attribute: 'sizeFilter',
      limit: 8,
    },
  },
  {
    type: 'color',
    header: 'Colors',
    label: 'Color',
    options: {
      attribute: 'hexColorCode',
      separator: '//',
      limit: 9,
    },
  },
  {
    type: 'rating',
    header: 'Rating',
    label: 'Rating',
    options: {
      attribute: 'reviewScore',
    },
  },
]

const config = {
  refinements,
}

export const configAtom = atom(() => config)
