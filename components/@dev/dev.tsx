import { memo } from 'react'

import { Grid } from './grid/grid'
import { Pane } from './pane/pane'

import { useAppContext } from '@/hooks/useAppContext'

export const Dev = memo(function Dev() {
  const { state } = useAppContext()

  return (
    <>
      {!state.dev.grid.hidden && <Grid />}
      <Pane />
    </>
  )
})
