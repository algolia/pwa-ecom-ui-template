import { LazyMotion } from 'framer-motion'
import { Provider as JotaiProvider } from 'jotai'

import { MediaContextProvider } from '@/lib/media'

export type AppLayoutProps = {
  children: React.ReactNode
}

const loadFramerMotionFeatures = () =>
  import(/* webpackChunkName: 'lib' */ '@/lib/framer-motion-features').then(
    (mod) => mod.default
  )

export function AppLayout({ children }: AppLayoutProps) {
  return (
    <JotaiProvider>
      <MediaContextProvider>
        <LazyMotion features={loadFramerMotionFeatures} strict={true}>
          {children}
        </LazyMotion>
      </MediaContextProvider>
    </JotaiProvider>
  )
}
