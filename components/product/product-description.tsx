export type ProductDescriptionProps = {
  children: React.ReactNode
  snippeting?: React.ComponentType
}

export function ProductDescription({
  children,
  snippeting: Snippeting,
}: ProductDescriptionProps) {
  return (
    <p className="small-regular">{Snippeting ? <Snippeting /> : children}</p>
  )
}
