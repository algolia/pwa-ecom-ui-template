import ArrowIcon from '@material-design-icons/svg/outlined/keyboard_arrow_right.svg'
import { useAtomValue } from 'jotai/utils'
import { memo } from 'react'
import isEqual from 'react-fast-compare'
import type { BreadcrumbProvided } from 'react-instantsearch-core'
import { connectBreadcrumb } from 'react-instantsearch-core'

import { nbHitsAtom } from '@instantsearch/widgets/virtual-stats/virtual-stats'

import { Icon } from '@/components/@ui/icon/icon'

export type BreadcrumbProps = BreadcrumbProvided

function BreadcrumbComponent({ items, refine, createURL }: BreadcrumbProps) {
  const nbHits = useAtomValue(nbHitsAtom)

  if (!items.length) return null

  const navItems = items.slice(0, -1)
  navItems.unshift({ label: 'All', value: undefined })

  const currentItem = items[items.length - 1]

  return (
    <div className="flex flex-col gap-1 capitalize my-6">
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
                refine(item.value)
              }}
            >
              {item.label}
            </a>
            {<Icon icon={ArrowIcon} className="w-4 h-4" />}
          </li>
        ))}
      </ul>

      <div>
        <span className="heading-4">{currentItem.label}</span>
        {Boolean(nbHits) && (
          <span className="subhead text-neutral-dark"> ({nbHits})</span>
        )}
      </div>
    </div>
  )
}

export const Breadcrumb = connectBreadcrumb(memo(BreadcrumbComponent, isEqual))
