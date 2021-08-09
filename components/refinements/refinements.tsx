import { useRef, useState } from 'react'
import {
  HierarchicalMenu,
  RefinementList,
  // @ts-expect-error
  // ExperimentalDynamicWidgets,
} from 'react-instantsearch-dom'

import Panel from './panel'

interface Panels {
  [key: string]: boolean
}

export default function Refinements(): JSX.Element {
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

  return (
    <div className="w-60 flex-shrink-0">
      {/* <ExperimentalDynamicWidgets> */}
      <Panel
        attribute="hierarchical_categories.lvl0"
        header="Categories"
        isOpened={panels.categories}
        onToggle={() => onToggle('categories')}
      >
        <HierarchicalMenu attributes={hierarchicalMenuAttributes} />
      </Panel>

      <Panel
        attribute="priceFilter"
        header="Price"
        isOpened={panels.priceFilter}
        onToggle={() => onToggle('priceFilter')}
      >
        <RefinementList attribute="priceFilter" />
      </Panel>

      <Panel
        attribute="sizeFilter"
        header="Sizes"
        isOpened={panels.sizeFilter}
        onToggle={() => onToggle('sizeFilter')}
      >
        <RefinementList attribute="sizeFilter" searchable={true} />
      </Panel>
      {/* </ExperimentalDynamicWidgets> */}
    </div>
  )
}
