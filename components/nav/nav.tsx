import MenuIcon from '@material-design-icons/svg/outlined/menu.svg'
import PersonIcon from '@material-design-icons/svg/outlined/person.svg'
import PinDropIcon from '@material-design-icons/svg/outlined/pin_drop.svg'
import ShoppingBagIcon from '@material-design-icons/svg/outlined/shopping_bag.svg'
import dynamic from 'next/dynamic'
import { useMemo } from 'react'

import Autocomplete from '@/components/autocomplete/autocomplete'
import Button from '@/components/button/button'
import IconLabel from '@/components/icon-label/icon-label'

const Logo = dynamic(
  () => import(/* webpackChunkName: 'svg' */ '@/components/logo/logo')
)

function TopNav(): JSX.Element {
  return (
    <div className="flex justify-between px-4 py-2 border-b border-neutral-light laptop:mx-20 laptop:px-0">
      <Logo />

      <div className="flex gap-6">
        <IconLabel icon={PinDropIcon} label="Stores" />
        <IconLabel icon={PersonIcon} label="Account" />
        <IconLabel icon={ShoppingBagIcon} label="Cart" />
      </div>
    </div>
  )
}

function BottomNav(): JSX.Element {
  const placeholders = useMemo(() => ['products', 'articles', 'faq'], [])

  return (
    <div className="flex px-4 divide-x border-b border-neutral-light laptop:mx-20 laptop:px-0">
      <Button className="p-3 pl-0">
        <IconLabel icon={MenuIcon} label="Menu" labelPosition="right" />
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
