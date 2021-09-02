import { useMemo } from 'react'
import type { SearchResults } from 'react-instantsearch-core'

export function useHasRefinements(
  searchResults: SearchResults,
  attributes: string[] = []
) {
  const facets = useMemo(() => {
    const disjunctiveFacets = searchResults?.disjunctiveFacets || []
    const hierarchicalFacets = searchResults?.hierarchicalFacets || []
    return [...disjunctiveFacets, ...hierarchicalFacets]
  }, [searchResults])

  const hasRefinements = useMemo(() => {
    let found = !attributes.length

    facets.forEach((facet) => {
      attributes?.forEach((attribute) => {
        if (facet.name === attribute && facet.data) {
          found = true
        }
      })
    })

    return found
  }, [facets, attributes])

  return hasRefinements
}
