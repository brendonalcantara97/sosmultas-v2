import Image from "next/image";
import Link from "next/link";

import {
  ArrowRightIcon,
  CheckCircleIcon,
  ChatIcon,
  ClockIcon,
  FileTextIcon,
  IdCardIcon,
  MapPinIcon,
  PhoneIcon,
  PlayIcon,
  SearchIcon,
  ShieldIcon,
  StarIcon,
  WhatsAppIcon,
  WineIcon,
} from "@/components/home-icons";
import { Reveal } from "@/components/reveal";
import { ReviewerAvatar } from "@/components/reviewer-avatar";
import { TestimonialCarousel } from "@/components/testimonial-carousel";
import { UNIDADES, type Unidade } from "@/lib/config";
import { PROCESS_STEPS, SERVICES, TESTIMONIALS, type TestimonialItem } from "@/lib/content";
import { siteConfig } from "@/lib/site-config";

function ServiceIcon({ name, className = "h-7 w-7" }: { name: string; className?: string }) {
  const props = { className };
  switch (name) {
    case "shield":
      return <ShieldIcon {...props} />;
    case "wine":
      return <WineIcon {...props} />;
    case "file":
      return <FileTextIcon {...props} />;
    case "idcard":
      return <IdCardIcon {...props} />;
    case "check":
      return <CheckCircleIcon {...props} />;
    case "chat":
      return <ChatIcon {...props} />;
    case "search":
      return <SearchIcon {...props} />;
    default:
      return <FileTextIcon {...props} />;
  }
}

export function HeroSection({
  unidade,
  testimonialItems = TESTIMONIALS,
}: {
  unidade?: Unidade;
  testimonialItems?: readonly TestimonialItem[];
}) {
  const whatsappHref = unidade?.whatsapp || siteConfig.whatsapp.main;
  const subtext = unidade
    ? `Atendimento presencial e online para condutores de ${unidade.cidade}, com orientação clara em cada etapa.`
    : "Evite penalidades na sua CNH, com defesas especializadas para manter o seu direito de dirigir regular.";
  const imageSrc = unidade?.image || "/assets/hero-motorista.webp";
  const badgeText = unidade ? `📍 UNIDADE ${unidade.cidade.toUpperCase()}` : "ASSESSORIA ESPECIALIZADA EM TRÂNSITO";
  const heroReviewers = testimonialItems.slice(0, 4);

  return (
    <section className="relative overflow-hidden bg-[var(--bg)] py-[clamp(44px,7vw,84px)]">
      <div className="pointer-events-none absolute right-[-8%] top-[-12%] h-[520px] w-[520px] rounded-full bg-[radial-gradient(circle,rgba(253,139,0,.16),transparent_62%)]" />
      <div className="pointer-events-none absolute bottom-[-25%] left-[-10%] h-[460px] w-[460px] rounded-full bg-[radial-gradient(circle,rgba(0,23,54,.05),transparent_60%)]" />

      <div className="container-shell relative z-[1] grid items-center gap-12 lg:grid-cols-2 lg:gap-14">
        <Reveal>
          <span className="inline-flex items-center gap-2 rounded-full bg-[var(--laranja-tint)] px-[14px] py-2 text-[0.72rem] font-bold uppercase tracking-[0.1em] text-[var(--laranja-texto)]">
            {badgeText}
          </span>

          <h1 className="mt-[18px] font-heading text-[clamp(2.5rem,5.8vw,4rem)] leading-[1.02] text-[var(--preto)]">
            {unidade ? (
              <>
                SEU <span className="text-[var(--laranja-titulo)]">DIREITO</span> DE DIRIGIR EM{" "}
                {unidade.heroCidade}
              </>
            ) : (
              <>
                PROTEJA O SEU <span className="text-[var(--laranja-titulo)]">DIREITO</span> DE DIRIGIR
              </>
            )}
          </h1>

          <p className="mt-5 max-w-[52ch] text-[1.1rem] leading-[1.6] text-[var(--cinza-texto)]">{subtext}</p>

          <div className="mt-[30px] flex flex-wrap items-center gap-[14px]">
            <a href={whatsappHref} target="_blank" rel="noopener" className="cta-button cta-button-primary">
              <WhatsAppIcon className="h-5 w-5" />
              Quero entender meu caso
            </a>
            <a href="#como-funciona" className="cta-button cta-button-secondary">
              <span className="grid h-[30px] w-[30px] place-items-center rounded-full bg-[var(--navy)] text-white">
                <PlayIcon className="h-3 w-3" />
              </span>
              Como funciona
            </a>
          </div>

          <div className="mt-8 flex flex-wrap items-center gap-[14px]">
            <div className="flex">
              {heroReviewers.map((item, index) => (
                <span key={`${item.name}-${item.time}`} className={index > 0 ? "-ml-3" : ""}>
                  <ReviewerAvatar
                    name={item.name}
                    initial={item.initial}
                    profilePhotoUrl={item.profilePhotoUrl}
                    sizeClassName="h-[38px] w-[38px]"
                    textClassName="text-[0.95rem]"
                    ringClassName="border-[var(--bg)]"
                  />
                </span>
              ))}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <div className="flex gap-1 text-[var(--laranja)]">
                  {Array.from({ length: 5 }).map((_, index) => (
                    <StarIcon key={index} className="h-4 w-4" />
                  ))}
                </div>
                <span className="inline-flex items-center rounded-full border border-[var(--borda)] bg-white px-2 py-1">
                  <Image src="/assets/google-logo.svg" alt="Google" width={22} height={22} className="h-[22px] w-[22px]" />
                </span>
              </div>
              <div className="mt-1 text-[0.82rem] text-[var(--muted)]">
                Mais de <b className="text-[var(--preto)]">10.000 clientes</b> atendidos
              </div>
            </div>
          </div>
        </Reveal>

        <Reveal className="relative">
          <div className="pointer-events-none absolute inset-[-24px] rounded-[24px] bg-[radial-gradient(circle_at_60%_40%,rgba(253,139,0,.18),transparent_65%)]" />
          <div className="hero-float relative aspect-[4/3] overflow-hidden rounded-[16px] border border-[var(--borda)] bg-[#F8F9FA] shadow-[0_18px_44px_rgba(0,23,54,.12)]">
            <Image
              src={imageSrc}
              alt={unidade ? `Fachada da unidade ${unidade.cidade}` : "Equipe SOS Multas em atendimento"}
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className={unidade ? "object-cover object-top" : "object-cover"}
              priority
            />
          </div>
        </Reveal>
      </div>
    </section>
  );
}

export function AboutSection({ googleRating = "4,9" }: { googleRating?: string }) {
  return (
    <section className="bg-[var(--navy)] py-section">
      <div className="container-shell grid items-center gap-[clamp(32px,5vw,64px)] lg:grid-cols-[0.95fr_1.05fr]">
        <Reveal>
          <div className="grid aspect-[3/2] place-items-center overflow-hidden rounded-[16px] bg-[#f3f4f6] px-8 shadow-[0_18px_44px_rgba(0,0,0,.28)]">
            <Image src="/assets/logo-grande.webp" alt="Logo SOS Multas" width={520} height={346} className="h-auto w-full" />
          </div>
        </Reveal>

        <Reveal>
          <span className="text-[0.75rem] font-bold uppercase tracking-[0.14em] text-[var(--laranja)]">Sobre Nós</span>
          <h2 className="mt-3 font-heading text-[clamp(1.7rem,3.4vw,2.3rem)] leading-[1.04] text-white">
            A defesa do direito de dirigir do cidadão e o combate às ilegalidades e injustiças são nossa maior bandeira.
          </h2>
          <p className="mt-4 max-w-[56ch] text-[1.05rem] leading-[1.65] text-[var(--petrol-texto-soft)]">
            Com mais de 20 anos de experiência e atuação em todo Brasil, com maior ênfase no Sul do país, a equipe do SOS Multas conta com profissionais capacitados e prontos para atender o cidadão que busca por soluções quando o assunto é trânsito.
          </p>
          <p className="mt-4 max-w-[56ch] text-[1.05rem] leading-[1.65] text-[var(--petrol-texto-soft)]">
            Somos especializados em defesas e recursos de multas de trânsito, assim como em processos de suspensão e cassação do direito de dirigir.
          </p>

          <div className="mt-9 grid gap-6 border-t border-[var(--petrol-borda)] pt-8 sm:grid-cols-2 xl:grid-cols-3">
            {[
              { lead: "+10 mil", label: "Clientes atendidos", icon: "👥" },
              { lead: "20 anos", label: "De experiência", icon: "🏆" },
              { lead: googleRating, label: "Nota no Google", icon: "google" },
            ].map((item) => (
              <div key={item.label} className="flex items-center gap-3">
                {item.icon === "google" ? (
                  <Image src="/assets/google-logo.svg" alt="Google" width={30} height={30} className="h-[30px] w-[30px] flex-none" />
                ) : (
                  <span className="grid h-10 w-10 place-items-center rounded-full bg-white/8 text-lg text-[var(--laranja)]">
                    {item.icon}
                  </span>
                )}
                <div>
                  <p className="font-heading text-[1.9rem] text-white">{item.lead}</p>
                  <p className="text-[0.78rem] uppercase tracking-[0.04em] text-[var(--petrol-texto-soft)]">{item.label}</p>
                </div>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

export function ServicesSection() {
  return (
    <section className="bg-[var(--bg-alt)] py-section">
      <div className="container-shell">
        <Reveal className="mb-10 max-w-[720px]">
          <span className="eyebrow">Serviços</span>
          <h2 className="mt-3 font-heading text-[clamp(1.7rem,3.6vw,2.4rem)] text-[var(--preto)]">
            Especialistas em todas as frentes do trânsito
          </h2>
        </Reveal>

        <div className="grid items-stretch gap-5 lg:grid-cols-2">
          {SERVICES.map((service, index) => {
            const tone =
              index % 2 === 0
                ? {
                    box: "bg-[var(--navy-tint)] text-[var(--navy)]",
                  }
                : {
                    box: "bg-[var(--laranja-tint)] text-[var(--laranja-hover)]",
                  };

            return (
              <Reveal key={service.title} className="h-full">
                <article className="surface-card flex h-full flex-col p-[26px]">
                  <div className={`mb-4 grid h-[52px] w-[52px] place-items-center rounded-[12px] ${tone.box}`}>
                    <ServiceIcon name={service.icon} className="h-7 w-7" />
                  </div>
                  <h3 className="font-heading text-[1.35rem] text-[var(--preto)]">{service.title}</h3>
                  <p className="mt-2 text-[0.94rem] leading-[1.55] text-[var(--cinza-texto)]">{service.desc}</p>
                </article>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export function StatsBand({
  unidade,
  rating,
}: {
  unidade?: Unidade;
  rating?: string;
  reviewCount?: string;
}) {
  const items = [
    { value: rating || unidade?.reviewsRating || "4,9", label: "Nota no Google" },
    { value: "+10.000", label: "Clientes atendidos" },
    { value: "20 anos", label: "De experiência" },
    { value: "Brasil", label: "Atendimento nacional" },
  ];

  return (
    <section className="bg-[var(--navy)] py-[clamp(48px,7vw,64px)]">
      <Reveal className="container-shell grid items-stretch gap-y-2 text-center sm:grid-cols-2 lg:grid-cols-4">
        {items.map((item) => (
          <div key={item.label} className="flex h-full flex-col justify-center px-4 py-4">
            <p className="font-heading text-[2.6rem] text-[var(--laranja)]">{item.value}</p>
            <p className="mt-1 text-[0.78rem] uppercase tracking-[0.05em] text-white/80">{item.label}</p>
          </div>
        ))}
      </Reveal>
    </section>
  );
}

export function WhatsAppCtaSection({ unidade }: { unidade?: Unidade }) {
  const whatsappHref = unidade?.whatsapp || siteConfig.whatsapp.main;

  return (
    <section className="bg-white py-section">
      <Reveal className="container-shell relative overflow-hidden rounded-[32px] bg-[linear-gradient(135deg,#ff6f3c,#ff5a1f)] text-white">
        <div className="pointer-events-none absolute left-[-110px] top-[-40px] h-[620px] w-[620px] rounded-full bg-white/10" />
        <div className="pointer-events-none absolute bottom-[-150px] right-[-100px] h-[420px] w-[720px] rounded-[52%] bg-[rgba(222,79,26,.4)]" />
        <div className="relative z-[1] grid items-center gap-[clamp(24px,4vw,48px)] p-[clamp(24px,4vw,52px)] lg:grid-cols-[minmax(0,1.15fr)_minmax(320px,0.85fr)]">
          <div>
            <h3 className="max-w-[15ch] font-heading text-[clamp(2rem,4.5vw,3rem)] leading-[1.04] text-white">
              FIQUE ATENTO AOS PRAZOS DE DEFESA E RECURSO!
            </h3>
            <p className="mt-4 max-w-[40ch] text-[1.05rem] leading-[1.6] text-white/95">
              Cada minuto conta no trânsito. Fale agora com um especialista e receba orientação clara para o seu caso.
            </p>
          </div>

          <div className="rounded-[24px] bg-white p-[clamp(22px,4vw,40px)] text-center shadow-[0_18px_38px_rgba(0,0,0,.16)]">
            <div className="mx-auto mb-4 grid h-14 w-14 place-items-center rounded-full border-2 border-[var(--laranja-vivo)] text-[var(--laranja-vivo)]">
              <ClockIcon className="h-6 w-6" />
            </div>
            <h4 className="font-heading text-[1.35rem] text-[var(--preto)]">Atendimento pelo WhatsApp</h4>
            <p className="mt-2 text-[0.95rem] text-[var(--muted)]">Explique seu caso e receba uma orientação inicial.</p>
            <a
              href={whatsappHref}
              target="_blank"
              rel="noopener"
              className="mt-5 inline-flex min-h-14 w-full items-center justify-center gap-2 rounded-[8px] bg-[#0d0f12] px-4 text-[0.95rem] font-heading uppercase tracking-[0.02em] text-white transition hover:-translate-y-0.5 hover:bg-black"
            >
              <span className="grid h-6 w-6 place-items-center rounded-full bg-[#25D366] text-white">
                <WhatsAppIcon className="h-[15px] w-[15px]" />
              </span>
              Falar com Especialista
            </a>
            <p className="mt-[14px] flex items-center justify-center gap-1 text-[0.85rem] text-[var(--muted)]">
              <span>🔒</span> Conversa segura
            </p>
          </div>
        </div>
      </Reveal>
    </section>
  );
}

export function ProcessSection() {
  return (
    <section id="como-funciona" className="bg-[var(--bg-alt)] py-section">
      <div className="container-shell">
        <Reveal className="mb-10 max-w-[720px]">
          <span className="eyebrow">Processo</span>
          <h2 className="mt-3 font-heading text-[clamp(1.7rem,3.6vw,2.4rem)] text-[var(--preto)]">Como funciona</h2>
          <p className="mt-3 max-w-[62ch] text-[1rem] leading-[1.55] text-[var(--cinza-texto)]">
            Passo a passo do atendimento para analisar seu caso e organizar sua regularização.
          </p>
        </Reveal>

        <div className="grid items-stretch gap-5 md:grid-cols-2 xl:grid-cols-4">
          {PROCESS_STEPS.map((step) => (
            <Reveal key={step.n} className="h-full">
              <article className="surface-card flex h-full flex-col p-[26px]">
                <div className="mb-4 grid h-11 w-11 place-items-center rounded-full border-[1.5px] border-[#ffb77d] text-[var(--laranja)]">
                  <ServiceIcon name={step.icon} className="h-6 w-6" />
                </div>
                <p className="mb-2 text-[0.72rem] font-bold uppercase tracking-[0.1em] text-[var(--laranja-hover)]">Passo {step.n}</p>
                <h3 className="font-heading text-[1.2rem] text-[var(--preto)]">{step.title}</h3>
                <p className="mt-2 text-[0.92rem] leading-[1.5] text-[var(--cinza-texto)]">{step.desc}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

export function TestimonialsSection({ items = TESTIMONIALS }: { items?: readonly TestimonialItem[] }) {
  return <TestimonialCarousel items={items} />;
}

export function UnitsGridSection() {
  return (
    <section className="bg-white py-[clamp(48px,7vw,72px)]">
      <div className="container-shell grid items-stretch gap-7 xl:grid-cols-2">
        {UNIDADES.map((unit) => (
          <Reveal key={unit.slug} className="h-full">
            <article className="flex h-full flex-col overflow-hidden rounded-[16px] border border-[var(--borda)] bg-white shadow-card">
              <div className="relative aspect-[4/3] border-b border-[var(--borda)] bg-[#F8F9FA]">
                <Image src={unit.image} alt={`Fachada da unidade ${unit.cidade}`} fill sizes="(max-width: 1280px) 100vw, 50vw" className="object-cover object-top" />
              </div>

              <div className="flex h-full flex-col gap-[14px] p-7">
                <div>
                  <span className="text-[0.72rem] font-bold uppercase tracking-[0.12em] text-[var(--muted)]">Unidade</span>
                  <h2 className="mt-1 font-heading text-[2rem] text-[var(--preto)]">{unit.cidade}</h2>
                </div>

                <div className="flex items-start gap-2 text-[0.95rem] text-[var(--cinza-texto)]">
                  <MapPinIcon className="mt-0.5 h-5 w-5 flex-none text-[var(--laranja-hover)]" />
                  <span>{unit.endereco}</span>
                </div>

                <div className="flex items-center gap-2 text-[0.95rem] text-[var(--cinza-texto)]">
                  <PhoneIcon className="h-5 w-5 flex-none text-[var(--laranja-hover)]" />
                  <span>{unit.telefone}</span>
                </div>

                <div className="overflow-hidden rounded-[12px] border border-[var(--borda)]">
                  <iframe
                    title={`Mapa ${unit.cidade}`}
                    src={unit.mapa}
                    width="100%"
                    height="220"
                    className="block border-0"
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  />
                </div>

                <div className="flex flex-wrap gap-3">
                  <a href={unit.whatsapp} target="_blank" rel="noopener" className="cta-button cta-button-primary flex-1">
                    <WhatsAppIcon className="h-[18px] w-[18px]" />
                    Falar com a unidade
                  </a>
                </div>

                <p className="mt-auto pt-2 text-center text-[0.95rem] font-bold text-[var(--laranja-hover)]">
                  <Link href={`/${unit.slug}`} className="inline-flex items-center gap-1">
                    Ver página da unidade <ArrowRightIcon className="h-4 w-4" />
                  </Link>
                </p>
              </div>
            </article>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
