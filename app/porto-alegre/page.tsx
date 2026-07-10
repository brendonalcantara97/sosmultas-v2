import { UnitPage, getUnitMetadata } from "@/components/unit-page";

export const dynamic = "force-dynamic";

export const metadata = getUnitMetadata("poa");

export default function PortoAlegrePage() {
  return <UnitPage unitKey="poa" />;
}
