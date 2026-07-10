type WhatsAppButtonProps = {
  href: string;
  children: React.ReactNode;
  variant?: "accent" | "dark";
};

export function WhatsAppButton({
  href,
  children,
  variant = "accent",
}: WhatsAppButtonProps) {
  const className =
    variant === "dark"
      ? "inline-flex min-h-14 items-center justify-center rounded-md bg-[#0d0f12] px-6 font-heading text-[1.02rem] uppercase tracking-[0.04em] text-white transition duration-200 ease-smooth hover:-translate-y-0.5 hover:bg-black"
      : "inline-flex min-h-14 items-center justify-center rounded-md bg-accent px-6 font-heading text-[1.02rem] uppercase tracking-[0.04em] text-accent-text shadow-cta transition duration-200 ease-smooth hover:-translate-y-0.5 hover:bg-orange-vivid hover:text-white";

  return (
    <a href={href} className={className}>
      {children}
    </a>
  );
}
