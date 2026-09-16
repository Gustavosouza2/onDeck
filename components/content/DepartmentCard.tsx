import Link from "next/link";

import { Eyebrow } from "@/components/ui/Eyebrow";
import { Icon } from "@/components/ui/Icon";
import { Motif } from "@/components/ui/Motif";
import { TINT_CLASS } from "@/components/ui/tint";
import { TintMorph } from "@/components/ui/TintMorph";
import type { Department } from "@/lib/content";

export function DepartmentCard({ department }: { department: Department }) {
  const stepCount = department.steps.length;

  return (
    <TintMorph slug={department.slug}>
      <Link
        href={`/departamentos/${department.slug}`}
        className={`${TINT_CLASS[department.tint]} group relative flex min-h-(--card-min-h) flex-col overflow-hidden rounded-card p-(--pad-card-lg) text-ink no-underline outline-2 outline-offset-(--focus-offset) outline-transparent transition-[transform,outline-color,filter] duration-(--dur-base) ease-standard hover:-translate-y-(--hover-lift) hover:no-underline hover:outline-(--accent) focus-visible:outline-(--accent) active:filter-[brightness(var(--press-darken))] md:min-h-(--card-min-h-md) md:p-(--space-7) lg:min-h-(--card-min-h-lg) lg:p-(--space-8)`}
      >
        <Eyebrow className="flex items-center gap-(--space-3) pr-(--space-9) text-ink opacity-(--on-tint-faint) md:pr-(--space-10)">
          <Icon name={department.icon} size="sm" />
          {department.tool}
        </Eyebrow>

        <h2 className="mt-(--space-4) font-display text-(length:--text-display) leading-tight font-bold tracking-tight text-ink md:mt-(--space-5) md:text-(length:--text-hero)">
          {department.name}
        </h2>

        <p className="mt-(--space-3) max-w-(--measure-card) text-(length:--text-sm) leading-normal md:text-(length:--text-base)">
          {department.summary}
        </p>

        <span className="mt-auto flex items-end justify-between gap-(--space-5) pt-(--space-5)">
          <span className="inline-flex shrink-0 items-center rounded-control bg-ink/10 px-(--space-4) py-(--space-2) text-(length:--text-xs) font-semibold whitespace-nowrap md:px-(--space-5) md:text-(length:--text-sm)">
            {stepCount} {stepCount === 1 ? "passo" : "passos"}
          </span>

          <Motif
            name={department.motif}
            className="pointer-events-none h-auto w-(--card-motif-w) min-w-0 md:w-(--card-motif-w-md) lg:w-(--card-motif-w-lg)"
          />
        </span>

        <span
          aria-hidden
          className="absolute top-(--pad-card-lg) right-(--pad-card-lg) grid size-(--card-puck) place-items-center rounded-control bg-ink/10 text-ink transition-colors duration-(--dur-fast) group-hover:bg-ink group-hover:text-(--white) md:top-(--space-7) md:right-(--space-7) md:size-(--card-puck-md) lg:top-(--space-8) lg:right-(--space-8)"
        >
          <Icon name="arrow-up-right" size="sm" />
        </span>
      </Link>
    </TintMorph>
  );
}
