export function getWhatsAppHref(phone: string, customMessage?: string) {
  const digits = phone.replace(/\D/g, "");
  const baseMessage =
    customMessage ||
    "Olá SOS Multas, gostaria de falar com especialista em Multas e Suspensão de CNH.";

  if (!digits) {
    return "#";
  }

  const params = new URLSearchParams({
    phone: digits,
    text: baseMessage,
    type: "phone_number",
    app_absent: "0",
  });

  return `https://api.whatsapp.com/send/?${params.toString()}`;
}
