import MenuIcon from '@material-design-icons/svg/outlined/menu.svg'
import { useMemo } from 'react'

import Autocomplete from '@/components/autocomplete/autocomplete'
import Button from '@/components/button/button'
import IconLabel from '@/components/icon-label/icon-label'
import { useTailwindScreens } from '@/hooks/useTailwindScreens'

import NavItem from './nav-item'

export default function NavBottom(): JSX.Element {
  const { laptop } = useTailwindScreens()
  const placeholders = useMemo(() => ['products', 'articles', 'faq'], [])

  return (
    <div className="flex items-center px-4 relative divide-x border-b border-neutral-light laptop:h-12 laptop:mx-20 laptop:px-0 laptop:justify-between laptop:border-none laptop:divide-none">
      {!laptop && (
        <Button className="p-3 pl-0">
          <IconLabel icon={MenuIcon} label="Menu" labelPosition="right" />
        </Button>
      )}

      {laptop && (
        <nav>
          <ul className="flex gap-6 small-uppercase">
            <NavItem label="Sale" />
            <NavItem label="New In" href="/new-in" />
            <NavItem label="Clothing" />
            <NavItem label="Shoes" />
            <NavItem label="Accessories" />
            <NavItem label="Brands" />
          </ul>
        </nav>
      )}

      <div className="w-full pl-2.5 laptop:w-80 laptop:p-0 laptop:transition-width laptop:duration-300 laptop:ease-out laptop:absolute laptop:right-0 laptop:focus-within:w-11/12">
        <div className="hidden absolute w-24 h-full -translate-x-full bg-gradient-to-r from-transparent to-white laptop:block"></div>
        <Autocomplete placeholders={placeholders} />
      </div>
    </div>
  )
}
