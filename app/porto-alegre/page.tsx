import { UnitPage, getUnitMetadata } from "@/components/unit-page";

export const revalidate = 86400;

export const metadata = getUnitMetadata("poa");

export default function PortoAlegrePage() {
  return <UnitPage unitKey="poa" />;
}
