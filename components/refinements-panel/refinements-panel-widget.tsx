import { ColorRefinementList } from '@algolia/react-instantsearch-widget-color-refinement-list'
import { SizeRefinementList } from '@algolia/react-instantsearch-widget-size-refinement-list'
import { HierarchicalMenu, RefinementList } from 'react-instantsearch-dom'

import { RatingSelector } from '@instantsearch/_widgets/rating-selector/rating-selector'

import type { RefinementType } from '@/config/config'

export type RefinementsPanelWidgetProps = {
  type: RefinementType
} & any

export function RefinementsPanelWidget({
  type,
  ...props
}: RefinementsPanelWidgetProps) {
  switch (type) {
    case 'color':
      return <ColorRefinementList {...props} />

    case 'size':
      return <SizeRefinementList {...props} />

    case 'list':
      return <RefinementList {...props} />

    case 'hierarchical':
      return <HierarchicalMenu {...props} />

    case 'rating':
      return <RatingSelector {...props} />

    default:
      return null
  }
}
