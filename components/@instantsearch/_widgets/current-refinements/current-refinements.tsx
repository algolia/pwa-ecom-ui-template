import { atom } from 'jotai'
import { useAtomValue, useUpdateAtom } from 'jotai/utils'
import { useEffect, useMemo } from 'react'
import type {
  CurrentRefinementsProvided,
  RefinementValue,
  Refinement as ISRefinement,
} from 'react-instantsearch-core'
import type {
  RangeInputCurrentRefinement,
  RatingMenuCurrentRefinement,
} from 'react-instantsearch-dom'
import { connectCurrentRefinements } from 'react-instantsearch-dom'

import { ClearRefinements } from '@instantsearch/_widgets/clear-refinements/clear-refinements'

import { Chip } from '@/components/@ui/chip/chip'
import type {
  Refinement,
  RefinementWidget,
} from '@/components/refinements-panel/refinements-panel-body'
import { configAtom } from '@/config/config'
import type { Config } from '@/config/config'

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

function getRefinementConfig(
  r: Refinement | RefinementWidget,
  refinement: ISRefinement
) {
  const refinementOptions = r.options
  return refinementOptions?.attributes
    ? refinementOptions?.attributes[0] === refinement.attribute
    : refinementOptions?.attribute === refinement.attribute
}

function getRefinement(
  refinement: ISRefinement,
  config: Config
): CurrentRefinement[] {
  let refinementConfig: Refinement | undefined
  config.refinements.forEach((r) => {
    const widgets = r?.widgets
    const widgetCfg = widgets?.find((w) => getRefinementConfig(w, refinement))
    if (widgets?.length && widgetCfg) {
      refinementConfig = {
        ...r,
        ...widgetCfg,
      }
    } else if (getRefinementConfig(r, refinement)) {
      refinementConfig = r
    }
  })

  switch (refinementConfig?.type) {
    case 'color': {
      return (
        refinement?.items?.map((item) => ({
          category: refinementConfig?.label,
          label: item.label.split(
            refinementConfig?.options?.separator ?? ';'
          )[0],
          value: item.value,
        })) || []
      )
    }

    case 'size':
    case 'list': {
      return (
        refinement?.items?.map((item) => ({
          category: refinementConfig?.label,
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

    case 'price': {
      const currentRefinement =
        refinement.currentRefinement as RangeInputCurrentRefinement

      let label = ''
      if (currentRefinement.min && currentRefinement.max) {
        label = `${currentRefinement.min} – ${currentRefinement.max}`
      } else if (typeof currentRefinement.min === 'undefined') {
        label = `≤ ${currentRefinement.max}`
      } else if (typeof currentRefinement.max === 'undefined') {
        label = `≥ ${currentRefinement.min}`
      }

      return [
        {
          category: refinementConfig.label,
          label,
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
                    {refinement.category && (
                      <div className="font-normal">{refinement.category}:</div>
                    )}
                    <div className="capitalize">{refinement.label}</div>
                  </Chip>
                </li>
              )
            })}
            <li className="flex items-center">
              <ClearRefinements className="body-bold text-brand-nebula can-hover:transition-colors can-hover:hover:text-nebula-light">
                Clear all
              </ClearRefinements>
            </li>
          </ul>
        </div>
      )
    }
  )
