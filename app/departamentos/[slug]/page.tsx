import { notFound } from "next/navigation";

import { DepartmentView } from "@/components/content/DepartmentView";
import { AppBar } from "@/components/ui/AppBar";
import { getDepartment, getDepartments } from "@/lib/content";

export const dynamicParams = false;

export async function generateStaticParams() {
  const departments = await getDepartments();
  return departments.map((department) => ({ slug: department.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/departamentos/[slug]">) {
  const { slug } = await params;
  const department = await getDepartment(slug);

  return {
    title: department ? `${department.name} · OnDeck` : "OnDeck",
    description: department?.summary,
  };
}

export default async function DepartmentPage({
  params,
}: PageProps<"/departamentos/[slug]">) {
  const { slug } = await params;
  const department = await getDepartment(slug);

  if (!department) notFound();

  return (
    <>
      <AppBar title={department.name} subtitle={department.tool} backHref="/" />
      <DepartmentView department={department} />
    </>
  );
}
