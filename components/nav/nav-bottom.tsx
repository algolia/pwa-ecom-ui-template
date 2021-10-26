import MenuIcon from '@material-design-icons/svg/outlined/menu.svg'
import { useRouter } from 'next/router'
import { useMemo } from 'react'

import { Button } from '@ui/button/button'
import { IconLabel } from '@ui/icon-label/icon-label'

import { NavAutocomplete } from './nav-autocomplete'
import { NavItem } from './nav-item'

import { Laptop, Tablet } from '@/lib/media'
import { parseUrl } from '@/utils/parseUrl'

export function NavBottom() {
  const router = useRouter()
  const currentSex = useMemo(() => {
    const { pathname } = parseUrl(router?.asPath)
    return pathname.match(/\/catalog\/(.[^/]*)\/?/)?.[1]
  }, [router?.asPath])

  return (
    <div className="flex items-center px-4 relative divide-x border-b border-neutral-light laptop:h-12 laptop:mx-20 laptop:mb-5 laptop:px-0 laptop:justify-between laptop:border-none laptop:divide-none">
      <Tablet>
        <Button className="p-3 pl-0">
          <IconLabel icon={MenuIcon} label="Menu" labelPosition="right" />
        </Button>
      </Tablet>

      <Laptop>
        {currentSex && (
          <nav>
            <ul className="flex gap-6 small-uppercase">
              <NavItem
                label="Clothing"
                href={`/catalog/${currentSex}/Clothing`}
              />
              <NavItem label="Shoes" href={`/catalog/${currentSex}/Shoes`} />
              <NavItem
                label="Accessories"
                href={`/catalog/${currentSex}/Accessories`}
              />
            </ul>
          </nav>
        )}
      </Laptop>

      <NavAutocomplete />
    </div>
  )
}
