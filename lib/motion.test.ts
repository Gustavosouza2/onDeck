import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";

import { DURATION, EASE, RISE_PX } from "./motion";

/**
 * lib/motion.ts restates the CSS motion tokens because the animation library
 * cannot read custom properties. These hold the two in step.
 */

const motionCss = readFileSync(
  join(process.cwd(), "app/styles/tokens/motion.css"),
  "utf8",
);
const root = motionCss.slice(0, motionCss.indexOf("@media"));

function seconds(name: string): number {
  const match = root.match(new RegExp(`${name}:\\s*(\\d+)ms;`));
  if (!match) throw new Error(`No ${name} in motion.css`);
  return Number(match[1]) / 1000;
}

function pixels(name: string): number {
  const match = root.match(new RegExp(`${name}:\\s*(\\d+)px;`));
  if (!match) throw new Error(`No ${name} in motion.css`);
  return Number(match[1]);
}

describe("JavaScript motion timing", () => {
  it("uses the same base duration as --dur-base", () => {
    expect(DURATION.base).toBe(seconds("--dur-base"));
  });

  it("uses the same curve as --ease-standard", () => {
    const match = root.match(/--ease-standard:\s*cubic-bezier\(([^)]+)\)/);
    const curve = match![1].split(",").map((n) => Number(n.trim()));

    expect([...EASE]).toEqual(curve);
  });

  it("uses the same rise distance as --rise", () => {
    expect(RISE_PX).toBe(pixels("--rise"));
  });
});
