import { useEffect, useMemo, useRef } from 'react'

import { useMedia } from './useMedia'

interface Screens {
  [key: string]: boolean
}

export function useTailwindScreens() {
  const screens = useMemo(() => require('@/utils/tailwindScreens'), [])
  const screenQueries = useRef<string[]>([])
  const screenNames = useRef<string[]>([])

  useEffect(() => {
    for (const screenName in screens) {
      if (Object.prototype.hasOwnProperty.call(screens, screenName)) {
        const screenSize = screens[screenName]
        screenNames.current.push(screenName)
        screenQueries.current.push(`(min-width: ${screenSize})`)
      }
    }

    return () => {
      screenQueries.current = []
      screenNames.current = []
    }
  }, [screens])

  const matches = useMedia(screenQueries.current)

  return useMemo(() => {
    const screensResults: Screens = {}
    matches.forEach((match: boolean, i: number) => {
      screensResults[screenNames.current[i]] = match
    })
    return screensResults
  }, [matches])
}
