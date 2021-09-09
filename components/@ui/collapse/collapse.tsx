import classNames from 'classnames'
import type { Variants } from 'framer-motion'
import { useReducedMotion, m } from 'framer-motion'

export type CollapseProps = {
  isCollapsed: boolean
  className?: string
  children: React.ReactNode
}

const variants: Variants = {
  collapsed: (shouldReduceMotion: boolean) => {
    return {
      height: shouldReduceMotion ? 'auto' : 0,
      opacity: 0,
      pointerEvents: 'none',
      transitionEnd: { display: 'none' },
    }
  },
  expanded: (shouldReduceMotion: boolean) => {
    return {
      height: shouldReduceMotion ? 'auto' : 'auto',
      opacity: 1,
      pointerEvents: 'auto',
      display: 'block',
    }
  },
}

const transition = {
  ease: [0.16, 1, 0.3, 1],
  duration: 0.6,
}

export function Collapse({ isCollapsed, className, children }: CollapseProps) {
  const shouldReduceMotion = useReducedMotion()

  return (
    <m.div
      key="collapse"
      initial="collapsed"
      animate={isCollapsed ? 'collapsed' : 'expanded'}
      variants={variants}
      className={classNames('overflow-hidden', className)}
      transition={transition}
      custom={shouldReduceMotion}
    >
      {children}
    </m.div>
  )
}
