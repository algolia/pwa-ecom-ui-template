import { useMemo } from 'react'
import type { StateResultsProvided } from 'react-instantsearch-core'
import { connectStateResults } from 'react-instantsearch-dom'

export type NoRefinementsHandlerProps = StateResultsProvided & {
  attribute?: string
  onUpdate: (hasRefinements: boolean) => void
}

export const NoRefinementsHandler = connectStateResults(
  ({ searchResults, attribute, onUpdate }: NoRefinementsHandlerProps) => {
    if (!searchResults) return null

    const disjunctiveFacets = searchResults.disjunctiveFacets
    const hierarchicalFacets = searchResults.hierarchicalFacets

    const facets = useMemo(
      () => [...disjunctiveFacets, ...hierarchicalFacets],
      [disjunctiveFacets, hierarchicalFacets]
    )

    const hasRefinements = useMemo(() => {
      let found = false
      facets.forEach((facet) => {
        if (facet.name === attribute && facet.data) {
          found = true
        }
      })
      return found
    }, [facets, attribute])

    onUpdate(hasRefinements)

    return null
  }
)
