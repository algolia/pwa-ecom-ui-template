import MenuIcon from '@material-design-icons/svg/outlined/menu.svg'
import classNames from 'classnames'
import { m } from 'framer-motion'
import { atom } from 'jotai'
import { useAtomValue, useUpdateAtom } from 'jotai/utils'
import { useRouter } from 'next/router'
import { useCallback, useMemo, useRef } from 'react'

import { AutocompleteBasic } from '@autocomplete/basic/autocomplete-basic'
import { Button } from '@ui/button/button'
import { IconLabel } from '@ui/icon-label/icon-label'

import { NavItem } from './nav-item'

import { searchQueryAtom } from '@/components/@instantsearch/hooks/useUrlSync'
import { overlayAtom } from '@/components/overlay/overlay'
import { configAtom } from '@/config/config'
import { useIsMounted } from '@/hooks/useIsMounted'
import { searchClientAtom } from '@/layouts/app-layout'
import { Laptop, Tablet } from '@/lib/media'

const transition = {
  type: 'spring',
  duration: 0.6,
}

const isFocusedAtom = atom(false)
const isExpandedAtom = atom(
  (get) => get(isFocusedAtom) || Boolean(get(searchQueryAtom))
)

export function NavBottom() {
  // Router
  const router = useRouter()
  const isHomePage = useMemo(() => router?.route === '/', [router?.route])

  // Get app state
  const { autocomplete: autocompleteConfig } = useAtomValue(configAtom)
  const { current: initialQuery } = useRef(useAtomValue(searchQueryAtom))
  const searchClient = useAtomValue(searchClientAtom)

  // Autocomplete expand on focused
  // Wait for the component to be mounted,
  // otherwise we have a mismatch between server/client HTML
  const isMounted = useIsMounted()
  const isExpanded = useAtomValue(isExpandedAtom) && isMounted()

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
      router.push(`/catalog?q=${query}`)
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
          initialQuery={initialQuery}
          searchClient={searchClient}
          placeholders={autocompleteConfig.placeholders}
          hidePanel={!isHomePage}
          onFocusBlur={handleFocusBlur}
          onSelect={handleSelect}
        />
      </m.div>
    </div>
  )
}
