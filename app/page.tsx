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

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const reviewsPayload = await getReviewsPayload("combined");
  const ratingValue = reviewsPayload.rating.toFixed(1);
  const reviewCount = String(reviewsPayload.userRatingsTotal);

  return (
    <>
      <Script id="homepage-schema" type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "LegalService",
          name: "SOS Multas",
          url: siteConfig.siteUrl,
          description: siteConfig.description,
          telephone: UNIDADES[0].telefone,
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
