"use client";

import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";

import { FocusMode } from "@/components/content/FocusMode";
import { PhaseGroup } from "@/components/content/PhaseGroup";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { TINT_CLASS } from "@/components/ui/tint";
import { TintMorph } from "@/components/ui/TintMorph";
import type { Department } from "@/lib/content";
import { formatUpdatedAt } from "@/lib/format";
import { useMotionTiming } from "@/lib/motion";
import { clampPosition, groupByPhase, numberSteps } from "@/lib/runbook";

export function DepartmentView({ department }: { department: Department }) {
  const [isFocus, setIsFocus] = useState(false);
  const [position, setPosition] = useState(0);
  const [direction, setDirection] = useState<1 | -1>(1);
  const [showIntro, setShowIntro] = useState(false);

  const { transition } = useMotionTiming();
  const fade = {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
    transition: transition(),
  };

  const steps = numberSteps(department);
  const groups = groupByPhase(steps);
  const showPhaseLabels = groups.length > 1;

  return (
    <AnimatePresence mode="wait" initial={false}>
      {isFocus ? (
        <motion.div key="focus" {...fade}>
          <FocusMode
            steps={steps}
            position={clampPosition(position, steps.length)}
            direction={direction}
            onPrevious={() => {
              setDirection(-1);
              setPosition((p) => clampPosition(p - 1, steps.length));
            }}
            onNext={() => {
              setDirection(1);
              setPosition((p) => clampPosition(p + 1, steps.length));
            }}
            onExit={() => setIsFocus(false)}
          />
        </motion.div>
      ) : (
        <motion.main
          key="list"
          {...fade}
          className="reading-container grid content-start gap-(--space-6) pt-(--space-5) pb-(--space-10)"
        >
          <TintMorph slug={department.slug}>
            <section
              className={`${TINT_CLASS[department.tint]} grid gap-(--space-3) rounded-card p-(--pad-card) text-ink lg:p-(--space-8)`}
            >
              <h1 className="font-display text-(length:--text-display) leading-tight font-bold tracking-tight text-ink lg:text-(length:--text-hero)">
                {department.name}
              </h1>

              <div className="rounded-md bg-ink/10 px-(--space-4) py-(--space-3)">
                <p className="flex items-center gap-(--space-3) font-display text-(length:--text-lead) font-semibold">
                  <Icon name={department.icon} size="lg" />
                  {department.tool}
                </p>
                <p className="mt-(--space-1) text-(length:--text-sm) leading-snug opacity-(--on-tint-muted)">
                  {department.toolNote}
                </p>
              </div>

              <button
                type="button"
                id="sobre-departamento-toggle"
                onClick={() => setShowIntro((open) => !open)}
                aria-expanded={showIntro}
                aria-controls="sobre-departamento"
                className="-mx-(--space-2) flex min-h-(--tap-min) cursor-pointer items-center justify-between gap-(--space-3) rounded-sm px-(--space-2) text-left text-(length:--text-sm) font-semibold text-ink opacity-(--on-tint-muted) focus-visible:outline-2 focus-visible:outline-offset-(--focus-offset) focus-visible:outline-ink"
              >
                Sobre o departamento
                <Icon
                  name="chevron-down"
                  size="md"
                  className={`shrink-0 transition-transform duration-(--dur-fast) ease-standard ${
                    showIntro ? "rotate-180" : ""
                  }`}
                />
              </button>
              <motion.div
                id="sobre-departamento"
                role="region"
                aria-labelledby="sobre-departamento-toggle"
                inert={showIntro ? undefined : true}
                initial={false}
                animate={{
                  height: showIntro ? "auto" : 0,
                  opacity: showIntro ? 1 : 0,
                }}
                transition={transition()}
                className="overflow-hidden"
              >
                <p className="max-w-(--measure-prose) pb-(--space-2) text-(length:--text-sm) leading-relaxed text-pretty opacity-(--on-tint-muted)">
                  {department.intro}
                </p>
              </motion.div>
            </section>
          </TintMorph>

          <Button
            fullWidth
            onClick={() => {
              setPosition(0);
              setDirection(1);
              setIsFocus(true);
            }}
          >
            Seguir passo a passo no culto
          </Button>

          <section>
            <SectionHeader
              label="Passo a passo"
              meta={`Atualizado em ${formatUpdatedAt(department.updatedAt)}`}
            />

            <div className="grid gap-(--space-7)">
              {groups.map((group) => (
                <PhaseGroup
                  key={group.phase}
                  phase={group.phase}
                  steps={group.steps}
                  showLabel={showPhaseLabels}
                />
              ))}
            </div>
          </section>

          <p className="border-t border-(--border-subtle) pt-(--space-5) text-(length:--text-sm) leading-relaxed text-(--color-faint)">
            Travou em algum passo? Chame o líder da mídia no grupo antes de
            improvisar.
          </p>
        </motion.main>
      )}
    </AnimatePresence>
  );
}
