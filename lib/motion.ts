import { useReducedMotion } from "motion/react";

export const DURATION = {
  base: 0.18,
} as const;

export const REDUCED_MOTION_QUERY = "(prefers-reduced-motion: reduce)";

export const EASE = [0.2, 0.8, 0.2, 1] as const;

export const SLIDE_PX = 24;
export const RISE_PX = 8;

export function useMotionTiming() {
  const reduce = useReducedMotion() ?? false;

  return {
    reduce,
    transition: (duration: number = DURATION.base) => ({
      duration: reduce ? 0 : duration,
      ease: EASE,
    }),
  };
}
