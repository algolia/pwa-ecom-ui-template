import LocalMallOutlinedIcon from '@material-ui/icons/LocalMallOutlined'
import MenuOutlinedIcon from '@material-ui/icons/MenuOutlined'
import PersonOutlinedIcon from '@material-ui/icons/PersonOutlined'
import PinDropOutlinedIcon from '@material-ui/icons/PinDropOutlined'
import { useMemo } from 'react'

import Autocomplete from '@/components/autocomplete/autocomplete'
import Button from '@/components/button/button'
import IconLabel from '@/components/icon-label/icon-label'
import Logo from '@/components/logo/logo'

function TopNav(): JSX.Element {
  return (
    <div className="flex justify-between px-4 py-2 border-b border-neutral-light laptop:mx-20 laptop:px-0">
      <Logo />

      <div className="flex gap-6">
        <IconLabel icon={PinDropOutlinedIcon} label="Stores" />
        <IconLabel icon={PersonOutlinedIcon} label="Account" />
        <IconLabel icon={LocalMallOutlinedIcon} label="Cart" />
      </div>
    </div>
  )
}

function BottomNav(): JSX.Element {
  const placeholders = useMemo(() => ['products', 'articles', 'faq'], [])

  return (
    <div className="flex px-4 divide-x border-b border-neutral-light laptop:mx-20 laptop:px-0">
      <Button className="p-3 pl-0">
        <IconLabel icon={MenuOutlinedIcon} label="Menu" labelPosition="right" />
      </Button>

      <div className="w-full pl-2.5">
        <Autocomplete placeholders={placeholders} />
      </div>
    </div>
  )
}

export default function Nav(): JSX.Element {
  return (
    <header>
      <TopNav />
      <BottomNav />
    </header>
  )
}
