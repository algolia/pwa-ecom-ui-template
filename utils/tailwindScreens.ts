// @preval
/* eslint @typescript-eslint/no-var-requires: 0, import/no-commonjs: 0, import/extensions: 0 */

const resolveConfig = require('tailwindcss/resolveConfig')

const tailwindConfig = require('../tailwind.config.js')

const config = resolveConfig(tailwindConfig)
const screens = config.theme.screens
const screensParsed = {}

for (const screenName in screens) {
  if (Object.prototype.hasOwnProperty.call(screens, screenName)) {
    const screenBreakpoint = screens[screenName]
    const screenValue = parseInt(screenBreakpoint, 10)
    if (!isNaN(screenValue)) {
      screensParsed[screenName] = screenValue
    }
  }
}

module.exports = screensParsed
