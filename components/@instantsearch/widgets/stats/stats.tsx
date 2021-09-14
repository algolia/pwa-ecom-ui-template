import classNames from 'classnames'
import { useAtomValue } from 'jotai/utils'

import { statsAtom } from '@instantsearch/widgets/virtual-stats/virtual-stats'

export type StatsProps = {
  className?: string
}

export function Stats({ className }: StatsProps) {
  const { processingTimeMS, nbHits, nbSortedHits, areHitsSorted } =
    useAtomValue(statsAtom)

  if (!nbHits) return null

  return (
    <div className={classNames('small-regular text-neutral-dark', className)}>
      {areHitsSorted && nbHits !== nbSortedHits
        ? `${nbSortedHits?.toLocaleString()} relevant results sorted out of ${nbHits?.toLocaleString()} found in ${processingTimeMS?.toLocaleString()}ms`
        : `${nbHits?.toLocaleString()} results found in ${processingTimeMS?.toLocaleString()} ms`}
    </div>
  )
}
