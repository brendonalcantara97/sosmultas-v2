import { CONTACT, UNIDADES, WHATSAPP_CAPAO, WHATSAPP_PRINCIPAL } from "@/lib/config";

export const siteConfig = {
  name: "SOS Multas",
  description:
    "Assessoria especializada em trânsito para defesa de CNH, multas, Lei Seca e processos administrativos.",
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL || "https://sosmultas.net.br",
  email: CONTACT.email,
  instagram: CONTACT.instagram,
  whatsapp: {
    main: process.env.WHATSAPP_MAIN || WHATSAPP_PRINCIPAL,
    poa: process.env.WHATSAPP_POA || WHATSAPP_PRINCIPAL,
    capao: process.env.WHATSAPP_CAPAO || WHATSAPP_CAPAO,
  },
  units: UNIDADES,
} as const;
