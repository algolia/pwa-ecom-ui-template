import classNames from 'classnames'
import { atom } from 'jotai'
import { useAtomValue } from 'jotai/utils'

import { RefinementsPanelBody } from './refinements-panel-body'
import { RefinementsPanelFooter } from './refinements-panel-footer'
import { RefinementsPanelHeader } from './refinements-panel-header'

import { overlayAtom } from '@/components/overlay/overlay'
import { Tablet } from '@/lib/media'

export type RefinementsPanelProps = {
  dynamicWidgets?: boolean
}

const mobileExpandedAtom = atom(false)
export const refinementsPanelMobileExpandedAtom = atom(
  (get) => get(mobileExpandedAtom) && get(overlayAtom).visible,
  (get, set, expanded: boolean) => {
    set(mobileExpandedAtom, expanded)
    set(overlayAtom, { visible: expanded, zIndex: 'z-overlay-full' })
  }
)
export const refinementsPanelDesktopExpandedAtom = atom(true)

export function RefinementsPanel({
  dynamicWidgets = true,
}: RefinementsPanelProps) {
  const mobileExpanded = useAtomValue(refinementsPanelMobileExpandedAtom)
  const desktopExpanded = useAtomValue(refinementsPanelDesktopExpandedAtom)

  const cn = classNames('RefinementsPanel', {
    'RefinementsPanel-mobileExpanded': mobileExpanded,
    'RefinementsPanel-desktopExpanded': desktopExpanded,
  })

  return (
    <section className={cn}>
      <div className="w-full laptop:w-64 laptop:h-full laptop:overflow-y-auto">
        <div className="h-full w-full flex flex-col laptop:pr-5">
          <div className="flex-grow px-4 overflow-y-auto laptop:px-0 laptop:overflow-y-visible">
            <RefinementsPanelHeader />
            <RefinementsPanelBody dynamicWidgets={dynamicWidgets} />
          </div>
          <Tablet>
            <RefinementsPanelFooter />
          </Tablet>
        </div>
      </div>

      <div className="RefinementsPanel-gradient" />
    </section>
  )
}
