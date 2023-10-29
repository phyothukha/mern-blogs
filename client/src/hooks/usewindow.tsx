/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect } from "react";

export function useWindowEvent<K extends string = keyof WindowEventMap>(
  type: K,
  listener: K extends keyof WindowEventMap
    ? (this: Window, ev: WindowEventMap[K]) => void
    : (this: Window, ev: CustomEvent) => void,
  options?: boolean | AddEventListenerOptions
) {
  useEffect(() => {
    window.addEventListener(
      type as keyof WindowEventMap,
      listener as any,
      options
    );
    return () =>
      window.removeEventListener(
        type as keyof WindowEventMap,
        listener as any,
        options
      );
  }, [type, listener, options]);
}
