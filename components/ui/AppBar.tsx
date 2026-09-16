import Link from "next/link";

import { Icon } from "@/components/ui/Icon";
import { ThemeToggle } from "@/components/ui/ThemeToggle";

export function AppBar({
  title,
  subtitle,
  backHref,
}: {
  title: string;
  subtitle?: string;
  backHref: string;
}) {
  return (
    <div className="sticky top-0 z-(--z-appbar) border-b border-(--border-subtle) bg-(--bg-app)/85 pt-(--safe-top) [backdrop-filter:var(--blur-glass)]">
      <div className="reading-container flex h-(--appbar-h) items-center gap-(--space-3)">
        <Link
          href={backHref}
          aria-label="Voltar para a lista de departamentos"
          className="-ml-(--space-3) grid size-(--tap-min) shrink-0 place-items-center rounded-control text-(--icon-default) transition-colors duration-(--dur-fast) hover:bg-(--surface-input) hover:no-underline"
        >
          <Icon name="chevron-left" size="xl" />
        </Link>

        <span className="min-w-0">
          <span className="block truncate font-display text-(length:--text-lead) leading-snug font-semibold text-(--color-title)">
            {title}
          </span>
          {subtitle ? (
            <span className="block truncate text-(length:--text-xs) text-(--color-faint)">
              {subtitle}
            </span>
          ) : null}
        </span>

        <ThemeToggle variant="compact" className="-mr-(--space-3) ml-auto" />
      </div>
    </div>
  );
}
