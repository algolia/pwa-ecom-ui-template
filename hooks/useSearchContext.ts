import { useContext } from 'react'

import type { SearchContextValue } from '@/contexts/SearchContext'
import SearchContext from '@/contexts/SearchContext'

export function useSearchContext(): SearchContextValue {
  const context = useContext(SearchContext)
  if (!context) {
    throw new Error(
      `'useSearchContext': This function should be call inside the 'App' component.`
    )
  }
  return context
}
