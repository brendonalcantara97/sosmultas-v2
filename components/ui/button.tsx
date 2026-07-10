import Link from "next/link";

type ButtonProps = {
  href: string;
  children: React.ReactNode;
  variant?: "accent" | "navy" | "ghost";
};

export function Button({ href, children, variant = "accent" }: ButtonProps) {
  const variants = {
    accent:
      "bg-accent text-accent-text shadow-cta hover:-translate-y-0.5 hover:bg-orange-vivid hover:text-white",
    navy:
      "bg-navy text-white shadow-md hover:-translate-y-0.5 hover:bg-navy-600",
    ghost:
      "border border-outline-v bg-white/70 text-ink shadow-sm hover:border-ink hover:bg-surface-alt",
  };

  return (
    <Link
      href={href}
      className={`inline-flex min-h-14 items-center justify-center gap-3 rounded-md px-6 font-heading text-[1.02rem] uppercase tracking-[0.04em] transition duration-200 ease-smooth ${variants[variant]}`}
    >
      {children}
    </Link>
  );
}
