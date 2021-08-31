import { useAtomValue } from 'jotai/utils'

import { isSearchStalledAtom } from '@instantsearch/_widgets/state-results/state-results'

import { useClassNames } from '@/hooks/useClassNames'

export function LoadingBar() {
  const isSearchStalled = useAtomValue(isSearchStalledAtom)
  const cn = useClassNames(
    'loadingBar',
    {
      'loadingBar--loading': isSearchStalled,
    },
    [isSearchStalled]
  )

  return <div className={cn} />
}
