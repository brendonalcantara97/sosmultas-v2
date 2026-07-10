import { UnitPage, getUnitMetadata } from "@/components/unit-page";

export const dynamic = "force-dynamic";

export const metadata = getUnitMetadata("capao");

export default function CapaoDaCanoaPage() {
  return <UnitPage unitKey="capao" />;
}
