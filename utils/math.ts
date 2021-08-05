export function clamp(val: number, min: number, max: number) {
  return Math.min(max, Math.max(min, val))
}
