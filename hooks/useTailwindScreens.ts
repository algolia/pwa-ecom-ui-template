import { useMemo } from 'react'

import { useMedia } from './useMatchMedia'

type Screens = {
  [key: string]: boolean
}

export function useTailwindScreens() {
  const screens = useMemo(() => require('@/utils/tailwindScreens'), [])
  const [queries, names] = useMemo(() => {
    const q = []
    const n = []
    for (const screenName in screens) {
      if (Object.prototype.hasOwnProperty.call(screens, screenName)) {
        const screenSize = screens[screenName]
        q.push(`(min-width: ${screenSize}px)`)
        n.push(screenName)
      }
    }
    return [q, n]
  }, [screens])

  const matches = useMedia(queries)

  return useMemo(() => {
    const screensResults: Screens = {}
    names.forEach((screenName: string, i: number) => {
      screensResults[screenName] = matches[i]
    })
    return screensResults
  }, [matches, names])
}
