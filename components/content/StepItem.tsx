import { Tag } from "@/components/ui/Tag";
import type { NumberedStep } from "@/lib/runbook";

export function StepItem({ step, index }: NumberedStep) {
  return (
    <li
      id={`passo-${index}`}
      className="relative flex scroll-mt-[calc(var(--appbar-h)+var(--safe-top)+var(--space-6))] items-start gap-(--space-5) pb-(--space-5) last:pb-0"
    >
      <span className="relative z-(--z-raised) w-(--space-7) shrink-0 bg-(--bg-app) pb-(--space-2) text-center font-mono text-(length:--text-sm) leading-normal text-(--color-muted)">
        {index}
      </span>

      <span className="min-w-0 flex-1">
        <span className="block font-display text-(length:--text-lead) leading-snug font-semibold text-(--color-title)">
          {step.title}
        </span>
        {step.tool ? (
          <span className="mt-(--space-3) block">
            <Tag>{step.tool}</Tag>
          </span>
        ) : null}
      </span>
    </li>
  );
}
