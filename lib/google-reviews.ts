import { cache } from "react";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";

import { TESTIMONIALS, type TestimonialItem } from "@/lib/content";
import { UNIDADES } from "@/lib/config";
import { serverEnv } from "@/lib/env";

const CACHE_TTL_MS = 90 * 24 * 60 * 60 * 1000;
const CACHE_SCHEMA_VERSION = 2;
const PRIMARY_CACHE_PATH = process.env.VERCEL
  ? path.join("/tmp", "sos-google-reviews-cache.json")
  : path.join(process.cwd(), ".next", "cache", "google-reviews.json");

type UnitKey = "poa" | "capao";
type ReviewsScope = UnitKey | "combined";

type GoogleReview = {
  author: string;
  rating: number;
  text: string;
  relativeTime: string;
  profilePhotoUrl: string;
};

type PlaceDetails = {
  name: string;
  rating: number;
  userRatingsTotal: number;
  url: string;
  reviews: GoogleReview[];
};

type ReviewsPayload = {
  ok: true;
  unit: ReviewsScope;
  rating: number;
  userRatingsTotal: number;
  placeName: string;
  googleUrl: string;
  reviews: TestimonialItem[];
  sources?: Array<{
    unit: UnitKey;
    placeName: string;
    rating: number;
    userRatingsTotal: number;
  }>;
};

type CachedReviewsRecord = {
  fetchedAt: string;
  cacheKey: string;
  payload: ReviewsPayload;
};

type ReviewsCacheFile = Partial<Record<ReviewsScope, CachedReviewsRecord>>;

const PLACE_IDS: Record<UnitKey, string> = {
  poa: serverEnv.GOOGLE_PLACE_ID_POA || serverEnv.GOOGLE_PLACE_ID,
  capao: serverEnv.GOOGLE_PLACE_ID_CAPAO,
};

const REVIEW_OVERRIDES: Record<UnitKey, { rating: number; count: number }> = {
  poa: {
    rating: Number(serverEnv.GOOGLE_RATING_POA || 0),
    count: Number(serverEnv.GOOGLE_REVIEW_COUNT_POA || 0),
  },
  capao: {
    rating: Number(serverEnv.GOOGLE_RATING_CAPAO || 0),
    count: Number(serverEnv.GOOGLE_REVIEW_COUNT_CAPAO || 0),
  },
};

function buildCacheKey() {
  return JSON.stringify({
    version: CACHE_SCHEMA_VERSION,
    apiKeyConfigured: Boolean(serverEnv.GOOGLE_API_KEY),
    placeIds: PLACE_IDS,
    overrides: REVIEW_OVERRIDES,
  });
}

const CURRENT_CACHE_KEY = buildCacheKey();

function getFallbackPayload(scope: ReviewsScope): ReviewsPayload {
  const unit = scope === "combined" ? null : UNIDADES.find((item) => item.key === scope);
  const fallbackReviews =
    scope === "poa"
      ? TESTIMONIALS.slice(0, 3)
      : scope === "capao"
        ? TESTIMONIALS.slice(1)
        : TESTIMONIALS;

  if (scope === "combined") {
    const ratingPoa = REVIEW_OVERRIDES.poa.rating || Number(UNIDADES[0].reviewsRating.replace(",", "."));
    const countPoa = REVIEW_OVERRIDES.poa.count || Number(UNIDADES[0].reviewCount);
    const ratingCapao = REVIEW_OVERRIDES.capao.rating || Number(UNIDADES[1].reviewsRating.replace(",", "."));
    const countCapao = REVIEW_OVERRIDES.capao.count || Number(UNIDADES[1].reviewCount);
    const total = countPoa + countCapao;
    const rating = total > 0 ? Number(((ratingPoa * countPoa + ratingCapao * countCapao) / total).toFixed(1)) : 4.9;

    return {
      ok: true,
      unit: "combined",
      rating,
      userRatingsTotal: total || 150,
      placeName: "SOS Multas",
      googleUrl: "",
      reviews: [...fallbackReviews],
      sources: [
        {
          unit: "poa",
          placeName: UNIDADES[0].cidade,
          rating: ratingPoa,
          userRatingsTotal: countPoa,
        },
        {
          unit: "capao",
          placeName: UNIDADES[1].cidade,
          rating: ratingCapao,
          userRatingsTotal: countCapao,
        },
      ],
    };
  }

  return {
    ok: true,
    unit: scope,
    rating: REVIEW_OVERRIDES[scope].rating || Number(unit?.reviewsRating.replace(",", ".") || 4.9),
    userRatingsTotal: REVIEW_OVERRIDES[scope].count || Number(unit?.reviewCount || 0),
    placeName: unit?.cidade || "SOS Multas",
    googleUrl: "",
    reviews: [...fallbackReviews],
  };
}

function toInitial(name: string) {
  const cleaned = name.trim();
  return cleaned ? cleaned[0]!.toUpperCase() : "C";
}

function toTestimonial(review: GoogleReview): TestimonialItem | null {
  const text = review.text.trim();
  if (!text) return null;

  return {
    name: review.author || "Cliente Google",
    time: review.relativeTime || "Google",
    initial: toInitial(review.author || "Cliente Google"),
    text,
    profilePhotoUrl: review.profilePhotoUrl || undefined,
  };
}

async function fetchPlaceDetails(placeId: string): Promise<PlaceDetails | null> {
  if (!serverEnv.GOOGLE_API_KEY || !placeId) return null;

  const endpoint = new URL("https://maps.googleapis.com/maps/api/place/details/json");
  endpoint.searchParams.set("place_id", placeId);
  endpoint.searchParams.set("fields", "name,rating,user_ratings_total,reviews,url");
  endpoint.searchParams.set("language", "pt-BR");
  endpoint.searchParams.set("reviews_sort", "newest");
  endpoint.searchParams.set("key", serverEnv.GOOGLE_API_KEY);

  const res = await fetch(endpoint.toString(), { next: { revalidate: 86400 } });
  if (!res.ok) {
    throw new Error(`Google API HTTP ${res.status}`);
  }

  const data = await res.json();
  if (data.status !== "OK") {
    throw new Error(`Google API status ${data.status}`);
  }

  const result = data.result || {};
  const reviews = Array.isArray(result.reviews)
    ? result.reviews.map((review: Record<string, unknown>) => ({
        author: typeof review.author_name === "string" ? review.author_name : "Cliente Google",
        rating: Number(review.rating || 0),
        text: typeof review.text === "string" ? review.text : "",
        relativeTime:
          typeof review.relative_time_description === "string"
            ? review.relative_time_description
            : "Google",
        profilePhotoUrl:
          typeof review.profile_photo_url === "string" ? review.profile_photo_url : "",
      }))
    : [];

  return {
    name: typeof result.name === "string" ? result.name : "",
    rating: Number(result.rating || 0),
    userRatingsTotal: Number(result.user_ratings_total || 0),
    url: typeof result.url === "string" ? result.url : "",
    reviews,
  };
}

async function readCacheFile(): Promise<ReviewsCacheFile> {
  try {
    const content = await readFile(PRIMARY_CACHE_PATH, "utf8");
    return JSON.parse(content) as ReviewsCacheFile;
  } catch {
    return {};
  }
}

async function writeCacheFile(cacheData: ReviewsCacheFile) {
  try {
    await mkdir(path.dirname(PRIMARY_CACHE_PATH), { recursive: true });
    await writeFile(PRIMARY_CACHE_PATH, JSON.stringify(cacheData, null, 2), "utf8");
  } catch {
    // best effort cache
  }
}

function isFresh(record?: CachedReviewsRecord) {
  if (!record?.fetchedAt) return false;
  if (record.cacheKey !== CURRENT_CACHE_KEY) return false;
  const fetchedAt = new Date(record.fetchedAt).getTime();
  if (Number.isNaN(fetchedAt)) return false;
  return Date.now() - fetchedAt < CACHE_TTL_MS;
}

async function buildUnitPayload(unitKey: UnitKey): Promise<ReviewsPayload> {
  const unit = UNIDADES.find((item) => item.key === unitKey)!;
  const place = await fetchPlaceDetails(PLACE_IDS[unitKey]);
  if (!place) {
    return getFallbackPayload(unitKey);
  }

  const override = REVIEW_OVERRIDES[unitKey];
  const reviews = place.reviews
    .map(toTestimonial)
    .filter((item): item is TestimonialItem => item !== null)
    .slice(0, 8);

  return {
    ok: true,
    unit: unitKey,
    rating: override.rating > 0 ? override.rating : place.rating,
    userRatingsTotal: override.count > 0 ? override.count : place.userRatingsTotal,
    placeName: place.name || unit.cidade,
    googleUrl: place.url,
    reviews: reviews.length > 0 ? reviews : [...getFallbackPayload(unitKey).reviews],
  };
}

function mergeReviews(...sources: ReviewsPayload[]) {
  return sources
    .flatMap((source) => source.reviews)
    .filter((review, index, arr) => arr.findIndex((item) => item.name === review.name && item.text === review.text) === index)
    .slice(0, 8);
}

async function buildCombinedPayload(unitPayloads: ReviewsPayload[]): Promise<ReviewsPayload> {
  const sources = unitPayloads.filter((item) => item.unit !== "combined") as Array<ReviewsPayload & { unit: UnitKey }>;
  if (sources.length === 0) {
    return getFallbackPayload("combined");
  }

  const weightedSum = sources.reduce((sum, source) => sum + source.rating * source.userRatingsTotal, 0);
  const totalCount = sources.reduce((sum, source) => sum + source.userRatingsTotal, 0);
  const rating = totalCount > 0 ? Number((weightedSum / totalCount).toFixed(1)) : 4.9;

  return {
    ok: true,
    unit: "combined",
    rating,
    userRatingsTotal: totalCount,
    placeName: "SOS Multas",
    googleUrl: "",
    reviews: mergeReviews(...sources),
    sources: sources.map((source) => ({
      unit: source.unit,
      placeName: source.placeName,
      rating: source.rating,
      userRatingsTotal: source.userRatingsTotal,
    })),
  };
}

async function refreshReviewsCache(): Promise<ReviewsCacheFile> {
  const now = new Date().toISOString();
  const nextCache: ReviewsCacheFile = {};

  const unitPayloads = await Promise.all(
    (Object.keys(PLACE_IDS) as UnitKey[]).map(async (unitKey) => {
      const payload = await buildUnitPayload(unitKey);
      nextCache[unitKey] = { fetchedAt: now, cacheKey: CURRENT_CACHE_KEY, payload };
      return payload;
    })
  );

  nextCache.combined = {
    fetchedAt: now,
    cacheKey: CURRENT_CACHE_KEY,
    payload: await buildCombinedPayload(unitPayloads),
  };

  await writeCacheFile(nextCache);
  return nextCache;
}

async function resolveReviews(scope: ReviewsScope): Promise<ReviewsPayload> {
  const cacheFile = await readCacheFile();
  const record = cacheFile[scope];

  if (isFresh(record)) {
    return record!.payload;
  }

  try {
    const refreshed = await refreshReviewsCache();
    return refreshed[scope]?.payload || getFallbackPayload(scope);
  } catch {
    if (record?.payload) {
      return record.payload;
    }

    return getFallbackPayload(scope);
  }
}

export const getReviewsPayload = cache(resolveReviews);
