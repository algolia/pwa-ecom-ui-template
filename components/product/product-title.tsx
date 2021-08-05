export interface ProductTitleProps {
  children: React.ReactNode
  highlighting?: React.ComponentType
}

export function ProductTitle({
  children,
  highlighting: Highlighting,
}: ProductTitleProps): JSX.Element {
  return (
    <h1 className="small-bold tracking-normal text-brand-black">
      {Highlighting ? <Highlighting /> : children}
    </h1>
  )
}
