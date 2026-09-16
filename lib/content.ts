import { z } from "zod";

import { departments } from "@/content/departments";

export const PHASES = ["before", "service", "closing", "week"] as const;

export const PHASE_LABELS: Record<Phase, string> = {
  before: "Antes do culto",
  service: "Durante",
  closing: "Encerramento",
  week: "Durante a semana",
};

export const TINTS = [
  "lilac",
  "citron",
  "coral",
  "sky",
  "mint",
  "rose",
  "cream",
] as const;

export const DEPARTMENT_ICONS = [
  "monitor-play",
  "radio",
  "camera",
  "video",
  "pen-tool",
  "film",
] as const;

export const MOTIF_NAMES = [
  "projecao",
  "transmissao",
  "fotos",
  "camera2",
  "banner",
  "videos",
  "welcome",
] as const;

const stepSchema = z.object({
  title: z.string().min(1),
  detail: z.string().min(1),
  phase: z.enum(PHASES),
  tool: z.string().min(1).optional(),
});

export const departmentSchema = z.object({
  slug: z
    .string()
    .min(1)
    .regex(/^[a-z0-9-]+$/, "slug must be lowercase, unaccented, hyphen-separated"),
  name: z.string().min(1),
  summary: z.string().min(1),
  tool: z.string().min(1),
  toolNote: z.string().min(1),
  intro: z.string().min(1),
  tint: z.enum(TINTS),
  motif: z.enum(MOTIF_NAMES),
  icon: z.enum(DEPARTMENT_ICONS),
  updatedAt: z.iso.date(),
  steps: z.array(stepSchema).min(1, "a Department needs at least one Step"),
});

export type Phase = (typeof PHASES)[number];
export type Tint = (typeof TINTS)[number];
export type MotifName = (typeof MOTIF_NAMES)[number];
export type Step = z.infer<typeof stepSchema>;
export type Department = z.infer<typeof departmentSchema>;

export function parseDepartments(input: unknown): Department[] {
  const parsed = z.array(departmentSchema).min(1).parse(input);

  const slugs = new Set<string>();
  const tints = new Set<string>();
  for (const department of parsed) {
    if (slugs.has(department.slug)) {
      throw new Error(`Duplicate Department slug: ${department.slug}`);
    }
    slugs.add(department.slug);

    if (tints.has(department.tint)) {
      throw new Error(
        `Duplicate Department tint: ${department.tint} (${department.slug})`,
      );
    }
    tints.add(department.tint);
  }

  return parsed;
}

export async function getDepartments(): Promise<Department[]> {
  return parseDepartments(departments);
}

export async function getDepartment(slug: string): Promise<Department | null> {
  const all = await getDepartments();
  return all.find((department) => department.slug === slug) ?? null;
}
