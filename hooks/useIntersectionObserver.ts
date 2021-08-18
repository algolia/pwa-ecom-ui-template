import { useEffect, useRef, useState } from 'react'

type IntersectionObserverHook = {
  callback: (entry: IntersectionObserverEntry) => void
  root?: Element | Document | null
  rootMargin?: string
  threshold?: number | number[]
}

export function useIntersectionObserver({
  callback,
  root,
  rootMargin,
  threshold,
}: IntersectionObserverHook) {
  const [node, setNode] = useState<Element | null>()
  const observer = useRef<IntersectionObserver>()

  useEffect(() => {
    if (observer.current) {
      observer.current.disconnect()
    }

    function onIntersection(entries: IntersectionObserverEntry[]) {
      entries.forEach((entry) => callback(entry))
    }

    observer.current = new IntersectionObserver(onIntersection, {
      root,
      rootMargin,
      threshold,
    })

    if (node) {
      observer.current.observe(node)
    }

    return () => {
      if (observer.current) {
        observer.current.disconnect()
      }
    }
  }, [node, root, rootMargin, threshold, callback])

  return {
    setObservedNode: setNode,
  }
}
