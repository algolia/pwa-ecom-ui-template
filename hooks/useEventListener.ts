import type { RefObject } from 'react'
import { useEffect, useCallback, useRef } from 'react'

import { isBrowser } from '@/utils/browser'
import { getRefElement } from '@/utils/getRefElement'

type UseEventListener = {
  type: keyof WindowEventMap
  listener: EventListener
  element?: RefObject<Element> | Document | Window | null
  options?: AddEventListenerOptions
}

export const useEventListener = ({
  type,
  listener,
  element = isBrowser ? window : undefined,
  options,
}: UseEventListener): void => {
  const savedListener = useRef<EventListener>()

  useEffect(() => {
    savedListener.current = listener
  }, [listener])

  const handleEventListener = useCallback((event: Event) => {
    savedListener.current?.(event)
  }, [])

  useEffect(() => {
    const target = getRefElement(element)
    target?.addEventListener(type, handleEventListener, options)
    return () => target?.removeEventListener(type, handleEventListener)
  }, [type, element, options, handleEventListener])
}
