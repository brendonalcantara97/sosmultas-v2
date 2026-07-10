import { UnitPage, getUnitMetadata } from "@/components/unit-page";

export const revalidate = 86400;

export const metadata = getUnitMetadata("capao");

export default function CapaoDaCanoaPage() {
  return <UnitPage unitKey="capao" />;
}
