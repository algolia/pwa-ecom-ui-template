import FavoriteIcon from '@material-design-icons/svg/outlined/favorite_border.svg'
import HeadsetMicIcon from '@material-design-icons/svg/outlined/headset_mic.svg'
import PersonIcon from '@material-design-icons/svg/outlined/person.svg'
import PinDropIcon from '@material-design-icons/svg/outlined/pin_drop.svg'
import ShoppingBagIcon from '@material-design-icons/svg/outlined/shopping_bag.svg'
import dynamic from 'next/dynamic'

import NavItem from '@/components/nav/nav-item'
import { useTailwindScreens } from '@/hooks/useTailwindScreens'
import Button from '@ui/button/button'
import IconLabel from '@ui/icon-label/icon-label'
import Link from '@ui/link/link'

const Logo = dynamic(
  () => import(/* webpackChunkName: 'nav' */ '@/components/logo/logo')
)

export default function NavTop(): JSX.Element {
  const { laptop } = useTailwindScreens()

  return (
    <div className="flex flex-col px-4 py-2 border-b border-neutral-light laptop:mx-20 laptop:px-0 laptop:pt-8 laptop:pb-0 laptop:mb-5">
      <div className="flex justify-between w-full gap-3 laptop:mb-8">
        <div className="flex items-center">
          <Logo />
        </div>

        <div className="flex gap-48">
          <div className="hidden items-center gap-8 laptop:flex">
            <Link href="/support" title="Support">
              <IconLabel
                icon={HeadsetMicIcon}
                label="Support"
                labelPosition="right"
                labelTheme="label-regular"
              />
            </Link>
            <Link href="/store-locator" title="Find a store">
              <IconLabel
                icon={PinDropIcon}
                label="Find a store"
                labelPosition="right"
                labelTheme="label-regular"
              />
            </Link>
          </div>

          <div className="flex items-center gap-6 laptop:gap-3">
            <Button title={laptop ? 'Favorites' : 'Stores'}>
              <IconLabel
                icon={laptop ? FavoriteIcon : PinDropIcon}
                label={laptop ? '' : 'Stores'}
              />
            </Button>
            <Button title="Account">
              <IconLabel icon={PersonIcon} label={laptop ? '' : 'Account'} />
            </Button>
            <Button title="Cart">
              <IconLabel icon={ShoppingBagIcon} label={laptop ? '' : 'Cart'} />
            </Button>
          </div>
        </div>
      </div>

      <nav className="hidden laptop:block">
        <ul className="hidden gap-6 uppercase laptop:flex">
          <NavItem label="Women" />
          <NavItem label="Men" />
          <NavItem label="Kids" />
        </ul>
      </nav>
    </div>
  )
}
