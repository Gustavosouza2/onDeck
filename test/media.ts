/**
 * A controllable `window.matchMedia` for jsdom, which has none.
 *
 * Tests set what the "system" reports — light or dark, reduced motion, running
 * installed — and can flip it mid-test to prove a component follows the change.
 * Unmatched queries report false.
 */
import { STANDALONE_QUERY } from "@/components/content/InstallPrompt";
import { SYSTEM_LIGHT_QUERY } from "@/lib/theme";

type Listener = (event: { matches: boolean; media: string }) => void;

const state = new Map<string, boolean>();
const listeners = new Map<string, Set<Listener>>();

export const SYSTEM_LIGHT = SYSTEM_LIGHT_QUERY;
export const STANDALONE = STANDALONE_QUERY;

export function setMedia(query: string, matches: boolean): void {
  const changed = state.get(query) !== matches;
  state.set(query, matches);
  if (!changed) return;
  for (const listener of listeners.get(query) ?? []) {
    listener({ matches, media: query });
  }
}

export function resetMedia(): void {
  state.clear();
  listeners.clear();
}

export function installMatchMedia(): void {
  window.matchMedia = (query: string) => {
    const register = (fn: Listener) => {
      if (!listeners.has(query)) listeners.set(query, new Set());
      listeners.get(query)!.add(fn);
    };
    const unregister = (fn: Listener) => listeners.get(query)?.delete(fn);

    return {
      media: query,
      get matches() {
        return state.get(query) ?? false;
      },
      onchange: null,
      addEventListener: (_: string, fn: Listener) => register(fn),
      removeEventListener: (_: string, fn: Listener) => unregister(fn),
      addListener: register,
      removeListener: unregister,
      dispatchEvent: () => false,
    } as unknown as MediaQueryList;
  };
}
