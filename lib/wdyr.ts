import whyDidYouRender from '@welldone-software/why-did-you-render'
import React from 'react'

if (typeof window !== 'undefined') {
  whyDidYouRender(React, {
    trackAllPureComponents: true,
    collapseGroups: true,
  })
}
