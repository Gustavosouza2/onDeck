import type { Department, Phase, Step } from "@/lib/content";

export type NumberedStep = { step: Step; index: number };

export function numberSteps(department: Department): NumberedStep[] {
  return department.steps.map((step, i) => ({ step, index: i + 1 }));
}

export function clampPosition(position: number, length: number): number {
  if (length <= 0) return 0;
  return Math.min(Math.max(position, 0), length - 1);
}

export function groupByPhase(
  steps: NumberedStep[],
): { phase: Phase; steps: NumberedStep[] }[] {
  const groups: { phase: Phase; steps: NumberedStep[] }[] = [];

  for (const entry of steps) {
    const last = groups.at(-1);
    if (last && last.phase === entry.step.phase) {
      last.steps.push(entry);
    } else {
      groups.push({ phase: entry.step.phase, steps: [entry] });
    }
  }

  return groups;
}
