export type ProductDescriptionProps = {
  children: React.ReactNode
  highlighting?: React.ComponentType
}

export function ProductDescription({
  children,
  highlighting: Highlighting,
}: ProductDescriptionProps) {
  return (
    <p className="small-regular">
      {Highlighting ? <Highlighting /> : children}
    </p>
  )
}
