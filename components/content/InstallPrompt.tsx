"use client";

import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";

import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { useBrowserValue } from "@/lib/browser";
import {
  canOfferInstall,
  type InstallEnvironment,
  shouldOfferIosInstructions,
} from "@/lib/install";
import { RISE_PX, useMotionTiming } from "@/lib/motion";
import { readFlag, writeFlag } from "@/lib/storage";

export const INSTALL_DISMISSED_KEY = "ondeck:install-dismissed";

export const STANDALONE_QUERY = "(display-mode: standalone)";

function isStandalone(): boolean {
  return (
    window.matchMedia(STANDALONE_QUERY).matches ||
    ("standalone" in window.navigator &&
      Boolean((window.navigator as { standalone?: boolean }).standalone))
  );
}

function readInstallEnvironment(): InstallEnvironment {
  return {
    userAgent: window.navigator.userAgent,
    maxTouchPoints: window.navigator.maxTouchPoints,
    isStandalone: isStandalone(),
    isDismissed: readFlag(INSTALL_DISMISSED_KEY),
  };
}

function readShowIos(): boolean {
  return shouldOfferIosInstructions(readInstallEnvironment());
}

type InstallEvent = Event & {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
};

export function InstallPrompt() {
  const [event, setEvent] = useState<InstallEvent | null>(null);
  const [dismissed, setDismissed] = useState(false);

  const showIos = useBrowserValue(readShowIos, false);
  const { reduce, transition } = useMotionTiming();
  const rise = reduce ? 0 : RISE_PX;

  useEffect(() => {
    const offerable = canOfferInstall(readInstallEnvironment());
    if (!offerable) return;

    const onBeforeInstall = (e: Event) => {
      e.preventDefault();
      setEvent(e as InstallEvent);
    };

    const onInstalled = () => setEvent(null);

    window.addEventListener("beforeinstallprompt", onBeforeInstall);
    window.addEventListener("appinstalled", onInstalled);

    return () => {
      window.removeEventListener("beforeinstallprompt", onBeforeInstall);
      window.removeEventListener("appinstalled", onInstalled);
    };
  }, []);

  function dismiss() {
    writeFlag(INSTALL_DISMISSED_KEY);
    setDismissed(true);
  }

  async function install() {
    if (!event) return;
    await event.prompt();
    await event.userChoice;
    setEvent(null);
  }

  const visible = !dismissed && (Boolean(event) || showIos);

  return (
    <AnimatePresence initial={false}>
      {visible ? (
        <motion.aside
          key="install"
          aria-label="Instalar o OnDeck"
          initial={{ opacity: 0, y: rise }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: rise }}
          transition={transition()}
          className="mt-(--space-6) flex items-start gap-(--space-4) rounded-card border border-(--border-default) bg-(--surface-card) p-(--pad-card) text-left"
        >
          <span className="grid size-(--space-9) shrink-0 place-items-center rounded-control bg-(--accent) text-ink">
            <Icon name="download" size="md" />
          </span>

          <span className="min-w-0 flex-1">
            <span className="block text-(length:--text-sm) leading-relaxed text-(--color-body)">
              {showIos
                ? "Deixe o OnDeck na tela inicial: toque em Compartilhar e depois em “Adicionar à Tela de Início”."
                : "Deixe o OnDeck na tela inicial do celular para abrir sem procurar o link."}
            </span>

            <span className="mt-(--space-3) flex flex-wrap items-center gap-(--space-3)">
              {event ? (
                <Button size="sm" onClick={install}>
                  Instalar
                </Button>
              ) : null}
              <Button variant="outline" size="sm" onClick={dismiss}>
                Agora não
              </Button>
            </span>
          </span>
        </motion.aside>
      ) : null}
    </AnimatePresence>
  );
}
