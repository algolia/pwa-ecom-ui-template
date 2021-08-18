import { Button } from '@ui/button/button'

export type ProductColorVariationItemProps = {
  color: string
}

export function ProductColorVariationItem({
  color,
}: ProductColorVariationItemProps) {
  return (
    <li>
      <Button title="Show color variation">
        <div
          className="w-4 h-4 rounded-full border border-solid border-neutral-dark"
          style={{ backgroundColor: color }}
        />
      </Button>
    </li>
  )
}
