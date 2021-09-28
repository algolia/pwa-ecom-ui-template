import { isomorphicWindow } from './browser'

export function launchEditor(
  fileName: string,
  lineNumber: number,
  columnNumber: number
) {
  isomorphicWindow?.fetch(
    `${
      process.env.__NEXT_ROUTER_BASEPATH || ''
    }/__nextjs_launch-editor?file=${fileName}&lineNumber=${lineNumber}&column=${columnNumber}`
  )
}
