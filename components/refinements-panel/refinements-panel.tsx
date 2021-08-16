import { ColorRefinementList } from '@algolia/react-instantsearch-widget-color-refinement-list'
import { SizeRefinementList } from '@algolia/react-instantsearch-widget-size-refinement-list'
import FilterIcon from '@material-design-icons/svg/outlined/filter_list.svg'
// import ArrowIcon from '@material-design-icons/svg/outlined/keyboard_arrow_left.svg'
import type { MouseEventHandler } from 'react'
import { memo, Fragment, useRef, useState } from 'react'
import {
  HierarchicalMenu,
  RefinementList,
  // @ts-expect-error
  ExperimentalDynamicWidgets,
  ClearRefinements,
} from 'react-instantsearch-dom'

import { ExpandablePanel } from '@instantsearch/_widgets/expandable-panel/expandable-panel'
// import { Button } from '@ui/button/button'
import { Icon } from '@ui/icon/icon'

import { useClassNames } from '@/hooks/useClassNames'

export type Panels = {
  [key: string]: boolean
}

export type RefinementsPanelProps = {
  dynamicWidgets?: boolean
  isExpanded: boolean
  onExpand: MouseEventHandler
}

export const RefinementsPanel = memo(function RefinementsPanel({
  dynamicWidgets = false,
  isExpanded,
}: RefinementsPanelProps) {
  const [panels, setPanels] = useState<Panels>({
    categories: true,
    priceFilter: false,
    sizeFilter: false,
    hexColorCode: false,
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

  const cn = useClassNames(
    'overflow-hidden laptop:transition-width',
    isExpanded ? 'w-64' : 'w-0',
    [isExpanded]
  )
  return (
    <section className="flex-shrink-0 overflow-y-auto sticky top-header content-container">
      {/* <Button className="absolute right-6 -top-1" onClick={onExpand}>
        <Icon
          icon={ArrowIcon}
          className={useClassNames(
            'text-neutral-dark',
            { 'rotate-180': !isExpanded },
            [isExpanded]
          )}
        />
      </Button> */}

      <div className={cn}>
        <div className="absolute right-0 w-5 h-full bg-gradient-to-l from-white via-white pointer-events-none" />

        <div className="w-64 laptop:pr-5">
          <div className="flex items-center gap-3 my-5">
            <Icon icon={FilterIcon} />
            Filters
            <ClearRefinements
              className="ml-auto"
              translations={{
                reset: 'Clear All',
              }}
            />
          </div>

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
              // maxHeight="215px"
              onToggle={() => onToggle('hexColorCode')}
            />
          </DynamicWidgets>
        </div>
      </div>
    </section>
  )
})
