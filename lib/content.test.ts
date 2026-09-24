import { readdirSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";

import { departments as shipped } from "@/content/departments";
import { aDepartment, aStep } from "@/test/fixtures";

import {
  MOTIF_NAMES,
  PHASES,
  TINTS,
  departmentSchema,
  getDepartment,
  getDepartments,
  parseDepartments,
} from "./content";

const aValidDepartment = aDepartment();

describe("reading a Department", () => {
  it("finds a Department by its slug", async () => {
    const [first] = shipped;

    await expect(getDepartment(first.slug)).resolves.toMatchObject({
      slug: first.slug,
    });
  });

  it("returns null for an unknown slug rather than throwing", async () => {
    await expect(getDepartment("nao-existe")).resolves.toBeNull();
  });

  it("preserves Step order within a Department", () => {
    const titles = ["Primeiro", "Segundo", "Terceiro"];
    const [department] = parseDepartments([
      aDepartment({ steps: titles.map((title) => aStep({ title })) }),
    ]);

    expect(department.steps.map((step) => step.title)).toEqual(titles);
  });
});

describe("listing Departments", () => {
  it("returns every Department the app ships", async () => {
    await expect(getDepartments()).resolves.toHaveLength(shipped.length);
  });

  it("returns them in the declared order, which is Home's order", async () => {
    const departments = await getDepartments();

    expect(departments.map((department) => department.slug)).toEqual(
      shipped.map((department) => department.slug),
    );
  });
});

describe("rejecting malformed content", () => {
  it("rejects a Step with no title", () => {
    const result = departmentSchema.safeParse({
      ...aValidDepartment,
      steps: [aStep({ title: "" })],
    });

    expect(result.success).toBe(false);
  });

  it("rejects a Step with no detail", () => {
    const { title, phase } = aStep();
    const result = departmentSchema.safeParse({
      ...aValidDepartment,
      steps: [{ title, phase }],
    });

    expect(result.success).toBe(false);
  });

  it("rejects a Step with an unknown Phase", () => {
    const result = departmentSchema.safeParse({
      ...aValidDepartment,
      steps: [{ ...aStep(), phase: "durante-o-almoco" }],
    });

    expect(result.success).toBe(false);
  });

  it("rejects a Department with no Steps", () => {
    const result = departmentSchema.safeParse({
      ...aValidDepartment,
      steps: [],
    });

    expect(result.success).toBe(false);
  });

  it("rejects a Department whose Tint is not in the palette", () => {
    const result = departmentSchema.safeParse({
      ...aValidDepartment,
      tint: "burgundy",
    });

    expect(result.success).toBe(false);
  });

  it("rejects a Department whose Motif has no asset", () => {
    const result = departmentSchema.safeParse({
      ...aValidDepartment,
      motif: "trombone",
    });

    expect(result.success).toBe(false);
  });

  it("rejects a Department whose icon is not one the app can render", () => {
    const result = departmentSchema.safeParse({
      ...aValidDepartment,
      icon: "monitor_play",
    });

    expect(result.success).toBe(false);
  });

  it("rejects duplicate slugs across Departments", () => {
    expect(() =>
      parseDepartments([aValidDepartment, { ...aValidDepartment, tint: "sky" }]),
    ).toThrow(/slug/i);
  });

  it("rejects two Departments sharing a Tint", () => {
    expect(() =>
      parseDepartments([
        aValidDepartment,
        { ...aValidDepartment, slug: "outro" },
      ]),
    ).toThrow(/tint/i);
  });

  it("accepts a well-formed set of Departments", () => {
    expect(() => parseDepartments([aValidDepartment])).not.toThrow();
  });
});

/**
 * The two checks the shipped content still earns. They assert invariants
 * every valid Runbook must hold, never a particular Step or wording, so a
 * Maintainer can rewrite the church's content without touching a test — the
 * build is what refuses malformed content.
 */
describe("the content the app ships", () => {
  it("ships an SVG asset for every declared Motif name", () => {
    const onDisk = readdirSync(join(process.cwd(), "public", "motifs"));

    for (const motif of MOTIF_NAMES) {
      expect(onDisk).toContain(`${motif}.svg`);
    }
  });

  it("only uses Tints, Motifs and Phases the design system defines", async () => {
    const departments = await getDepartments();

    for (const department of departments) {
      expect(TINTS).toContain(department.tint);
      expect(MOTIF_NAMES).toContain(department.motif);

      for (const step of department.steps) {
        expect(PHASES).toContain(step.phase);
      }
    }
  });
});
