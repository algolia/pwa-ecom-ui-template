export function clamp(val: number, min: number, max: number) {
  return Math.min(max, Math.max(min, val))
}

export function modAbs(val: number, length: number) {
  let newVal = val
  if (newVal < 0) {
    newVal = length + (newVal % length)
  }
  if (newVal >= length) {
    return newVal % length
  }
  return newVal
}
