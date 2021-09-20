import { useCallback, useState } from 'react'

import { Button } from '@ui/button/button'

export type ProductSizeType = {
  size: string
  available: boolean
}

export type ProductSizesProps = {
  sizes: ProductSizeType[]
}

export type ProductSizeProps = ProductSizeType & {
  selected: boolean
  onClick: (size: string) => void
}

function ProductSize({ size, available, selected, onClick }: ProductSizeProps) {
  const handleClick = useCallback(() => onClick(size), [onClick, size])
  return (
    <li>
      <Button
        type="item"
        selected={selected}
        disabled={!available}
        className="w-full"
        onClick={handleClick}
      >
        {size}
      </Button>
    </li>
  )
}

export function ProductSizes({ sizes }: ProductSizesProps) {
  const [selectedSize, setSelectedSize] = useState('')
  const handleSizeClick = useCallback(
    (newSelectedSize: string) =>
      setSelectedSize(newSelectedSize === selectedSize ? '' : newSelectedSize),
    [selectedSize]
  )

  return (
    <ul className="grid grid-cols-4 gap-3 mt-6">
      {sizes.map(({ size, available }) => (
        <ProductSize
          key={size}
          size={size}
          available={available}
          selected={selectedSize === size}
          onClick={handleSizeClick}
        />
      ))}
    </ul>
  )
}
