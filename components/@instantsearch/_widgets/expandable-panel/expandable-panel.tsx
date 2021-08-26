import AddIcon from '@material-design-icons/svg/outlined/add.svg'
import RemoveIcon from '@material-design-icons/svg/outlined/remove.svg'
import type { CSSProperties, MouseEventHandler } from 'react'
import React, { useMemo, useEffect, useRef } from 'react'
import type { CurrentRefinementsProvided } from 'react-instantsearch-core'
import { connectCurrentRefinements } from 'react-instantsearch-dom'

import { Button } from '@ui/button/button'
import { Icon } from '@ui/icon/icon'

import { NoRefinementsHandler } from './no-refinements-handler'

import { useClassNames } from '@/hooks/useClassNames'

export type ExpandablePanelProps = CurrentRefinementsProvided & {
  children: React.ReactNode
  header?: string
  footer?: string
  attribute?: string
  maxHeight?: string
  isOpened: boolean
  onToggle: MouseEventHandler
}

export const ExpandablePanel = connectCurrentRefinements(
  ({
    children,
    items,
    header,
    footer,
    attribute,
    maxHeight,
    isOpened,
    onToggle,
  }: ExpandablePanelProps) => {
    const collapseRef = useRef<HTMLDivElement>(null)
    const gradientRef = useRef<HTMLDivElement>(null)
    const firstToggle = useRef(true)
    const hasRefinements = useRef(false)
    const isOpenByDefault = useRef(isOpened)

    const collapseElStyles: CSSProperties = {}
    if (typeof maxHeight !== 'undefined') {
      collapseElStyles.maxHeight = maxHeight
      collapseElStyles.overflowY = 'auto'
    }

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
      <div
        className={useClassNames(
          'py-3.5 laptop:py-5 laptop:border-t laptop:border-neutral-light',
          {
            hidden: !hasRefinements.current,
          },
          [hasRefinements.current]
        )}
      >
        <NoRefinementsHandler
          attribute={attribute}
          onUpdate={(value: boolean) => {
            hasRefinements.current = value
          }}
        />

        <Button
          className="w-full flex items-center justify-between gap-3 can-hover:transition-colors can-hover:hover:text-neutral-dark"
          aria-expanded={isOpened}
          onClick={(e) => {
            firstToggle.current = false
            onToggle(e)
          }}
        >
          <div className="flex items-center w-full subhead laptop:small-bold laptop:uppercase">
            {header}

            {currentRefinementCount > 0 && (
              <div className="bg-neutral-lightest w-5 h-5 small-bold rounded-full flex items-center justify-center ml-auto">
                {currentRefinementCount}
              </div>
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
