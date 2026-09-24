import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";

import { TINT_CLASS } from "./tint";
import { TINTS } from "@/lib/content";

const colors = readFileSync(
  join(process.cwd(), "app/styles/tokens/colors.css"),
  "utf8",
);

function accentBlock(tint: string): string {
  const start = colors.indexOf(`[data-tint="${tint}"] {`);
  if (start === -1) return "";
  return colors.slice(start, colors.indexOf("}", start));
}

/**
 * A Department page sets data-tint so its Tint becomes --accent. A Tint with
 * no rule would silently fall back to lilac on every control, which is the
 * one failure a screenshot of a single Department would never catch.
 */
describe("every Tint drives the page accent", () => {
  it.each(TINTS)("%s sets --accent and --accent-press", (tint) => {
    const block = accentBlock(tint);

    expect(block, `no [data-tint="${tint}"] rule in colors.css`).not.toBe("");
    expect(block).toMatch(/--accent:\s*var\(--[a-z]+-\d+\)/);
    expect(block).toMatch(/--accent-press:\s*var\(--[a-z]+-\d+\)/);
  });

  it("names a primitive that exists", () => {
    for (const tint of TINTS) {
      for (const name of accentBlock(tint).matchAll(/var\((--[a-z0-9-]+)\)/g)) {
        expect(colors, `${name[1]} is undefined`).toContain(`${name[1]}:`);
      }
    }
  });

  it("covers the same Tints as the card fills", () => {
    expect(Object.keys(TINT_CLASS).sort()).toEqual([...TINTS].sort());
  });
});
