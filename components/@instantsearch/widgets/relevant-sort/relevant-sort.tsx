import InfoIcon from '@material-design-icons/svg/outlined/info.svg'
import { memo } from 'react'
import type { RelevantSortProvided } from 'react-instantsearch-core'
import { connectRelevantSort } from 'react-instantsearch-dom'

import { Button } from '@ui/button/button'
import { Icon } from '@ui/icon/icon'
import { Pill } from '@ui/pill/pill'

export type RevelantSortProps = RelevantSortProvided
function RelevantSortComponent({
  isVirtualReplica,
  isRelevantSorted,
  refine,
}: RevelantSortProps) {
  return !isVirtualReplica ? null : (
    <Pill color="nebula">
      <span className="flex items-center gap-1">
        <Icon icon={InfoIcon} />
        {isRelevantSorted
          ? 'We removed some search results to show you the most relevant ones.'
          : 'Currently showing all results.'}
      </span>

      <Button
        className="body-bold underline flex-shrink-0"
        onClick={() => refine(isRelevantSorted ? 0 : undefined)}
      >
        {isRelevantSorted ? 'See all results' : 'See relevant results'}
      </Button>
    </Pill>
  )
}

export const RelevantSort = connectRelevantSort(memo(RelevantSortComponent))
