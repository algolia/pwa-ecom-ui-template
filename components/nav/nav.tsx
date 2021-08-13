import { useState } from 'react'

import NavBottom from './nav-bottom'
import NavTop from './nav-top'

import { useClassNames } from '@/hooks/useClassNames'
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver'

export default function Nav(): JSX.Element {
  const [isSticky, setIsSticky] = useState(false)

  const { setObservedNode } = useIntersectionObserver({
    callback: (e) => setIsSticky(e.intersectionRatio < 1),
    threshold: [1],
  })

  return (
    <nav
      className={useClassNames(
        'sticky -top-px pt-px bg-white z-20 pb-5 transition-shadow',
        {
          'shadow-md': isSticky,
        },
        [isSticky]
      )}
      ref={setObservedNode}
    >
      <NavTop />
      <NavBottom />
    </nav>
  )
}
