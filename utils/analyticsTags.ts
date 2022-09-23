import { userAgent } from './userAgent'

const { browser, device, os } = userAgent

export const userAnalyticsTags = [
  `browser:${browser.name || 'unknown'}`,
  `device:${device.model}`,
  `deviceType:${device.type}`,
  `os:${os.name || 'unknown'}`,
]
