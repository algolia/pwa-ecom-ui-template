export type ProductDescriptionProps = {
  children: React.ReactNode
  snippeting?: React.ComponentType
  className?: string
}

export function ProductDescription({
  children,
  snippeting: Snippeting,
  className = 'small-regular',
}: ProductDescriptionProps) {
  return <p className={className}>{Snippeting ? <Snippeting /> : children}</p>
}
