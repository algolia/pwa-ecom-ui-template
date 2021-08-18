export type ProductLabelProps = {
  children: React.ReactNode
  highlighting?: React.ComponentType
}

export function ProductLabel({
  children,
  highlighting: Highlighting,
}: ProductLabelProps) {
  return (
    <h2 className="tag-bold tracking-normal text-neutral-dark">
      {' '}
      {Highlighting ? <Highlighting /> : children}
    </h2>
  )
}
