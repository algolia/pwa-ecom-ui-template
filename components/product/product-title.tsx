import classNames from 'classnames'

export type ProductTitleProps = {
  children: React.ReactNode
  highlighting?: React.ComponentType
  className?: string
}

export function ProductTitle({
  children,
  highlighting: Highlighting,
  className = 'small-bold tracking-normal',
}: ProductTitleProps) {
  return (
    <h1 className={classNames('text-brand-black', className)}>
      {Highlighting ? <Highlighting /> : children}
    </h1>
  )
}
