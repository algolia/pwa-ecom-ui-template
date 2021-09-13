import classNames from 'classnames'

export type BannerXSSize = 'large' | 'small'

export type BannerXSProps = {
  size?: BannerXSSize
  className?: string
  children: React.ReactNode
}

export function BannerXS({
  size = 'large',
  className,
  children,
}: BannerXSProps) {
  const isLarge = size === 'large'
  return (
    <div
      className={classNames(
        'w-full text-center text-white bg-brand-black py-1 px-4',
        isLarge ? 'text-sm' : 'text-xs font-bold uppercase',
        className
      )}
    >
      {children}
    </div>
  )
}
