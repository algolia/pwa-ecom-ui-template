import { TrendingFacetsShowcase } from '../recommend-showcase/trending-facets-showcase'

import { NavBottom } from './nav-bottom'
import { NavTop } from './nav-top'

export function Nav() {
  return (
    <nav>
      <NavTop />
      <NavBottom />
      <TrendingFacetsShowcase indexId="brand" />
    </nav>
  )
}
