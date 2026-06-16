"use client";

import { useSyncExternalStore } from "react";

/**
 * Subscribe to a CSS media query without tripping the
 * `react-hooks/set-state-in-effect` rule. SSR returns `false`
 * so the heavy desktop-only branches never render on the server.
 */
export function useMediaQuery(query: string): boolean {
  const subscribe = (onChange: () => void) => {
    const mql = window.matchMedia(query);
    mql.addEventListener("change", onChange);
    return () => mql.removeEventListener("change", onChange);
  };

  const getSnapshot = () => window.matchMedia(query).matches;
  const getServerSnapshot = () => false;

  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}

/** True on `sm` breakpoint and up (>= 640px). */
export function useIsDesktop(): boolean {
  return useMediaQuery("(min-width: 640px)");
}
