import { useCallback, useEffect, useRef, useState } from 'react'

import { isomorphicDocument } from '@/utils/browser'

import { useEventListener } from './useEventListener'
import { useKeyPress } from './useKeyPress'

export function useIsVisible(initialIsVisible = false) {
  const [isVisible, setIsVisible] = useState(initialIsVisible)
  const ref = useRef<HTMLDivElement>(null)

  const handleClickOutside = useCallback((event: Event) => {
    if (ref.current && !ref.current.contains(event.target as Node)) {
      setIsVisible(false)
    }
  }, [])

  const isEscapePressed = useKeyPress('Escape')
  useEffect(() => {
    if (isEscapePressed) {
      setIsVisible(false)
    }
  }, [isEscapePressed])

  useEventListener(isomorphicDocument, 'click', handleClickOutside)

  return { ref, isVisible, setIsVisible }
}
