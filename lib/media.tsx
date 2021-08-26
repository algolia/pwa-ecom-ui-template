import { createMedia } from '@artsy/fresnel'
import classNames from 'classnames'
import type { PropsWithChildren } from 'react'

// eslint-disable-next-line @typescript-eslint/no-var-requires, import/no-commonjs
const screens = require('@/utils/tailwindScreens')

type BreakpointProps = PropsWithChildren<{
  className?: string
}>

export type Breakpoints = 'mobile' | 'tablet' | 'laptop'

export const AppMedia = createMedia({
  breakpoints: {
    mobile: 0,
    ...screens,
  },
})

export const mediaStyles = AppMedia.createMediaStyle()

export const { Media, MediaContextProvider } = AppMedia

const getMediaRender = (children: React.ReactNode, className?: string) => {
  return function MediaRender(
    mediaClassNames: string,
    renderChildren: React.ReactNode
  ) {
    return (
      <div
        className={classNames(mediaClassNames, className)}
        suppressHydrationWarning={!renderChildren}
      >
        {renderChildren ? children : null}
      </div>
    )
  }
}

export function Mobile({ children, className }: BreakpointProps) {
  return <Media at="mobile">{getMediaRender(children, className)}</Media>
}

export function Tablet({ children, className }: BreakpointProps) {
  return <Media lessThan="laptop">{getMediaRender(children, className)}</Media>
}

export function Laptop({ children, className }: BreakpointProps) {
  return (
    <Media greaterThanOrEqual="laptop">
      {getMediaRender(children, className)}
    </Media>
  )
}
