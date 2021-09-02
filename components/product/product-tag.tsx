import classNames from 'classnames'

export type ProductTagType = {
  label: string
  theme?: 'default' | 'eco' | 'out-of-stock' | 'popular' | 'price'
}

export type ProductTagProps = ProductTagType

export function ProductTag({ label, theme = 'default' }: ProductTagProps) {
  const cn = classNames(`tag-theme-${theme}`, 'rounded-sm px-2 py-0.5')

  return <span className={cn}>{label}</span>
}
