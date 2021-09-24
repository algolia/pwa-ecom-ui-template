import { useCallback, useRef, useState } from 'react'

import { useIsomorphicLayoutEffect } from './useIsomorphicLayoutEffect'

export function useIsMounted(shouldTriggerRender = false) {
  const isMounted = useRef(false)
  const [, triggerRender] = useState(false)

  useIsomorphicLayoutEffect(() => {
    isMounted.current = true
    if (shouldTriggerRender) triggerRender(true)

    return () => {
      isMounted.current = false
      if (shouldTriggerRender) triggerRender(false)
    }
  }, [])

  return useCallback(() => isMounted.current, [])
}
