import { NavBottom } from './nav-bottom'
import { NavTop } from './nav-top'
import { TrendingFacetsShowcase } from '../recommend-showcase/trending-facets-showcase'

export function Nav() {
  return (
    <nav>
      <NavTop />
      <NavBottom />
      <TrendingFacetsShowcase indexId="brand" />
    </nav>
  )
}