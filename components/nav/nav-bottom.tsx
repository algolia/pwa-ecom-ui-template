import classNames from 'classnames'
import { m } from 'framer-motion'
import { atom, useAtom } from 'jotai'
import { useAtomValue, useUpdateAtom } from 'jotai/utils'
import { useRouter } from 'next/router'
import { useCallback, useEffect, useMemo, useRef } from 'react'

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
import { parseUrl } from '@/utils/parseUrl'
import MenuIcon from '~icons/ic/outline-menu'

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
  const isHomePage = useMemo(() => router?.pathname === '/', [router?.pathname])

  // Get app state
  const { autocomplete: autocompleteConfig } = useAtomValue(configAtom)
  const { current: initialQuery } = useRef(useAtomValue(searchQueryAtom))
  const searchClient = useAtomValue(searchClientAtom)

  // Autocomplete expand on focused
  // Wait for the component to be mounted,
  // otherwise we have a mismatch between server/client HTML
  const isMounted = useIsMounted()
  const isExpanded = useAtomValue(isExpandedAtom) && isMounted()

  const [isFocused, setIsFocused] = useAtom(isFocusedAtom)
  const setOverlay = useUpdateAtom(overlayAtom)

  // Show/hide overlay when autocomplete is focused/blurred
  useEffect(() => {
    setOverlay({
      visible: isFocused && isHomePage,
      zIndex: 'z-overlay-header',
    })
  }, [setOverlay, isFocused, isHomePage])

  // Handlers
  const handleFocusBlur = useCallback(
    (focused: boolean) => setIsFocused(focused),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  )

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

  // Current selected sex
  const currentSex = useMemo(() => {
    const { pathname } = parseUrl(router?.asPath)
    return pathname.match(/\/catalog\/(.[^/]*)\/?/)?.[1]
  }, [router?.asPath])

  // Render
  return (
    <div className="flex items-center px-4 relative divide-x border-b border-neutral-light laptop:h-12 laptop:mx-20 laptop:mb-5 laptop:px-0 laptop:justify-between laptop:border-none laptop:divide-none">
      <Tablet>
        <Button className="p-3 pl-0">
          <IconLabel icon={MenuIcon} label="Menu" labelPosition="right" />
        </Button>
      </Tablet>

      <Laptop>
        {currentSex && (
          <nav>
            <ul className="flex gap-6 small-uppercase">
              <NavItem
                label="Jeans &amp; Bottoms"
                href={`/catalog/${currentSex}/jeans-bottoms`}
              />
              <NavItem
                label="Shoes &amp; Accesories"
                href={`/catalog/${currentSex}/shoes-and-accesories`}
              />
              <NavItem
                label="Tops &amp; Jackets"
                href={`/catalog/${currentSex}/tops-and-jackets`}
              />
            </ul>
          </nav>
        )}
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
