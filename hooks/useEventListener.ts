import { useEffect, useMemo, useRef } from 'react'

export function useEventListener<KD extends keyof DocumentEventMap>(
  element: Document | null | undefined,
  eventType: KD,
  listener: (this: Document, evt: DocumentEventMap[KD]) => void,
  options?: AddEventListenerOptions | boolean
): void
export function useEventListener<KH extends keyof HTMLElementEventMap>(
  element: HTMLElement | null | undefined,
  eventType: KH,
  listener: (this: HTMLElement, evt: HTMLElementEventMap[KH]) => void,
  options?: AddEventListenerOptions | boolean
): void
export function useEventListener<KW extends keyof WindowEventMap>(
  element: Window | null | undefined,
  eventType: KW,
  listener: (this: Window, evt: WindowEventMap[KW]) => void,
  options?: AddEventListenerOptions | boolean
): void
export function useEventListener(
  element: Document | HTMLElement | Window | null | undefined,
  eventType: string,
  listener: (evt: Event) => void,
  options?: AddEventListenerOptions | boolean
): void

export function useEventListener<
  KD extends keyof DocumentEventMap,
  KH extends keyof HTMLElementEventMap,
  KW extends keyof WindowEventMap
>(
  element: Document | HTMLElement | Window | null | undefined,
  eventType: KD | KH | KW | string,
  listener: (
    this: typeof element,
    evt:
      | DocumentEventMap[KD]
      | Event
      | HTMLElementEventMap[KH]
      | WindowEventMap[KW]
  ) => void,
  options?: AddEventListenerOptions | boolean
): void {
  const listenerRef = useRef(listener)
  listenerRef.current = listener

  const memorizedOptions = useMemo(() => options, [options])

  useEffect(() => {
    if (!element) return undefined

    const wrappedListener: typeof listenerRef.current = (evt) =>
      listenerRef.current.call(element, evt)

    element.addEventListener(eventType, wrappedListener, memorizedOptions)

    return () => {
      element.removeEventListener(eventType, wrappedListener, memorizedOptions)
    }
  }, [element, eventType, memorizedOptions])
}
