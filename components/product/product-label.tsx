import classNames from 'classnames'

export type ProductLabelProps = {
  children: React.ReactNode
  highlighting?: React.ComponentType
  className?: string
}

export function ProductLabel({
  children,
  highlighting: Highlighting,
  className = 'tag-bold tracking-normal',
}: ProductLabelProps) {
  return (
    <h2 className={classNames('text-neutral-darkest', className)}>
      {Highlighting ? <Highlighting /> : children}
    </h2>
  )
}
