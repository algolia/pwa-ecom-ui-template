import whyDidYouRender from '@welldone-software/why-did-you-render'
import React from 'react'

import { isBrowser } from '@/utils/browser'

if (isBrowser) {
  whyDidYouRender(React, {
    trackAllPureComponents: false,
    collapseGroups: true,
  })
}
