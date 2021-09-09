import { useAtom } from 'jotai'
import { useRouter } from 'next/router'
import { useEffect, useRef } from 'react'
import { Pane as Tweakpane } from 'tweakpane'

import { gridsHiddenAtom } from '../grids/grids'

import { refinementsLayoutAtom } from '@/config/config'

export function Pane() {
  const paneContainer = useRef(null)
  const router = useRouter()

  const [gridsHidden, setGridsHidden] = useAtom(gridsHiddenAtom)
  const [refinementsLayout, setRefinementsLayout] = useAtom(
    refinementsLayoutAtom
  )

  useEffect(() => {
    const pane = new Tweakpane({
      title: 'Dev',
      expanded: false,
      container: paneContainer.current!,
    })

    // Routes
    const routesFolder = pane.addFolder({ title: 'Routes' })
    routesFolder
      .addInput(router, 'route', {
        label: 'Current route',
        options: {
          index: '/',
          catalog: '/catalog',
          'kit/buttons': '/kit/buttons',
          'kit/chips': '/kit/chips',
        },
      })
      .on('change', (ev) => {
        router.push(ev.value)
      })

    // Refinements
    const refinementsFolder = pane.addFolder({ title: 'Refinements' })
    refinementsFolder
      .addInput({ refinementsLayout }, 'refinementsLayout', {
        label: 'Layout',
        options: {
          bar: 'bar',
          panel: 'panel',
        },
      })
      .on('change', (ev) => {
        setRefinementsLayout(ev.value)
      })

    // Grids
    const gridFolder = pane.addFolder({ title: 'Grid' })
    gridFolder
      .addInput({ gridsHidden }, 'gridsHidden', { label: 'Hidden' })
      .on('change', (ev) => {
        setGridsHidden(ev.value)
      })

    return () => {
      pane.dispose()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [paneContainer])

  return <div className="fixed bottom-3 left-3" ref={paneContainer} />
}
