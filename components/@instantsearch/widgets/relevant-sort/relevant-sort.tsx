import classNames from 'classnames'
import { memo } from 'react'
import type { RelevantSortProvided } from 'react-instantsearch-core'
import { connectRelevantSort } from 'react-instantsearch-dom'

import { Button } from '@/components/@ui/button/button'

export type RevelantSortProps = RelevantSortProvided & {
  className?: string
}

function RelevantSortComponent({
  isVirtualReplica,
  isRelevantSorted,
  refine,
  className,
}: RevelantSortProps) {
  return !isVirtualReplica ? null : (
    <div className={classNames('flex gap-3 small-regular', className)}>
      <div>
        {isRelevantSorted
          ? 'We removed some search results to show you the most relevant ones.'
          : 'Currently showing all results.'}
      </div>
      <Button
        className="small-bold underline"
        onClick={() => refine(isRelevantSorted ? 0 : undefined)}
      >
        {isRelevantSorted ? 'See all results' : 'See relevant results'}
      </Button>
    </div>
  )
}

export const RelevantSort = connectRelevantSort(memo(RelevantSortComponent))
