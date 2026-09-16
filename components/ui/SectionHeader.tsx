import type { ReactNode } from "react";

export function SectionHeader({
  label,
  meta,
}: {
  label: string;
  meta?: ReactNode;
}) {
  return (
    <div className="mb-(--space-4) flex flex-wrap items-baseline justify-between gap-x-(--space-5) gap-y-(--space-2)">
      <h2 className="font-body text-(length:--text-sm) font-medium text-(--color-faint)">
        {label}
      </h2>
      {meta ? (
        <span className="text-(length:--text-sm) text-(--color-faint)">
          {meta}
        </span>
      ) : null}
    </div>
  );
}
