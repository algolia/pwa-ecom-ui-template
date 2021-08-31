import type { CurrentRefinementsProvided } from 'react-instantsearch-core'
import { connectCurrentRefinements } from 'react-instantsearch-dom'

import type { ButtonType } from '@/components/@ui/button/button'
import { Button } from '@/components/@ui/button/button'

export type ClearRefinementsProps = CurrentRefinementsProvided & {
  children: React.ReactNode
  type?: ButtonType
  className?: string
}

export const ClearRefinements =
  connectCurrentRefinements<ClearRefinementsProps>(
    ({ children, type = 'native', className, items, refine }) => {
      return (
        <Button
          type={type}
          disabled={!items.length}
          className={className}
          onClick={() => refine(items)}
        >
          {children}
        </Button>
      )
    }
  )
