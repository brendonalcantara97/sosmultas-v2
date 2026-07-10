import type { Metadata } from "next";
import Script from "next/script";

import { Reveal } from "@/components/reveal";
import { UnitsGridSection } from "@/components/landing-sections";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: {
    absolute: "Unidades | SOS Multas",
  },
  description:
    "Escolha a unidade da SOS Multas para ver endereço, contato e atendimento em Porto Alegre e Capão da Canoa.",
  alternates: {
    canonical: "/unidades",
  },
  openGraph: {
    title: "Unidades | SOS Multas",
    description:
      "Veja as unidades da SOS Multas e encontre o atendimento mais próximo.",
    url: `${siteConfig.siteUrl}/unidades`,
    siteName: siteConfig.name,
    locale: "pt_BR",
    type: "website",
  },
};

export default function UnidadesPage() {
  return (
    <>
      <Script id="unidades-schema" type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          name: "Unidades SOS Multas",
          url: `${siteConfig.siteUrl}/unidades`,
          description: "Página com as unidades da SOS Multas em Porto Alegre e Capão da Canoa.",
        })}
      </Script>

      <section className="border-b border-[var(--borda)] bg-[var(--bg)] pb-[clamp(32px,5vw,48px)] pt-[clamp(48px,7vw,80px)]">
        <Reveal className="container-shell">
          <span className="eyebrow">Onde estamos</span>
          <h1 className="mt-3 font-heading text-[clamp(2.4rem,5.5vw,3.6rem)] text-[var(--preto)]">Nossas unidades</h1>
          <p className="mt-3 max-w-[60ch] text-[1.1rem] leading-[1.6] text-[var(--cinza-texto)]">
            Escolha a unidade mais próxima para ver endereço, contato e localização no mapa. Atendemos presencialmente no Sul e online em todo o Brasil.
          </p>
        </Reveal>
      </section>

      <UnitsGridSection />
    </>
  );
}
