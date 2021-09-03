import { atom } from 'jotai'
import { selectAtom, useUpdateAtom } from 'jotai/utils'
import { memo, useEffect } from 'react'
import isEqual from 'react-fast-compare'
import type { StatsProvided } from 'react-instantsearch-core'
import { connectStats } from 'react-instantsearch-core'

export type VirtualStatsProps = StatsProvided

export const statsAtom = atom<Partial<StatsProvided>>({
  processingTimeMS: undefined,
  nbHits: undefined,
  nbSortedHits: undefined,
  areHitsSorted: undefined,
})

export const nbHitsAtom = selectAtom(statsAtom, ({ nbHits }) => nbHits, isEqual)

function VirtualStatsComponent({
  processingTimeMS,
  nbHits,
  nbSortedHits,
  areHitsSorted,
}: VirtualStatsProps) {
  const setStats = useUpdateAtom(statsAtom)

  useEffect(() => {
    setStats({
      processingTimeMS,
      nbHits,
      nbSortedHits,
      areHitsSorted,
    })
  }, [setStats, processingTimeMS, nbHits, nbSortedHits, areHitsSorted])

  return null
}

export const VirtualStats = connectStats(memo(VirtualStatsComponent))
