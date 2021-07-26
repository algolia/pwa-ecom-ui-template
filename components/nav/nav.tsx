import FavoriteIcon from '@material-design-icons/svg/outlined/favorite_border.svg'
import HeadsetMicIcon from '@material-design-icons/svg/outlined/headset_mic.svg'
import MenuIcon from '@material-design-icons/svg/outlined/menu.svg'
import PersonIcon from '@material-design-icons/svg/outlined/person.svg'
import PinDropIcon from '@material-design-icons/svg/outlined/pin_drop.svg'
import ShoppingBagIcon from '@material-design-icons/svg/outlined/shopping_bag.svg'
import dynamic from 'next/dynamic'
import { useMemo } from 'react'

import Autocomplete from '@/components/autocomplete/autocomplete'
import Button from '@/components/button/button'
import IconLabel from '@/components/icon-label/icon-label'
import { useTailwindScreens } from '@/hooks/useTailwindScreens'

const Logo = dynamic(
  () => import(/* webpackChunkName: 'svg' */ '@/components/logo/logo')
)

function TopNav(): JSX.Element {
  const { laptop } = useTailwindScreens()

  return (
    <div className="flex flex-col px-4 py-2 border-b border-neutral-light laptop:mx-20 laptop:px-0 laptop:pt-8 laptop:pb-0 laptop:mb-5">
      <div className="flex justify-between w-full laptop:mb-8">
        <Logo />

        <div className="flex gap-48">
          {laptop && (
            <div className="flex gap-8">
              <IconLabel
                icon={HeadsetMicIcon}
                label="Support"
                labelPosition="right"
                labelTheme="label"
              />
              <IconLabel
                icon={PinDropIcon}
                label="Find a store"
                labelPosition="right"
                labelTheme="label"
              />
            </div>
          )}

          <div className="flex gap-6 laptop:gap-3">
            <IconLabel
              icon={laptop ? FavoriteIcon : PinDropIcon}
              label="Stores"
              hideLabel={laptop}
            />
            <IconLabel icon={PersonIcon} label="Account" hideLabel={laptop} />
            <IconLabel icon={ShoppingBagIcon} label="Cart" hideLabel={laptop} />
          </div>
        </div>
      </div>

      <ul className="hidden gap-6 uppercase laptop:flex">
        <li className="font-bold">Women</li>
        <li>Men</li>
        <li>Kids</li>
      </ul>
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
