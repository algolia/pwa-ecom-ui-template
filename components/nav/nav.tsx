import { useIsMounted } from '@/hooks/useIsMounted'
import { useTailwindScreens } from '@/hooks/useTailwindScreens'

import { TrendingFacetsShowcase } from '../recommend-showcase/trending-facets-showcase'

import { NavBottom } from './nav-bottom'
import { NavTop } from './nav-top'

export function Nav() {
  const { laptop } = useTailwindScreens()
  const isMounted = useIsMounted(true)
  const isLaptop = laptop && isMounted()

  return (
    <nav>
      <NavTop />
      <NavBottom />
      {isLaptop && (
        <TrendingFacetsShowcase
          facetAttribute="brand"
          title="Trending Brands"
        />
      )}
    </nav>
  )
}
