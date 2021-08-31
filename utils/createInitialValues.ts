import type { Atom } from 'jotai'

export function createInitialValues() {
  const initialValues: Array<readonly [Atom<unknown>, unknown]> = []
  const get = () => initialValues
  const set = <T>(anAtom: Atom<T>, value: T) => {
    initialValues.push([anAtom, value])
  }
  return { get, set }
}
