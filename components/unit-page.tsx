import type { Metadata } from "next";
import Script from "next/script";

import {
  AboutSection,
  HeroSection,
  ProcessSection,
  ServicesSection,
  StatsBand,
  TestimonialsSection,
  WhatsAppCtaSection,
} from "@/components/landing-sections";
import { getUnidadeBySlug, UNIDADES, type Unidade } from "@/lib/config";
import { getReviewsPayload } from "@/lib/google-reviews";
import { siteConfig } from "@/lib/site-config";

function getUnit(unitKey: "poa" | "capao") {
  return UNIDADES.find((item) => item.key === unitKey) as Unidade;
}

export function getUnitMetadata(
  unitKey: "poa" | "capao",
  canonicalPath?: string
): Metadata {
  const unit = getUnit(unitKey);
  const path = canonicalPath ?? `/${unit.slug}`;
  const url = `${siteConfig.siteUrl}${path}`;

  return {
    title: {
      absolute: `${unit.cidade} | SOS Multas`,
    },
    description: `Atendimento da SOS Multas em ${unit.cidade} para multas, Lei Seca, suspensão e cassação da CNH.`,
    alternates: {
      canonical: path,
    },
    openGraph: {
      title: `${unit.cidade} | SOS Multas`,
      description: `Conheça a unidade da SOS Multas em ${unit.cidade}.`,
      url,
      siteName: siteConfig.name,
      locale: "pt_BR",
      type: "website",
    },
  };
}

export async function UnitPage({
  unitKey,
  canonicalPath,
}: {
  unitKey: "poa" | "capao";
  canonicalPath?: string;
}) {
  const unit = getUnit(unitKey);
  const path = canonicalPath ?? `/${unit.slug}`;
  const reviewsPayload = await getReviewsPayload(unitKey);
  const ratingValue = reviewsPayload.rating.toFixed(1);
  const reviewCount = String(reviewsPayload.userRatingsTotal);

  return (
    <>
      <Script id={`${unit.slug}-schema`} type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "LegalService",
          name: `SOS Multas - ${unit.cidade}`,
          url: `${siteConfig.siteUrl}${path}`,
          description: `Atendimento da SOS Multas em ${unit.cidade}.`,
          telephone: unit.telefone,
          address: unit.endereco,
          priceRange: "$$",
          aggregateRating: {
            "@type": "AggregateRating",
            ratingValue,
            reviewCount,
            bestRating: "5",
            worstRating: "1",
          },
        })}
      </Script>

      <HeroSection unidade={unit} testimonialItems={reviewsPayload.reviews} />
      <AboutSection googleRating={ratingValue.replace(".", ",")} />
      <ServicesSection />
      <StatsBand unidade={unit} rating={ratingValue.replace(".", ",")} reviewCount={reviewCount} />
      <WhatsAppCtaSection unidade={unit} />
      <ProcessSection />
      <TestimonialsSection items={reviewsPayload.reviews} />
    </>
  );
}

export function getUnitBySlugForPage(slug: string) {
  return getUnidadeBySlug(slug);
}
