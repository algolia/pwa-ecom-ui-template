import { ColorRefinementList } from '@algolia/react-instantsearch-widget-color-refinement-list'
import FilterIcon from '@material-design-icons/svg/outlined/filter_list.svg'
import ArrowIcon from '@material-design-icons/svg/outlined/keyboard_arrow_left.svg'
import type { MouseEventHandler } from 'react'
import { Fragment, useRef, useState } from 'react'
import {
  HierarchicalMenu,
  RefinementList,
  // @ts-expect-error
  ExperimentalDynamicWidgets,
  ClearRefinements,
} from 'react-instantsearch-dom'

import { ExpandablePanel } from '@instantsearch/_widgets/expandable-panel/expandable-panel'
import { SizeRefinementList } from '@instantsearch/_widgets/size-refinement-list/size-refinement-list'
import Button from '@ui/button/button'
import Icon from '@ui/icon/icon'

import { useClassNames } from '@/hooks/useClassNames'

export interface Panels {
  [key: string]: boolean
}

export interface RefinementPanelProps {
  dynamicWidgets?: boolean
  isExpanded: boolean
  onExpand: MouseEventHandler
}

export function RefinementsPanel({
  dynamicWidgets = false,
  isExpanded,
  onExpand,
}: RefinementPanelProps): JSX.Element {
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
    isExpanded ? 'w-72' : 'w-0',
    [isExpanded]
  )

  return (
    <div className="relative flex-shrink-0">
      <Button className="absolute right-6 -top-1 z-10" onClick={onExpand}>
        <Icon
          icon={ArrowIcon}
          className={useClassNames(
            'text-neutral-dark',
            { 'rotate-180': !isExpanded },
            [isExpanded]
          )}
        />
      </Button>

      <div className={cn}>
        <div className="absolute right-0 w-16 h-full bg-gradient-to-l from-white via-white pointer-events-none" />

        <div className="w-72 laptop:pr-16">
          <div className="flex items-center gap-3 mb-5">
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
                showMore: true,
              }}
              header="Colors"
              isOpened={panels.hexColorCode}
              onToggle={() => onToggle('hexColorCode')}
            />
          </DynamicWidgets>
        </div>
      </div>
    </div>
  )
}
