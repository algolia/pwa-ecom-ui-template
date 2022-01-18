import FilterIcon from '@material-design-icons/svg/outlined/filter_list.svg'
import { useAtom } from 'jotai'

import { ClientOnly } from '@/components/client-only/client-only'
import { refinementsPanelDesktopExpandedAtom } from '@/components/refinements-panel/refinements-panel'
import { withDebugLayer } from '@dev/debug-layer/debug-layer'
import { Button } from '@ui/button/button'
import { IconLabel } from '@ui/icon-label/icon-label'

function ToggleFiltersComponent() {
  // 'desktopExpanded' is only available in localStorage (client-side only)
  const [desktopExpanded, setDesktopExpanded] = useAtom(
    refinementsPanelDesktopExpandedAtom
  )

  return (
    <ClientOnly>
      <Button
        className="flex items-center gap-2 flex-shrink-0 text-neutral-darkest"
        onClick={() => setDesktopExpanded((expanded) => !expanded)}
      >
        <IconLabel
          icon={FilterIcon}
          label={`${desktopExpanded ? 'Hide' : 'Show'} filters`}
          labelPosition="left"
          classNameLabel="small-bold"
          classNameIcon="w-4 h-4"
        />
      </Button>
    </ClientOnly>
  )
}

export const ToggleFilters = withDebugLayer(
  ToggleFiltersComponent,
  'ToggleFiltersWidget'
)
