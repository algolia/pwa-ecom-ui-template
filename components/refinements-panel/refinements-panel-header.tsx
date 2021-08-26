import CloseIcon from '@material-design-icons/svg/outlined/close.svg'
import FilterIcon from '@material-design-icons/svg/outlined/filter_list.svg'
import { useAtom } from 'jotai'
import { useCallback } from 'react'

import { Button } from '@ui/button/button'
import { Icon } from '@ui/icon/icon'

import { refinementsPanelMobileExpandedAtom } from './refinements-panel'

import { useLockedBody } from '@/hooks/useLockedBody'
import { Laptop, Tablet } from '@/lib/media'

export function RefinementsPanelHeader() {
  const [mobileExpanded, setMobileExpanded] = useAtom(
    refinementsPanelMobileExpandedAtom
  )

  useLockedBody(mobileExpanded)

  const onCloseClick = useCallback(
    () => setMobileExpanded(false),
    [setMobileExpanded]
  )

  return (
    <header className="flex items-center gap-3 my-6 laptop:my-5">
      <Icon
        icon={FilterIcon}
        className="w-6 h-6 flex-shrink-0 laptop:w-5 laptop:h-5"
      />

      <Tablet className="w-full">
        <div className="flex justify-between w-full">
          <h4>Filter &amp; Sort</h4>
          <Button onClick={onCloseClick}>
            <Icon icon={CloseIcon} />
          </Button>
        </div>
      </Tablet>
      <Laptop>
        <h6>Filters</h6>
      </Laptop>
    </header>
  )
}
