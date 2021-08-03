import type { CSSProperties } from 'react'
import { useMemo } from 'react'

import { useTailwindScreens } from '@/hooks/useTailwindScreens'

export default function Grid(): JSX.Element {
  const { laptop } = useTailwindScreens()

  const config = useMemo(
    () => ({
      columns: laptop ? 12 : 4,
      margin: laptop ? 80 : 16,
      gutter: laptop ? 24 : 26,
    }),
    [laptop]
  )

  const style = useMemo(
    () => ({
      '--gutter': `${config.gutter}px`,
      '--margin': `${config.margin}px`,
    }),
    [config.gutter, config.margin]
  )

  const columnsDivs = useMemo(
    () =>
      [...Array(config.columns)].map((e, i: number) => (
        <div
          key={i} // eslint-disable-line react/no-array-index-key
          className="w-full h-full bg-[#F82CAA] bg-opacity-[0.04]"
        ></div>
      )),
    [config.columns]
  )

  return (
    <div
      style={style as CSSProperties}
      className="z-50 select-none pointer-events-none absolute top-0 left-0 w-full h-full grid grid-flow-col gap-[var(--gutter)] px-[var(--margin)]"
    >
      {columnsDivs}
    </div>
  )
}
