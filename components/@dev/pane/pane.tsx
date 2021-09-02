import { useAtom } from 'jotai'
import { useRouter } from 'next/router'
import { useEffect, useRef } from 'react'
import { Pane as Tweakpane } from 'tweakpane'

import { devAtom } from '@dev/dev'

export function Pane() {
  const paneContainer = useRef(null)
  const router = useRouter()

  const [dev] = useAtom(devAtom)
  const [grids, setGrids] = useAtom(dev.grids)

  useEffect(() => {
    const pane = new Tweakpane({
      title: 'Dev',
      expanded: false,
      container: paneContainer.current!,
    })

    const routesFolder = pane.addFolder({ title: 'Routes' })
    routesFolder
      .addInput(router, 'route', {
        options: {
          index: '/',
          search: '/search',
          'kit/buttons': '/kit/buttons',
          'kit/chips': '/kit/chips',
        },
      })
      .on('change', (ev) => {
        router.push(ev.value)
      })

    const gridFolder = pane.addFolder({ title: 'Grid' })
    gridFolder.addInput(grids, 'hidden').on('change', (ev) => {
      setGrids({ hidden: ev.value })
    })

    return () => {
      pane.dispose()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [paneContainer])

  return <div className="fixed bottom-3 left-3" ref={paneContainer} />
}
