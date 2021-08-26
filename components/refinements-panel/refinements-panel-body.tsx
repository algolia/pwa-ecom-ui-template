import { useAtomValue } from 'jotai/utils'
import { Fragment, useCallback, useMemo, useState } from 'react'
import { ExperimentalDynamicWidgets } from 'react-instantsearch-dom'

import { ExpandablePanel } from '@instantsearch/_widgets/expandable-panel/expandable-panel'

import type { RefinementsPanelProps } from './refinements-panel'
import { RefinementsPanelWidget } from './refinements-panel-widget'

import type { Refinement } from '@/config/config'
import { configAtom } from '@/config/config'
import { useTailwindScreens } from '@/hooks/useTailwindScreens'

export type RefinementsPanelBodyProps = Pick<
  RefinementsPanelProps,
  'dynamicWidgets'
>

export type Panels = {
  [key: string]: boolean
}

function getPanelId(refinement: Refinement) {
  return refinement.options.attributes
    ? refinement.options.attributes.join(':')
    : refinement.options.attribute
}

function getPanelAttribute(refinement: Refinement) {
  return refinement.options.attributes
    ? refinement.options.attributes[0]
    : refinement.options.attribute
}

export function RefinementsPanelBody({
  dynamicWidgets,
}: RefinementsPanelBodyProps) {
  const config = useAtomValue(configAtom)
  const DynamicWidgets = dynamicWidgets ? ExperimentalDynamicWidgets : Fragment

  const { laptop } = useTailwindScreens()

  const [panels, setPanels] = useState<Panels>({
    categories: laptop,
    priceFilter: false,
    sizeFilter: false,
    hexColorCode: false,
  })

  const onToggle = useCallback(
    (panelId: string) => {
      setPanels((prevPanels) => {
        const otherPanels = !laptop
          ? Object.keys(prevPanels).reduce(
              (acc, panelKey) => ({ ...acc, [panelKey]: false }),
              {}
            )
          : prevPanels

        return {
          ...otherPanels,
          [panelId]: !prevPanels[panelId],
        }
      })
    },
    [laptop]
  )

  const widgets = useMemo(
    () =>
      config.refinements.map((refinement) => {
        const panelId = getPanelId(refinement)
        const panelAttribute = getPanelAttribute(refinement)

        return (
          <ExpandablePanel
            key={panelId}
            header={refinement.header}
            attribute={panelAttribute}
            isOpened={panels[panelId]}
            onToggle={() => onToggle(panelId)}
          >
            <RefinementsPanelWidget
              type={refinement.type}
              {...refinement.options}
            />
          </ExpandablePanel>
        )
      }),
    [config.refinements, onToggle, panels]
  )

  return <DynamicWidgets>{widgets}</DynamicWidgets>
}
