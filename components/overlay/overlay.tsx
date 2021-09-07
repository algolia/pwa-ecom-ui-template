import classNames from 'classnames'
import { atom, useAtom } from 'jotai'
import { useRouter } from 'next/router'
import { useCallback, useMemo } from 'react'

export type OverlayAtomValue = {
  visible: boolean
  zIndex?: 'z-overlay-full' | 'z-overlay-header'
}

export const overlayAtom = atom<OverlayAtomValue>({
  visible: false,
  zIndex: 'z-overlay-full',
})

export function Overlay() {
  const router = useRouter()
  const isHomePage = useMemo(() => router?.route === '/', [router?.route])

  const [{ visible, zIndex }, setOverlay] = useAtom(overlayAtom)

  const onClick = useCallback(() => {
    setOverlay((prev) => ({ ...prev, visible: false }))
  }, [setOverlay])

  const cn = classNames(
    'fixed w-full h-full inset-0 bg-black bg-opacity-50 opacity-0 backdrop-blur-sm transition-opacity pointer-events-none cursor-pointer',
    zIndex,
    {
      'opacity-100 pointer-events-auto': visible && isHomePage,
    }
  )

  return (
    <div
      role="button"
      aria-label="Overlay"
      tabIndex={0}
      className={cn}
      onClick={onClick}
    />
  )
}
