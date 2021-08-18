import { createMedia } from '@artsy/fresnel'
import type { PropsWithChildren } from 'react'

// eslint-disable-next-line @typescript-eslint/no-var-requires, import/no-commonjs
const screens = require('@/utils/tailwindScreens')

type BreakpointProps = PropsWithChildren<Record<string, unknown>>

export type Breakpoints = 'mobile' | 'tablet' | 'laptop'

export const AppMedia = createMedia({
  breakpoints: {
    mobile: 0,
    ...screens,
  },
})

export const mediaStyles = AppMedia.createMediaStyle()

export const { Media, MediaContextProvider } = AppMedia

export function Mobile({ children }: BreakpointProps) {
  return <Media at="mobile">{children}</Media>
}

export function Tablet({ children }: BreakpointProps) {
  return <Media lessThan="laptop">{children}</Media>
}

export function Laptop({ children }: BreakpointProps) {
  return <Media greaterThanOrEqual="laptop">{children}</Media>
}
