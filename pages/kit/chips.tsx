import { useState } from 'react'

import { Chip } from '@/components/@ui/chip/chip'

export default function Buttons() {
  const [selected, setSelected] = useState(false)

  return (
    <div className="h-screen flex">
      <div className="flex flex-col gap-3 m-auto py-12">
        <div className="flex gap-3 justify-around">
          <Chip>Chip</Chip>
          <Chip
            closeIcon={true}
            selected={selected}
            onClick={() => setSelected((s) => !s)}
          >
            Chip
          </Chip>
        </div>
      </div>
    </div>
  )
}
