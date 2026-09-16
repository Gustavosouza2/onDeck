import { OnboardingGate } from "@/components/content/OnboardingGate";
import { DepartmentCard } from "@/components/content/DepartmentCard";
import { InstallPrompt } from "@/components/content/InstallPrompt";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { getDepartments } from "@/lib/content";

export default async function Home() {
  const departments = await getDepartments();

  return (
    <OnboardingGate>
      <main className="page-container relative flex min-h-dvh flex-col justify-center py-(--space-9)">
        <header className="mb-(--space-7) text-center">
          <Eyebrow className="block text-(--color-faint)">Equipe de mídia</Eyebrow>
          <h1 className="mt-(--space-3) font-display text-(length:--text-display) leading-tight font-bold tracking-tight lg:text-(length:--text-hero)">
            E aí, pronto pro culto?
          </h1>
          <ThemeToggle className="mt-(--space-5)" />
        </header>

        <div className="grid grid-cols-1 gap-(--gap-card) md:grid-cols-2 md:gap-(--space-5) lg:grid-cols-3">
          {departments.map((department) => (
            <DepartmentCard key={department.slug} department={department} />
          ))}
        </div>

        <InstallPrompt />
      </main>
    </OnboardingGate>
  );
}
