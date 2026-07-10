import type { Metadata } from "next";
import Link from "next/link";

import { ChatIcon, ShieldIcon } from "@/components/home-icons";
import { WhatsAppButton } from "@/components/whatsapp-button";
import { Card } from "@/components/ui/card";
import { Section } from "@/components/ui/section";
import { siteConfig } from "@/lib/site-config";
import { getWhatsAppHref } from "@/lib/whatsapp";

export const metadata: Metadata = {
  title: {
    absolute: "Locais | SOS Multas",
  },
  description:
    "Veja os principais locais atendidos pela SOS Multas e conheça as unidades de Porto Alegre e Capão da Canoa.",
  alternates: {
    canonical: "/locais",
  },
  openGraph: {
    title: "Locais | SOS Multas",
    description:
      "Página com os principais locais atendidos pela SOS Multas e acesso rápido para as unidades.",
    url: `${siteConfig.siteUrl}/locais`,
    siteName: siteConfig.name,
    locale: "pt_BR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Locais | SOS Multas",
    description: "Conheça os locais atendidos e as unidades da SOS Multas.",
  },
};

const places = [
  { name: "Porto Alegre", href: "/porto-alegre", highlight: true },
  { name: "Capão da Canoa", href: "/capao-da-canoa", highlight: true },
  { name: "Florianópolis", href: undefined, highlight: false },
  { name: "Curitiba", href: undefined, highlight: false },
] as const;

export default function LocaisPage() {
  const whatsappHref = getWhatsAppHref(siteConfig.whatsapp.main);

  return (
    <>
      <section className="bg-[var(--band)] py-6 md:py-10">
        <div className="container-shell">
          <article className="section-frame grid items-stretch gap-6 lg:grid-cols-[1.05fr_0.95fr]">
            <div className="px-6 py-8 sm:px-8 md:px-10 lg:px-12 lg:py-12">
              <p className="kicker mb-5">Cobertura e presença</p>
              <h1 className="headline-balance max-w-[11ch] font-heading text-[3rem] uppercase leading-[0.88] text-ink md:text-[4.5rem]">
                Locais atendidos
              </h1>
              <p className="mt-5 max-w-[58ch] text-[1.08rem] leading-8 text-ink-2">
                Página base para listar os locais atendidos.
              </p>
              <div className="mt-8" data-track-location="locais-cta">
                <WhatsAppButton href={whatsappHref}>
                  <span className="inline-flex items-center gap-3">
                    <ChatIcon className="h-5 w-5" />
                    Consultar atendimento
                  </span>
                </WhatsAppButton>
              </div>
            </div>
            <div className="p-4 md:p-5 lg:p-6">
              <div className="petrol-panel flex h-full min-h-[320px] items-center p-8">
                <div className="relative z-10">
                  <p className="text-sm font-semibold uppercase tracking-[0.14em] text-accent-200">
                    Sul e atendimento online
                  </p>
                  <h2 className="mt-3 font-heading text-5xl uppercase leading-[0.92] text-white">
                    Presencial onde faz diferença, online onde acelera
                  </h2>
                  <p className="mt-4 max-w-[32ch] text-base leading-7 text-white/80">
                    A estrutura atual combina atendimento regional com apoio remoto para dar velocidade ao processo.
                  </p>
                </div>
              </div>
            </div>
          </article>
        </div>
      </section>

      <Section
        eyebrow="Mapa de atuação"
        title="Unidades principais e cobertura para condutores que precisam agir rápido."
        description="Mantivemos os locais presentes no baseline e demos prioridade visual às unidades ativas no fluxo atual."
      >
        <div className="grid items-stretch gap-6 md:grid-cols-2">
          {places.map((place, index) => (
            <Card key={place.name} className={place.highlight && index === 0 ? "petrol-panel border-0 text-white" : ""}>
              <div className="mb-5 grid h-12 w-12 place-items-center rounded-[14px] bg-accent-100 text-accent-600">
                <ShieldIcon className="h-6 w-6" />
              </div>
              <h2 className={`font-heading text-[2rem] uppercase ${place.highlight && index === 0 ? "text-white" : "text-ink"}`}>
                {place.name}
              </h2>
              <p className={`mt-3 text-base leading-7 ${place.highlight && index === 0 ? "text-white/80" : "text-ink-2"}`}>
                {place.highlight
                  ? "Atendimento com página dedicada, prova social e CTA próprio para a unidade."
                  : "Cobertura indicada na base anterior como parte da área de atendimento."}
              </p>
              {place.href ? (
                <div className="mt-auto pt-6">
                  <Link
                    href={place.href}
                    className={`font-heading text-base uppercase tracking-[0.08em] ${
                      place.highlight && index === 0 ? "text-accent-200" : "text-accent-600"
                    }`}
                  >
                    Ver página da unidade
                  </Link>
                </div>
              ) : null}
            </Card>
          ))}
        </div>
      </Section>
    </>
  );
}
