import { atom } from 'jotai'
import { useAtomValue, useUpdateAtom } from 'jotai/utils'
import { useEffect, useMemo } from 'react'
import type {
  CurrentRefinementsProvided,
  Refinement,
  RefinementValue,
} from 'react-instantsearch-core'
import type { RatingMenuCurrentRefinement } from 'react-instantsearch-dom'
import { connectCurrentRefinements } from 'react-instantsearch-dom'

import { ClearRefinements } from '@instantsearch/_widgets/clear-refinements/clear-refinements'

import { Chip } from '@/components/@ui/chip/chip'
import { configAtom } from '@/config/config'
import type { Config } from '@/config/config'

export type CurrentRefinementsProps = CurrentRefinementsProvided & {
  header?: string
  className?: string
}

export type CurrentRefinement = {
  category: string
  label: string
  value: RefinementValue
}

export const refinementCountAtom = atom(0)

function getRefinement(
  refinement: Refinement,
  config: Config
): CurrentRefinement[] {
  const refinementConfig = config.refinements.find((r) =>
    r.options.attributes
      ? r.options.attributes[0] === refinement.attribute
      : r.options.attribute === refinement.attribute
  )

  switch (refinementConfig?.type) {
    case 'color': {
      return (
        refinement?.items?.map((item) => ({
          category: refinementConfig.label,
          label: item.label.split(refinementConfig.options.separator ?? ';')[0],
          value: item.value,
        })) || []
      )
    }

    case 'size':
    case 'list': {
      return (
        refinement?.items?.map((item) => ({
          category: refinementConfig.label,
          label: item.label,
          value: item.value,
        })) || []
      )
    }

    case 'hierarchical': {
      return [
        {
          category: refinementConfig.label,
          label: refinement.currentRefinement as string,
          value: refinement.value,
        },
      ]
    }

    case 'rating': {
      return [
        {
          category: refinementConfig.label,
          label: `≥ ${
            (refinement.currentRefinement as RatingMenuCurrentRefinement).min
          }`,
          value: refinement.value,
        },
      ]
    }

    default: {
      return []
    }
  }
}

export const CurrentRefinements =
  connectCurrentRefinements<CurrentRefinementsProps>(
    ({ items, refine, header, className }) => {
      const config = useAtomValue(configAtom)

      const refinements = useMemo(
        () =>
          items.reduce((acc: CurrentRefinement[], current) => {
            return [...acc, ...getRefinement(current, config)]
          }, []),
        [config, items]
      )

      const setRefinementCount = useUpdateAtom(refinementCountAtom)
      useEffect(
        () => setRefinementCount(refinements.length),
        [setRefinementCount, refinements]
      )

      if (!refinements.length) return null

      return (
        <div className={className}>
          {header && <div className="text-neutral-dark mb-2">{header}</div>}
          <ul className="flex flex-wrap gap-3">
            {refinements.map((refinement) => {
              return (
                <li key={[refinement.category, refinement.label].join(':')}>
                  <Chip
                    closeIcon={true}
                    onClick={() => refine(refinement.value)}
                  >
                    <div className="font-normal">{refinement.category}:</div>
                    <div className="capitalize">{refinement.label}</div>
                  </Chip>
                </li>
              )
            })}
            <li className="flex items-center">
              <ClearRefinements className="body-bold text-brand-nebula transition-colors can-hover:hover:text-nebula-dark">
                Clear all
              </ClearRefinements>
            </li>
          </ul>
        </div>
      )
    }
  )
