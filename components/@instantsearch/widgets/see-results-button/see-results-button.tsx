import type { MouseEventHandler } from 'react'
import { memo } from 'react'
import type { StatsProvided } from 'react-instantsearch-core'
import { connectStats } from 'react-instantsearch-dom'

import { Button } from '@/components/@ui/button/button'

export type SeeResultsButtonProps = StatsProvided & {
  onClick: MouseEventHandler<HTMLButtonElement>
}

function SeeResultsButtonComponent({ nbHits, onClick }: SeeResultsButtonProps) {
  return (
    <Button
      type="primary"
      size="large"
      className="!px-2 flex-grow"
      onClick={onClick}
    >
      See {nbHits.toLocaleString()} Product{nbHits > 0 && 's'}
    </Button>
  )
}

export const SeeResultsButton = connectStats<SeeResultsButtonProps>(
  memo(SeeResultsButtonComponent)
)
