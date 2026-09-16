import "@testing-library/jest-dom/vitest";

import { cleanup } from "@testing-library/react";
import { MotionGlobalConfig } from "motion/react";
import type { ReactNode } from "react";
import { afterEach, beforeEach, vi } from "vitest";

import { installMatchMedia, resetMedia } from "./media";

/**
 * Shared setup for component tests.
 *
 * Animations are skipped so an exit does not hold an element on screen for
 * 180ms; tests assert on what a Volunteer ends up seeing, not on the tween.
 */
MotionGlobalConfig.skipAnimations = true;
installMatchMedia();

/**
 * Three framework seams that need a real Next runtime or a real browser, each
 * replaced by the plain element it renders:
 *
 * - next/link wants the App Router mounted; a Link is an anchor.
 * - next/image wants the image pipeline; with `unoptimized` it is an <img>.
 * - TintMorph wraps React's <ViewTransition>, which only the React build bundled
 *   by Next exports and which only a browser can animate. It is a passthrough
 *   for everything a test can observe.
 */
vi.mock("next/link", () => ({
  default: ({
    href,
    children,
    ...rest
  }: {
    href: string;
    children: ReactNode;
  }) => (
    <a href={href} {...rest}>
      {children}
    </a>
  ),
}));

vi.mock("next/image", () => ({
  default: (props: { unoptimized?: boolean; src: string; alt: string }) => {
    // `unoptimized` is a Next prop, not an <img> attribute.
    const attributes: Record<string, unknown> = { ...props };
    delete attributes.unoptimized;
    // eslint-disable-next-line @next/next/no-img-element
    return <img {...attributes} alt={props.alt} />;
  },
}));

vi.mock("@/components/ui/TintMorph", () => ({
  TintMorph: ({ children }: { children: ReactNode }) => children,
}));

beforeEach(() => {
  window.localStorage.clear();
  document.documentElement.removeAttribute("data-theme");
  document.head.querySelectorAll('meta[name="theme-color"]').forEach((m) => m.remove());
  resetMedia();
});

afterEach(() => {
  cleanup();
});
