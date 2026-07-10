import type { Metadata } from "next";

import { ArrowRightIcon, ChatIcon, ShieldIcon } from "@/components/home-icons";
import { WhatsAppButton } from "@/components/whatsapp-button";
import { Card } from "@/components/ui/card";
import { Section } from "@/components/ui/section";
import { siteConfig } from "@/lib/site-config";
import { getWhatsAppHref } from "@/lib/whatsapp";

export const metadata: Metadata = {
  title: {
    absolute: "Como Funciona | SOS Multas",
  },
  description:
    "Entenda o fluxo de atendimento da SOS Multas, da triagem inicial ao acompanhamento do caso.",
  alternates: {
    canonical: "/como-funciona",
  },
  openGraph: {
    title: "Como Funciona | SOS Multas",
    description:
      "Veja como funciona o atendimento da SOS Multas para análise, orientação e acompanhamento do seu caso.",
    url: `${siteConfig.siteUrl}/como-funciona`,
    siteName: siteConfig.name,
    locale: "pt_BR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Como Funciona | SOS Multas",
    description:
      "Conheça o fluxo de atendimento da SOS Multas do início ao acompanhamento.",
  },
};

const steps = [
  {
    title: "Triagem inicial",
    description: "Entendimento do caso e coleta de informações.",
  },
  {
    title: "Plano de ação",
    description: "Orientação prática com próximos passos.",
  },
  {
    title: "Acompanhamento",
    description: "Suporte contínuo durante as etapas.",
  },
] as const;

export default function ComoFuncionaPage() {
  const whatsappHref = getWhatsAppHref(siteConfig.whatsapp.main);

  return (
    <>
      <section className="bg-[var(--band)] py-6 md:py-10">
        <div className="container-shell">
          <article className="section-frame grid items-stretch gap-6 lg:grid-cols-[1.05fr_0.95fr]">
            <div className="px-6 py-8 sm:px-8 md:px-10 lg:px-12 lg:py-12">
              <p className="kicker mb-5">Fluxo de atendimento</p>
              <h1 className="headline-balance max-w-[11ch] font-heading text-[3rem] uppercase leading-[0.88] text-ink md:text-[4.5rem]">
                Como funciona o atendimento
              </h1>
              <p className="mt-5 max-w-[58ch] text-[1.08rem] leading-8 text-ink-2">
                Página base para explicar o fluxo de atendimento.
              </p>
              <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center" data-track-location="como-funciona-cta">
                <WhatsAppButton href={whatsappHref}>
                  <span className="inline-flex items-center gap-3">
                    <ChatIcon className="h-5 w-5" />
                    Quero explicar meu caso
                  </span>
                </WhatsAppButton>
                <p className="max-w-[24ch] text-sm font-medium leading-6 text-muted">
                  Atendimento consultivo para orientar o melhor caminho desde o início.
                </p>
              </div>
            </div>

            <div className="p-4 md:p-5 lg:p-6">
              <div className="petrol-panel flex h-full min-h-[320px] items-center p-8">
                <div className="relative z-10">
                  <p className="text-sm font-semibold uppercase tracking-[0.14em] text-accent-200">
                    Etapas claras
                  </p>
                  <h2 className="mt-3 font-heading text-5xl uppercase leading-[0.92] text-white">
                    Análise, plano e acompanhamento
                  </h2>
                  <p className="mt-4 max-w-[32ch] text-base leading-7 text-white/80">
                    Você entende o que precisa ser feito, quais são os prazos e como cada etapa será conduzida.
                  </p>
                </div>
              </div>
            </div>
          </article>
        </div>
      </section>

      <Section
        eyebrow="Passo a passo"
        title="Cada caso começa por uma triagem e segue com orientação objetiva."
        description="Mantivemos a estrutura funcional da base atual, agora com uma hierarquia mais consistente com o design system."
      >
        <div className="grid items-stretch gap-6 md:grid-cols-2 xl:grid-cols-3">
          {steps.map((step, index) => (
            <Card key={step.title} className={index === 1 ? "petrol-panel border-0 text-white" : ""}>
              <div
                className={`mb-5 grid h-11 w-11 place-items-center rounded-full ${
                  index === 1 ? "bg-white/10 text-accent" : "bg-accent-100 text-accent-600"
                }`}
              >
                <ArrowRightIcon className="h-5 w-5" />
              </div>
              <p
                className={`text-xs font-semibold uppercase tracking-[0.12em] ${
                  index === 1 ? "text-accent-200" : "text-accent-600"
                }`}
              >
                Etapa {index + 1}
              </p>
              <h2
                className={`mt-3 font-heading text-[1.9rem] uppercase leading-none ${
                  index === 1 ? "text-white" : "text-ink"
                }`}
              >
                {step.title}
              </h2>
              <p className={`mt-3 text-base leading-7 ${index === 1 ? "text-white/80" : "text-ink-2"}`}>
                {step.description}
              </p>
            </Card>
          ))}
        </div>
      </Section>

      <section className="py-section">
        <div className="container-shell">
          <div className="petrol-panel grid items-stretch gap-8 px-6 py-8 sm:px-8 md:px-10 lg:grid-cols-[1fr_1fr] lg:items-center lg:px-12 lg:py-12">
            <div className="relative z-10">
              <p className="kicker !text-accent-200 mb-4">Compromisso</p>
              <h2 className="headline-balance max-w-[14ch] font-heading text-[2.5rem] uppercase leading-[0.9] text-white md:text-[3.6rem]">
                Atendimento técnico com orientação clara
              </h2>
              <p className="mt-5 max-w-[36ch] text-lg leading-8 text-white/82">
                O objetivo é organizar sua regularização sem ruído, com linguagem direta e acompanhamento contínuo.
              </p>
            </div>
            <Card className="bg-white p-8">
              <div className="mb-5 grid h-12 w-12 place-items-center rounded-[14px] bg-navy-fixed text-navy">
                <ShieldIcon className="h-6 w-6" />
              </div>
              <h3 className="font-heading text-[2rem] uppercase text-ink">
                Fale com a equipe
              </h3>
              <p className="mt-3 text-base leading-7 text-ink-2">
                Explique seu caso e receba uma orientação inicial antes de perder prazos importantes.
              </p>
              <div className="mt-auto pt-8" data-track-location="como-funciona-bottom-cta">
                <WhatsAppButton href={whatsappHref} variant="dark">
                  <span className="inline-flex items-center gap-3">
                    <ChatIcon className="h-5 w-5" />
                    Falar com especialista
                  </span>
                </WhatsAppButton>
              </div>
            </Card>
          </div>
        </div>
      </section>
    </>
  );
}
