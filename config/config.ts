import { atom } from 'jotai'

export type RefinementType = 'hierarchical' | 'list' | 'size' | 'color'

export type Refinement = {
  type: RefinementType
  header: string
  label: string
  options: Record<string, any>
}

const refinements: Refinement[] = [
  {
    type: 'hierarchical',
    header: 'Categories',
    label: 'Category',
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
]

export const configAtom = atom(() => ({
  refinements,
}))
