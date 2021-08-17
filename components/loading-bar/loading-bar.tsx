import { memo } from 'react'
import type { StateResultsProvided } from 'react-instantsearch-core'
import { connectStateResults } from 'react-instantsearch-dom'

import { useClassNames } from '@/hooks/useClassNames'

export type LoadingBarProps = StateResultsProvided

function LoadingBarComponent({ isSearchStalled }: StateResultsProvided) {
  const cn = useClassNames(
    'loadingBar',
    {
      'loadingBar--loading': isSearchStalled,
    },
    [isSearchStalled]
  )

  return <div className={cn} />
}

export const LoadingBar = connectStateResults(memo(LoadingBarComponent))
