import { useUpdateAtom } from 'jotai/utils'
import { useCallback } from 'react'

import { ClearRefinements } from '@instantsearch/widgets/clear-refinements/clear-refinements'
import { SeeResultsButton } from '@instantsearch/widgets/see-results-button/see-results-button'

import { refinementsPanelMobileExpandedAtom } from './refinements-panel'

export function RefinementsPanelFooter() {
  const setMobileExpanded = useUpdateAtom(refinementsPanelMobileExpandedAtom)

  const onSeeResultsClick = useCallback(
    () => setMobileExpanded(false),
    [setMobileExpanded]
  )

  return (
    <div className="flex gap-3 p-4 bg-white shadow-large">
      <ClearRefinements type="secondary" className="!px-2 flex-grow">
        Clear Filters
      </ClearRefinements>
      <SeeResultsButton onClick={onSeeResultsClick} />
    </div>
  )
}
