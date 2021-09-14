import { memo } from 'react'

import { Grids } from './grids/grids'
import { Pane } from './pane/pane'

export const Dev = memo(function Dev() {
  return (
    <div className="z-dev">
      <Grids />
      <Pane />
    </div>
  )
})
