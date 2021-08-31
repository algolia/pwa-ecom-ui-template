import FilterIcon from '@material-design-icons/svg/outlined/filter_list.svg'
import { useAtomValue, useUpdateAtom } from 'jotai/utils'

import {
  CurrentRefinements,
  refinementCountAtom,
} from '@instantsearch/_widgets/current-refinements/current-refinements'
import { Button } from '@ui/button/button'
import { Count } from '@ui/count/count'
import { IconLabel } from '@ui/icon-label/icon-label'

import { RefinementsBarToggleFilters } from './refinements-bar-toggle-filters'

import { refinementsPanelMobileExpandedAtom } from '@/components/refinements-panel/refinements-panel'
import { useClassNames } from '@/hooks/useClassNames'
import { Laptop, Tablet } from '@/lib/media'

export type RefinementsBarProps = {
  className?: string
}

export function RefinementsBar({ className }: RefinementsBarProps) {
  const setMobileExpanded = useUpdateAtom(refinementsPanelMobileExpandedAtom)
  const refinementCount = useAtomValue(refinementCountAtom)

  return (
    <section
      className={useClassNames('w-full laptop:px-3', className, [className])}
    >
      <Tablet>
        <Button
          className="flex items-center gap-1 ml-auto"
          onClick={() => setMobileExpanded(true)}
        >
          <IconLabel
            icon={FilterIcon}
            label="Filter &amp; Sort"
            labelPosition="right"
            labelTheme="body-regular"
          />
          {refinementCount > 0 && <Count>{refinementCount}</Count>}
        </Button>
      </Tablet>

      <Laptop className="min-h-[38px] flex items-center">
        <CurrentRefinements />
        <RefinementsBarToggleFilters />
      </Laptop>
    </section>
  )
}
