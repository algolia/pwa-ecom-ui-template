import { ColorRefinementList } from '@algolia/react-instantsearch-widget-color-refinement-list'
import { SizeRefinementList } from '@algolia/react-instantsearch-widget-size-refinement-list'
import CloseIcon from '@material-design-icons/svg/outlined/close.svg'
import FilterIcon from '@material-design-icons/svg/outlined/filter_list.svg'
import { atom, useAtom } from 'jotai'
import { Fragment, useCallback, useRef, useState } from 'react'
import {
  HierarchicalMenu,
  RefinementList,
  // @ts-expect-error
  ExperimentalDynamicWidgets,
} from 'react-instantsearch-dom'

import { ExpandablePanel } from '@instantsearch/_widgets/expandable-panel/expandable-panel'
import { Button } from '@ui/button/button'
import { Icon } from '@ui/icon/icon'

import { overlayAtom } from '../overlay/overlay'

import { useClassNames } from '@/hooks/useClassNames'
import { useLockedBody } from '@/hooks/useLockedBody'
import { Laptop, Tablet } from '@/lib/media'

export type Panels = {
  [key: string]: boolean
}

export type RefinementsPanelProps = {
  dynamicWidgets?: boolean
}

const refinementsPanelAtom = atom({ mobileExpanded: false })
export const refinementsPanelMobileExpandedAtom = atom(
  (get) => get(refinementsPanelAtom).mobileExpanded && get(overlayAtom).visible,
  (get, set, expanded: boolean) => {
    set(refinementsPanelAtom, { mobileExpanded: expanded })
    set(overlayAtom, { visible: expanded, zIndex: 'z-overlay-full' })
  }
)

export function RefinementsPanel({
  dynamicWidgets = false,
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

  const isExpanded = true
  const cn = useClassNames(
    'w-full laptop:overflow-hidden laptop:transition-width',
    isExpanded ? 'laptop:w-64' : 'laptop:w-0',
    [isExpanded]
  )

  const [mobileExpanded, setMobileExpanded] = useAtom(
    refinementsPanelMobileExpandedAtom
  )

  useLockedBody(mobileExpanded)

  const onCloseClick = useCallback(
    () => setMobileExpanded(false),
    [setMobileExpanded]
  )

  return (
    <section
      className={useClassNames(
        'RefinementsPanel',
        {
          'translate-x-[105%] laptop:transform-none': !mobileExpanded,
        },
        [mobileExpanded]
      )}
    >
      <div className={cn}>
        <div className="RefinementsPanel-gradient" />

        <div className="w-full laptop:w-64 laptop:pr-5">
          <header className="flex items-center gap-3 my-6 laptop:my-5">
            <Icon
              icon={FilterIcon}
              className="w-6 h-6 flex-shrink-0 laptop:w-5 laptop:h-5"
            />

            <Tablet className="w-full">
              <div className="flex justify-between w-full">
                <h4>Filters &amp; Sort</h4>
                <Button onClick={onCloseClick}>
                  <Icon icon={CloseIcon} />
                </Button>
              </div>
            </Tablet>
            <Laptop>
              <h6>Filters</h6>
            </Laptop>
          </header>

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
        </div>
      </div>
    </section>
  )
}
