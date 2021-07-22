import { useEffect, useMemo, useRef } from 'react'
import resolveConfig from 'tailwindcss/resolveConfig'

import tailwindConfig from '../tailwind.config.js' // eslint-disable-line import/extensions

import { useMedia } from './useMedia'

interface Screens {
  [key: string]: boolean
}

export function useTailwindScreens() {
  const screens = useMemo(() => {
    const fullConfig = resolveConfig(tailwindConfig)
    return fullConfig.theme.screens!
  }, [])

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
