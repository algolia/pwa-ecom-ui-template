import AddIcon from '@material-design-icons/svg/outlined/add.svg'
import RemoveIcon from '@material-design-icons/svg/outlined/remove.svg'
import type { ComponentType, MouseEventHandler } from 'react'
import { useMemo, useEffect, useRef } from 'react'
import type {
  CurrentRefinementsProvided,
  StateResultsProvided,
} from 'react-instantsearch-core'
import {
  connectCurrentRefinements,
  connectStateResults,
} from 'react-instantsearch-dom'

import Button from '@ui/button/button'
import Icon from '@ui/icon/icon'

import { useClassNames } from '@/hooks/useClassNames'

export interface ExpandablePanelProps extends CurrentRefinementsProvided {
  attribute?: string
  attributes?: string[]
  widget: ComponentType<any>
  widgetProps?: Record<string, any>
  isOpened: boolean
  onToggle: MouseEventHandler
  header?: string
  footer?: string
}

interface NoRefinementsHandlerProps extends StateResultsProvided {
  attribute?: string
  onUpdate: (hasRefinements: boolean) => void
}

const NoRefinementsHandler = connectStateResults(
  ({ searchResults, attribute, onUpdate }: NoRefinementsHandlerProps) => {
    const disjunctiveFacets = searchResults.disjunctiveFacets
    const hierarchicalFacets = searchResults.hierarchicalFacets

    const facets = useMemo(
      () => [...disjunctiveFacets, ...hierarchicalFacets],
      [disjunctiveFacets, hierarchicalFacets]
    )

    const hasRefinements = useMemo(() => {
      let found = false
      facets.forEach((facet) => {
        if (facet.name === attribute && facet.data) {
          found = true
        }
      })
      return found
    }, [facets, attribute])

    onUpdate(hasRefinements)

    return null
  }
)

export const ExpandablePanel = connectCurrentRefinements(
  ({
    items,
    attribute,
    attributes,
    widget: WidgetComponent,
    widgetProps = {},
    isOpened,
    onToggle,
    header,
    footer,
  }: ExpandablePanelProps): JSX.Element => {
    const collapseRef = useRef<HTMLDivElement>(null)
    const gradientRef = useRef<HTMLDivElement>(null)
    const firstToggle = useRef(true)
    const hasRefinements = useRef(false)

    const isOpenByDefault = useRef(isOpened)

    let attr = attribute
    if (attributes?.length) {
      attr = attributes[0]
    }

    const currentRefinementCount = useMemo(() => {
      const arr: string[] = []

      let currentRefinement = items.find(
        (item) => item.attribute === attr
      )?.currentRefinement
      currentRefinement = currentRefinement
        ? arr.concat(currentRefinement)
        : arr

      return currentRefinement.length
    }, [items, attr])

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
          'py-5 border-t border-neutral-light',
          {
            hidden: !hasRefinements.current,
          },
          [hasRefinements.current]
        )}
      >
        <NoRefinementsHandler
          attribute={attr}
          onUpdate={(value: boolean) => {
            hasRefinements.current = value
          }}
        />

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
              {header ?? attribute}
              {currentRefinementCount > 0 && ` (${currentRefinementCount})`}
            </div>
            <div className="text-neutral-dark">
              {isOpened ? <Icon icon={RemoveIcon} /> : <Icon icon={AddIcon} />}
            </div>
          </Button>
        </div>

        <div
          className={useClassNames(
            'relative transition-all ease-out overflow-hidden h-0 opacity-0',
            { 'opacity-100': isOpened },
            [isOpened]
          )}
          ref={collapseRef}
        >
          <div className="mt-4">
            <WidgetComponent
              attribute={attribute}
              attributes={attributes}
              {...widgetProps}
            />
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
