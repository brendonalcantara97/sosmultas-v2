const DEFAULT_WHATSAPP_PRINCIPAL = "https://wa.me/555133077772";
const DEFAULT_WHATSAPP_CAPAO = "https://wa.me/555136655226";
const DEFAULT_PHONE_POA = "(51) 3307-7772";
const DEFAULT_PHONE_CAPAO = "(51) 3665-5226";

function readValue(value: string | undefined, fallback: string) {
  return value || fallback;
}

// Aceita número puro, com +/espaços/pontuação, "wa.me/..." ou URL completa
// e sempre devolve um link de WhatsApp válido.
function toWhatsAppUrl(value: string | undefined, fallback: string) {
  const raw = (value || "").trim();
  if (!raw) return fallback;
  if (/^https?:\/\//i.test(raw)) return raw;
  if (/^wa\.me\//i.test(raw)) return `https://${raw}`;
  const digits = raw.replace(/\D/g, "");
  return digits ? `https://wa.me/${digits}` : fallback;
}

export const WHATSAPP_PRINCIPAL = toWhatsAppUrl(
  process.env.WHATSAPP_MAIN || process.env.WHATSAPP_POA,
  DEFAULT_WHATSAPP_PRINCIPAL
);
export const WHATSAPP_CAPAO = toWhatsAppUrl(
  process.env.WHATSAPP_CAPAO,
  DEFAULT_WHATSAPP_CAPAO
);
export const PHONE_POA = readValue(process.env.PHONE_POA, DEFAULT_PHONE_POA);
export const PHONE_CAPAO = readValue(process.env.PHONE_CAPAO, DEFAULT_PHONE_CAPAO);

export const CONTACT = {
  email: "contato@sosmultas.net.br",
  instagram: "https://www.instagram.com/sosmultas_oficial/",
} as const;

export const UNIDADES = [
  {
    slug: "porto-alegre",
    key: "poa",
    cidade: "Porto Alegre / RS",
    heroCidade: "PORTO ALEGRE",
    endereco: "Av. Assis Brasil, 3688, Jardim Lindóia, Porto Alegre - RS.",
    telefone: PHONE_POA,
    whatsapp: WHATSAPP_PRINCIPAL,
    mapa: "https://www.google.com/maps?q=Av.+Assis+Brasil+3688+Jardim+Lindoia+Porto+Alegre+RS&output=embed",
    reviewsRating: "4,9",
    reviewCount: "120",
    image: "/assets/unidades/fachada-porto-alegre.webp",
  },
  {
    slug: "capao-da-canoa",
    key: "capao",
    cidade: "Capão da Canoa / RS",
    heroCidade: "CAPÃO DA CANOA",
    endereco: "Rua Tupinambá, 749, Loja 03, Centro, Capão da Canoa - RS.",
    telefone: PHONE_CAPAO,
    whatsapp: WHATSAPP_CAPAO,
    mapa: "https://www.google.com/maps?q=Rua+Tupinamba+749+Centro+Capao+da+Canoa+RS&output=embed",
    reviewsRating: "4,9",
    reviewCount: "11",
    image: "/assets/unidades/fachada-capao-da-canoa.webp",
  },
] as const;

export type Unidade = (typeof UNIDADES)[number];

export function getUnidadeBySlug(slug: string) {
  return UNIDADES.find((item) => item.slug === slug);
}
