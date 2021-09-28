import classNames from 'classnames'
import { useState } from 'react'

import { Nav } from '@/components/nav/nav'
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver'

export type HeaderProps = Record<string, unknown>

export function Header() {
  const [isSticky, setIsSticky] = useState(false)

  const { setObservedNode } = useIntersectionObserver({
    callback: (e) => setIsSticky(e.intersectionRatio < 1),
    threshold: [1],
  })

  return (
    <header
      className={classNames(
        'z-header sticky -top-px pt-px transition-shadow bg-white shadow-md',
        {
          'shadow-lg': isSticky,
        }
      )}
      ref={setObservedNode}
    >
      <Nav />
    </header>
  )
}
