import { atom, useAtom } from 'jotai'
import { useAtomValue } from 'jotai/utils'
import { Fragment, useCallback, useEffect, useMemo } from 'react'
import { ExperimentalDynamicWidgets } from 'react-instantsearch-dom'

import { ExpandablePanel } from '@instantsearch/_widgets/expandable-panel/expandable-panel'

import type { RefinementsPanelProps } from './refinements-panel'
import { getPanelAttributes, getPanelId } from './refinements-panel-utils'
import { RefinementsPanelWidget } from './refinements-panel-widget'

import { configAtom } from '@/config/config'
import { useTailwindScreens } from '@/hooks/useTailwindScreens'

export type RefinementsPanelBodyProps = Pick<
  RefinementsPanelProps,
  'dynamicWidgets'
>

export type Panels = {
  [key: string]: boolean
}

function togglePanels(panels: Panels, val: boolean) {
  return Object.keys(panels).reduce(
    (acc, panelKey) => ({ ...acc, [panelKey]: val }),
    {}
  )
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
          <ExpandablePanel
            key={panelId}
            attributes={panelAttributes}
            header={refinement.header}
            isOpened={panels[panelId]}
            className={i === 0 ? 'pt-0' : ''}
            onToggle={() => onToggle(panelId)}
          >
            {refinementWidgets}
          </ExpandablePanel>
        )
      }),
    [config.refinements, onToggle, panels]
  )

  return <DynamicWidgets>{widgets}</DynamicWidgets>
}
