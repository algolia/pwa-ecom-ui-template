import StarFillIcon from '@material-design-icons/svg/outlined/star.svg'
import StarOulineIcon from '@material-design-icons/svg/outlined/star_outline.svg'
import classNames from 'classnames'
import { useMemo, useState } from 'react'
import type { RatingMenuProvided } from 'react-instantsearch-dom'
import { connectRange } from 'react-instantsearch-dom'

import { Button } from '@/components/@ui/button/button'
import { Icon } from '@/components/@ui/icon/icon'

export type RatingSelectorProps = RatingMenuProvided

export const RatingSelector = connectRange(
  ({ currentRefinement, max, count, refine }: RatingSelectorProps) => {
    const [currentHoverIdx, setCurrentHoverIdx] = useState(-1)
    const currRefinement = currentRefinement.min
    const currCount = useMemo(
      () =>
        count.find((v) => v.value === currRefinement?.toString())?.count || 0,
      [count, currRefinement]
    )

    return (
      <div className="flex items-center">
        {[...Array(max)].map((_, i) => (
          <Button
            key={i} // eslint-disable-line react/no-array-index-key
            className={classNames({
              'text-neutral-dark': currentHoverIdx >= i,
              'cursor-not-allowed hover:text-brand-black':
                i + 1 === currRefinement,
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
        <div className="small-bold text-neutral-dark ml-auto">{currCount}</div>
      </div>
    )
  }
)
