import { atom, useAtom } from 'jotai'
import { useCallback } from 'react'

import { useClassNames } from '@/hooks/useClassNames'

export type OverlayAtomValue = {
  visible: boolean
  zIndex: 'z-overlay-full' | 'z-overlay-header'
}

export const overlayAtom = atom<OverlayAtomValue>({
  visible: false,
  zIndex: 'z-overlay-full',
})

export function Overlay() {
  const [{ visible, zIndex }, setOverlay] = useAtom(overlayAtom)

  const onClick = useCallback(() => {
    setOverlay((prev) => ({ ...prev, visible: false }))
  }, [setOverlay])

  const cn = useClassNames(
    'fixed w-full h-full inset-0 bg-black bg-opacity-50 opacity-0 backdrop-blur-sm transition-opacity pointer-events-none cursor-pointer',
    zIndex,
    {
      'opacity-100 pointer-events-auto': visible,
    },
    [visible, zIndex]
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
