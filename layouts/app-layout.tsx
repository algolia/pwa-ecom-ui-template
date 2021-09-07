import type { SearchClient } from 'algoliasearch/lite'
import { LazyMotion } from 'framer-motion'
import { atom, Provider as JotaiProvider } from 'jotai'

import { useSearchClient } from '@/hooks/useSearchClient'
import { MediaContextProvider } from '@/lib/media'
import { createInitialValues } from '@/utils/createInitialValues'
import { appId, searchApiKey } from '@/utils/env'

export type AppLayoutProps = {
  children: React.ReactNode
}

const loadFramerMotionFeatures = () =>
  import(/* webpackChunkName: 'lib' */ '@/lib/framer-motion-features').then(
    (mod) => mod.default
  )

export const searchClientAtom = atom<SearchClient>({} as SearchClient)

export function AppLayout({ children }: AppLayoutProps) {
  const searchClient = useSearchClient({
    appId,
    searchApiKey,
  })

  const { get, set } = createInitialValues()
  set(searchClientAtom, searchClient)

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
