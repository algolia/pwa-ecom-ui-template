import { useAtomValue } from 'jotai/utils'
import { useMemo } from 'react'
import { ExperimentalDynamicWidgets } from 'react-instantsearch-dom'

import { RefinementsDropdown } from '@instantsearch/_widgets/refinements-dropdown/dropdown-refinements'

import {
  getPanelAttributes,
  getPanelId,
} from '@/components/refinements-panel/refinements-panel-utils'
import { RefinementsPanelWidget } from '@/components/refinements-panel/refinements-panel-widget'
import { configAtom } from '@/config/config'

export type RefinementsBarDropdownsProps = {
  dynamicWidgets?: boolean
}

export function RefinementsBarDropdowns({
  dynamicWidgets,
}: RefinementsBarDropdownsProps) {
  const config = useAtomValue(configAtom)

  const DynamicWidgets = dynamicWidgets
    ? ExperimentalDynamicWidgets
    : ({
        children,
        ...props
      }: {
        children: React.ReactNode
        [index: string]: any
      }) => <div {...props}>{children}</div>

  const widgets = useMemo(
    () =>
      config.refinements.map((refinement) => {
        const panelId = getPanelId(refinement)
        const panelAttributes = getPanelAttributes(refinement)

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

        return (
          <RefinementsDropdown
            key={panelId}
            attributes={panelAttributes}
            header={refinement.header}
            classNameContainer="w-52"
          >
            {refinementWidgets}
          </RefinementsDropdown>
        )
      }),
    [config.refinements]
  )

  return <DynamicWidgets className="flex gap-4">{widgets}</DynamicWidgets>
}
