import AddIcon from '@material-design-icons/svg/outlined/add.svg'
import RemoveIcon from '@material-design-icons/svg/outlined/remove.svg'
import { useAtomValue } from 'jotai/utils'
import type { CSSProperties, MouseEventHandler } from 'react'
import { useMemo, useEffect, useRef } from 'react'
import type {
  CurrentRefinementsProvided,
  SearchResults,
} from 'react-instantsearch-core'
import { connectCurrentRefinements } from 'react-instantsearch-dom'

import { Button } from '@ui/button/button'
import { Icon } from '@ui/icon/icon'

import { searchResultsAtom } from '../state-results/state-results'

import { Count } from '@/components/@ui/count/count'
import { useClassNames } from '@/hooks/useClassNames'
import { useHasRefinements } from '@/hooks/useHasRefinements'

export type ExpandablePanelProps = CurrentRefinementsProvided & {
  children: React.ReactNode
  className?: string
  header?: string
  footer?: string
  attributes?: string[]
  maxHeight?: string
  isOpened: boolean
  onToggle: MouseEventHandler
}

export const ExpandablePanel = connectCurrentRefinements<ExpandablePanelProps>(
  ({
    children,
    className,
    items,
    header,
    footer,
    attributes,
    maxHeight,
    isOpened,
    onToggle,
  }) => {
    const collapseRef = useRef<HTMLDivElement>(null)
    const gradientRef = useRef<HTMLDivElement>(null)
    const isOpenByDefault = useRef(isOpened)

    const searchResults = useAtomValue(searchResultsAtom) as SearchResults
    const hasRefinements = useHasRefinements(searchResults, attributes)

    const collapseElStyles: CSSProperties = {}
    if (typeof maxHeight !== 'undefined') {
      collapseElStyles.maxHeight = maxHeight
      collapseElStyles.overflowY = 'auto'
    }

    const currentRefinementCount = useMemo(() => {
      let count = 0

      attributes?.forEach((attribute) => {
        const tmp: string[] = []

        let currentRefinement = items.find(
          (item) => item.attribute === attribute
        )?.currentRefinement
        currentRefinement = currentRefinement
          ? tmp.concat(currentRefinement)
          : tmp

        count += currentRefinement.length
      })

      return count
    }, [items, attributes])

    useEffect(() => {
      const collapseEl = collapseRef.current
      const gradientEl = gradientRef.current

      if (!collapseEl || !gradientEl) return undefined

      const setAutoHeight = () => {
        collapseEl.style.setProperty('height', 'auto')
        gradientEl.style.setProperty('opacity', '0')
      }

      const onTransitionEnd = (ev: TransitionEvent) => {
        if (ev.target === collapseEl) {
          setAutoHeight()
        }
      }

      gradientEl.style.setProperty('opacity', '1')

      if (isOpenByDefault.current) {
        isOpenByDefault.current = false
        setAutoHeight()
      } else if (isOpened) {
        collapseEl.style.setProperty('height', `${collapseEl.scrollHeight}px`)
        collapseEl.addEventListener('transitionend', onTransitionEnd)
      } else {
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
      <div
        className={useClassNames(
          'py-3.5 laptop:py-5 laptop:border-t laptop:border-neutral-light',
          {
            hidden: !hasRefinements,
          },
          className,
          [hasRefinements, className]
        )}
      >
        <Button
          className="w-full flex items-center justify-between gap-3"
          aria-expanded={isOpened}
          onClick={(e) => onToggle(e)}
        >
          <div className="flex items-center w-full subhead laptop:small-bold laptop:uppercase">
            {header}

            {currentRefinementCount > 0 && (
              <Count className="ml-auto">{currentRefinementCount}</Count>
            )}
          </div>
          <div className="text-neutral-dark">
            {isOpened ? <Icon icon={RemoveIcon} /> : <Icon icon={AddIcon} />}
          </div>
        </Button>

        <div
          className={useClassNames(
            'relative transition-all ease-out overflow-hidden h-0 opacity-0',
            { 'opacity-100': isOpened },
            [isOpened]
          )}
          ref={collapseRef}
        >
          <div className="mt-4" style={collapseElStyles}>
            {children}
          </div>

          {footer && <div>{footer}</div>}

          <div
            ref={gradientRef}
            className="absolute bottom-0 w-full h-8 bg-gradient-to-t from-white pointer-events-none transition-opacity ease-out"
          />
        </div>
      </div>
    )
  }
)
