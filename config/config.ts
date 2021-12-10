import { atom } from 'jotai'
import { freezeAtom } from 'jotai/utils'

import type { SetUserToken } from '@/hooks/useSearchInsights'
import type { Refinement, RefinementLayout } from '@/typings/refinements'
import { capitalize } from '@/utils/capitalize'
import { indexName } from '@/utils/env'

export type Config = typeof config

const refinementsLayoutAtom = atom<RefinementLayout>('panel')

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
    header: 'Brands',
    label: 'Brand',
    options: {
      searchable: true,
      attribute: 'brand',
    },
  },
  {
    type: 'price',
    header: 'Price',
    label: 'Price',
    options: {
      attribute: 'price.value',
    },
  },
  {
    type: 'size',
    header: 'Sizes',
    label: 'Size',
    options: {
      attribute: 'available_sizes',
      limit: 8,
    },
  },
  {
    type: 'color',
    header: 'Colors',
    label: 'Color',
    options: {
      attribute: 'color.filter_group',
      separator: ';',
      limit: 9,
      showMore: true,
      showMoreLimit: 15,
      transformItems: (items: any) =>
        items.map((item: any) => ({
          ...item,
          label: capitalize(item.label),
        })),
    },
  },
  {
    type: 'rating',
    header: 'Rating',
    label: 'Rating',
    options: {
      attribute: 'reviews.rating',
    },
  },
]

const sorts = [
  { value: indexName, label: 'Most popular', isDefault: true },
  { value: `${indexName}_price_asc`, label: 'Price Low to High' },
  { value: `${indexName}_price_desc`, label: 'Price High to Low' },
]

const breadcrumbAttributes = [
  'hierarchical_categories.lvl0',
  'hierarchical_categories.lvl1',
  'hierarchical_categories.lvl2',
]

const searchParameters = {
  hitsPerPage: 10,
  maxValuesPerFacet: 50,
  attributesToSnippet: ['description:60'],
  snippetEllipsisText: '…',
  analytics: true,
  clickAnalytics: true,
}

const setUserToken: SetUserToken = (generatedUserToken, setToken) => {
  setToken(generatedUserToken)
}

const autocomplete = {
  placeholders: ['products', 'articles', 'faq'],
  debouncing: 800, // in ms
  detachedMediaQuery: '(max-width: 1439px)',
}

const url = {
  debouncing: 1500, // in ms
}

const config = {
  refinementsLayoutAtom,
  refinements,
  sorts,
  breadcrumbAttributes,
  searchParameters,
  setUserToken,
  autocomplete,
  url,
}

export const configAtom = freezeAtom(atom(() => config))
