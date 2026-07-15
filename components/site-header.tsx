"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

import { InstagramIcon, MenuIcon, WhatsAppIcon } from "@/components/home-icons";
import { siteConfig } from "@/lib/site-config";

function Wordmark({ inverted = false }: { inverted?: boolean }) {
  return (
    <span className="flex items-center">
      <Image
        src="/assets/logo-grande.webp"
        alt="SOS Multas"
        width={720}
        height={552}
        className={`block h-[60px] w-auto shrink-0 min-[1100px]:h-[76px] ${inverted ? "brightness-0 invert" : ""}`}
        priority
      />
    </span>
  );
}

export function SiteHeader() {
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();
  const hasLocalServicesSection =
    pathname === "/" ||
    pathname === "/porto-alegre" ||
    pathname === "/capao-da-canoa" ||
    pathname.startsWith("/unidades/");
  const navItems = [
    { href: "/unidades", label: "Unidades" },
    { href: hasLocalServicesSection ? "#servicos" : "/#servicos", label: "Serviços" },
    { href: "/#como-funciona", label: "Como Funciona" },
    { href: "/privacidade", label: "Privacidade" },
  ] as const;

  return (
    <header className="sticky top-0 z-[100] border-b border-[var(--borda)] border-t-[3px] border-t-[var(--navy)] bg-white/90 backdrop-blur-md">
      <div className="container-shell flex h-[76px] items-center justify-between gap-5 min-[1100px]:h-[84px]">
        <Link href="/" aria-label="SOS Multas" className="flex flex-none items-center">
          <Wordmark />
        </Link>

        <button
          type="button"
          className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-[var(--borda)] text-[var(--preto)] min-[1100px]:hidden"
          onClick={() => setMenuOpen((value) => !value)}
          aria-expanded={menuOpen}
          aria-controls="mobile-navigation"
          aria-label={menuOpen ? "Fechar menu" : "Abrir menu"}
        >
          <MenuIcon className="h-6 w-6" />
        </button>

        <div className="hidden items-center gap-5 min-[1100px]:flex">
          <nav className="flex items-center gap-4">
            {navItems.map((item, index) => (
              <div key={item.label} className="flex items-center gap-4">
                {index > 0 ? <span className="h-4 w-px bg-[var(--borda)]" /> : null}
                <Link className="text-[1rem] font-semibold text-[var(--cinza-texto)] transition hover:text-[var(--preto)]" href={item.href}>
                  {item.label}
                </Link>
              </div>
            ))}
          </nav>

          <a
            href={siteConfig.whatsapp.main}
            target="_blank"
            rel="noopener"
            className="inline-flex min-h-12 items-center gap-2 rounded-[8px] bg-[var(--laranja)] px-5 text-[0.95rem] font-bold text-[var(--laranja-texto)] shadow-cta transition duration-200 ease-smooth hover:-translate-y-0.5 hover:bg-[var(--laranja-hover)] hover:text-white"
          >
            <WhatsAppIcon className="h-[18px] w-[18px]" />
            Falar com Especialista
          </a>

          <span className="h-5 w-px bg-[var(--borda)]" />

          <div className="flex items-center gap-3">
            <a
              href={siteConfig.instagram}
              target="_blank"
              rel="noopener"
              aria-label="Instagram"
              className="grid h-[42px] w-[42px] place-items-center rounded-full border border-[var(--borda)] text-[var(--cinza-texto)] transition hover:border-[var(--laranja-hover)] hover:text-[var(--laranja-hover)]"
            >
              <InstagramIcon className="h-5 w-5" />
            </a>
            <a
              href={siteConfig.whatsapp.main}
              target="_blank"
              rel="noopener"
              aria-label="WhatsApp"
              className="grid h-[42px] w-[42px] place-items-center rounded-full border border-[var(--borda)] text-[var(--cinza-texto)] transition hover:border-[#25D366] hover:text-[#25D366]"
            >
              <WhatsAppIcon className="h-5 w-5" />
            </a>
          </div>
        </div>
      </div>

      {menuOpen ? (
        <div id="mobile-navigation" className="border-t border-[var(--borda)] bg-white px-6 py-5 min-[1100px]:hidden">
          <nav className="flex flex-col gap-4">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-base font-semibold text-[var(--preto)]"
                onClick={() => setMenuOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            <a
              href={siteConfig.whatsapp.main}
              target="_blank"
              rel="noopener"
              className="mt-2 inline-flex min-h-12 items-center justify-center gap-2 rounded-[8px] bg-[var(--laranja)] px-5 text-[0.95rem] font-bold text-[var(--laranja-texto)]"
            >
              <WhatsAppIcon className="h-[18px] w-[18px]" />
              Falar com Especialista
            </a>
          </nav>
        </div>
      ) : null}
    </header>
  );
}

export { Wordmark };
