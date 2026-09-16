import { describe, expect, it } from "vitest";

import { SYSTEM_LIGHT, setMedia } from "@/test/media";

import { GROUND } from "./brand";
import { THEME_SCRIPT } from "./theme-script";
import { THEME_KEY } from "./theme";

function runHeadScript() {
  new Function(THEME_SCRIPT)();
}

const themeColors = () =>
  [...document.querySelectorAll('meta[name="theme-color"]')].map((meta) =>
    meta.getAttribute("content"),
  );


describe("the head script, before first paint", () => {
  it("resolves automatic to light on a system that prefers light", () => {
    setMedia(SYSTEM_LIGHT, true);
    runHeadScript();

    expect(document.documentElement.dataset.theme).toBe("light");
    expect(themeColors()).toEqual([GROUND.light]);
  });

  it("resolves automatic to dark on a system that prefers dark", () => {
    setMedia(SYSTEM_LIGHT, false);
    runHeadScript();

    expect(document.documentElement.dataset.theme).toBe("dark");
    expect(themeColors()).toEqual([GROUND.dark]);
  });

  it("applies an explicit choice over the system", () => {
    setMedia(SYSTEM_LIGHT, true);
    window.localStorage.setItem(THEME_KEY, "dark");
    runHeadScript();

    expect(document.documentElement.dataset.theme).toBe("dark");
    expect(themeColors()).toEqual([GROUND.dark]);
  });

  it("ignores a stored value that is not a theme", () => {
    setMedia(SYSTEM_LIGHT, true);
    window.localStorage.setItem(THEME_KEY, "sepia");
    runHeadScript();

    expect(document.documentElement.dataset.theme).toBe("light");
  });

  it("never leaves more than one theme-color tag", () => {
    runHeadScript();
    runHeadScript();

    expect(themeColors()).toHaveLength(1);
  });
});

describe("the head script, while the page is open", () => {
  it("follows the system when the Volunteer is on automatic", () => {
    setMedia(SYSTEM_LIGHT, false);
    runHeadScript();

    setMedia(SYSTEM_LIGHT, true);

    expect(document.documentElement.dataset.theme).toBe("light");
    expect(themeColors()).toEqual([GROUND.light]);
  });

  it("keeps an explicit choice when the system changes", () => {
    setMedia(SYSTEM_LIGHT, false);
    window.localStorage.setItem(THEME_KEY, "dark");
    runHeadScript();

    setMedia(SYSTEM_LIGHT, true);

    expect(document.documentElement.dataset.theme).toBe("dark");
  });
});
