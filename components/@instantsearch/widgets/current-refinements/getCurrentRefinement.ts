import type {
  RangeInputRefinement,
  RatingMenuRefinement,
  Refinement as ISRefinement,
} from 'react-instantsearch-core'

import type { CurrentRefinement } from './current-refinements'

import type { Config } from '@/config/config'
import type { Refinement, RefinementWidget } from '@/typings/refinements'

function getRefinementConfig(
  r: Refinement | RefinementWidget,
  refinement: ISRefinement
) {
  const refinementOptions = r.options
  return refinementOptions?.attributes
    ? refinementOptions?.attributes[0] === refinement.attribute
    : refinementOptions?.attribute === refinement.attribute
}

export function getCurrentRefinement(
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
            (refinement.currentRefinement as RatingMenuRefinement).min
          }`,
          value: refinement.value,
        },
      ]
    }

    case 'price': {
      const currentRefinement =
        refinement.currentRefinement as RangeInputRefinement

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
