import { DURATION, REDUCED_MOTION_QUERY } from "@/lib/motion";

export const THEME_TRANSITION_CLASS = "theme-transition";

let timer: number | undefined;

export function startThemeTransition(): void {
  if (window.matchMedia(REDUCED_MOTION_QUERY).matches) return;

  document.documentElement.classList.add(THEME_TRANSITION_CLASS);
  window.clearTimeout(timer);
  timer = window.setTimeout(() => {
    document.documentElement.classList.remove(THEME_TRANSITION_CLASS);
  }, DURATION.base * 1000);
}
