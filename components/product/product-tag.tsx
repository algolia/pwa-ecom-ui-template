import { useClassNames } from '@/hooks/useClassNames'

export type ProductTagType = {
  label: string
  theme?: 'default' | 'eco' | 'price' | 'popular' | 'out-of-stock'
}

export type ProductTagProps = ProductTagType

export function ProductTag({ label, theme = 'default' }: ProductTagProps) {
  const cn = useClassNames(`tag-theme-${theme}`, 'rounded-sm px-2 py-0.5', [
    theme,
  ])

  return <span className={cn}>{label}</span>
}
