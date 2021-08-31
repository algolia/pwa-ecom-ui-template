import { atom } from 'jotai'
import { memo } from 'react'

import { Grids, gridsAtom } from './grids/grids'
import { Pane } from './pane/pane'

export const devAtom = atom({
  grids: gridsAtom,
})

export const Dev = memo(function Dev() {
  return (
    <div className="z-dev">
      <Grids />
      <Pane />
    </div>
  )
})
