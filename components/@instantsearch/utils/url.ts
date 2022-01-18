import qs from 'qs'
import type { SearchState } from 'react-instantsearch-core'

import { getMapping } from '@/utils/getMapping'
import { parseUrl } from '@/utils/parseUrl'

const paramRegexBlacklist = [/configure/, /hierarchicalMenu/, /queryID/]
const [paramToAlias, aliasToParam] = getMapping({
  query: 'q',
  page: 'p',
})
const [categoryToSlug, slugToCategory] = getMapping({
  // 'jeans & bottoms': 'jeans-bottoms',
})
const categorySeparator = '/'
const categorySpaceSeparator = '-'
const categorySpaceSeparatorReplacement = '+'
const hierarchicalSeparator = '>'
const hierarchicalAttribute = 'hierarchical_categories.lvl0'

const getCategorySlug = (name: string) => {
  const parsedName =
    categoryToSlug[name] ||
    name.replace(categorySpaceSeparator, categorySpaceSeparatorReplacement)
  return parsedName
    .split(' ')
    .map(encodeURIComponent)
    .join(categorySpaceSeparator)
}

const getCategoryName = (slug: string) => {
  const parsedName = slugToCategory[slug] || slug
  return parsedName
    .split(categorySpaceSeparator)
    .map(decodeURIComponent)
    .join(' ')
    .replace(categorySpaceSeparatorReplacement, categorySpaceSeparator)
}

export const createURL = (searchState: SearchState): string => {
  const parsedSearchState: Record<string, any> = {}
  for (const [key, val] of Object.entries(searchState)) {
    const alias = paramToAlias[key]
    parsedSearchState[typeof alias !== 'undefined' ? alias : key] = val
  }

  const hierarchicalCategory =
    parsedSearchState.hierarchicalMenu?.[hierarchicalAttribute]

  let categoryPath = ''
  if (hierarchicalCategory) {
    categoryPath = hierarchicalCategory
      .split(` ${hierarchicalSeparator} `)
      .map(getCategorySlug)
      .join(categorySeparator)
  }

  const queryString = qs.stringify(parsedSearchState, {
    addQueryPrefix: true,
    filter(prefix, value) {
      if (paramRegexBlacklist.some((r) => r.test(prefix)) || !value)
        return undefined
      return value
    },
  })

  return categoryPath || queryString ? `/${categoryPath}${queryString}` : ''
}

export const urlToSearchState = (url: string | null = ''): SearchState => {
  if (!url) return {}

  const { pathname, search } = parseUrl(url)

  const searchState = qs.parse(search, {
    ignoreQueryPrefix: true,
    decoder(value, defaultDecoder, charset, type) {
      if (type === 'value' && /^(\d+|\d*\.\d+)$/.test(value)) {
        return parseFloat(value)
      }

      return defaultDecoder(value)
    },
  })

  const parsedSearchState: Record<string, any> = {}
  for (const [key, val] of Object.entries(searchState)) {
    const param = aliasToParam[key]
    parsedSearchState[typeof param !== 'undefined' ? param : key] = val
  }

  const pathnameMatches = pathname.match(/catalog\/(.*?)\/?$/)

  const category = pathnameMatches?.[1]
    .split(categorySeparator)
    .map(getCategoryName)
    .join(` ${hierarchicalSeparator} `)

  if (category) {
    parsedSearchState.hierarchicalMenu = {}
    parsedSearchState.hierarchicalMenu[hierarchicalAttribute] = category
  }

  return parsedSearchState
}

export const searchStateToUrl = (searchState: SearchState): string =>
  searchState ? createURL(searchState) : ''
