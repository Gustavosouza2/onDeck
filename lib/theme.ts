import { GROUND } from "@/lib/brand";
import { startThemeTransition } from "@/lib/theme-transition";

export const THEME_KEY = "ondeck:theme";

export const THEMES = ["auto", "light", "dark"] as const;
export type Theme = (typeof THEMES)[number];
export type ResolvedTheme = Exclude<Theme, "auto">;

export const SYSTEM_LIGHT_QUERY = "(prefers-color-scheme: light)";

function isTheme(value: string | null): value is Theme {
  return value === "auto" || value === "light" || value === "dark";
}

export function resolveTheme(
  theme: Theme,
  systemPrefersLight: boolean,
): ResolvedTheme {
  if (theme !== "auto") return theme;
  return systemPrefersLight ? "light" : "dark";
}

export function readTheme(): Theme {
  try {
    const stored = window.localStorage.getItem(THEME_KEY);
    return isTheme(stored) ? stored : "auto";
  } catch {
    return "auto";
  }
}

const listeners = new Set<() => void>();

export function subscribeTheme(onChange: () => void): () => void {
  listeners.add(onChange);
  window.addEventListener("storage", onChange);

  return () => {
    listeners.delete(onChange);
    window.removeEventListener("storage", onChange);
  };
}

function stampTheme(theme: Theme): void {
  const resolved = resolveTheme(
    theme,
    window.matchMedia(SYSTEM_LIGHT_QUERY).matches,
  );

  document.documentElement.dataset.theme = resolved;
  document
    .querySelector('meta[name="theme-color"]')
    ?.setAttribute("content", GROUND[resolved]);
}

export function syncThemeToDocument(): void {
  stampTheme(readTheme());
}

export function applyTheme(theme: Theme): void {
  startThemeTransition();
  stampTheme(theme);

  try {
    if (theme === "auto") {
      window.localStorage.removeItem(THEME_KEY);
    } else {
      window.localStorage.setItem(THEME_KEY, theme);
    }
  } catch {
    // The choice still applies to this page; it just will not be remembered.
  }

  for (const notify of listeners) notify();
}
