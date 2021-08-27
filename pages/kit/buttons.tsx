import CheckIcon from '@material-design-icons/svg/outlined/check.svg'
import { useState } from 'react'

import { Button } from '@ui/button/button'

export default function Buttons() {
  const [selected, setSelected] = useState(true)

  return (
    <div className="h-screen flex">
      <div className="flex flex-col gap-3 m-auto py-12">
        <div className="flex gap-3">
          <Button type="primary" size="large" icon={CheckIcon}>
            Primary
          </Button>
          <Button type="secondary" size="large" icon={CheckIcon}>
            Secondary
          </Button>
          <Button type="tertiary" size="large" icon={CheckIcon}>
            Tertiary
          </Button>
        </div>
        <div className="flex gap-3">
          <Button type="primary" size="large" disabled={true} icon={CheckIcon}>
            Primary
          </Button>
          <Button
            type="secondary"
            size="large"
            disabled={true}
            icon={CheckIcon}
          >
            Secondary
          </Button>
          <Button type="tertiary" size="large" disabled={true} icon={CheckIcon}>
            Tertiary
          </Button>
        </div>
        <div className="flex gap-3">
          <Button type="primary" size="small" icon={CheckIcon}>
            Primary
          </Button>
          <Button type="secondary" size="small" icon={CheckIcon}>
            Secondary
          </Button>
          <Button type="tertiary" size="small" icon={CheckIcon}>
            Tertiary
          </Button>
        </div>
        <div className="flex gap-3">
          <Button type="primary" size="small" disabled={true} icon={CheckIcon}>
            Primary
          </Button>
          <Button
            type="secondary"
            size="small"
            disabled={true}
            icon={CheckIcon}
          >
            Secondary
          </Button>
          <Button type="tertiary" size="small" disabled={true} icon={CheckIcon}>
            Tertiary
          </Button>
        </div>

        <div className="flex gap-3 justify-around">
          <Button type="item" size="small">
            Item
          </Button>
          <Button
            type="item"
            size="small"
            selected={selected}
            onClick={() => setSelected((s) => !s)}
          >
            Item
          </Button>
          <Button type="item" size="small" disabled={true}>
            Item
          </Button>
        </div>
      </div>
    </div>
  )
}
