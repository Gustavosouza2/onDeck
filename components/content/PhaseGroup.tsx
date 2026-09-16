import { StepItem } from "@/components/content/StepItem";
import { PHASE_LABELS, type Phase } from "@/lib/content";
import type { NumberedStep } from "@/lib/runbook";

export function PhaseGroup({
  phase,
  steps,
  showLabel,
}: {
  phase: Phase;
  steps: NumberedStep[];
  showLabel: boolean;
}) {
  const headingId = `fase-${phase}`;

  return (
    <div className="relative">
      {showLabel ? (
        <div className="mb-(--space-4) flex items-center gap-(--space-4)">
          <h3
            id={headingId}
            className="font-body text-(length:--text-sm) font-medium text-(--color-faint)"
          >
            {PHASE_LABELS[phase]}
          </h3>
          <span aria-hidden className="h-px flex-1 bg-(--border-default)" />
        </div>
      ) : null}

      <div className="relative">
        <span
          aria-hidden
          className="absolute top-(--space-3) bottom-(--space-5) left-[calc(var(--space-7)/2)] w-px bg-(--border-default)"
        />
        <ol
          role="list"
          start={steps[0]?.index}
          aria-labelledby={showLabel ? headingId : undefined}
          className="relative m-0 list-none p-0"
        >
          {steps.map(({ step, index }) => (
            <StepItem key={index} step={step} index={index} />
          ))}
        </ol>
      </div>
    </div>
  );
}
