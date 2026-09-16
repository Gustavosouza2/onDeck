import { describe, expect, it } from "vitest";

import { getDepartment } from "./content";
import { clampPosition, groupByPhase, numberSteps } from "./runbook";

const transmissao = await getDepartment("transmissao");
const banner = await getDepartment("banner");

describe("numbering Steps", () => {
  it("numbers from one, in Runbook order", () => {
    expect(numberSteps(transmissao!).map((n) => n.index)).toEqual([
      1, 2, 3, 4, 5, 6, 7, 8, 9,
    ]);
  });

  it("carries each Step alongside its number", () => {
    const [first] = numberSteps(transmissao!);

    expect(first.index).toBe(1);
    expect(first.step.title).toBe("Ligar o notebook e as câmeras");
  });
});

describe("grouping by Phase", () => {
  it("splits a Runbook into its Phases, in order", () => {
    const groups = groupByPhase(numberSteps(transmissao!));

    expect(groups.map((g) => g.phase)).toEqual(["before", "service", "closing"]);
    expect(groups.map((g) => g.steps.length)).toEqual([5, 2, 2]);
  });

  it("keeps Step numbers running across groups", () => {
    const groups = groupByPhase(numberSteps(transmissao!));

    expect(groups.at(-1)!.steps.map((s) => s.index)).toEqual([8, 9]);
  });

  it("returns a single group for a Runbook with one Phase", () => {
    const groups = groupByPhase(numberSteps(banner!));

    expect(groups).toHaveLength(1);
    expect(groups[0].phase).toBe("week");
  });
});

describe("holding a Focus mode position", () => {
  it("keeps a position that is already inside the Steps", () => {
    expect(clampPosition(3, 9)).toBe(3);
  });

  it("never runs past the last Step", () => {
    expect(clampPosition(12, 9)).toBe(8);
  });

  it("never goes below the first Step", () => {
    expect(clampPosition(-1, 9)).toBe(0);
  });

  it("survives an empty set without producing a negative position", () => {
    expect(clampPosition(4, 0)).toBe(0);
  });
});
