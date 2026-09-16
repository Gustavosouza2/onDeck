"use client";

import { AnimatePresence, motion } from "motion/react";

import { Button } from "@/components/ui/Button";
import { Tag } from "@/components/ui/Tag";
import { PHASE_LABELS } from "@/lib/content";
import { SLIDE_PX, useMotionTiming } from "@/lib/motion";
import type { NumberedStep } from "@/lib/runbook";

export function FocusMode({
  steps,
  position,
  direction,
  onPrevious,
  onNext,
  onExit,
}: {
  steps: NumberedStep[];
  position: number;
  direction: 1 | -1;
  onPrevious: () => void;
  onNext: () => void;
  onExit: () => void;
}) {
  const { reduce, transition } = useMotionTiming();
  const slide = reduce ? 0 : SLIDE_PX;

  const current = steps[position];
  const next = steps[position + 1];
  const isFirst = position === 0;
  const isLast = position >= steps.length - 1;

  if (!current) return null;

  return (
    <div className="flex min-h-dvh flex-col">
      <div className="sticky top-[calc(var(--appbar-h)+var(--safe-top))] z-(--z-tracker) border-b border-(--border-subtle) bg-(--bg-app)">
        <div className="reading-container flex items-center gap-(--space-5) py-(--space-4)">
          <span className="font-mono text-(length:--text-sm) whitespace-nowrap text-(--color-title)">
            Passo {position + 1} de {steps.length}
          </span>
          <span
            className="h-(--space-2) flex-1 overflow-hidden rounded-control bg-(--border-default)"
            role="progressbar"
            aria-valuenow={position + 1}
            aria-valuemin={1}
            aria-valuemax={steps.length}
            aria-label="Progresso no passo a passo"
          >
            <span
              className="block h-full rounded-control bg-(--accent) transition-[width] duration-(--dur-base) ease-standard"
              style={{ width: `${((position + 1) / steps.length) * 100}%` }}
            />
          </span>
          <Button variant="outline" size="sm" onClick={onExit}>
            Ver lista
          </Button>
        </div>
      </div>

      <div className="reading-container grid flex-1 content-start gap-(--space-5) pt-(--space-7) pb-(--space-6)">
        <AnimatePresence mode="wait" initial={false} custom={direction}>
          <motion.div
            key={current.index}
            custom={direction}
            initial={{ opacity: 0, x: direction * slide }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: direction * -slide }}
            transition={transition()}
            className="flex flex-col gap-(--space-4) rounded-card border border-(--border-default) bg-(--surface-card) p-(--pad-card-lg)"
          >
            <div className="flex items-center gap-(--space-4)">
              <span
                aria-hidden
                className="grid size-(--tap-min) place-items-center rounded-control bg-(--accent) font-display text-(length:--text-lead) font-bold text-ink"
              >
                {current.index}
              </span>
              <span className="ml-auto text-(length:--text-sm) font-medium text-(--color-faint)">
                {PHASE_LABELS[current.step.phase]}
              </span>
            </div>

            <h2 className="mt-(--space-2) font-display text-(length:--text-display) leading-snug font-bold tracking-tight text-pretty text-(--color-title) lg:text-(length:--text-hero)">
              {current.step.title}
            </h2>

            <p className="text-(length:--text-reading) leading-(--leading-reading) text-pretty text-(--color-body) lg:text-(length:--text-reading-lg)">
              {current.step.detail}
            </p>

            {current.step.tool ? (
              <span className="self-start">
                <Tag>{current.step.tool}</Tag>
              </span>
            ) : null}
          </motion.div>
        </AnimatePresence>

        <p
          aria-live="polite"
          className="text-(length:--text-sm) leading-relaxed text-(--color-faint)"
        >
          {next ? `Depois: ${next.step.title}` : "Este é o último passo."}
        </p>
      </div>

      <div className="sticky bottom-0 border-t border-(--border-subtle) bg-(--bg-app)">
        <div className="reading-container flex items-center gap-(--space-4) pt-(--space-4) pb-[calc(var(--space-5)+var(--safe-bottom))]">
          <Button variant="outline" onClick={onPrevious} disabled={isFirst}>
            Anterior
          </Button>
          <Button fullWidth onClick={onNext} disabled={isLast}>
            {isLast ? "Fim do passo a passo" : "Próximo"}
          </Button>
        </div>
      </div>
    </div>
  );
}
