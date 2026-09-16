import { describe, expect, it } from "vitest";
import { readdirSync } from "node:fs";
import { join } from "node:path";

import {
  MOTIF_NAMES,
  PHASES,
  TINTS,
  departmentSchema,
  getDepartment,
  getDepartments,
  parseDepartments,
} from "./content";

const aStep = {
  title: "Ligar o projetor",
  detail: "Ligue primeiro o projetor, depois o computador.",
  phase: "before",
} as const;

const aDepartment = {
  slug: "projecao",
  name: "Projeção",
  summary: "Letras e avisos na tela do templo",
  tool: "OpenLP",
  toolNote: "Computador da projeção",
  intro: "Você controla o que a igreja vê na tela.",
  tint: "lilac",
  motif: "projecao",
  icon: "monitor-play",
  updatedAt: "2026-09-15",
  steps: [aStep],
} as const;

describe("reading a Department", () => {
  it("returns a known Department with every field a screen needs", async () => {
    const department = await getDepartment("transmissao");

    expect(department).not.toBeNull();
    expect(department).toMatchObject({
      slug: "transmissao",
      name: expect.any(String),
      summary: expect.any(String),
      tool: expect.any(String),
      toolNote: expect.any(String),
      intro: expect.any(String),
      tint: expect.any(String),
      motif: expect.any(String),
      icon: expect.any(String),
      updatedAt: expect.any(String),
    });
    expect(department!.steps.length).toBeGreaterThan(0);
  });

  it("returns null for an unknown slug rather than throwing", async () => {
    await expect(getDepartment("nao-existe")).resolves.toBeNull();
  });

  it("preserves Step order within a Department", async () => {
    const department = await getDepartment("banner");

    expect(department!.steps.map((step) => step.title)).toEqual([
      "Receber o pedido no grupo",
      "Abrir o template da categoria",
      "Aplicar o texto sem mudar a fonte",
      "Exportar nos três formatos",
      "Enviar para aprovação",
      "Subir na pasta do Drive",
    ]);
  });
});

describe("listing Departments", () => {
  it("returns all six Departments", async () => {
    await expect(getDepartments()).resolves.toHaveLength(6);
  });

  it("returns them in the declared order, which is Home's order", async () => {
    const departments = await getDepartments();

    expect(departments.map((department) => department.slug)).toEqual([
      "projecao",
      "transmissao",
      "fotos",
      "camera2",
      "banner",
      "videos",
    ]);
  });
});

describe("rejecting malformed content", () => {
  it("rejects a Step with no title", () => {
    const result = departmentSchema.safeParse({
      ...aDepartment,
      steps: [{ ...aStep, title: "" }],
    });

    expect(result.success).toBe(false);
  });

  it("rejects a Step with an unknown Phase", () => {
    const result = departmentSchema.safeParse({
      ...aDepartment,
      steps: [{ ...aStep, phase: "durante-o-almoco" }],
    });

    expect(result.success).toBe(false);
  });

  it("rejects a Department with no Steps", () => {
    const result = departmentSchema.safeParse({ ...aDepartment, steps: [] });

    expect(result.success).toBe(false);
  });

  it("rejects a Department whose Tint is not in the palette", () => {
    const result = departmentSchema.safeParse({ ...aDepartment, tint: "burgundy" });

    expect(result.success).toBe(false);
  });

  it("rejects a Department whose Motif has no asset", () => {
    const result = departmentSchema.safeParse({ ...aDepartment, motif: "trombone" });

    expect(result.success).toBe(false);
  });

  it("rejects duplicate slugs across Departments", () => {
    expect(() => parseDepartments([aDepartment, aDepartment])).toThrow(/slug/i);
  });

  it("rejects two Departments sharing a Tint", () => {
    const other = { ...aDepartment, slug: "transmissao", motif: "transmissao" };

    expect(() => parseDepartments([aDepartment, other])).toThrow(/tint/i);
  });

  it("accepts a well-formed set of Departments", () => {
    expect(() => parseDepartments([aDepartment])).not.toThrow();
  });
});

describe("content and assets agree", () => {
  it("ships an SVG asset for every declared Motif name", () => {
    const onDisk = readdirSync(join(process.cwd(), "public", "motifs"));

    for (const motif of MOTIF_NAMES) {
      expect(onDisk).toContain(`${motif}.svg`);
    }
  });

  it("only uses Tints and Motifs the design system defines", async () => {
    const departments = await getDepartments();

    for (const department of departments) {
      expect(TINTS).toContain(department.tint);
      expect(MOTIF_NAMES).toContain(department.motif);
    }
  });

  it("only uses Phases the design system defines", async () => {
    const departments = await getDepartments();
    const used = new Set(
      departments.flatMap((department) => department.steps.map((step) => step.phase)),
    );

    for (const phase of used) {
      expect(PHASES).toContain(phase);
    }
  });
});

describe("rejecting an unknown icon", () => {
  it("rejects a Department whose icon is not one the app can render", () => {
    const result = departmentSchema.safeParse({ ...aDepartment, icon: "monitor_play" });

    expect(result.success).toBe(false);
  });
});
