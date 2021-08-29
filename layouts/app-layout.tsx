import { LazyMotion } from 'framer-motion'
import { Provider as JotaiProvider } from 'jotai'
import { useMemo, useReducer } from 'react'

import { AppContext } from '@/contexts/AppContext'
import { MediaContextProvider } from '@/lib/media'
import { appReducer } from '@/state/reducer'
import { initialAppState } from '@/state/state'

export type AppLayoutProps = {
  children: React.ReactNode
}

const loadFramerMotionFeatures = () =>
  import(/* webpackChunkName: 'lib' */ '@/lib/framer-motion-features').then(
    (mod) => mod.default
  )

export function AppLayout({ children }: AppLayoutProps) {
  const [state, dispatch] = useReducer(appReducer, initialAppState)

  const value = useMemo(
    () => ({
      state,
      dispatch,
    }),
    [state]
  )

  return (
    <JotaiProvider>
      <AppContext.Provider value={value}>
        <MediaContextProvider>
          <LazyMotion features={loadFramerMotionFeatures} strict={true}>
            {children}
          </LazyMotion>
        </MediaContextProvider>
      </AppContext.Provider>
    </JotaiProvider>
  )
}
