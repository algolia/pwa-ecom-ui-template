// @preval
/* eslint @typescript-eslint/no-var-requires: 0, import/no-commonjs: 0, import/extensions: 0 */

const resolveConfig = require('tailwindcss/resolveConfig')

const tailwindConfig = require('../tailwind.config.js')

const config = resolveConfig(tailwindConfig)

module.exports = config.theme.screens
