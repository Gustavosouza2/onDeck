import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";

import { GROUND } from "./brand";

const colors = readFileSync(
  join(process.cwd(), "app/styles/tokens/colors.css"),
  "utf8",
);

function block(selector: string): string {
  const start = colors.indexOf(`${selector} {`);
  if (start === -1) throw new Error(`No ${selector} block in colors.css`);
  return colors.slice(start, colors.indexOf("\n}", start));
}

function tokenValue(css: string, name: string): string {
  const match = css.match(new RegExp(`${name}:\\s*([^;]+);`));
  if (!match) throw new Error(`No ${name} in block`);
  return match[1].trim().toLowerCase();
}

describe("the ground colour outside CSS", () => {
  it("matches the dark --bg-app", () => {
    const root = block(":root");
    const reference = tokenValue(root, "--bg-app"); // var(--gray-050)
    const primitive = reference.match(/var\((--[a-z0-9-]+)\)/)?.[1];

    expect(primitive).toBeDefined();
    expect(tokenValue(root, primitive!)).toBe(GROUND.dark);
  });

  it("matches the light --bg-app", () => {
    expect(tokenValue(block(':root[data-theme="light"]'), "--bg-app")).toBe(
      GROUND.light,
    );
  });
});
