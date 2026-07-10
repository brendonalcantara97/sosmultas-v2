type SectionProps = {
  id?: string;
  eyebrow?: string;
  title: string;
  description?: string;
  children: React.ReactNode;
};

export function Section({
  id,
  eyebrow,
  title,
  description,
  children,
}: SectionProps) {
  return (
    <section id={id} className="py-section">
      <div className="container-shell">
        <div className="mb-10 max-w-3xl">
          {eyebrow ? (
            <p className="kicker mb-4">
              {eyebrow}
            </p>
          ) : null}
          <h2 className="headline-balance font-heading text-[2.35rem] uppercase leading-[0.94] text-ink md:text-[3.2rem]">
            {title}
          </h2>
          {description ? (
            <p className="copy-balance mt-4 max-w-[62ch] text-[1.04rem] leading-8 text-ink-2">
              {description}
            </p>
          ) : null}
        </div>
        {children}
      </div>
    </section>
  );
}
