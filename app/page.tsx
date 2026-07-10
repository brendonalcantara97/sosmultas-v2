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
import { UNIDADES } from "@/lib/config";
import { getReviewsPayload } from "@/lib/google-reviews";
import { siteConfig } from "@/lib/site-config";

export const revalidate = 86400;

export default async function HomePage() {
  const reviewsPayload = await getReviewsPayload("combined");
  const ratingValue = reviewsPayload.rating.toFixed(1);
  const reviewCount = String(reviewsPayload.userRatingsTotal);

  const primaryUnit = UNIDADES[0];
  const [locality, region] = primaryUnit.cidade.split("/").map((part) => part.trim());

  return (
    <>
      <Script id="homepage-schema" type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "LegalService",
          name: "SOS Multas",
          url: siteConfig.siteUrl,
          description: siteConfig.description,
          image: `${siteConfig.siteUrl}/assets/logo-sos-multas.png`,
          telephone: primaryUnit.telefone,
          priceRange: "$$",
          address: {
            "@type": "PostalAddress",
            streetAddress: primaryUnit.endereco,
            addressLocality: locality,
            addressRegion: region,
            addressCountry: "BR",
          },
          aggregateRating: {
            "@type": "AggregateRating",
            ratingValue,
            reviewCount,
            bestRating: "5",
            worstRating: "1",
          },
        })}
      </Script>

      <HeroSection testimonialItems={reviewsPayload.reviews} />
      <AboutSection googleRating={ratingValue.replace(".", ",")} />
      <ServicesSection />
      <StatsBand rating={ratingValue.replace(".", ",")} reviewCount={reviewCount} />
      <WhatsAppCtaSection />
      <ProcessSection />
      <TestimonialsSection items={reviewsPayload.reviews} />
    </>
  );
}
