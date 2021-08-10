import AddIcon from '@material-design-icons/svg/outlined/add.svg'
import RemoveIcon from '@material-design-icons/svg/outlined/remove.svg'
import type { MouseEventHandler } from 'react'
import { useMemo, useEffect, useRef } from 'react'
import type { CurrentRefinementsProvided } from 'react-instantsearch-core'
import { connectCurrentRefinements } from 'react-instantsearch-dom'

import Button from '@ui/button/button'
import Icon from '@ui/icon/icon'

import { useClassNames } from '@/hooks/useClassNames'

export interface ExpandablePanelProps extends CurrentRefinementsProvided {
  attribute: string
  isOpened: boolean
  onToggle: MouseEventHandler
  header: string
  children: React.ReactNode
  footer?: string
}

export const ExpandablePanel = connectCurrentRefinements(
  ({
    items,
    attribute,
    isOpened,
    onToggle,
    header,
    children,
    footer,
  }: ExpandablePanelProps): JSX.Element => {
    const collapseRef = useRef<HTMLDivElement>(null)
    const firstToggle = useRef(true)
    const cn = useClassNames(
      'transition-height ease-out overflow-hidden h-0',
      []
    )

    const currentRefinementCount = useMemo(() => {
      const arr: string[] = []

      let currentRefinement = items.find(
        (item) => item.attribute === attribute
      )?.currentRefinement
      currentRefinement = currentRefinement
        ? arr.concat(currentRefinement)
        : arr

      return currentRefinement.length
    }, [items, attribute])

    useEffect(() => {
      const collapseEl = collapseRef.current
      if (!collapseEl) return undefined

      const onTransitionEnd = (ev: TransitionEvent) => {
        if (ev.target === collapseEl) {
          collapseEl.style.setProperty('height', 'auto')
        }
      }

      if (isOpened) {
        collapseEl.style.setProperty('height', `${collapseEl.scrollHeight}px`)
        collapseEl.addEventListener('transitionend', onTransitionEnd)
      } else if (!firstToggle.current) {
        collapseEl.style.setProperty('height', `${collapseEl.scrollHeight}px`)
        window.requestAnimationFrame(() =>
          collapseEl.style.setProperty('height', '0px')
        )
      }

      return () => {
        collapseEl.removeEventListener('transitionend', onTransitionEnd)
      }
    }, [isOpened])

    return (
      <div className="py-8 border-t border-neutral-light">
        <div>
          <Button
            className="w-full flex items-center justify-between"
            aria-expanded={isOpened}
            onClick={(e) => {
              firstToggle.current = false
              onToggle(e)
            }}
          >
            <div className="small-bold uppercase">
              {header}
              {currentRefinementCount > 0 && ` (${currentRefinementCount})`}
            </div>
            <div className="text-neutral-dark">
              {isOpened ? <Icon icon={RemoveIcon} /> : <Icon icon={AddIcon} />}
            </div>
          </Button>
        </div>

        <div className={cn} ref={collapseRef}>
          <div className="mt-4">{children}</div>
          {footer && <div>{footer}</div>}
        </div>
      </div>
    )
  }
)
