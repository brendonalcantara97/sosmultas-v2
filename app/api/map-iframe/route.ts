import { NextResponse } from "next/server";

import { serverEnv } from "@/lib/env";

const placeIds = {
  poa: serverEnv.GOOGLE_PLACE_ID_POA || serverEnv.GOOGLE_PLACE_ID,
  capao: serverEnv.GOOGLE_PLACE_ID_CAPAO,
} as const;

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const unit = (searchParams.get("unit") || "").toLowerCase() as keyof typeof placeIds;
  const placeId = placeIds[unit];

  if (!serverEnv.GOOGLE_API_KEY) {
    return new NextResponse(
      "Configure GOOGLE_API_KEY no ambiente para exibir o mapa.",
      { status: 500 }
    );
  }

  if (!placeId) {
    return new NextResponse(`PLACE_ID da unidade '${unit}' nao configurado`, {
      status: 400,
    });
  }

  const embed = new URL("https://www.google.com/maps/embed/v1/place");
  embed.searchParams.set("key", serverEnv.GOOGLE_API_KEY);
  embed.searchParams.set("q", `place_id:${placeId}`);
  embed.searchParams.set("language", "pt-BR");

  return NextResponse.redirect(embed);
}
