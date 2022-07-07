import type { SearchClient } from 'algoliasearch/lite'
import { LazyMotion } from 'framer-motion'
import { atom, Provider as JotaiProvider } from 'jotai'
import { useAtomValue } from 'jotai/utils'
import { Context as ResponsiveContext } from 'react-responsive'

import { configAtom } from '@/config/config'
import { useIsMounted } from '@/hooks/useIsMounted'
import { useSearchClient } from '@/hooks/useSearchClient'
import { useSearchInsights } from '@/hooks/useSearchInsights'
import { createInitialValues } from '@/utils/createInitialValues'
import { appId, searchApiKey } from '@/utils/env'

export type AppLayoutProps = {
  children: React.ReactNode
}

const loadFramerMotionFeatures = () =>
  import(/* webpackChunkName: 'lib' */ '@/lib/framer-motion-features').then(
    (mod) => mod.default
  )

export const searchClientAtom = atom<SearchClient | undefined>(undefined)

export function AppLayout({ children }: AppLayoutProps) {
  const { setUserToken } = useAtomValue(configAtom)
  const isMounted = useIsMounted(true)

  // Initialize search client
  const searchClient = useSearchClient({
    appId,
    searchApiKey,
  })

  const { get, set } = createInitialValues()
  set(searchClientAtom, searchClient)

  // Initialize search insights
  useSearchInsights({
    appId,
    searchApiKey,
    setUserToken,
  })

  return (
    <JotaiProvider initialValues={get()}>
      <LazyMotion features={loadFramerMotionFeatures} strict={true}>
        {isMounted() ? (
          children
        ) : (
          <ResponsiveContext.Provider value={{ width: 1440, height: 980 }}>
            {children}
          </ResponsiveContext.Provider>
        )}
      </LazyMotion>
    </JotaiProvider>
  )
}
