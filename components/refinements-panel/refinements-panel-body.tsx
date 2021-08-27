import { atom, useAtom } from 'jotai'
import { useAtomValue } from 'jotai/utils'
import { Fragment, useCallback, useEffect, useMemo } from 'react'
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

export const refinementsPanelsAtom = atom<Panels>({})
export const refinementsPanelsExpandedAtom = atom(
  (get) =>
    Boolean(Object.values(get(refinementsPanelsAtom)).find((v) => v === true)),
  (get, set, update: (prev: boolean) => boolean) => {
    const expanded = update(get(refinementsPanelsExpandedAtom))
    set(
      refinementsPanelsAtom,
      togglePanels(get(refinementsPanelsAtom), expanded)
    )
  }
)

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

function togglePanels(panels: Panels, val: boolean) {
  return Object.keys(panels).reduce(
    (acc, panelKey) => ({ ...acc, [panelKey]: val }),
    {}
  )
}

export function RefinementsPanelBody({
  dynamicWidgets,
}: RefinementsPanelBodyProps) {
  const config = useAtomValue(configAtom)
  const { laptop } = useTailwindScreens()
  const DynamicWidgets = dynamicWidgets ? ExperimentalDynamicWidgets : Fragment

  const [panels, setPanels] = useAtom(refinementsPanelsAtom)

  useEffect(() => {
    setPanels(
      config.refinements.reduce(
        (acc, current) => ({
          ...acc,
          [getPanelId(current)]: !laptop ? false : Boolean(current.isExpanded),
        }),
        {}
      )
    )
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const onToggle = useCallback(
    (panelId: string) => {
      setPanels((prevPanels) => {
        const otherPanels = !laptop
          ? togglePanels(prevPanels, false)
          : prevPanels

        return {
          ...otherPanels,
          [panelId]: !prevPanels[panelId],
        }
      })
    },
    [setPanels, laptop]
  )

  const widgets = useMemo(
    () =>
      config.refinements.map((refinement, i) => {
        const panelId = getPanelId(refinement)
        const panelAttribute = getPanelAttribute(refinement)

        return (
          <ExpandablePanel
            key={panelId}
            header={refinement.header}
            attribute={panelAttribute}
            isOpened={panels[panelId]}
            className={i === 0 ? 'pt-0' : ''}
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
