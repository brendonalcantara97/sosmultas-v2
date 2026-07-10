import { WhatsAppIcon } from "@/components/home-icons";
import { siteConfig } from "@/lib/site-config";

export function WhatsAppFab() {
  return (
    <a
      href={siteConfig.whatsapp.main}
      target="_blank"
      rel="noopener"
      aria-label="Falar no WhatsApp"
      className="fixed bottom-[22px] right-[22px] z-[90] grid h-[58px] w-[58px] place-items-center rounded-full bg-[#25D366] text-white shadow-[0_10px_24px_rgba(0,0,0,.25)] transition hover:scale-[1.06]"
    >
      <WhatsAppIcon className="h-7 w-7" />
    </a>
  );
}
