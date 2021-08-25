import { useEffect, useState } from 'react'

import { getScrollbarWidth } from '@/utils/browser'

type ReturnType = [boolean, (locked: boolean) => void]

export function useLockedBody(initialLocked = false): ReturnType {
  const [locked, setLocked] = useState(initialLocked)

  // Do the side effect before render
  useEffect(() => {
    if (!locked) {
      return undefined
    }

    // Save initial body style
    const originalOverflow = document.body.style.overflow
    const originalPaddingRight = document.body.style.paddingRight

    // Get the scrollBar width
    const scrollBarWidth = getScrollbarWidth()

    // Avoid width reflow
    if (scrollBarWidth) {
      document.body.style.paddingRight = `${scrollBarWidth}px`
    }

    // Lock body scroll
    document.body.style.overflow = 'hidden'

    return () => {
      if (scrollBarWidth) {
        document.body.style.paddingRight = originalPaddingRight
      }

      document.body.style.overflow = originalOverflow
    }
  }, [locked])

  // Update state if initialValue changes
  useEffect(() => {
    if (locked !== initialLocked) {
      setLocked(initialLocked)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialLocked])

  return [locked, setLocked]
}
