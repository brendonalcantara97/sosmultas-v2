import { NextResponse } from "next/server";

import { getReviewsPayload } from "@/lib/google-reviews";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const unit = (searchParams.get("unit") || "combined").toLowerCase();

  if (!["combined", "poa", "capao"].includes(unit)) {
    return NextResponse.json(
      {
        ok: false,
        error: "Unidade invalida. Use 'combined', 'poa' ou 'capao'.",
      },
      { status: 400 }
    );
  }

  const payload = await getReviewsPayload(unit as "combined" | "poa" | "capao");

  return NextResponse.json(payload);
}
