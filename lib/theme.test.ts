import { describe, expect, it } from "vitest";

import { resolveTheme } from "./theme";

describe("resolving a theme preference", () => {
  it("follows a system that prefers light when set to automatic", () => {
    expect(resolveTheme("auto", true)).toBe("light");
  });

  it("follows a system that prefers dark when set to automatic", () => {
    expect(resolveTheme("auto", false)).toBe("dark");
  });

  it("keeps an explicit light choice on a system that prefers dark", () => {
    expect(resolveTheme("light", false)).toBe("light");
  });

  it("keeps an explicit dark choice on a system that prefers light", () => {
    expect(resolveTheme("dark", true)).toBe("dark");
  });
});
