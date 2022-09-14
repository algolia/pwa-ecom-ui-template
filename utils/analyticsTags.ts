import type { IDevice, IOS } from 'ua-parser-js'
import parseUserAgent from 'ua-parser-js'

// Map the most common devices from the OS in case the device is unknown
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

const getUserAnalyticsTags = (): string[] => {
  const { browser, device, os } = parseUserAgent()
  const { model, type } = getUserDevice(device, os)

  return [
    `browser:${browser.name || 'unknown'}`,
    `device:${model}`,
    `deviceType:${type}`,
    `os:${os.name || 'unknown'}`,
  ]
}

export const userAnalyticsTags = getUserAnalyticsTags()
