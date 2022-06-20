import classNames from 'classnames'
import { m } from 'framer-motion'
import { atom } from 'jotai'
import { useAtomValue, useUpdateAtom } from 'jotai/utils'
import { memo, useEffect, useMemo } from 'react'
import isEqual from 'react-fast-compare'
import type {
  CurrentRefinementsProvided,
  RefinementValue,
} from 'react-instantsearch-core'
import { connectCurrentRefinements } from 'react-instantsearch-dom'

import { Chip } from '@/components/@ui/chip/chip'
import { configAtom } from '@/config/config'
import { withDebugLayer } from '@dev/debug-layer/debug-layer'
import { ClearRefinements } from '@instantsearch/widgets/clear-refinements/clear-refinements'

import { getCurrentRefinement } from './getCurrentRefinement'

export type CurrentRefinementsProps = CurrentRefinementsProvided & {
  header?: string
  className?: string
}

export type CurrentRefinement = {
  category?: string
  label: string
  value: RefinementValue
}

export const refinementCountAtom = atom(0)
export const currentRefinementAtom = atom({})
export const currentHierarchicalAtom = atom(null)
export const currentBrandAtom = atom(null)

function CurrentRefinementsComponent({
  items,
  refine,
  header,
  className,
}: CurrentRefinementsProps) {
  const config = useAtomValue(configAtom)

  const refinements = useMemo(
    () =>
      items.reduce((acc: CurrentRefinement[], current) => {
        return [...acc, ...getCurrentRefinement(current, config)]
      }, []),
    [config, items]
  )

  const setCurrentRefinement = useUpdateAtom(currentRefinementAtom)
  const setRefinementCount = useUpdateAtom(refinementCountAtom)
  const setCurrentHierarchical = useUpdateAtom(currentHierarchicalAtom)
  const setCurrentBrand = useUpdateAtom(currentBrandAtom)
  useEffect(() => {
    const hierarchicalMenuRefinement: any | boolean | undefined = items.find(
      (item) => item.attribute === 'hierarchical_categories.lvl0'
    )
    const brandRefinement: any | boolean | undefined = items.find(
      (item) => item.attribute === 'brand'
    )
    if (brandRefinement) {
      brandRefinement.currentRefinement.map((brandName: any | string) =>
        setCurrentBrand(brandName)
      )
    }
    if (hierarchicalMenuRefinement) {
      const levels = hierarchicalMenuRefinement.currentRefinement.split(' > ')
      const currentLevelNumber = levels.length - 1
      const hierarchicalLevel =
        hierarchicalMenuRefinement.attribute.slice(0, -1) + currentLevelNumber
      setCurrentHierarchical(hierarchicalLevel)
    }

    setRefinementCount(refinements.length)
    if (!items.length) {
      setCurrentRefinement([])
      setCurrentHierarchical(null)
      setCurrentBrand(null)
    }
    // eslint-disable-next-line array-callback-return
    items.map((item) => {
      setCurrentRefinement(item)
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [setRefinementCount, refinements, items])

  if (!refinements.length) return null

  return (
    <div className={className}>
      {header && <div className="text-neutral-dark mb-2">{header}</div>}
      <ul className="flex flex-wrap gap-3">
        {refinements.map((refinement) => {
          return (
            <m.li key={[refinement.category, refinement.label].join(':')}>
              <Chip closeIcon={true} onClick={() => refine(refinement.value)}>
                {refinement.category && (
                  <div className="font-normal">{refinement.category}:</div>
                )}
                <div className="capitalize">{refinement.label}</div>
              </Chip>
            </m.li>
          )
        })}
        <li
          key="clear"
          className={classNames('flex items-center', {
            hidden: refinements.length < 2,
          })}
        >
          <ClearRefinements className="body-bold text-brand-nebula can-hover:transition-colors can-hover:hover:text-nebula-light">
            Clear all
          </ClearRefinements>
        </li>
      </ul>
    </div>
  )
}

export const CurrentRefinements = connectCurrentRefinements<any>(
  memo(
    withDebugLayer(CurrentRefinementsComponent, 'CurrentRefinementsWidget'),
    isEqual
  )
)