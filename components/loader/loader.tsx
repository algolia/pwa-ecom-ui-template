import classNames from 'classnames'
import { useAtomValue } from 'jotai/utils'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

import { isSearchStalledAtom } from '@instantsearch/widgets/virtual-state-results/virtual-state-results'

export type LoaderProps = {
  layout?: 'bar' | 'overlay'
}

const routeLoadingThreshold = 400 // im ms

export function Loader({ layout = 'overlay' }: LoaderProps) {
  const router = useRouter()
  const [isRouteLoading, setIsRouteLoading] = useState(false)

  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout>

    const handleRouteChangeStart = (
      url: string,
      { shallow }: { shallow: boolean }
    ) => {
      if (shallow) return

      timeout = setTimeout(() => {
        setIsRouteLoading(true)
      }, routeLoadingThreshold)
    }

    const handleRouteChangeComplete = (
      url: string,
      { shallow }: { shallow: boolean }
    ) => {
      if (shallow) return

      clearTimeout(timeout)
      setIsRouteLoading(false)
    }

    const handleRouteChangeError = (
      _: any,
      url: string,
      { shallow }: { shallow: boolean }
    ) => {
      handleRouteChangeComplete(url, { shallow })
    }

    router.events.on('routeChangeStart', handleRouteChangeStart)
    router.events.on('routeChangeComplete', handleRouteChangeComplete)
    router.events.on('routeChangeError', handleRouteChangeError)

    return () => {
      router.events.off('routeChangeStart', handleRouteChangeStart)
      router.events.off('routeChangeComplete', handleRouteChangeComplete)
      router.events.off('routeChangeError', handleRouteChangeError)
    }
  }, [router?.events])

  const isSearchStalled = useAtomValue(isSearchStalledAtom)

  const cn = classNames('loader', `loader--${layout}`, {
    'loader--loading': isSearchStalled || isRouteLoading,
  })

  return (
    <div className={cn}>
      {layout === 'overlay' && (
        <div className="loading-spinner">
          <div className="loading-spinner-dot"></div>
          <div className="loading-spinner-dot"></div>
          <div className="loading-spinner-dot"></div>
          <div className="loading-spinner-dot"></div>
          <div className="loading-spinner-dot"></div>
          <div className="loading-spinner-dot"></div>
        </div>
      )}
    </div>
  )
}
