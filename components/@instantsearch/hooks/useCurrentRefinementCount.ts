import { useMemo } from 'react'
import type { Refinement } from 'react-instantsearch-core'

export function useCurrentRefinementCount(
  items: Refinement[],
  attributes: string[]
) {
  return useMemo(() => {
    let count = 0

    attributes?.forEach((attribute) => {
      const tmp: string[] = []

      let currentRefinement = items.find(
        (item) => item.attribute === attribute
      )?.currentRefinement
      currentRefinement = currentRefinement
        ? tmp.concat(currentRefinement)
        : tmp

      count += currentRefinement.length
    })

    return count
  }, [items, attributes])
}
