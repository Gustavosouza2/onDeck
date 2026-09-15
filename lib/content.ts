import { z } from "zod";

import { departments } from "@/content/departments";

/**
 * The single boundary through which the app reads content.
 *
 * Nothing outside this module touches the content source. The accessors are
 * async even though today they read a local module: that is what lets the
 * source become a CMS or a database later without altering a single screen.
 */

/** Phases a Step can belong to. Identifiers are English; labels shown to
 *  Volunteers are Portuguese. */
export const PHASES = ["before", "service", "closing", "week"] as const;

export const PHASE_LABELS: Record<Phase, string> = {
  before: "Antes do culto",
  service: "Durante",
  closing: "Encerramento",
  week: "Durante a semana",
};

/** Accent fills a Department can carry. Must match the design system palette. */
export const TINTS = ["lilac", "citron", "coral", "sky", "mint", "cream"] as const;

/** Flat geometric shapes paired with a Tint. One per Department, plus the
 *  onboarding welcome slot and a blank fallback. Each needs an SVG in public. */
export const MOTIF_NAMES = [
  "projecao",
  "transmissao",
  "fotos",
  "camera2",
  "banner",
  "videos",
  "welcome",
] as const;

export const stepSchema = z.object({
  title: z.string().min(1),
  detail: z.string().min(1),
  phase: z.enum(PHASES),
  /** Set when this Step happens in a Tool other than the Department's primary one. */
  tool: z.string().min(1).optional(),
});

export const departmentSchema = z.object({
  /** Written by hand, never derived from the name: renaming a Department must
   *  not break a URL a Volunteer saved. */
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
  icon: z.string().min(1),
  /** Declared by hand by the Maintainer, never derived from version control:
   *  fixing a comma must not signal a change that did not happen. */
  updatedAt: z.iso.date(),
  steps: z.array(stepSchema).min(1, "a Department needs at least one Step"),
});

export type Phase = (typeof PHASES)[number];
export type Tint = (typeof TINTS)[number];
export type MotifName = (typeof MOTIF_NAMES)[number];
export type Step = z.infer<typeof stepSchema>;
export type Department = z.infer<typeof departmentSchema>;

/**
 * Validates the whole content set, including the invariants TypeScript cannot
 * check on its own. Throws, so malformed content fails the build rather than
 * reaching a Volunteer.
 */
export function parseDepartments(input: unknown): Department[] {
  const parsed = z.array(departmentSchema).min(1).parse(input);

  const seen = new Set<string>();
  for (const department of parsed) {
    if (seen.has(department.slug)) {
      throw new Error(`Duplicate Department slug: ${department.slug}`);
    }
    seen.add(department.slug);
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

/** The Phases actually present in a Runbook, in canonical order. Used to build
 *  the filter, which never offers a Phase with no Steps. */
export function phasesPresent(department: Department): Phase[] {
  const used = new Set(department.steps.map((step) => step.phase));
  return PHASES.filter((phase) => used.has(phase));
}
