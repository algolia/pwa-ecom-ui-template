import { memo } from 'react'

import { LogoSymbol } from '@/components/logo/logo'
import { Link } from '@ui/link/link'

export type FooterProps = Record<string, unknown>

export const Footer = memo(function Footer() {
  return (
    <footer className="mt-auto">
      <div className="hidden bg-neutral-lightest justify-between px-20 py-24 laptop:flex">
        {Array.from(Array(6), (ei, i) => (
          <div key={i} className="flex flex-col gap-2">
            <div className="label-semibold">Footer {i + 1}</div>
            <ul className="small-regular flex flex-col gap-2">
              {Array.from(Array(3), (ej, j) => (
                <li key={j}>
                  <Link
                    href={`/footer-link-${i + 1}-${j + 1}`}
                    title={`Link ${j + 1}`}
                    className="text-neutral-darkest can-hover:transition-colors can-hover:hover:text-neutral-dark"
                    onClick={(e) => e.preventDefault()}
                  >
                    {`Link ${j + 1}`}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="bg-brand-black flex flex-col items-center justify-center gap-3 py-8 laptop:py-9">
        <Link href="/" title="Spencer and Williams">
          <LogoSymbol />
        </Link>

        <ul className="text-white text-center laptop:hidden">
          <li>
            <Link href="/" title="Home" className="block p-4">
              Home
            </Link>
          </li>
          <li>
            <Link href="/about-us" title="About Us" className="block p-4">
              About Us
            </Link>
          </li>
          <li>
            <Link href="/contact" title="Contact" className="block p-4">
              Contact
            </Link>
          </li>
        </ul>
      </div>
    </footer>
  )
})
