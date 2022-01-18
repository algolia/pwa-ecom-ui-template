import type { AutocompleteState } from '@algolia/autocomplete-js'
import type { SearchClient } from 'algoliasearch/lite'
import classNames from 'classnames'
import { m } from 'framer-motion'
import { atom } from 'jotai'
import { useAtomValue, useUpdateAtom } from 'jotai/utils'
import { useRouter } from 'next/router'
import { useCallback, useEffect, useMemo, useRef } from 'react'

import { searchQueryAtom } from '@/components/@instantsearch/hooks/useUrlSync'
import { overlayAtom } from '@/components/overlay/overlay'
import { configAtom } from '@/config/config'
import { useIsMounted } from '@/hooks/useIsMounted'
import { useTailwindScreens } from '@/hooks/useTailwindScreens'
import { searchClientAtom } from '@/layouts/app-layout'
import {
  AutocompleteBasic,
  autocompleteStateAtom,
} from '@autocomplete/basic/autocomplete-basic'

const transition = {
  type: 'spring',
  duration: 0.6,
}

const isFocusedAtom = atom(false)
const isExpandedAtom = atom(
  (get) => get(isFocusedAtom) || Boolean(get(autocompleteStateAtom)?.query)
)

export function NavAutocomplete() {
  const { laptop } = useTailwindScreens()

  // Router
  const router = useRouter()
  const isHomePage = useMemo(() => router?.pathname === '/', [router?.pathname])

  // Get app state
  const { autocomplete: autocompleteConfig } = useAtomValue(configAtom)
  const { current: initialQuery } = useRef(useAtomValue(searchQueryAtom))
  const searchClient = useAtomValue(searchClientAtom) as SearchClient

  // Autocomplete expand on focused
  // Wait for the component to be mounted,
  // otherwise we have a mismatch between server/client HTML
  const isMounted = useIsMounted()
  const isExpanded = useAtomValue(isExpandedAtom) && isMounted()

  const setIsFocused = useUpdateAtom(isFocusedAtom)
  const setOverlay = useUpdateAtom(overlayAtom)

  // Show/hide overlay when autocomplete panel is open/close
  const autocompleteState = useAtomValue(autocompleteStateAtom)
  const autocompleteIsOpen = Boolean(autocompleteState?.isOpen)

  useEffect(() => {
    setOverlay({
      visible: autocompleteIsOpen,
      blur: isHomePage,
      zIndex: 'z-overlay-header',
    })
  }, [setOverlay, autocompleteIsOpen, isHomePage])

  // Handlers
  const handleFocusBlur = useCallback(
    (focused: boolean) => setIsFocused(focused),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  )

  const handleSelect = useCallback(
    (query: string = '') => {
      router.push(`/catalog?q=${query}`)
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  )

  const handleShouldPanelOpen = useCallback(
    ({ state }: { state: AutocompleteState<any> }) =>
      (Boolean(state.query) &&
        Boolean(
          state.collections.reduce((acc, c) => acc + c.items.length, 0)
        )) ||
      !laptop,
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  )

  const autocompleteCn = classNames(
    'w-full pl-2.5 laptop:w-80 laptop:p-0 laptop:ease-out laptop:absolute laptop:right-0',
    { focused: isExpanded }
  )

  const width = isExpanded ? '90%' : '20rem'

  return (
    <m.div
      className={autocompleteCn}
      animate={{ width: laptop ? width : '100%' }}
      transition={transition}
    >
      <div className="hidden absolute w-24 h-full -translate-x-full bg-gradient-to-l from-white laptop:block" />
      <AutocompleteBasic
        initialQuery={initialQuery}
        searchClient={searchClient}
        placeholders={autocompleteConfig.placeholders}
        shouldPanelOpen={handleShouldPanelOpen}
        openOnFocus={!laptop}
        onFocusBlur={handleFocusBlur}
        onSelect={handleSelect}
      />
    </m.div>
  )
}
