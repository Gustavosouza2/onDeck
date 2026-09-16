"use client";

import { AnimatePresence, motion } from "motion/react";
import { useCallback, useEffect, useRef, useState } from "react";
import type { ReactNode } from "react";

import { Button } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Motif } from "@/components/ui/Motif";
import { useBrowserValue } from "@/lib/browser";
import { useMotionTiming } from "@/lib/motion";
import { readFlag, writeFlag } from "@/lib/storage";

export const ONBOARDING_SEEN_KEY = "ondeck:onboarding-seen";

export function OnboardingGate({ children }: { children: ReactNode }) {
  const hasSeen = useBrowserValue(() => readFlag(ONBOARDING_SEEN_KEY), true);
  const [dismissed, setDismissed] = useState(false);
  const startRef = useRef<HTMLButtonElement>(null);
  const { transition } = useMotionTiming();

  const isOpen = !hasSeen && !dismissed;

  const dismiss = useCallback(() => {
    writeFlag(ONBOARDING_SEEN_KEY);
    setDismissed(true);
  }, []);

  useEffect(() => {
    if (!isOpen) return;

    startRef.current?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") dismiss();
    };
    document.addEventListener("keydown", onKeyDown);

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [isOpen, dismiss]);

  return (
    <>
      <div inert={isOpen ? true : undefined}>{children}</div>

      <AnimatePresence>
        {isOpen ? (
          <motion.div
            key="onboarding"
            initial={false}
            exit={{ opacity: 0 }}
            transition={transition()}
            role="dialog"
            aria-modal="true"
            aria-labelledby="onboarding-title"
            className="fixed inset-0 z-(--z-overlay) flex items-center justify-center overflow-y-auto bg-(--bg-app)"
          >
            <div className="flex w-full max-w-(--onboarding-w) flex-col items-center gap-(--space-5) px-(--gutter-screen) py-(--space-9) text-center lg:max-w-(--onboarding-w-lg)">
              <Eyebrow className="text-(--color-faint)">Equipe de mídia</Eyebrow>

              <div className="grid w-full max-w-(--onboarding-art-w) place-items-center rounded-card bg-lilac py-(--space-8) lg:max-w-(--onboarding-art-w-lg)">
                <Motif name="welcome" className="h-auto w-(--onboarding-motif-w)" />
              </div>

              <h1
                id="onboarding-title"
                className="font-display text-(length:--text-display) leading-tight font-bold tracking-tight text-pretty lg:text-(length:--text-hero)"
              >
                Seu guia rápido pra qualquer função da mídia
              </h1>

              <p className="max-w-(--onboarding-copy-w) leading-relaxed text-pretty text-(--color-muted)">
                Projeção, transmissão, fotos, câmera, banner e vídeo — o passo a
                passo de cada departamento na ordem em que acontece no culto.
              </p>

              <div className="mt-(--space-3) w-full max-w-(--onboarding-action-w)">
                <Button ref={startRef} fullWidth onClick={dismiss}>
                  Começar
                </Button>
              </div>

              <p className="max-w-(--onboarding-note-w) text-(length:--text-sm) leading-relaxed text-(--color-faint)">
                Não precisa de login. Qualquer dúvida, fale com o líder da mídia
                no grupo.
              </p>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}
