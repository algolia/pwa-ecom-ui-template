import { useAppContext } from '@/hooks/useAppContext'

import Grid from './grid/grid'
import Pane from './pane/pane'

export default function Dev(): JSX.Element {
  const { state } = useAppContext()

  return (
    <>
      {!state.dev.grid.hidden && <Grid />}
      <Pane />
    </>
  )
}
