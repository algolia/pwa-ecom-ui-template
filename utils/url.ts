import qs from 'qs'
import type { InstantSearchProps } from 'react-instantsearch-dom'

export const createURL = (
  searchState: InstantSearchProps['searchState']
): string =>
  qs.stringify(searchState, {
    addQueryPrefix: true,
    filter(prefix, value) {
      if (prefix === 'page') return undefined
      return value
    },
  })

export const urlToSearchState = (
  path: string = ''
): InstantSearchProps['searchState'] =>
  path.includes('?') ? qs.parse(path.substring(path.indexOf('?') + 1)) : {}

export const searchStateToUrl = (
  searchState: InstantSearchProps['searchState']
): string =>
  searchState ? `${window.location.pathname}${createURL(searchState)}` : ''
