import { memo } from 'react'

import { Grids } from './grids/grids'
import { Pane } from './pane/pane'

import { useAppContext } from '@/hooks/useAppContext'

export const Dev = memo(function Dev() {
  const { state } = useAppContext()

  return (
    <>
      {!state.dev.grids.hidden && <Grids />}
      <Pane />
    </>
  )
})
