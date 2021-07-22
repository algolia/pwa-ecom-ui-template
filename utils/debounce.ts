export default function debounce(
  fn: (...args: any[]) => any,
  delay = 100
): (...args: any[]) => void {
  let timeout: ReturnType<typeof setTimeout>
  return (...args): void => {
    const later = (): void => {
      fn(...args)
    }
    clearTimeout(timeout)
    timeout = setTimeout(later, delay)
  }
}
