import AddIcon from '@material-design-icons/svg/outlined/add.svg'
import CloseIcon from '@material-design-icons/svg/outlined/close.svg'
import FilterIcon from '@material-design-icons/svg/outlined/filter_list.svg'
import RemoveIcon from '@material-design-icons/svg/outlined/remove.svg'
import { useAtom } from 'jotai'
import { useCallback } from 'react'

import { CurrentRefinements } from '@instantsearch/widgets/current-refinements/current-refinements'
import { Button } from '@ui/button/button'
import { IconLabel } from '@ui/icon-label/icon-label'
import { Icon } from '@ui/icon/icon'

import { refinementsPanelMobileExpandedAtom } from './refinements-panel'
import { refinementsPanelsExpandedAtom } from './refinements-panel-body'

import { useLockedBody } from '@/hooks/useLockedBody'
import { Laptop, Tablet } from '@/lib/media'

export function RefinementsPanelHeader() {
  const [mobileExpanded, setMobileExpanded] = useAtom(
    refinementsPanelMobileExpandedAtom
  )
  const [refinementsPanelsExpanded, setRefinementsPanelsExpanded] = useAtom(
    refinementsPanelsExpandedAtom
  )

  useLockedBody(mobileExpanded)

  const onCloseClick = useCallback(
    () => setMobileExpanded(false),
    [setMobileExpanded]
  )

  const onTogglePanelsClick = useCallback(
    () => setRefinementsPanelsExpanded((expanded: boolean) => !expanded),
    [setRefinementsPanelsExpanded]
  )

  return (
    <header className="flex flex-col laptop:my-5 laptop:mt-0">
      <div className="flex items-center gap-1 my-6 laptop:my-0">
        <Tablet className="flex-grow">
          <div className="flex items-center justify-between">
            <IconLabel
              icon={FilterIcon}
              label="Filter &amp; Sort"
              labelPosition="right"
              labelTheme="heading-4"
              classNameIcon="w-8 h-8"
            />

            <Button onClick={onCloseClick}>
              <Icon icon={CloseIcon} className="w-8 h-8" />
            </Button>
          </div>
        </Tablet>

        <Laptop className="flex-grow flex items-center justify-between">
          <IconLabel
            icon={FilterIcon}
            label="Filters"
            labelPosition="right"
            labelTheme="body-regular"
            className="heading-5"
            classNameIcon="w-5 h-5"
          />

          <Button
            className="text-neutral-darkest"
            onClick={onTogglePanelsClick}
          >
            <IconLabel
              icon={refinementsPanelsExpanded ? RemoveIcon : AddIcon}
              label={`${refinementsPanelsExpanded ? 'Collapse' : 'Expand'} all`}
              labelPosition="left"
              labelTheme="body-regular"
            />
          </Button>
        </Laptop>
      </div>

      <Tablet>
        <CurrentRefinements header="Applied filters" className="mb-6" />
      </Tablet>
    </header>
  )
}
