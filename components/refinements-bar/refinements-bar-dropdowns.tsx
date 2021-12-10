import FilterIcon from '@material-design-icons/svg/outlined/filter_list.svg'
import classNames from 'classnames'
import { useAtomValue } from 'jotai/utils'
import { useCallback, useMemo, useState } from 'react'

import { useGetRefinementWidgets } from '@instantsearch/hooks/useGetRefinementWidgets'
import {
  getPanelAttributes,
  getPanelId,
} from '@instantsearch/utils/refinements'
import { DynamicWidgets } from '@instantsearch/widgets/dynamic-widgets/dynamic-widgets'
import { RefinementsDropdown } from '@instantsearch/widgets/refinements-dropdown/dropdown-refinements'
import { Button } from '@ui/button/button'
import { IconLabel } from '@ui/icon-label/icon-label'

import { configAtom } from '@/config/config'

export type RefinementsBarDropdownsProps = {
  dynamicWidgets?: boolean
  showMore?: boolean
  limit?: number
}

export function RefinementsBarDropdowns({
  dynamicWidgets,
  showMore = true,
  limit = 4,
}: RefinementsBarDropdownsProps) {
  const { refinements } = useAtomValue(configAtom)
  const [showAll, setShowAll] = useState(!showMore)

  const handleShowMoreClick = useCallback(() => setShowAll((v) => !v), [])

  const widgets = useGetRefinementWidgets(refinements)
  const widgetsDropdowns = useMemo(
    () =>
      widgets.map((widget, i) => {
        const refinement = refinements[i]
        const panelId = getPanelId(refinement)
        const panelAttributes = getPanelAttributes(refinement)

        return (
          <RefinementsDropdown
            key={panelId}
            attributes={panelAttributes}
            header={refinement.header}
            className={classNames({ hidden: !showAll && limit <= i })}
            classNameContainer="w-52"
          >
            {widget}
          </RefinementsDropdown>
        )
      }),
    [widgets, refinements, showAll, limit]
  )

  return (
    <div className="flex gap-4">
      <DynamicWidgets enabled={dynamicWidgets} className="flex gap-4">
        {widgetsDropdowns}
      </DynamicWidgets>

      {showMore && widgets.length > limit && (
        <Button onClick={handleShowMoreClick}>
          <IconLabel
            icon={FilterIcon}
            label={`${showAll ? 'Less' : 'More'} filters`}
            labelPosition="left"
            classNameLabel="small-bold"
            classNameIcon="w-4 h-4"
          />
        </Button>
      )}
    </div>
  )
}
