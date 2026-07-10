"use client";

import { useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";

declare global {
  interface Window {
    dataLayer?: Array<Record<string, unknown>>;
  }
}

const LEAD_ID_STORAGE_KEY = "sos_lead_id";
const LEAD_ID_PATTERN = /^SM-\d{8}-[A-Z0-9]{6}$/;
const WHATSAPP_LINK_SELECTOR =
  'a[href*="wa.me"], a[href*="api.whatsapp.com/send"]';
const SCROLL_THRESHOLDS = [25, 50, 75, 90, 100];

function getPageType(pathname: string) {
  if (pathname === "/") return "home";
  if (pathname === "/unidades") return "units";
  if (pathname === "/porto-alegre" || pathname === "/unidades/porto-alegre") return "unit_poa";
  if (pathname === "/capao-da-canoa" || pathname === "/unidades/capao-da-canoa") return "unit_capao";
  if (pathname === "/como-funciona") return "how_it_works";
  if (pathname === "/locais") return "locations";
  if (pathname === "/privacidade") return "privacy";
  if (pathname === "/termos-de-uso") return "terms";
  return "content";
}

function getPageSection(pathname: string) {
  if (pathname === "/porto-alegre" || pathname === "/unidades/porto-alegre") return "porto_alegre";
  if (pathname === "/capao-da-canoa" || pathname === "/unidades/capao-da-canoa") return "capao_da_canoa";
  if (pathname === "/unidades") return "units";
  if (pathname === "/") return "home";
  return getPageType(pathname);
}

function getAnchorLabel(anchor: HTMLAnchorElement) {
  const title = anchor.querySelector("h1, h2, h3, h4, h5, h6");
  if (title) {
    return title.textContent?.trim().replace(/\s+/g, " ") || "";
  }

  return anchor.textContent?.trim().replace(/\s+/g, " ") || "";
}

function formatDatePart(date: Date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}${month}${day}`;
}

function generateLeadSuffix() {
  const alphabet = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  const values = new Uint32Array(6);

  if (window.crypto?.getRandomValues) {
    window.crypto.getRandomValues(values);
    return Array.from(values, (value) => alphabet[value % alphabet.length]).join(
      ""
    );
  }

  return Math.random().toString(36).slice(2, 8).toUpperCase();
}

function createLeadId() {
  return `SM-${formatDatePart(new Date())}-${generateLeadSuffix()}`;
}

function getLeadId() {
  try {
    const existing = window.localStorage.getItem(LEAD_ID_STORAGE_KEY);
    if (existing && LEAD_ID_PATTERN.test(existing)) return existing;

    const generated = createLeadId();
    window.localStorage.setItem(LEAD_ID_STORAGE_KEY, generated);
    return generated;
  } catch {
    return createLeadId();
  }
}

function getQueryValue(param: string) {
  return new URLSearchParams(window.location.search).get(param) || "";
}

function getLinkContext(element: Element) {
  const explicit = element
    .closest("[data-track-location]")
    ?.getAttribute("data-track-location");
  if (explicit) return explicit;

  if (element.closest("header")) return "header";
  if (element.closest("footer")) return "footer";

  const section = element.closest("section");
  if (section?.id) return section.id;

  return "content";
}

function pushEvent(eventName: string, params: Record<string, unknown> = {}) {
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({
    event: eventName,
    page_title: document.title,
    page_location: window.location.href,
    page_path:
      window.location.pathname +
      window.location.search +
      window.location.hash,
    page_type: getPageType(window.location.pathname),
    page_section: getPageSection(window.location.pathname),
    ...params,
  });
}

function buildTrackingPayload(link: HTMLAnchorElement, eventName: string) {
  return {
    event_name: eventName,
    lead_id: getLeadId(),
    gclid: getQueryValue("gclid"),
    utm_source: getQueryValue("utm_source"),
    utm_medium: getQueryValue("utm_medium"),
    utm_campaign: getQueryValue("utm_campaign"),
    utm_content: getQueryValue("utm_content"),
    utm_term: getQueryValue("utm_term"),
    landing_page: window.location.href,
    referrer: document.referrer || "",
    cta_location: getLinkContext(link),
    cta_label: getAnchorLabel(link),
    cta_url: link.href,
    page_title: document.title,
    page_type: getPageType(window.location.pathname),
    page_section: getPageSection(window.location.pathname),
  };
}

function buildWhatsappMessage() {
  return [
    "Olá SOS Multas, gostaria de falar com especialista em Multas e Suspensão de CNH.",
    "",
    `Numero de Atendimento : ${getLeadId()}`,
  ].join("\n");
}

function updateWhatsappHref(link: HTMLAnchorElement) {
  const href = link.getAttribute("href") || "";
  const phoneMatch = href.match(/wa\.me\/(\d+)/i) || href.match(/[?&]phone=(\d+)/i);

  if (!phoneMatch?.[1]) return;

  const params = new URLSearchParams({
    phone: phoneMatch[1],
    text: buildWhatsappMessage(),
    type: "phone_number",
    app_absent: "0",
  });

  link.href = `https://api.whatsapp.com/send/?${params.toString()}`;
}

function sendTrackingPayload(payload: Record<string, unknown>) {
  const body = JSON.stringify(payload);

  try {
    if (navigator.sendBeacon) {
      const blob = new Blob([body], { type: "application/json" });
      if (navigator.sendBeacon("/api/track", blob)) return;
    }
  } catch {
    // fallback below
  }

  fetch("/api/track", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body,
    keepalive: true,
  }).catch(() => {});
}

export function TrackingClient() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const search = searchParams.toString();

  useEffect(() => {
    window.dataLayer = window.dataLayer || [];
  }, []);

  useEffect(() => {
    document.querySelectorAll<HTMLAnchorElement>(WHATSAPP_LINK_SELECTOR).forEach((link) => {
      updateWhatsappHref(link);
    });

    pushEvent("site_view", {
      page_referrer: document.referrer || "",
    });

    const trackedDepths = new Set<number>();
    let scrollRafId: number | null = null;
    const doc = document.documentElement;

    const emitScroll = () => {
      scrollRafId = null;
      const total = Math.max(doc.scrollHeight - window.innerHeight, 1);
      const percent = Math.min(100, Math.max(0, Math.round((window.scrollY / total) * 100)));

      SCROLL_THRESHOLDS.forEach((threshold) => {
        if (percent >= threshold && !trackedDepths.has(threshold)) {
          trackedDepths.add(threshold);
          pushEvent("scroll_depth", {
            scroll_depth_percentage: threshold,
            scroll_depth_label: `${threshold}%`,
          });
        }
      });
    };

    const onScroll = () => {
      if (scrollRafId !== null) return;
      scrollRafId = window.requestAnimationFrame(emitScroll);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    emitScroll();

    return () => {
      window.removeEventListener("scroll", onScroll);
      if (scrollRafId !== null) {
        window.cancelAnimationFrame(scrollRafId);
      }
    };
  }, [pathname, search]);

  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      const target = event.target;
      if (!(target instanceof Element)) return;

      const link = target.closest("a");
      if (!(link instanceof HTMLAnchorElement)) return;

      const href = link.getAttribute("href") || "";
      const isWhatsapp =
        href.includes("wa.me") ||
        href.includes("api.whatsapp.com/send");

      if (isWhatsapp) {
        updateWhatsappHref(link);
        const pageType = getPageType(window.location.pathname);
        const eventName =
          pageType === "unit_poa"
            ? "whatsapp_click_poa"
            : pageType === "unit_capao"
              ? "whatsapp_click_capao"
              : "whatsapp_click";

        pushEvent(eventName, {
          cta_text: getAnchorLabel(link),
          cta_location: getLinkContext(link),
          cta_url: link.href,
        });

        sendTrackingPayload(buildTrackingPayload(link, eventName));
        return;
      }

      const isUnitLink =
        href.includes("/porto-alegre") || href.includes("/capao-da-canoa");

      if (isUnitLink) {
        const slug = href.includes("porto-alegre") ? "porto_alegre" : "capao_da_canoa";
        pushEvent("unit_click", {
          unit_slug: slug,
          unit_name: getAnchorLabel(link),
          cta_location: getLinkContext(link),
          destination_url: link.href,
        });
      }
    };

    document.addEventListener("click", onClick);

    return () => {
      document.removeEventListener("click", onClick);
    };
  }, []);

  return null;
}
