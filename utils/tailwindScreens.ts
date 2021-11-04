import screens from '@/config/screens'

const screensParsed: any = {}

for (const screenName in screens) {
  if (Object.prototype.hasOwnProperty.call(screens, screenName)) {
    const screenBreakpoint = (screens as any)[screenName]
    const screenValue = parseInt(screenBreakpoint, 10)
    if (!isNaN(screenValue)) {
      screensParsed[screenName] = screenValue
    }
  }
}

export default screensParsed
