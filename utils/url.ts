import qs from 'qs'
import type { InstantSearchProps } from 'react-instantsearch-dom'

export const urlToSearchState = (
  path: string = ''
): InstantSearchProps['searchState'] =>
  path.includes('?') ? qs.parse(path.substring(path.indexOf('?') + 1)) : {}

export const searchStateToUrl = (
  searchState: InstantSearchProps['searchState']
): string =>
  searchState ? `${window.location.pathname}?${qs.stringify(searchState)}` : ''

export const createURL = (state: InstantSearchProps['searchState']): string =>
  `?${qs.stringify(state)}`
