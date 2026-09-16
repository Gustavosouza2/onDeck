import type { ReactNode } from "react";

export function Tag({ children }: { children: ReactNode }) {
  return (
    <span className="inline-flex items-center rounded-control border border-transparent bg-(--accent) px-(--space-4) py-(--space-2) text-(length:--text-xs) font-semibold text-ink">
      {children}
    </span>
  );
}
