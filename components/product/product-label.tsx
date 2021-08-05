export interface ProductLabelProps {
  children: React.ReactNode
  highlighting?: React.ComponentType
}

export function ProductLabel({
  children,
  highlighting: Highlighting,
}: ProductLabelProps): JSX.Element {
  return (
    <h2 className="tag-bold tracking-normal text-neutral-dark">
      {' '}
      {Highlighting ? <Highlighting /> : children}
    </h2>
  )
}
