import type {
  RefinementListProvided,
  RefinementListExposed,
} from 'react-instantsearch-core'
import { connectRefinementList } from 'react-instantsearch-dom'

import Button from '@/components/@ui/button/button'

type SizeRefinementListProps = RefinementListProvided & RefinementListExposed

type RefinementListItem = RefinementListProvided['items'][0] & {
  label: string
}

export const SizeRefinementList = connectRefinementList(
  ({ items, refine }: SizeRefinementListProps) => {
    return (
      <ul className="grid grid-cols-4 gap-3 p-px" role="group">
        {items.map(({ label, value, isRefined }: RefinementListItem) => (
          <li key={label} className="flex justify-center">
            <Button
              type="item"
              size="small"
              selected={isRefined}
              role="menuitemcheckbox"
              aria-label={`Refine on ${label}`}
              aria-checked={isRefined}
              className="w-full"
              onClick={() => refine(value)}
            >
              {label}
            </Button>
          </li>
        ))}
      </ul>
    )
  }
)
