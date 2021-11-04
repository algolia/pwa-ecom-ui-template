import { createMedia } from '@artsy/fresnel'
import classNames from 'classnames'
import type { PropsWithChildren } from 'react'

import tailwindScreens from '@/utils/tailwindScreens'

type BreakpointProps = PropsWithChildren<{
  className?: string
}>

export type Breakpoints = 'laptop' | 'mobile' | 'tablet'

export const AppMedia = createMedia({
  breakpoints: {
    mobile: 0,
    ...tailwindScreens,
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
