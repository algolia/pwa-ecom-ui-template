import { useMemo } from 'react'

import { getPanelId } from '@instantsearch/utils/refinements'

import { RefinementsPanelWidget } from '@/components/refinements-panel/refinements-panel-widget'
import type { Refinement } from '@/typings/refinements'

export function useGetRefinementWidgets(refinements: Refinement[]) {
  return useMemo(
    () =>
      refinements.map((refinement) => {
        const panelId = getPanelId(refinement)

        let refinementWidgets
        if (refinement.widgets?.length) {
          refinementWidgets = (
            <div className="flex flex-col gap-2">
              {refinement.widgets.map((refinementWidget) => (
                <RefinementsPanelWidget
                  key={`${panelId}:${refinementWidget.type}`}
                  type={refinementWidget.type}
                  {...refinementWidget.options}
                />
              ))}
            </div>
          )
        } else {
          refinementWidgets = (
            <RefinementsPanelWidget
              type={refinement.type}
              {...refinement.options}
            />
          )
        }

        return refinementWidgets
      }),
    [refinements]
  )
}
