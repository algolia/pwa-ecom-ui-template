import { useAtomValue, useUpdateAtom } from 'jotai/utils'
import { memo, useCallback, useMemo } from 'react'
import isEqual from 'react-fast-compare'
import type { BreadcrumbProvided, SearchState } from 'react-instantsearch-core'
import { connectBreadcrumb } from 'react-instantsearch-core'

import { nbHitsAtom } from '@instantsearch/widgets/virtual-stats/virtual-stats'

import {
  searchQueryAtom,
  searchStateAtom,
} from '@/components/@instantsearch/hooks/useUrlSync'
import { Button } from '@/components/@ui/button/button'
import { Icon } from '@/components/@ui/icon/icon'
import { ClientOnly } from '@/components/client-only/client-only'
import CloseIcon from '~icons/ic/outline-close'
import ArrowIcon from '~icons/ic/outline-keyboard-arrow-right'

export type BreadcrumbProps = BreadcrumbProvided

function BreadcrumbComponent({ items, refine, createURL }: BreadcrumbProps) {
  const nbHits = useAtomValue(nbHitsAtom)
  const currentQuery = useAtomValue(searchQueryAtom)
  const setSearchState = useUpdateAtom(searchStateAtom)

  const handleCloseClick = useCallback(() => {
    setSearchState((currentSearchState: SearchState) => ({
      ...currentSearchState,
      query: '',
    }))
  }, [setSearchState])

  const navItems = useMemo(() => {
    const arr = currentQuery ? items.slice(0) : items.slice(0, -1)
    arr.unshift({ label: 'All', value: undefined })
    return arr
  }, [items, currentQuery])

  const currentItem = useMemo(() => items[items.length - 1], [items])

  if (!currentQuery && !items.length) return null

  return (
    <ClientOnly>
      <div className="flex flex-col gap-1 capitalize mt-3 laptop:mt-6">
        <ul className="flex items-center gap-1 text-neutral-dark">
          {navItems.map((item) => (
            <li
              key={item.value || item.label}
              className="flex items-center gap-1"
            >
              <a
                href={createURL(item.value)}
                className="can-hover:transition-colors can-hover:hover:text-brand-black"
                onClick={(event) => {
                  event.preventDefault()
                  if (currentQuery && !items.length) {
                    handleCloseClick()
                  } else {
                    refine(item.value)
                  }
                }}
              >
                {item.label}
              </a>
              {<Icon icon={ArrowIcon} className="w-4 h-4" />}
            </li>
          ))}
        </ul>

        <div className="flex items-center">
          <span className="heading-4 mr-1">
            {currentQuery ? `“${currentQuery}”` : currentItem?.label}
          </span>
          {Boolean(nbHits) && (
            <span className="subhead text-neutral-dark"> ({nbHits})</span>
          )}
          {Boolean(currentQuery) && (
            <Button onClick={handleCloseClick}>
              <Icon icon={CloseIcon} className="ml-1.5 w-5 h-5" />
            </Button>
          )}
        </div>
      </div>
    </ClientOnly>
  )
}

export const Breadcrumb = connectBreadcrumb(memo(BreadcrumbComponent, isEqual))
