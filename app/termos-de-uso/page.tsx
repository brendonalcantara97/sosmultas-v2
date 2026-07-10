import type { Metadata } from "next";

import { Card } from "@/components/ui/card";
import { Section } from "@/components/ui/section";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: {
    absolute: "Termos de Uso | SOS Multas",
  },
  description:
    "Leia os termos de uso da SOS Multas para compreender as condições de acesso e utilização do site.",
  alternates: {
    canonical: "/termos-de-uso",
  },
  openGraph: {
    title: "Termos de Uso | SOS Multas",
    description:
      "Condições de uso do site da SOS Multas, responsabilidades do usuário e regras gerais.",
    url: `${siteConfig.siteUrl}/termos-de-uso`,
    siteName: siteConfig.name,
    locale: "pt_BR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Termos de Uso | SOS Multas",
    description: "Termos e condições de uso do site da SOS Multas.",
  },
};

const responsibilities = [
  "Utilizar o site de maneira ética e conforme a legislação vigente.",
  "Não divulgar ou compartilhar credenciais de acesso a terceiros.",
  "Não tentar acessar dados indevidos ou realizar ações que comprometam a segurança do site.",
  "Não reproduzir, distribuir ou modificar qualquer conteúdo do site sem autorização formal da SOS MULTAS.",
] as const;

export default function TermosDeUsoPage() {
  return (
    <>
      <section className="bg-[var(--band)] py-6 md:py-10">
        <div className="container-shell">
          <article className="section-frame grid items-stretch gap-6 lg:grid-cols-[1.05fr_0.95fr]">
            <div className="px-6 py-8 sm:px-8 md:px-10 lg:px-12 lg:py-12">
              <p className="kicker mb-5">Documento institucional</p>
              <h1 className="headline-balance max-w-[11ch] font-heading text-[3rem] uppercase leading-[0.88] text-ink md:text-[4.4rem]">
                Termos de uso
              </h1>
              <p className="mt-5 max-w-[58ch] text-[1.08rem] leading-8 text-ink-2">
                Regras de acesso e utilização do site da SOS Multas, com informações sobre serviços, responsabilidades e limitações.
              </p>
            </div>
            <div className="p-4 md:p-5 lg:p-6">
              <div className="petrol-panel flex h-full min-h-[320px] items-center p-8">
                <div className="relative z-10">
                  <p className="text-sm font-semibold uppercase tracking-[0.14em] text-accent-200">
                    Uso do site
                  </p>
                  <h2 className="mt-3 font-heading text-5xl uppercase leading-[0.92] text-white">
                    Transparência sobre acesso, serviços e responsabilidades
                  </h2>
                  <p className="mt-4 max-w-[32ch] text-base leading-7 text-white/80">
                    O uso contínuo do site pressupõe concordância com as disposições apresentadas abaixo.
                  </p>
                </div>
              </div>
            </div>
          </article>
        </div>
      </section>

      <Section
        eyebrow="Condições gerais"
        title="Termos que regem a utilização do site da SOS Multas."
        description="A copy institucional foi preservada e reorganizada para uma leitura mais clara dentro da nova camada visual."
      >
        <div className="grid gap-6">
          <Card className="p-8">
            <h2 className="font-heading text-[2rem] uppercase text-ink">1. Aceitação dos Termos</h2>
            <p className="mt-4 text-base leading-8 text-ink-2">
              Ao acessar e utilizar o site da SOS MULTAS, você concorda em cumprir e estar vinculado a estes Termos de Uso. Caso não concorde com qualquer disposição destes Termos, recomendamos que não utilize o site.
            </p>
          </Card>

          <Card className="petrol-panel border-0 p-8">
            <h2 className="font-heading text-[2rem] uppercase text-white">2. Serviços Oferecidos</h2>
            <p className="mt-4 text-base leading-8 text-white/80">
              A SOS MULTAS é uma empresa especializada em soluções administrativas para infrações de trânsito, oferecendo serviços de orientação administrativa, análise e confecção de recursos, defesa administrativa e acompanhamento de processos junto aos órgãos de trânsito, inclusive em casos de suspensão ou cassação da CNH.
            </p>
            <p className="mt-4 text-base leading-8 text-white/80">
              Atenção: todos os atendimentos e serviços dependem de análise individual do caso e decisão da autoridade competente. Não garantimos resultado.
            </p>
            <p className="mt-4 text-base leading-8 text-white/80">
              Aviso importante: a SOS MULTAS não possui acesso a sistemas do Detran, órgãos de trânsito ou entidades fiscalizadoras. Toda a atuação se baseia em informações fornecidas pelo próprio cliente, análise documental e procedimentos administrativos ou jurídicos realizados de forma independente.
            </p>
          </Card>

          <div className="grid items-stretch gap-6 lg:grid-cols-2">
            <Card className="p-8">
              <h2 className="font-heading text-[2rem] uppercase text-ink">3. Cadastro e Acesso ao Sistema</h2>
              <p className="mt-4 text-base leading-8 text-ink-2">
                O acesso a áreas restritas ou sistemas de acompanhamento de processos é permitido apenas a clientes previamente cadastrados pela equipe da SOS MULTAS. O usuário é responsável por manter sigilo sobre suas credenciais e atualizar seus dados sempre que necessário.
              </p>
            </Card>

            <Card className="p-8">
              <h2 className="font-heading text-[2rem] uppercase text-ink">4. Responsabilidades do Usuário</h2>
              <ul className="mt-4 grid gap-3">
                {responsibilities.map((item) => (
                  <li key={item} className="rounded-[16px] border border-surface-line bg-surface-alt px-4 py-4 text-base leading-7 text-ink-2">
                    {item}
                  </li>
                ))}
              </ul>
            </Card>
          </div>

          <div className="grid items-stretch gap-6 lg:grid-cols-2">
            <Card className="p-8">
              <h2 className="font-heading text-[2rem] uppercase text-ink">5. Propriedade Intelectual</h2>
              <p className="mt-4 text-base leading-8 text-ink-2">
                Todo o conteúdo deste site, incluindo textos, imagens, logotipos, marcas, gráficos e demais materiais, é de propriedade exclusiva da SOS MULTAS ou de seus licenciadores, sendo protegido por leis de direitos autorais e de propriedade intelectual. A reprodução total ou parcial, sem autorização prévia e expressa, é proibida.
              </p>
            </Card>

            <Card className="p-8">
              <h2 className="font-heading text-[2rem] uppercase text-ink">6. Privacidade e Proteção de Dados</h2>
              <p className="mt-4 text-base leading-8 text-ink-2">
                A SOS MULTAS respeita a privacidade de seus usuários e se compromete a proteger os dados fornecidos conforme a Política de Privacidade. Ao utilizar o site, você concorda com a coleta e uso das informações nos termos da Política de Privacidade, disponível no rodapé deste site.
              </p>
            </Card>
          </div>

          <Card className="p-8">
            <h2 className="font-heading text-[2rem] uppercase text-ink">7. Limitação de Responsabilidade</h2>
            <p className="mt-4 text-base leading-8 text-ink-2">
              A SOS MULTAS não garante que o site estará sempre disponível, livre de erros ou interrupções. A empresa não se responsabiliza por eventuais prejuízos, danos diretos ou indiretos decorrentes do uso, ou da impossibilidade de uso do site, inclusive por falhas técnicas, indisponibilidade temporária, perda de dados ou informações.
            </p>
          </Card>

          <div className="grid items-stretch gap-6 lg:grid-cols-2">
            <Card className="p-8">
              <h2 className="font-heading text-[2rem] uppercase text-ink">8. Alterações nos Termos de Uso</h2>
              <p className="mt-4 text-base leading-8 text-ink-2">
                A SOS MULTAS pode atualizar estes Termos a qualquer momento, sem aviso. Recomendamos que os usuários revisem esta página periodicamente para se manterem informados sobre eventuais alterações. O uso contínuo do site após modificações será considerado aceitação dos novos Termos.
              </p>
            </Card>

            <Card className="p-8">
              <h2 className="font-heading text-[2rem] uppercase text-ink">9. Contato</h2>
              <p className="mt-4 text-base leading-8 text-ink-2">
                Em caso de dúvidas ou solicitações sobre estes Termos de Uso, entre em contato conosco pelos canais oficiais informados no rodapé do site.
              </p>
              <p className="mt-4 text-sm font-semibold uppercase tracking-[0.12em] text-accent-600">
                Data da última atualização: 15 de junho de 2025
              </p>
            </Card>
          </div>
        </div>
      </Section>
    </>
  );
}
