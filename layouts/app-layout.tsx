import type { SearchClient } from 'algoliasearch/lite'
import { LazyMotion } from 'framer-motion'
import { atom, Provider as JotaiProvider } from 'jotai'
import { useAtomValue } from 'jotai/utils'

import { configAtom } from '@/config/config'
import { useRecommendClient } from '@/hooks/useRecommendClient'
import { useSearchClient } from '@/hooks/useSearchClient'
import { useSearchInsights } from '@/hooks/useSearchInsights'
import { MediaContextProvider } from '@/lib/media'
import { createInitialValues } from '@/utils/createInitialValues'
import { appId, searchApiKey, recommendApiKey } from '@/utils/env'

export type AppLayoutProps = {
  children: React.ReactNode
}

const loadFramerMotionFeatures = () =>
  import(/* webpackChunkName: 'lib' */ '@/lib/framer-motion-features').then(
    (mod) => mod.default
  )

export const searchClientAtom = atom<SearchClient | undefined>(undefined)

export const recommendClientAtom = atom<any>(undefined)

export function AppLayout({ children }: AppLayoutProps) {
  const { setUserToken } = useAtomValue(configAtom)

  // Initialize search client
  const searchClient = useSearchClient({
    appId,
    searchApiKey,
  })

  const recommendClient = useRecommendClient({
    appId,
    recommendApiKey,
  })

  const { get, set } = createInitialValues()
  set(searchClientAtom, searchClient)
  set(recommendClientAtom, recommendClient)

  // Initialize search insights
  useSearchInsights({
    appId,
    searchApiKey,
    setUserToken,
  })

  return (
    <JotaiProvider initialValues={get()}>
      <MediaContextProvider>
        <LazyMotion features={loadFramerMotionFeatures} strict={true}>
          {children}
        </LazyMotion>
      </MediaContextProvider>
    </JotaiProvider>
  )
}
