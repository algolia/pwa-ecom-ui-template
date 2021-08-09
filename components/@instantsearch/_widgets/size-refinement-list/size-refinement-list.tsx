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
  ({ items, refine, canRefine }: SizeRefinementListProps) => {
    return (
      <ul className="flex flex-wrap gap-3 p-px" role="group">
        {items.map(({ label, value, isRefined }: RefinementListItem) => (
          <li key={label} className="flex flex-grow justify-center">
            <Button
              type="item"
              size="small"
              disabled={!canRefine}
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
