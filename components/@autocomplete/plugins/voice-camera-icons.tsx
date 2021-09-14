import { render } from 'react-dom'

import { Button } from '@ui/button/button'

import { Icon } from '@/components/@ui/icon/icon'
import { createTemplatePlugin } from '@/lib/autocomplete/plugins/createTemplatePlugin'
import CropIcon from '~icons/ic/outline-crop-free'
import VoiceIcon from '~icons/ic/outline-keyboard-voice'
import CameraIcon from '~icons/ic/outline-photo-camera'

type AutocompleteIconsProps = {
  voice?: boolean
  camera?: boolean
}

function AutocompleteIcons({
  voice = true,
  camera = true,
}: AutocompleteIconsProps) {
  return (
    <div className="h-full flex gap-1 items-center absolute right-0">
      {voice && (
        <Button className="h-full" title="Voice search">
          <VoiceIcon className="text-2xl" />
        </Button>
      )}

      {camera && (
        <>
          <span className="w-px h-6 bg-neutral-light"></span>
          <Button
            className="flex h-full items-center justify-center text-2xl pr-3"
            title="Camera search"
          >
            <Icon icon={CropIcon} />
            <Icon icon={CameraIcon} className="text-[0.5em] absolute" />
          </Button>
        </>
      )}
    </div>
  )
}

export function voiceCameraIconsPluginCreator() {
  return createTemplatePlugin({
    container: '.aa-InputWrapperSuffix',
    render(root) {
      render(<AutocompleteIcons />, root)
    },
  })
}
