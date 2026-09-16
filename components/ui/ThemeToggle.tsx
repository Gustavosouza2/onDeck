"use client";

import { motion } from "motion/react";
import { useLayoutEffect, useSyncExternalStore } from "react";

import { Icon, type IconName } from "@/components/ui/Icon";
import { useMotionTiming } from "@/lib/motion";
import {
  THEMES,
  type Theme,
  applyTheme,
  readTheme,
  subscribeTheme,
  syncThemeToDocument,
} from "@/lib/theme";

const OPTIONS: Record<Theme, { label: string; short: string; icon: IconName }> =
  {
    auto: { label: "Tema automático", short: "Automático", icon: "sun-moon" },
    light: { label: "Tema claro", short: "Claro", icon: "sun" },
    dark: { label: "Tema escuro", short: "Escuro", icon: "moon" },
  };

export function ThemeToggle({
  className = "",
  variant = "inline",
}: {
  className?: string;
  variant?: "inline" | "compact";
}) {
  const theme = useSyncExternalStore<Theme>(
    subscribeTheme,
    readTheme,
    () => "auto",
  );

  useLayoutEffect(syncThemeToDocument, []);

  const { transition } = useMotionTiming();
  const compact = variant === "compact";

  return (
    <div
      role="group"
      aria-label="Tema"
      className={`inline-flex shrink-0 items-center rounded-control bg-(--surface-input) ${className}`}
    >
      {THEMES.map((option) => {
        const selected = option === theme;

        return (
          <button
            key={option}
            type="button"
            aria-pressed={selected}
            aria-label={compact ? OPTIONS[option].label : undefined}
            title={OPTIONS[option].label}
            onClick={() => {
              if (!selected) applyTheme(option);
            }}
            className={`relative grid h-(--tap-min) cursor-pointer items-center justify-center rounded-control transition-colors duration-(--dur-fast) ease-standard focus-visible:outline-2 focus-visible:outline-offset-(--focus-offset) focus-visible:outline-(--accent) ${
              compact
                ? "w-(--tap-min)"
                : "px-(--space-4) text-(length:--text-xs) font-medium"
            } ${
              selected
                ? "text-ink"
                : "text-(--color-muted) hover:text-(--color-title)"
            }`}
          >
            {selected ? (
              <motion.span
                layoutId="theme-thumb"
                aria-hidden
                className="absolute inset-0 rounded-control bg-(--accent)"
                transition={transition()}
              />
            ) : null}

            <span className="relative grid grid-flow-col items-center gap-(--space-2)">
              <Icon name={OPTIONS[option].icon} size={compact ? "lg" : "sm"} />
              {compact ? null : <span>{OPTIONS[option].short}</span>}
            </span>
          </button>
        );
      })}
    </div>
  );
}
