import { notFound } from "next/navigation";

import { UnitPage, getUnitBySlugForPage, getUnitMetadata } from "@/components/unit-page";
import { UNIDADES } from "@/lib/config";

export const dynamic = "force-dynamic";

export function generateStaticParams() {
  return UNIDADES.map((unit) => ({ slug: unit.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const unit = getUnitBySlugForPage(slug);

  if (!unit) {
    return {};
  }

  // Canonical points to primary URL (e.g., /porto-alegre), not /unidades/porto-alegre
  return getUnitMetadata(unit.key, `/${unit.slug}`);
}

export default async function UnidadeDetalhePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const unit = getUnitBySlugForPage(slug);

  if (!unit) {
    notFound();
  }

  return <UnitPage unitKey={unit.key} canonicalPath={`/${unit.slug}`} />;
}
