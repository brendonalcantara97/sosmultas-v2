# PLANO — TRACKING SERVER-SIDE (SEM GTM) NA VERCEL

Objetivo: manter **Google Ads, Meta Ads e GA4** sem os scripts pesados no navegador,
movendo o envio de eventos para o servidor (`/api/track` na Vercel). Ganho duplo:
**performance** (TBT despenca, mobile ~76 → ~88-93) e **dados mais robustos**
(first-party e mais resilientes a bloqueios, mas não imunes a adblock/ITP).

Contexto do funil: landing de **clique-no-WhatsApp**, **sem formulário, e-mail ou
telefone**. O match vem de identificadores pseudônimos do clique/navegador, que ainda
devem ser tratados como dados pessoais conforme a legislação e a política de privacidade.

---

## 1. Arquitetura

```
Anúncio ──► Landing (?gclid / ?fbclid)
              │  captura IDs em cookie (gclid, gbraid, wbraid, fbclid→fbc, _fbp)
              ▼
        Clique no WhatsApp  ──fetch leve──►  /api/track (Vercel, server)
                                               ├─► Meta Conversions API   (Lead)
                                               ├─► Google Ads API (gclid)  (Lead)
                                               └─► GA4 Measurement Protocol (analytics)
```

**Remove do cliente:** `gtm.js`, `fbevents.js` (Pixel), `gtag.js`.
**Fica no cliente:** captura de IDs + `fetch('/api/track', …)` (já existe hoje).

---

## 2. Identificadores pseudônimos a capturar no cliente

Após o consentimento aplicável, na **chegada** (primeiro load), ler da URL e
persistir em cookie 1st-party (90 dias):

| Campo | Origem | Uso |
|---|---|---|
| `gclid` | `?gclid=` | Google Ads (conversão determinística) |
| `gbraid` | `?gbraid=` | Google Ads (clique iOS app→web) |
| `wbraid` | `?wbraid=` | Google Ads (clique iOS web) |
| `fbclid` | `?fbclid=` | Meta — vira `fbc` (`fb.1.<ts>.<fbclid>`) |
| `_fbp` | cookie (gerar se não existir: `fb.1.<ts>.<rand>`) | Meta — id de navegador |
| `utm_*` | `?utm_…` | Relatórios/segmentação |
| `_ga` (client_id) | cookie GA / gerar UUID | GA4 |

No **clique do WhatsApp**, enviar ao `/api/track`:
`{ event_name:"Lead", event_id:<uuid>, fbp, fbc, gclid, gbraid, wbraid, utm_*, event_source_url }`
(o servidor completa `client_ip` e `user_agent`, que já são capturados hoje).

> `event_id` = UUID por evento, para idempotência/dedup em retries.

---

## 3. Meta — Conversions API (CAPI)

**Setup (uma vez):**
1. Events Manager → criar/usar um **Dataset (Pixel ID)** — mesmo sem pixel no navegador, o CAPI envia pra ele.
2. Gerar **Access Token** de System User com privilégio mínimo, rotação definida e revogação disponível.
3. Guardar em env: `META_GRAPH_VERSION`, `META_DATASET_ID`, `META_CAPI_TOKEN`.

**Envio (server, dentro do `/api/track`):**
```
POST https://graph.facebook.com/{META_GRAPH_VERSION}/{META_DATASET_ID}/events
Authorization: Bearer {META_CAPI_TOKEN}
{
  "data": [{
    "event_name": "Lead",
    "event_time": <unix_seconds>,
    "event_id": "<uuid>",
    "action_source": "website",
    "event_source_url": "<url>",
    "user_data": {
      "client_ip_address": "<ip>",
      "client_user_agent": "<ua>",
      "fbp": "<_fbp>",
      "fbc": "<fbc>"
      // sem em/ph — não coletamos PII
    },
    "custom_data": { "content_name": "whatsapp_click", "utm_source": "…" }
  }]
}
```
- `event_time`: até 7 dias no passado.
- Teste: usar `test_event_code` + aba **Test Events** no Events Manager.
- Expectativa de EMQ: ~"Bom" (5-7/10) — suficiente pra otimizar em **Lead**.

---

## 4. Google Ads — API, upload por `gclid` (Caminho recomendado)

**Por que não GA4-import:** em setup 100% server-side (sem tag GA4 no navegador), o GA4
não monta a sessão atribuída ao anúncio, então o import fica fraco. O upload por `gclid`
é **determinístico** e independe do GA4.

**Setup (uma vez):**
1. Google Ads → **Auto-tagging LIGADO** (para o `gclid` aparecer nas URLs).
2. Criar **Conversion Action**: *Metas → Conversões → +Nova → Importar → Outras fontes / cliques*.
   Anotar o **resource name** (`customers/{id}/conversionActions/{id}`).
3. Acesso à **Google Ads API**: `developer_token` (API Center — pede aprovação "Basic"),
   OAuth2 (`client_id`, `client_secret`, `refresh_token` da sua conta), `login_customer_id`.
4. Env: `GADS_API_VERSION`, `GADS_DEVELOPER_TOKEN`, `GADS_CLIENT_ID`, `GADS_CLIENT_SECRET`,
   `GADS_REFRESH_TOKEN`, `GADS_LOGIN_CUSTOMER_ID` (quando usar conta administradora),
   `GADS_CUSTOMER_ID`, `GADS_CONVERSION_ACTION`.

**Envio (server):**
1. Trocar o `GADS_REFRESH_TOKEN` por um access token OAuth de curta duração no endpoint
   `https://oauth2.googleapis.com/token`, usando `grant_type=refresh_token`,
   `GADS_CLIENT_ID` e `GADS_CLIENT_SECRET`. Manter o access token somente em memória/cache seguro.
2. Enviar a conversão com os cabeçalhos exigidos:
```
POST https://googleads.googleapis.com/{GADS_API_VERSION}/customers/{GADS_CUSTOMER_ID}:uploadClickConversions
Authorization: Bearer {OAUTH_ACCESS_TOKEN}
developer-token: {GADS_DEVELOPER_TOKEN}
login-customer-id: {GADS_LOGIN_CUSTOMER_ID} // somente quando aplicável, sem hífens
{
  "conversions": [{
    "gclid": "<gclid>",                       // ou "gbraid"/"wbraid"
    "conversionAction": "{GADS_CONVERSION_ACTION}",
    "conversionDateTime": "2026-07-10 13:00:00-03:00",
    "conversionValue": 1, "currencyCode": "BRL"   // valor opcional/simbólico p/ Lead
  }],
  "partialFailure": true
}
```
- Aparece no Ads em algumas horas.
- Se não houver `gclid` (tráfego não-Ads), simplesmente não envia pro Ads (só Meta/GA4).

**Atalho inicial (se a aprovação da API demorar):** usar por enquanto a tag de conversão
padrão do Google (gtag) **só** para a conversão — reintroduz um pouco de JS, mas destrava
enquanto o developer token não sai. Migrar pra API depois.

---

## 5. GA4 — Measurement Protocol (camada de analytics)

**Setup:** GA4 → Admin → Data Streams → **Measurement Protocol API secret**.
Env: `GA4_MEASUREMENT_ID`, `GA4_API_SECRET`.

**Envio (server):**
```
POST https://www.google-analytics.com/mp/collect?measurement_id={GA4_MEASUREMENT_ID}&api_secret={GA4_API_SECRET}
{ "client_id": "<_ga client_id>", "events": [{ "name": "generate_lead", "params": { "utm_source": "…" } }] }
```
- Validar em **GA4 → DebugView** (usar `/debug/mp/collect`).
- Serve pra relatórios/audiências. Não é a fonte de verdade do Ads (isso é o Caminho 4).

---

## 6. Consentimento (LGPD)
- A captura/persistência e o disparo devem seguir a base legal documentada; quando a operação depender de consentimento, só executar após aceite válido.
- Guardar o consentimento em cookie assinado ou estado verificável pelo servidor; respeitar no cliente antes de persistir IDs e no servidor antes de encaminhar eventos.
- Documentar finalidade, retenção, exclusão e compartilhamento de IP, user agent, click IDs, cookies de publicidade e GA client ID na política de privacidade.

## 7. Proteção obrigatória do endpoint público
- Validar o payload com schema estrito (ex.: Zod), rejeitando campos extras e limitando tamanho total.
- Aceitar somente eventos e identificadores previstos em allowlist; derivar `event_source_url` no servidor ou restringi-la aos domínios oficiais da SOS Multas, sem encaminhar URLs, nomes de evento ou destinos arbitrários enviados pelo cliente.
- Obter IP e user agent da requisição no servidor, sem confiar nos valores enviados pelo navegador.
- Aplicar rate limit por IP/identificador e limites globais para proteger quotas e custos das APIs.
- Usar `event_id` com armazenamento temporário/TTL para idempotência, replay protection e deduplicação.
- Exigir consentimento verificável no servidor antes de encaminhar eventos às plataformas.
- Não registrar tokens, cabeçalhos de autorização, click IDs completos ou payloads integrais nos logs.

---

## 8. Variáveis de ambiente (todas server-side)
```
# Meta
META_GRAPH_VERSION=
META_DATASET_ID=
META_CAPI_TOKEN=
# Google Ads
GADS_API_VERSION=
GADS_DEVELOPER_TOKEN=
GADS_CLIENT_ID=
GADS_CLIENT_SECRET=
GADS_REFRESH_TOKEN=
GADS_LOGIN_CUSTOMER_ID=
GADS_CUSTOMER_ID=
GADS_CONVERSION_ACTION=
# GA4
GA4_MEASUREMENT_ID=
GA4_API_SECRET=
```
(seguir o padrão de `lib/env.ts`; nunca expor no cliente).

---

## 9. Passo a passo de implementação (fases)

1. **Captura de IDs (cliente):** após o consentimento aplicável, estender
   `components/tracking-client.tsx` para ler/persistir `gclid/gbraid/wbraid/fbclid/_fbp/_ga`
   e anexá-los ao payload do `/api/track`.
2. **Proteger `/api/track`:** implementar schema estrito, allowlist, limite de payload,
   rate limit, consentimento verificável e idempotência antes de integrar novos destinos.
3. **Refatorar `/api/track`:** manter o forward atual (Apps Script) e adicionar 3 funções
   `sendMeta()`, `sendGoogleAds()`, `sendGA4()` disparadas em paralelo (`Promise.allSettled`),
   com try/catch isolado por destino (uma falha não derruba as outras).
4. **Meta CAPI:** implementar + validar em Test Events.
5. **GA4 MP:** implementar + validar em DebugView.
6. **Google Ads:** criar Conversion Action, obter credenciais da API, implementar upload por gclid,
   validar no diagnóstico de conversões do Ads.
7. **Remover do cliente:** tirar `gtm.js`, `fbevents.js`, `gtag.js` do `app/layout.tsx`.
8. **Consentimento:** gate LGPD antes da persistência de IDs e dos envios.
9. **Medir:** rodar PageSpeed (TBT deve cair muito) e conferir conversões chegando nas 3 plataformas.

---

## 10. Validação / testes
- **Meta:** Events Manager → Test Events (ver o Lead chegando com fbc/fbp).
- **GA4:** DebugView (evento `generate_lead`).
- **Google Ads:** Conversões → diagnóstico (uploads aceitos, gclid casado).
- **Perf:** PageSpeed antes/depois — foco em TBT e "Reduzir JS não usado".

---

## 11. Expectativas honestas
- **Performance:** mobile ~76 → **~88-93** (removendo os 3 scripts de terceiros).
- **Google Ads:** atribuição **determinística** via gclid — igual ou melhor que hoje.
- **Meta:** EMQ potencialmente "Bom" mesmo sem e-mail/telefone, sujeito à qualidade dos identificadores e ao diagnóstico real no Events Manager.
- **Manutenção:** tudo em código, versionado no Git, replicável nas próximas stacks (vibecoding).
  Trade-off aceito: sem UI no-code do GTM (você opera as campanhas e coda, então não é perda).
- **Não dá pra 100 no mobile** com qualquer pixel; ~90 é o alvo saudável (desktop já 99).
