import type { DependencyList } from 'react'
import { useEffect, useRef } from 'react'

import { isomorphicDocument } from '@/utils/browser'

export function useScrollToTop(
  deps: DependencyList = [],
  root = isomorphicDocument?.documentElement
) {
  const rootRef = useRef<HTMLElement>()

  useEffect(() => {
    rootRef.current = root
  }, [root])

  useEffect(() => {
    if (rootRef.current) rootRef.current.scrollTop = 0
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps)
}
