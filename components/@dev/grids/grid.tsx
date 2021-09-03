import type { CSSProperties } from 'react'
import { useMemo } from 'react'

export type GridProps = {
  columns: number
  margin: number
  gutter: number
}

export function Grid({ columns, margin, gutter }: GridProps) {
  const style = useMemo(
    () => ({
      '--gutter': `${gutter}px`,
      '--margin': `${margin}px`,
    }),
    [gutter, margin]
  )

  const columnsDivs = useMemo(
    () =>
      [...Array(columns)].map((_, i) => (
        <div
          key={i} // eslint-disable-line react/no-array-index-key
          className="w-full h-full bg-[#F82CAA] bg-opacity-[0.04]"
        ></div>
      )),
    [columns]
  )

  return (
    <div
      style={style as CSSProperties}
      className="select-none pointer-events-none fixed top-0 left-0 w-full h-full grid grid-flow-col gap-[var(--gutter)] px-[var(--margin)]"
    >
      {columnsDivs}
    </div>
  )
}
