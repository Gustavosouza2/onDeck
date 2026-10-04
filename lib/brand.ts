/**
 * The app's ground colour, outside CSS.
 *
 * The manifest and the browser's theme-color are not stylesheets, so they
 * cannot read --bg-app. This restates it; lib/brand.test.ts reads colors.css
 * and fails if the two drift.
 */
export const GROUND = "#151515";
