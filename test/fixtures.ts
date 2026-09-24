import {
  type Department,
  type Step,
  departmentSchema,
} from "@/lib/content";

/**
 * Departments the tests own, not the church's.
 *
 * These tests used to read content/departments.ts and assert its real Step
 * titles and counts. That turned the suite into a lock on the Runbooks: a
 * Maintainer correcting a Step — the one edit OnDeck exists to make easy —
 * turned a dozen tests red without a single defect behind them.
 *
 * The shipped content is guaranteed elsewhere and better: parseDepartments
 * runs departmentSchema over it at build time, so malformed content fails
 * `next build` rather than a test. What is left for these fixtures is the
 * shape each behaviour needs — a Runbook that spans three Phases, one that
 * happens in a single Phase, a Step that names its own Tool.
 *
 * Every fixture goes through departmentSchema on its way out, so a fixture
 * can never drift into something the real content model would reject.
 */

export function aStep(overrides: Partial<Step> = {}): Step {
  return {
    title: "Abrir a sala",
    detail: "A chave fica na secretaria.",
    phase: "before",
    ...overrides,
  };
}

export function aDepartment(overrides: Partial<Department> = {}): Department {
  return departmentSchema.parse({
    slug: "departamento-exemplo",
    name: "Departamento Exemplo",
    summary: "O que este departamento entrega",
    tool: "Ferramenta Principal",
    toolNote: "Onde a ferramenta vive · como chegar nela",
    intro: "O que fazer, em uma frase, para quem nunca serviu aqui.",
    tint: "lilac",
    motif: "projecao",
    icon: "monitor-play",
    updatedAt: "2026-01-01",
    steps: [aStep()],
    ...overrides,
  });
}

/** The Tool named by a single Step, distinct from the Department's own. */
export const STEP_TOOL = "Mesa de Som";

/**
 * Nine Steps across three Phases — 5 before, 2 service, 2 closing — so the
 * Phase groups, the numbering that runs across them, and Focus mode's ends
 * all have something to be wrong about. Step 2 names its own Tool.
 */
export function aRunbook(overrides: Partial<Department> = {}): Department {
  return aDepartment({
    slug: "runbook-exemplo",
    name: "Runbook Exemplo",
    steps: [
      aStep(),
      aStep({
        title: "Ligar o equipamento",
        detail: "Começa pela régua, depois o computador.",
        tool: STEP_TOOL,
      }),
      aStep({ title: "Conferir os cabos", detail: "Um de cada vez." }),
      aStep({ title: "Testar o som", detail: "Um minuto de música." }),
      aStep({ title: "Avisar o líder", detail: "Mande um ok no grupo." }),
      aStep({
        title: "Acompanhar o louvor",
        detail: "Fique atento à banda.",
        phase: "service",
      }),
      aStep({
        title: "Registrar o momento",
        detail: "Sem atrapalhar quem está ao lado.",
        phase: "service",
      }),
      aStep({
        title: "Guardar o equipamento",
        detail: "Cada cabo na sua gaveta.",
        phase: "closing",
      }),
      aStep({
        title: "Fechar a sala",
        detail: "Devolva a chave na secretaria.",
        phase: "closing",
      }),
    ],
    ...overrides,
  });
}

/** A Runbook that happens entirely during the week, in one Phase. */
export function aSinglePhaseRunbook(
  overrides: Partial<Department> = {},
): Department {
  return aDepartment({
    slug: "semana-exemplo",
    name: "Semana Exemplo",
    tint: "mint",
    motif: "banner",
    icon: "pen-tool",
    steps: [
      aStep({
        title: "Receber o pedido",
        detail: "Texto, data, horário e local.",
        phase: "week",
      }),
      aStep({
        title: "Montar a arte",
        detail: "A partir do template da categoria.",
        phase: "week",
      }),
      aStep({
        title: "Enviar para aprovação",
        detail: "No grupo da mídia.",
        phase: "week",
      }),
    ],
    ...overrides,
  });
}
