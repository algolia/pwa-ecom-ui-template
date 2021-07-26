type BannerXSSize = 'small' | 'large'

interface BannerXSProps {
  size?: BannerXSSize
  children: React.ReactNode
}

export default function BannerXS({
  size = 'large',
  children,
}: BannerXSProps): JSX.Element {
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
}
