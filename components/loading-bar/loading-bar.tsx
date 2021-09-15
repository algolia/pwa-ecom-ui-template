import classNames from 'classnames'
import { useAtomValue } from 'jotai/utils'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

import { isSearchStalledAtom } from '@instantsearch/widgets/virtual-state-results/virtual-state-results'

export function LoadingBar() {
  const router = useRouter()
  const [isRouteLoading, setIsRouteLoading] = useState(false)

  useEffect(() => {
    const handleRouteChangeStart = () => setIsRouteLoading(true)
    const handleRouteChangeComplete = () => setIsRouteLoading(false)

    router.events.on('routeChangeStart', handleRouteChangeStart)
    router.events.on('routeChangeComplete', handleRouteChangeComplete)

    return () => {
      router.events.off('routeChangeStart', handleRouteChangeStart)
      router.events.off('routeChangeComplete', handleRouteChangeComplete)
    }
  }, [router?.events])

  const isSearchStalled = useAtomValue(isSearchStalledAtom)

  const cn = classNames('loadingBar', {
    'loadingBar--loading': isSearchStalled || isRouteLoading,
  })

  return <div className={cn} />
}
