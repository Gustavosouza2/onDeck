import { fileURLToPath } from "node:url";
import { defineConfig } from "vitest/config";

const alias = { "@": fileURLToPath(new URL(".", import.meta.url)) };

/**
 * Two projects, because the two kinds of test need different worlds.
 *
 * `logic` runs in Node: the content module, the reading rules, and the checks
 * that hold TypeScript constants in step with CSS tokens. Fast, no DOM.
 *
 * `components` runs in jsdom, renders components the way a Volunteer meets
 * them, and asserts on what is on screen and what a tap does. It also holds the
 * few `lib` tests that need a real document (`*.dom.test.ts`), such as running
 * the head script.
 *
 * The `@/*` alias mirrors tsconfig so tests resolve imports the way the app does.
 */
export default defineConfig({
  resolve: { alias },
  test: {
    projects: [
      {
        resolve: { alias },
        test: {
          name: "logic",
          environment: "node",
          include: ["lib/**/*.test.ts"],
          exclude: ["lib/**/*.dom.test.ts"],
        },
      },
      {
        resolve: { alias },
        test: {
          name: "components",
          environment: "jsdom",
          include: ["components/**/*.test.tsx", "lib/**/*.dom.test.ts"],
          setupFiles: ["./test/setup.tsx"],
        },
      },
    ],
  },
});
