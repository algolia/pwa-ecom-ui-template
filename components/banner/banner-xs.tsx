import { memo } from 'react'

export type BannerXSSize = 'large' | 'small'

export type BannerXSProps = {
  size?: BannerXSSize
  children: React.ReactNode
}

export const BannerXS = memo(function BannerXS({
  size = 'large',
  children,
}: BannerXSProps) {
  const isLarge = size === 'large'
  return (
    <div
      className={`w-full text-center text-white bg-brand-black py-1 px-4 ${
        isLarge ? 'text-sm' : 'text-xs font-bold uppercase'
      }`}
    >
      {children}
    </div>
  )
})
