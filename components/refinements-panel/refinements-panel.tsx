import { atom } from 'jotai'
import { atomWithStorage, useAtomValue } from 'jotai/utils'

import { ClientOnly } from '../client-only/client-only'

import { RefinementsPanelBody } from './refinements-panel-body'
import { RefinementsPanelFooter } from './refinements-panel-footer'
import { RefinementsPanelHeader } from './refinements-panel-header'

import { overlayAtom } from '@/components/overlay/overlay'
import { useClassNames } from '@/hooks/useClassNames'
import { Tablet } from '@/lib/media'

export type RefinementsPanelProps = {
  dynamicWidgets?: boolean
}

const refinementsPanelAtom = atom({
  mobileExpanded: false,
  desktopExpanded: true,
})
export const refinementsPanelMobileExpandedAtom = atom(
  (get) => get(refinementsPanelAtom).mobileExpanded && get(overlayAtom).visible,
  (get, set, expanded: boolean) => {
    set(refinementsPanelAtom, (s) => ({ ...s, mobileExpanded: expanded }))
    set(overlayAtom, { visible: expanded, zIndex: 'z-overlay-full' })
  }
)
export const refinementsPanelDesktopExpandedAtom = atomWithStorage(
  'refinementsPanelDesktopExpanded',
  true
)

export function RefinementsPanel({
  dynamicWidgets = true,
}: RefinementsPanelProps) {
  const mobileExpanded = useAtomValue(refinementsPanelMobileExpandedAtom)
  const desktopExpanded = useAtomValue(refinementsPanelDesktopExpandedAtom)

  const cn = useClassNames(
    'RefinementsPanel',
    {
      'RefinementsPanel-mobileExpanded': mobileExpanded,
      'RefinementsPanel-desktopExpanded': desktopExpanded,
    },
    [mobileExpanded, desktopExpanded]
  )

  return (
    <ClientOnly>
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
    </ClientOnly>
  )
}
