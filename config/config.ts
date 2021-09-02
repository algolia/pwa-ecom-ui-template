import { atom } from 'jotai'
import { freezeAtom } from 'jotai/utils'

import type { Refinement, RefinementLayout } from '@/typings/refinements'

export type Config = typeof config

const refinementsLayout = 'panel' as RefinementLayout

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
    header: 'Price',
    label: 'Price',
    widgets: [
      {
        type: 'price',
        options: {
          attribute: 'price',
        },
      },
      {
        type: 'list',
        options: {
          attribute: 'priceFilter',
        },
      },
    ],
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

const sorts = [
  { value: 'gstar_demo', label: 'Most popular', isDefault: true },
  { value: 'gstar_demo_price_asc', label: 'Price Low to High' },
  { value: 'gstar_demo_price_desc', label: 'Price High to Low' },
]

const searchParameters = {
  hitsPerPage: 10,
  maxValuesPerFacet: 50,
}

const config = {
  refinementsLayout,
  refinements,
  sorts,
  searchParameters,
}

export const configAtom = freezeAtom(atom(() => config))
