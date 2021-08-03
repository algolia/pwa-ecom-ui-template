import { useRouter } from 'next/dist/client/router'
import { useEffect, useRef } from 'react'
import { Pane as Tweakpane } from 'tweakpane'

import { useAppContext } from '@/hooks/useAppContext'
import { ActionType } from '@/state/actions'

export default function Pane(): JSX.Element {
  const paneContainer = useRef(null)
  const router = useRouter()

  const { state, dispatch } = useAppContext()

  useEffect(() => {
    const pane = new Tweakpane({
      title: 'Dev',
      expanded: false,
      container: paneContainer.current!,
    })

    const routesFolder = pane.addFolder({ title: 'Routes' })
    routesFolder.addButton({ title: '/' }).on('click', () => {
      router.push('/')
    })
    routesFolder.addButton({ title: '/kit/buttons' }).on('click', () => {
      router.push('/kit/buttons')
    })

    const gridFolder = pane.addFolder({ title: 'Grid' })
    gridFolder.addInput(state.dev.grid, 'hidden').on('change', (ev) => {
      dispatch({
        type: ActionType.SetGridVisibility,
        payload: ev.value as boolean,
      })
    })

    return () => {
      pane.dispose()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [paneContainer])

  return <div className="z-50 fixed bottom-3 left-3" ref={paneContainer} />
}
