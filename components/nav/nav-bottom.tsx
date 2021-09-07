import MenuIcon from '@material-design-icons/svg/outlined/menu.svg'
import classNames from 'classnames'
import { m } from 'framer-motion'
import { atom } from 'jotai'
import { useAtomValue, useUpdateAtom } from 'jotai/utils'
import { useRouter } from 'next/router'
import { useCallback, useMemo } from 'react'

import { AutocompleteBasic } from '@autocomplete/basic/autocomplete-basic'
import { Button } from '@ui/button/button'
import { IconLabel } from '@ui/icon-label/icon-label'

import { NavItem } from './nav-item'

import {
  initialSearchStateAtom,
  searchQueryAtom,
} from '@/components/@instantsearch/search'
import { overlayAtom } from '@/components/overlay/overlay'
import { configAtom } from '@/config/config'
import { searchClientAtom } from '@/layouts/app-layout'
import { Laptop, Tablet } from '@/lib/media'

const transition = {
  type: 'spring',
  duration: 0.6,
}

const isFocusedAtom = atom(false)
const isExpandedAtom = atom((get) => get(isFocusedAtom) || get(searchQueryAtom))

export function NavBottom() {
  const router = useRouter()
  const { autocomplete: autocompleteConfig } = useAtomValue(configAtom)
  const isHomePage = useMemo(() => router?.route === '/', [router?.route])

  const searchClient = useAtomValue(searchClientAtom)

  const initialSearchState = useAtomValue(initialSearchStateAtom)
  const initialQuery = initialSearchState?.query

  // Autocomplete expand on focus
  const isExpanded = useAtomValue(isExpandedAtom)

  const setIsFocused = useUpdateAtom(isFocusedAtom)
  const setOverlay = useUpdateAtom(overlayAtom)

  const handleFocusBlur = useCallback((focused: boolean) => {
    setIsFocused(focused)
    setOverlay({ visible: focused, zIndex: 'z-overlay-header' })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleSelect = useCallback(
    (query: string = '') => {
      setOverlay({ visible: false })
      router.push(`/search?query=${query}`)
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  )

  const autocompleteCn = classNames(
    'w-full pl-2.5 laptop:w-80 laptop:p-0 laptop:ease-out laptop:absolute laptop:right-0',
    { focused: isExpanded }
  )

  // Render
  return (
    <div className="flex items-center px-4 relative divide-x border-b border-neutral-light laptop:h-12 laptop:mx-20 laptop:mb-5 laptop:px-0 laptop:justify-between laptop:border-none laptop:divide-none">
      <Tablet>
        <Button className="p-3 pl-0">
          <IconLabel icon={MenuIcon} label="Menu" labelPosition="right" />
        </Button>
      </Tablet>

      <Laptop>
        <nav>
          <ul className="flex gap-6 small-uppercase">
            <NavItem label="Sale" />
            <NavItem label="New In" href="/new-in" />
            <NavItem label="Clothing" />
            <NavItem label="Shoes" />
            <NavItem label="Accessories" />
            <NavItem label="Brands" />
          </ul>
        </nav>
      </Laptop>

      <m.div
        className={autocompleteCn}
        animate={{ width: isExpanded ? '90%' : '20rem' }}
        transition={transition}
      >
        <div className="hidden absolute w-24 h-full -translate-x-full bg-gradient-to-l from-white laptop:block" />
        <AutocompleteBasic
          searchClient={searchClient}
          initialQuery={initialQuery}
          placeholders={autocompleteConfig.placeholders}
          hidePanel={!isHomePage}
          onFocusBlur={handleFocusBlur}
          onSelect={handleSelect}
        />
      </m.div>
    </div>
  )
}
