import { Grid } from './grid'

import { Laptop, Tablet } from '@/lib/media'

export function Grids() {
  return (
    <>
      <Tablet>
        <Grid columns={4} margin={16} gutter={26} />
      </Tablet>
      <Laptop>
        <Grid columns={12} margin={82} gutter={24} />
      </Laptop>
    </>
  )
}
