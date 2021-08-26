import { atom } from 'jotai'
import { useAtomValue } from 'jotai/utils'

import { RefinementsPanelBody } from './refinements-panel-body'
import { RefinementsPanelFooter } from './refinements-panel-footer'
import { RefinementsPanelHeader } from './refinements-panel-header'

import { overlayAtom } from '@/components/overlay/overlay'
import { useClassNames } from '@/hooks/useClassNames'
import { Tablet } from '@/lib/media'

export type RefinementsPanelProps = {
  dynamicWidgets?: boolean
}

const refinementsPanelAtom = atom({ mobileExpanded: false })
export const refinementsPanelMobileExpandedAtom = atom(
  (get) => get(refinementsPanelAtom).mobileExpanded && get(overlayAtom).visible,
  (get, set, expanded: boolean) => {
    set(refinementsPanelAtom, { mobileExpanded: expanded })
    set(overlayAtom, { visible: expanded, zIndex: 'z-overlay-full' })
  }
)

export function RefinementsPanel({
  dynamicWidgets = true,
}: RefinementsPanelProps) {
  const mobileExpanded = useAtomValue(refinementsPanelMobileExpandedAtom)

  return (
    <section
      className={useClassNames(
        'RefinementsPanel',
        {
          'translate-x-[105%] laptop:transform-none': !mobileExpanded,
        },
        [mobileExpanded]
      )}
    >
      <div className="w-full laptop:overflow-hidden laptop:transition-width">
        <div className="RefinementsPanel-gradient" />

        <div className="h-full w-full flex flex-col laptop:pr-5">
          <div className="flex-grow px-4 overflow-y-auto laptop:px-0 laptop:overflow-y-auto">
            <RefinementsPanelHeader />
            <RefinementsPanelBody dynamicWidgets={dynamicWidgets} />
          </div>
          <Tablet>
            <RefinementsPanelFooter />
          </Tablet>
        </div>
      </div>
    </section>
  )
}
