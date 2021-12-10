import StarFillIcon from '@material-design-icons/svg/outlined/star.svg'
import StarOulineIcon from '@material-design-icons/svg/outlined/star_outline.svg'
import classNames from 'classnames'
import { memo, useMemo, useState } from 'react'
import isEqual from 'react-fast-compare'
import type { RatingMenuProvided } from 'react-instantsearch-core'
import { connectRange } from 'react-instantsearch-dom'

import { Button } from '@/components/@ui/button/button'
import { Icon } from '@/components/@ui/icon/icon'

export type RatingSelectorProps = RatingMenuProvided

function RatingSelectorComponent({
  currentRefinement,
  min,
  max,
  count,
  refine,
}: RatingSelectorProps) {
  const [currentHoverIdx, setCurrentHoverIdx] = useState(-1)
  const currRefinement = currentRefinement.min
  const currCount = useMemo(
    () => count.find((v) => v.value === currRefinement?.toString())?.count || 0,
    [count, currRefinement]
  )

  if (typeof min === 'undefined' || typeof max === 'undefined') return null

  return (
    <div className="flex items-center">
      <span className="mr-1 font-bold text-lg">≥</span>
      {[...Array(max)].map((_, i) => (
        <Button
          key={i} // eslint-disable-line react/no-array-index-key
          className={classNames({
            'text-neutral-dark': currentHoverIdx >= i,
            'hover:text-brand-black': i + 1 === currRefinement,
          })}
          disabled={i + 1 === currRefinement}
          onClick={() => {
            setCurrentHoverIdx(-1)
            refine({ min: i + 1 })
          }}
          onMouseEnter={() => {
            if (i + 1 !== currRefinement) setCurrentHoverIdx(i)
          }}
          onMouseLeave={() => setCurrentHoverIdx(-1)}
        >
          <Icon
            icon={
              (currRefinement || 0) >= i + 1 ? StarFillIcon : StarOulineIcon
            }
          />
        </Button>
      ))}
      <div className="small-bold pt-px text-neutral-dark ml-auto pl-4">
        {currCount}
      </div>
    </div>
  )
}

export const RatingSelector = connectRange(
  memo(RatingSelectorComponent, isEqual)
)
