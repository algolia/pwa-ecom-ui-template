import classNames from 'classnames'
import { atom, useAtom } from 'jotai'

import { Button } from '@ui/button/button'
import { Icon } from '@ui/icon/icon'

import ListViewIcon from '~icons/ic/outline-format-list-bulleted'
import GridViewIcon from '~icons/ic/outline-grid-view'

export type ViewMode = 'grid' | 'list'

export const viewModeAtom = atom<ViewMode>('grid')

export function ViewModes() {
  const [viewMode, setViewMode] = useAtom(viewModeAtom)

  return (
    <div className="flex items-center gap-1">
      <div className="laptop:small-bold">Display</div>

      <Button
        disabled={viewMode === 'grid'}
        className={classNames({
          '!text-brand-nebula': viewMode === 'grid',
        })}
        onClick={() => setViewMode('grid')}
      >
        <Icon icon={GridViewIcon} />
      </Button>
      <Button
        disabled={viewMode === 'list'}
        className={classNames({
          '!text-brand-nebula': viewMode === 'list',
        })}
        onClick={() => setViewMode('list')}
      >
        <Icon icon={ListViewIcon} />
      </Button>
    </div>
  )
}
