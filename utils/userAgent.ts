import userAgentParser from 'ua-parser-js'
import type { IBrowser, IDevice, IOS } from 'ua-parser-js'

/**
 * Get a device from the OS.
 */
const OSDevices: {
  [key: string]: Omit<IDevice, 'vendor'>
} = {
  Android: {
    model: 'unknown',
    type: 'mobile',
  },
  iOS: {
    model: 'Apple iPhone',
    type: 'mobile',
  },
  'Mac OS': {
    model: 'Apple Mac',
    type: 'desktop',
  },
  Windows: {
    model: 'unknown',
    type: 'desktop',
  },
}

const getUserDevice = (device: IDevice, os: IOS): Omit<IDevice, 'vendor'> => {
  if (Object.keys(device).every((key) => Boolean(device[key as keyof IDevice])))
    return { model: `${device.vendor} ${device.model}`, type: device.type }

  return os.name ? OSDevices[os.name] : { model: 'unknown', type: 'unknown' }
}

type ParsedUserAgent = {
  browser: IBrowser
  device: Omit<IDevice, 'vendor'>
  os: IOS
}

export const parseUserAgent = (userAgent = ''): ParsedUserAgent => {
  const { browser, device, os } = userAgentParser(userAgent)
  const { model, type } = getUserDevice(device, os)

  return {
    browser,
    device: { model, type },
    os,
  }
}

export const userAgent = parseUserAgent()
export const isMobile = userAgent.device.type === 'mobile'
