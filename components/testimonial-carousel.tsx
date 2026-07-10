"use client";

import { useRef } from "react";

import { ReviewerAvatar } from "@/components/reviewer-avatar";
import { StarIcon } from "@/components/home-icons";
import { TESTIMONIALS, type TestimonialItem } from "@/lib/content";

type TestimonialCarouselProps = {
  items?: readonly TestimonialItem[];
};

export function TestimonialCarousel({ items = TESTIMONIALS }: TestimonialCarouselProps) {
  const ref = useRef<HTMLDivElement | null>(null);

  function scrollByAmount(direction: 1 | -1) {
    const container = ref.current;
    if (!container) return;
    const card = container.firstElementChild as HTMLElement | null;
    const amount = (card?.offsetWidth || 340) + 20;
    container.scrollBy({ left: amount * direction, behavior: "smooth" });
  }

  return (
    <section className="bg-white py-section">
      <div className="container-shell">
        <div className="mb-8 flex flex-wrap items-end justify-between gap-5">
          <div className="max-w-[640px]">
            <span className="eyebrow">Depoimentos</span>
            <h2 className="mt-3 font-heading text-[clamp(1.7rem,3.6vw,2.4rem)] uppercase leading-[1.02] text-[var(--preto)]">
              O que nossos clientes dizem
            </h2>
          </div>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => scrollByAmount(-1)}
              aria-label="Anterior"
              className="grid h-11 w-11 place-items-center rounded-full border border-[var(--borda)] text-[var(--preto)] transition hover:border-[var(--laranja-hover)] hover:bg-[var(--bg-alt)]"
            >
              ←
            </button>
            <button
              type="button"
              onClick={() => scrollByAmount(1)}
              aria-label="Próximo"
              className="grid h-11 w-11 place-items-center rounded-full border border-[var(--borda)] text-[var(--preto)] transition hover:border-[var(--laranja-hover)] hover:bg-[var(--bg-alt)]"
            >
              →
            </button>
          </div>
        </div>

        <div ref={ref} className="hide-scrollbar flex gap-5 overflow-x-auto pb-2 [scroll-snap-type:x_mandatory]">
          {items.map((item) => (
            <article
              key={`${item.name}-${item.time}`}
              className="flex w-[min(360px,82vw)] flex-none scroll-ml-6 snap-start flex-col rounded-[16px] border border-[var(--borda)] bg-white p-6 shadow-md"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3">
                  <ReviewerAvatar
                    name={item.name}
                    initial={item.initial}
                    profilePhotoUrl={item.profilePhotoUrl}
                    sizeClassName="h-11 w-11"
                    textClassName="text-[1.2rem]"
                    ringClassName="border-[var(--bg-alt)]"
                  />
                  <div>
                    <p className="text-[0.98rem] font-bold text-[var(--preto)]">{item.name}</p>
                    <p className="text-[0.8rem] text-[var(--muted)]">{item.time}</p>
                  </div>
                </div>
                <div className="flex gap-1 text-[var(--laranja)]">
                  {Array.from({ length: 5 }).map((_, index) => (
                    <StarIcon key={index} className="h-4 w-4" />
                  ))}
                </div>
              </div>
              <p className="mt-5 text-[0.95rem] leading-7 text-[var(--cinza-texto)]">
                SOS Multas - Assessoria de Trânsito
              </p>
              <p className="mt-3 text-[0.96rem] leading-7 text-[var(--cinza-texto)]">{item.text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
