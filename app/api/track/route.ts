import { NextResponse } from "next/server";

import { serverEnv } from "@/lib/env";

export async function POST(request: Request) {
  let payload: Record<string, unknown>;

  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: "JSON invalido" }, { status: 400 });
  }

  const forwardedPayload = {
    timestamp: new Date().toISOString(),
    event_name: typeof payload.event_name === "string" ? payload.event_name : "",
    lead_id: typeof payload.lead_id === "string" ? payload.lead_id : "",
    gclid: typeof payload.gclid === "string" ? payload.gclid : "",
    utm_source: typeof payload.utm_source === "string" ? payload.utm_source : "",
    utm_medium: typeof payload.utm_medium === "string" ? payload.utm_medium : "",
    utm_campaign: typeof payload.utm_campaign === "string" ? payload.utm_campaign : "",
    utm_content: typeof payload.utm_content === "string" ? payload.utm_content : "",
    utm_term: typeof payload.utm_term === "string" ? payload.utm_term : "",
    landing_page: typeof payload.landing_page === "string" ? payload.landing_page : "",
    referrer: typeof payload.referrer === "string" ? payload.referrer : "",
    cta_location: typeof payload.cta_location === "string" ? payload.cta_location : "",
    cta_label: typeof payload.cta_label === "string" ? payload.cta_label : "",
    cta_url: typeof payload.cta_url === "string" ? payload.cta_url : "",
    page_title: typeof payload.page_title === "string" ? payload.page_title : "",
    page_type: typeof payload.page_type === "string" ? payload.page_type : "",
    page_section: typeof payload.page_section === "string" ? payload.page_section : "",
    user_agent: request.headers.get("user-agent") || "",
    client_ip:
      request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "",
  };

  if (!forwardedPayload.event_name || !forwardedPayload.cta_label) {
    return NextResponse.json(
      { ok: false, error: "Campos obrigatorios ausentes no tracking" },
      { status: 400 }
    );
  }

  if (!serverEnv.APPS_SCRIPT_URL) {
    return NextResponse.json(
      {
        ok: true,
        forwarded: false,
        reason: "APPS_SCRIPT_URL nao configurada",
      },
      { status: 202 }
    );
  }

  try {
    const upstream = await fetch(serverEnv.APPS_SCRIPT_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json; charset=utf-8",
      },
      body: JSON.stringify(forwardedPayload),
    });

    const responseText = await upstream.text();

    return NextResponse.json(
      {
        ok: upstream.ok,
        forwarded: upstream.ok,
        upstreamStatus: upstream.status,
        upstreamBody: responseText.slice(0, 500),
      },
      { status: upstream.ok ? 200 : 502 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        ok: false,
        forwarded: false,
        error:
          error instanceof Error
            ? `Falha ao encaminhar tracking: ${error.message}`
            : "Falha ao encaminhar tracking",
      },
      { status: 502 }
    );
  }
}
