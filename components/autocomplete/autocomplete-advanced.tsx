import { useMemo } from 'react'

import type { AutocompleteBasicProps } from './autocomplete-basic'
import AutocompleteBasic from './autocomplete-basic'
import searchButtonPlugin from './plugins/search-button'
import voiceCameraIconsPlugin from './plugins/voice-camera-icons'

type AutocompleteAdvancedProps = AutocompleteBasicProps

export default function AutocompleteAdvanced(
  props: AutocompleteAdvancedProps
): JSX.Element {
  const plugins = useMemo(
    () => [voiceCameraIconsPlugin(), searchButtonPlugin()],
    []
  )

  return <AutocompleteBasic plugins={plugins} {...props} />
}
