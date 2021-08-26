import { ColorRefinementList } from '@algolia/react-instantsearch-widget-color-refinement-list'
import { SizeRefinementList } from '@algolia/react-instantsearch-widget-size-refinement-list'
import { Fragment, useRef, useState } from 'react'
import {
  HierarchicalMenu,
  RefinementList,
  // @ts-expect-error
  ExperimentalDynamicWidgets,
} from 'react-instantsearch-dom'

import { ExpandablePanel } from '@instantsearch/_widgets/expandable-panel/expandable-panel'

import type { RefinementsPanelProps } from './refinements-panel'

import { useTailwindScreens } from '@/hooks/useTailwindScreens'

export type RefinementsPanelBodyProps = Pick<
  RefinementsPanelProps,
  'dynamicWidgets'
>

export type Panels = {
  [key: string]: boolean
}

export function RefinementsPanelBody({
  dynamicWidgets,
}: RefinementsPanelBodyProps) {
  const DynamicWidgets = dynamicWidgets ? ExperimentalDynamicWidgets : Fragment

  const { current: hierarchicalMenuAttributes } = useRef([
    'hierarchical_categories.lvl0',
    'hierarchical_categories.lvl1',
    'hierarchical_categories.lvl2',
  ])

  // Panels logic
  const { laptop } = useTailwindScreens()

  const [panels, setPanels] = useState<Panels>({
    categories: laptop,
    priceFilter: false,
    sizeFilter: false,
    hexColorCode: false,
  })

  function onToggle(panelId: string) {
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
  }

  return (
    <DynamicWidgets>
      <ExpandablePanel
        attributes={hierarchicalMenuAttributes}
        widget={HierarchicalMenu}
        header="Categories"
        isOpened={panels.categories}
        onToggle={() => onToggle('categories')}
      />

      <ExpandablePanel
        attribute="priceFilter"
        widget={RefinementList}
        header="Price"
        isOpened={panels.priceFilter}
        onToggle={() => onToggle('priceFilter')}
      />

      <ExpandablePanel
        attribute="sizeFilter"
        widget={SizeRefinementList}
        widgetProps={{
          limit: 8,
        }}
        header="Sizes"
        isOpened={panels.sizeFilter}
        onToggle={() => onToggle('sizeFilter')}
      />

      <ExpandablePanel
        attribute="hexColorCode"
        widget={ColorRefinementList}
        widgetProps={{
          separator: '//',
          limit: 9,
        }}
        header="Colors"
        isOpened={panels.hexColorCode}
        onToggle={() => onToggle('hexColorCode')}
      />
    </DynamicWidgets>
  )
}
