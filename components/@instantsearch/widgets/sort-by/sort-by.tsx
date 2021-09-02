import { memo, useRef } from 'react'
import isEqual from 'react-fast-compare'
import type { SortByProvided } from 'react-instantsearch-core'
import { connectSortBy } from 'react-instantsearch-core'

import { Select } from '@/components/@ui/select/select'

export type SortByProps = SortByProvided & {
  className?: string
}

function SortByComponent({
  items,
  currentRefinement,
  refine,
  ...props
}: SortByProps) {
  const defaultOption = useRef(
    items.find((item) => item.value === currentRefinement)
  )

  return (
    <Select
      defaultOption={defaultOption.current}
      options={items}
      prefix="Sort by:"
      onChange={(selectedOption) => refine(selectedOption.value)}
      {...props}
    />
  )
}

export const SortBy = connectSortBy(memo(SortByComponent, isEqual))
