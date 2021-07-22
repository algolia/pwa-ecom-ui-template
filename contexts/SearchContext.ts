import type { SearchClient } from 'algoliasearch/lite'
import type { Dispatch } from 'react'
import { createContext } from 'react'
import type { InstantSearchProps } from 'react-instantsearch-dom'

export interface SearchContextValue {
  query: string
  setSearchState: Dispatch<InstantSearchProps['searchState']>
  searchClient: SearchClient
}

const SearchContext = createContext<SearchContextValue>(
  {} as SearchContextValue
)

export default SearchContext
