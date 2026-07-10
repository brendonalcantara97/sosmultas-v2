const serverEnvSchema = {
  APPS_SCRIPT_URL: false,
  GTM_ID: false,
  WHATSAPP_MAIN: false,
  WHATSAPP_POA: false,
  WHATSAPP_CAPAO: false,
  PHONE_POA: false,
  PHONE_CAPAO: false,
  GOOGLE_API_KEY: false,
  GOOGLE_PLACE_ID: false,
  GOOGLE_PLACE_ID_POA: false,
  GOOGLE_PLACE_ID_CAPAO: false,
  GOOGLE_RATING_POA: false,
  GOOGLE_REVIEW_COUNT_POA: false,
  GOOGLE_RATING_CAPAO: false,
  GOOGLE_REVIEW_COUNT_CAPAO: false,
} as const;

type ServerEnvKey = keyof typeof serverEnvSchema;

function readServerEnv() {
  const values = {} as Record<ServerEnvKey, string>;

  for (const key of Object.keys(serverEnvSchema) as ServerEnvKey[]) {
    values[key] = process.env[key] || "";
  }

  return values;
}

export const serverEnv = readServerEnv();

export function assertRequiredEnv(keys: ServerEnvKey[]) {
  const missing = keys.filter((key) => !serverEnv[key]);

  if (missing.length > 0) {
    throw new Error(
      `Variaveis de ambiente obrigatorias ausentes: ${missing.join(", ")}`
    );
  }
}
