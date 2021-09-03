import { memo, useCallback } from 'react'
import isEqual from 'react-fast-compare'
import type { CurrentRefinementsProvided } from 'react-instantsearch-core'
import { connectCurrentRefinements } from 'react-instantsearch-dom'

import type { ButtonType } from '@/components/@ui/button/button'
import { Button } from '@/components/@ui/button/button'

export type ClearRefinementsProps = CurrentRefinementsProvided & {
  children: React.ReactNode
  type?: ButtonType
  className?: string
}

function ClearRefinementsComponent({
  children,
  type = 'native',
  className,
  items,
  refine,
}: ClearRefinementsProps) {
  const handleButtonClick = useCallback(() => refine(items), [refine, items])

  return (
    <Button
      type={type}
      disabled={!items.length}
      className={className}
      onClick={handleButtonClick}
    >
      {children}
    </Button>
  )
}

export const ClearRefinements =
  connectCurrentRefinements<ClearRefinementsProps>(
    memo(ClearRefinementsComponent, isEqual)
  )
