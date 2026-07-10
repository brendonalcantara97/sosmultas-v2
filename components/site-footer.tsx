import Image from "next/image";
import Link from "next/link";

import { PHONE_POA, WHATSAPP_PRINCIPAL } from "@/lib/config";

export function SiteFooter() {
  return (
    <footer className="border-t border-[#e3e2e7] bg-[#F8F9FA]">
      <div className="container-shell py-14">
        <div
          className="grid gap-8 border-b border-[#e3e2e7] pb-8"
          style={{ gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))" }}
        >
          <div>
            <Link href="/" className="inline-block">
              <Image src="/assets/logo-footer.webp" alt="SOS Multas" width={220} height={72} className="h-[72px] w-auto" />
            </Link>
            <p className="mt-[14px] max-w-[32ch] text-[0.9rem] leading-[1.5] text-[#43474f]">
              Assessoria especializada em trânsito. A defesa do direito de dirigir do cidadão.
            </p>
          </div>

          <div>
            <h5 className="mb-[14px] font-heading text-[1rem] uppercase tracking-[0.08em] text-[#904d00]">
              Serviços
            </h5>
            <nav className="flex flex-col gap-[9px]">
              <Link href="/#servicos" className="text-[0.9rem] font-medium text-[#43474f] hover:text-[var(--laranja)]">
                Suspensão &amp; Cassação
              </Link>
              <Link href="/#servicos" className="text-[0.9rem] font-medium text-[#43474f] hover:text-[var(--laranja)]">
                Lei Seca
              </Link>
              <Link href="/#servicos" className="text-[0.9rem] font-medium text-[#43474f] hover:text-[var(--laranja)]">
                Multas &amp; CNH Provisória
              </Link>
            </nav>
          </div>

          <div>
            <h5 className="mb-[14px] font-heading text-[1rem] uppercase tracking-[0.08em] text-[#904d00]">
              Empresa
            </h5>
            <nav className="flex flex-col gap-[9px]">
              <Link href="/#como-funciona" className="text-[0.9rem] font-medium text-[#43474f] hover:text-[var(--laranja)]">
                Como funciona
              </Link>
              <Link href="/unidades" className="text-[0.9rem] font-medium text-[#43474f] hover:text-[var(--laranja)]">
                Unidades
              </Link>
              <Link href="/privacidade" className="text-[0.9rem] font-medium text-[#43474f] hover:text-[var(--laranja)]">
                Privacidade
              </Link>
            </nav>
          </div>

          <div>
            <h5 className="mb-[14px] font-heading text-[1rem] uppercase tracking-[0.08em] text-[#904d00]">
              Fale conosco
            </h5>
            <nav className="flex flex-col gap-[9px]">
              <a
                href={WHATSAPP_PRINCIPAL}
                target="_blank"
                rel="noopener"
                className="text-[0.9rem] font-medium text-[#43474f] hover:text-[var(--laranja)]"
              >
                WhatsApp: {PHONE_POA}
              </a>
              <Link href="/porto-alegre" className="text-[0.9rem] font-medium text-[#43474f] hover:text-[var(--laranja)]">
                Porto Alegre, RS
              </Link>
              <Link href="/capao-da-canoa" className="text-[0.9rem] font-medium text-[#43474f] hover:text-[var(--laranja)]">
                Capão da Canoa, RS
              </Link>
            </nav>
          </div>
        </div>

        <p className="pt-[22px] text-center text-[0.82rem] text-[#6C757D]">
          © 2026 SOS Multas — Assessoria de Trânsito. Todos os direitos reservados.
        </p>
      </div>
    </footer>
  );
}
