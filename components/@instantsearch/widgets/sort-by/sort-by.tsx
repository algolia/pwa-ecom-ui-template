import SortIcon from '@material-design-icons/svg/outlined/sort.svg'
import classNames from 'classnames'
import { memo, useCallback, useMemo } from 'react'
import isEqual from 'react-fast-compare'
import type { SortByProvided } from 'react-instantsearch-core'
import { connectSortBy } from 'react-instantsearch-core'

import { ExpandablePanel } from '@instantsearch/widgets/expandable-panel/expandable-panel'

import { IconLabel } from '@/components/@ui/icon-label/icon-label'
import { Select } from '@/components/@ui/select/select'

export type SortByView = 'dropdown' | 'select'

export type SortByProps = SortByProvided & {
  className?: string
  isOpened?: boolean
  view: SortByView
}

function SortByComponent({
  items,
  currentRefinement,
  refine,
  view,
  createURL,
  className,
  isOpened,
  ...props
}: SortByProps) {
  const currentOption = useMemo(
    () => items.find((item) => item.value === currentRefinement),
    [items, currentRefinement]
  )
  const refinedOption = items.find((item) => item.isRefined)

  const handleSelectChange = useCallback(
    (selectedOption) => {
      refine(selectedOption.value)
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  )

  return view === 'dropdown' ? (
    <ExpandablePanel
      header={
        <div className="flex flex-col items-start">
          <div>Sort</div>
          {!isOpened && (
            <div className="body-regular font-normal">
              {refinedOption?.label}
            </div>
          )}
        </div>
      }
      isOpened={isOpened}
      {...props}
    >
      <ul className="flex flex-col gap-4">
        {items.map((item) => (
          <li key={item.value}>
            <a
              href={createURL(item.value)}
              className={classNames({ 'font-bold': item.isRefined })}
              onClick={(e) => {
                e.preventDefault()
                refine(item.value)
              }}
            >
              {item.label}
            </a>
          </li>
        ))}
      </ul>
    </ExpandablePanel>
  ) : (
    <Select
      options={items}
      currentOption={currentOption}
      prefix={
        <IconLabel
          icon={SortIcon}
          label="Sort:"
          labelPosition="right"
          labelTheme="label-regular"
          classNameIcon="w-4 h-4"
        />
      }
      className={className}
      onChange={handleSelectChange}
      {...props}
    />
  )
}

export const SortBy = connectSortBy(memo(SortByComponent, isEqual))
