import { Section } from "@/components/ui/section";

type RoutePlaceholderProps = {
  eyebrow: string;
  title: string;
  description: string;
};

export function RoutePlaceholder({
  eyebrow,
  title,
  description,
}: RoutePlaceholderProps) {
  return (
    <Section eyebrow={eyebrow} title={title} description={description}>
      <div className="rounded-xl border border-surface-line bg-white p-6 shadow-sm">
        <p className="max-w-[62ch] text-base text-ink-2">
          Esta rota foi criada na base Next.js para preservar a estrutura da
          migracao. O conteudo final sera portado do baseline atual nas
          proximas fases, mantendo copy, SEO e conversao.
        </p>
      </div>
    </Section>
  );
}
