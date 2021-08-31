import { ColorRefinementList } from '@algolia/react-instantsearch-widget-color-refinement-list'
import { SizeRefinementList } from '@algolia/react-instantsearch-widget-size-refinement-list'
import { HierarchicalMenu, RefinementList } from 'react-instantsearch-dom'

import { RangeInput } from '@instantsearch/_widgets/range-input/range-input'
import { RatingSelector } from '@instantsearch/_widgets/rating-selector/rating-selector'

import type { RefinementType } from './refinements-panel-body'

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

    case 'price':
      return <RangeInput {...props} />

    default:
      return null
  }
}
