import { useAtomValue, useUpdateAtom } from 'jotai/utils'
import { useCallback } from 'react'
import type { InfiniteHitsProvided } from 'react-instantsearch-core'

import { searchStateAtom } from '@instantsearch/hooks/useUrlSync'
import { isSearchStalledAtom } from '@instantsearch/widgets/virtual-state-results/virtual-state-results'

import { Button } from '@/components/@ui/button/button'
import type { ProductHitProps } from '@/components/product/product-hit'

export type LoadLessProps = Pick<
  InfiniteHitsProvided<ProductHitProps>,
  'hasPrevious' | 'refinePrevious'
>

export function LoadLess({ hasPrevious, refinePrevious }: LoadLessProps) {
  const setSearchState = useUpdateAtom(searchStateAtom)
  const isSearchStalled = useAtomValue(isSearchStalledAtom)

  const handleGoToFirstPage = useCallback(
    () =>
      setSearchState((currentSearchState) => ({
        ...currentSearchState,
        page: 1,
      })),
    [setSearchState]
  )

  const handleLoadPrevious = useCallback(
    () => refinePrevious(),
    [refinePrevious]
  )

  if (!hasPrevious) return null

  return (
    <div className="flex justify-center gap-4 mb-7">
      <Button
        type="secondary"
        disabled={isSearchStalled}
        onClick={handleGoToFirstPage}
      >
        Go to first page
      </Button>

      <Button
        type="primary"
        disabled={isSearchStalled}
        onClick={handleLoadPrevious}
      >
        {isSearchStalled ? 'Loading' : 'Load previous'}
      </Button>
    </div>
  )
}
