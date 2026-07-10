import type { Metadata } from "next";

import { Reveal } from "@/components/reveal";
import { PRIVACY_SECTIONS } from "@/lib/content";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: {
    absolute: "Política de Privacidade | SOS Multas",
  },
  description:
    "Como a SOS Multas coleta, utiliza e protege os seus dados pessoais em conformidade com a LGPD.",
  alternates: {
    canonical: "/privacidade",
  },
  openGraph: {
    title: "Política de Privacidade | SOS Multas",
    description: "Entenda como a SOS Multas trata dados pessoais e protege suas informações.",
    url: `${siteConfig.siteUrl}/privacidade`,
    siteName: siteConfig.name,
    locale: "pt_BR",
    type: "website",
  },
};

export default function PrivacidadePage() {
  return (
    <>
      <section className="relative overflow-hidden bg-[var(--navy)] py-[clamp(48px,7vw,80px)]">
        <div className="pointer-events-none absolute right-[-6%] top-[-30%] h-[420px] w-[420px] rounded-full bg-[radial-gradient(circle,rgba(253,139,0,.16),transparent_62%)]" />
        <Reveal className="container-shell relative z-[1] max-w-[820px]">
          <span className="text-[0.75rem] font-bold uppercase tracking-[0.14em] text-[var(--laranja)]">Transparência</span>
          <h1 className="mt-3 font-heading text-[clamp(2.4rem,5.5vw,3.6rem)] text-white">Política de privacidade</h1>
          <p className="mt-3 max-w-[60ch] text-[1.05rem] leading-[1.6] text-[var(--petrol-texto-soft)]">
            Como a SOS Multas coleta, utiliza e protege os seus dados pessoais, em conformidade com a Lei Geral de Proteção de Dados.
          </p>
          <p className="mt-[14px] text-[0.85rem] text-[#7594cb]">Última atualização: janeiro de 2026</p>
        </Reveal>
      </section>

      <section className="bg-white py-[clamp(48px,7vw,72px)]">
        <div className="container-shell max-w-[820px]">
          {PRIVACY_SECTIONS.map((section) => (
            <Reveal key={section.n} className="mb-9">
              <h2 className="flex items-baseline gap-3 font-heading text-[clamp(1.4rem,2.6vw,1.8rem)] text-[var(--preto)]">
                <span className="text-[0.8em] text-[var(--laranja-texto-forte)]">{section.n}</span>
                {section.title}
              </h2>
              <p className="mt-3 text-[1rem] leading-[1.7] text-[var(--cinza-texto)]">{section.body}</p>
            </Reveal>
          ))}

          <Reveal className="mt-2 rounded-[12px] border border-[var(--borda)] border-l-4 border-l-[var(--laranja)] bg-[var(--bg-alt)] px-[26px] py-6">
            <h3 className="font-heading text-[1.3rem] text-[var(--preto)]">Encarregado de dados (DPO)</h3>
            <p className="mt-2 text-[1rem] leading-[1.7] text-[var(--cinza-texto)]">
              Dúvidas ou solicitações sobre seus dados pessoais podem ser enviadas pelo e-mail{" "}
              <a className="text-[var(--laranja-hover)]" href={`mailto:${siteConfig.email}`}>
                {siteConfig.email}
              </a>{" "}
              ou pelo WhatsApp{" "}
              <a className="text-[var(--laranja-hover)]" href={siteConfig.whatsapp.main} target="_blank" rel="noopener">
                (51) 3307-7772
              </a>
              . Responderemos dentro dos prazos previstos na LGPD.
            </p>
          </Reveal>
        </div>
      </section>
    </>
  );
}
