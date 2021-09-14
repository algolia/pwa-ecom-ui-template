import { m } from 'framer-motion'
import { memo } from 'react'
import isEqual from 'react-fast-compare'

export type BasicPageLayoutProps = {
  children: React.ReactNode
}

const variants = {
  visible: { opacity: 1 },
  hidden: { opacity: 0 },
}

const transition = { type: 'linear' }

function BasicPageLayoutComponent({ children }: BasicPageLayoutProps) {
  return (
    <m.main
      initial="hidden"
      animate="visible"
      exit="hidden"
      variants={variants}
      transition={transition}
    >
      {children}
    </m.main>
  )
}

export const BasicPageLayout = memo(BasicPageLayoutComponent, isEqual)
