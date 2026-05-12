import { MODULES } from "@/src/lib/data";
import { notFound } from "next/navigation";
import { ModuleDetailClient } from "@/src/components/ModuleDetailClient";

export async function generateStaticParams() {
  return MODULES.map((module) => ({
    id: module.id,
  }));
}

export default async function ModuleDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const moduleData = MODULES.find((m) => m.id === id);

  if (!moduleData) {
    notFound();
  }

  return <ModuleDetailClient module={moduleData} />;
}
