import type { PropsWithChildren } from 'react'
import { useMediaQuery } from 'react-responsive'

import screensConfig from '@/config/screens'

type BreakpointProps = PropsWithChildren

function parseScreens(screens: Record<string, any>) {
  const screensParsed: Record<string, number> = {}

  for (const screenName in screens) {
    if (Object.prototype.hasOwnProperty.call(screens, screenName)) {
      const screenBreakpoint = (screens as any)[screenName]
      const screenValue = parseInt(screenBreakpoint, 10)
      if (!isNaN(screenValue)) {
        screensParsed[screenName] = screenValue
      }
    }
  }

  return screensParsed
}

const { tablet, laptop } = parseScreens(screensConfig)

export function useMobileMediaQuery() {
  return useMediaQuery({ maxWidth: tablet - 1 })
}

export function useTabletMediaQuery() {
  return useMediaQuery({ maxWidth: laptop - 1 })
}

export function useLaptopMediaQuery() {
  return useMediaQuery({ minWidth: laptop })
}

export function Mobile({ children }: BreakpointProps) {
  const isMobile = useMobileMediaQuery()
  return isMobile ? <>{children}</> : null
}

export function Tablet({ children }: BreakpointProps) {
  const isTablet = useTabletMediaQuery()
  return isTablet ? <>{children}</> : null
}

export function Laptop({ children }: BreakpointProps) {
  const isLaptop = useLaptopMediaQuery()
  return isLaptop ? <>{children}</> : null
}
