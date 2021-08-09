import { Fragment, useRef, useState } from 'react'
import {
  HierarchicalMenu,
  RefinementList,
  // @ts-expect-error
  ExperimentalDynamicWidgets,
} from 'react-instantsearch-dom'

import { ExpandablePanel } from '../@instantsearch/_widgets/expandable-panel/expandable-panel'
import { SizeRefinementList } from '../@instantsearch/_widgets/size-refinement-list/size-refinement-list'

export interface Panels {
  [key: string]: boolean
}

export interface RefinementPanelProps {
  dynamicWidgets?: boolean
}

export function RefinementsPanel({
  dynamicWidgets = false,
}: RefinementPanelProps): JSX.Element {
  const [panels, setPanels] = useState<Panels>({
    categories: true,
    priceFilter: false,
    sizeFilter: false,
  })

  function onToggle(panelId: string) {
    setPanels((prevPanels) => {
      return {
        ...prevPanels,
        [panelId]: !prevPanels[panelId],
      }
    })
  }

  const { current: hierarchicalMenuAttributes } = useRef([
    'hierarchical_categories.lvl0',
    'hierarchical_categories.lvl1',
    'hierarchical_categories.lvl2',
  ])

  const DynamicWidgets = dynamicWidgets ? ExperimentalDynamicWidgets : Fragment

  return (
    <div className="w-60 flex-shrink-0">
      <DynamicWidgets>
        <ExpandablePanel
          attribute="hierarchical_categories.lvl0"
          header="Categories"
          isOpened={panels.categories}
          onToggle={() => onToggle('categories')}
        >
          <HierarchicalMenu attributes={hierarchicalMenuAttributes} />
        </ExpandablePanel>

        <ExpandablePanel
          attribute="priceFilter"
          header="Price"
          isOpened={panels.priceFilter}
          onToggle={() => onToggle('priceFilter')}
        >
          <RefinementList attribute="priceFilter" />
        </ExpandablePanel>

        <ExpandablePanel
          attribute="sizeFilter"
          header="Sizes"
          isOpened={panels.sizeFilter}
          onToggle={() => onToggle('sizeFilter')}
        >
          <SizeRefinementList attribute="sizeFilter" />
        </ExpandablePanel>
      </DynamicWidgets>
    </div>
  )
}
