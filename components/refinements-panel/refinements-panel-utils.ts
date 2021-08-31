import type {
  Panels,
  Refinement,
  RefinementWidget,
} from './refinements-panel-body'

export function getRefinementPanelId(
  refinement: Refinement | RefinementWidget
) {
  return refinement.options?.attributes
    ? refinement.options?.attributes.join(':')
    : refinement.options?.attribute
}

export function getPanelId(refinement: Refinement | RefinementWidget) {
  const widgets = (refinement as Refinement).widgets

  const panelId = []
  if (widgets?.length) {
    widgets.forEach((refinementWidget: RefinementWidget) =>
      panelId.push(getRefinementPanelId(refinementWidget))
    )
  } else {
    panelId.push(getRefinementPanelId(refinement))
  }

  return panelId.join(':')
}

export function getRefinementPanelAttribute(
  refinement: Refinement | RefinementWidget
) {
  return refinement.options?.attributes
    ? refinement.options?.attributes[0]
    : refinement.options?.attribute
}

export function getPanelAttributes(refinement: Refinement | RefinementWidget) {
  const widgets = (refinement as Refinement)?.widgets

  const panelAttributes = []
  if (widgets?.length) {
    widgets.forEach((refinementWidget: RefinementWidget) =>
      panelAttributes.push(getRefinementPanelAttribute(refinementWidget))
    )
  } else {
    panelAttributes.push(getRefinementPanelAttribute(refinement))
  }

  return panelAttributes
}

export function togglePanels(panels: Panels, val: boolean) {
  return Object.keys(panels).reduce(
    (acc, panelKey) => ({ ...acc, [panelKey]: val }),
    {}
  )
}
