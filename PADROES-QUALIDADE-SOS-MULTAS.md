# PADRÕES DE QUALIDADE — SOS MULTAS

Guardrails de **Performance, Acessibilidade e SEO** estabelecidos na otimização de 2026-07-10
(PageSpeed: Desktop 88→99, Mobile 64→76, A11y 94→100, Boas Práticas 100, SEO 100).

Aplicar em **toda nova página, componente ou stack**. Cada item traz: **Regra → Por quê → Como (padrão de código)**.

---

## 1. Fontes — `next/font`, nunca `<link>` externo

- **Regra:** carregar fontes só via `next/font/google` (self-host). Proibido `<link href="fonts.googleapis.com">` no `<head>`.
- **Por quê:** o `<link>` externo é render-blocking e adiciona round-trip de outra origem → mata FCP/LCP no mobile.
- **Como:** definir no `app/layout.tsx` com `variable` + `display: "swap"`, aplicar as vars no `<html>`, consumir em `tailwind.config.ts`/`globals.css` via `var(--font-*)`.

```ts
const bebasNeue = Bebas_Neue({ weight: "400", subsets: ["latin"], variable: "--font-bebas", display: "swap" });
const dmSans = DM_Sans({ subsets: ["latin"], variable: "--font-dm-sans", display: "swap" });
// <html className={`${bebasNeue.variable} ${dmSans.variable}`}>
```

## 2. Renderização — ISR, nunca `force-dynamic` por dado quase-estático

- **Regra:** páginas de conteúdo usam `export const revalidate = 86400` (1 dia; ajustar por caso). Não usar `export const dynamic = "force-dynamic"` só porque a página faz `fetch`.
- **Por quê:** `force-dynamic` faz SSR a cada request → TTFB alto (maior peso do score mobile). ISR serve do CDN.
- **Como:** fetches externos devem ser cacheáveis: `fetch(url, { next: { revalidate: 86400 } })`. **Nunca** `{ cache: "no-store" }` numa página que deve ser estática (força a rota a virar dinâmica).

## 3. Imagens — `next/image` + `sizes` + AVIF

- **Regra:** toda imagem via `next/image`. Toda imagem `fill` precisa de `sizes`. Imagem do LCP/above-the-fold com `priority`.
- **Por quê:** sem `sizes`, o mobile baixa a variante 100vw (chega a `w=3840`). AVIF reduz ~20-30% dos bytes.
- **Como:** config global já habilita AVIF em `next.config.ts`:

```ts
images: { formats: ["image/avif", "image/webp"] }
// <Image ... fill sizes="(max-width: 1024px) 100vw, 50vw" priority />
```

## 4. Acessibilidade — contraste de cor (WCAG AA)

- **Regra:** texto sobre fundo claro precisa de **≥ 4.5:1** (normal) ou **≥ 3:1** (texto grande: ≥ 24px, ou ≥ 18.66px bold). Validar no PageSpeed/axe antes de subir.
- **Por quê:** cor de marca vibrante costuma reprovar como texto (ex.: laranja `#fd8b00` = ~2.4:1).
- **Como — tokens seguros já definidos em `globals.css`:**
  - Laranja como **texto** sobre claro: `--laranja-titulo #ea580c` (título grande, 3.6:1) ou `--laranja-texto-forte #b45309` (texto normal, 5:1).
  - Cinza secundário: `--muted #626973` (5.3:1). **Não** voltar para `#6c757d` (~4.46:1, reprova).
  - `--laranja #fd8b00` só em **fundo/botão/ícone decorativo**, nunca como texto sobre fundo claro.
  - Laranja sobre `--navy` (fundo escuro) é OK (alto contraste).

## 5. Acessibilidade — ordem de títulos (headings)

- **Regra:** um único `<h1>` por página. Não pular níveis (h2 → h4 é erro). Títulos de rodapé/colunas usam `<h2>`.
- **Por quê:** ordem sequencial comunica a estrutura para leitores de tela; Lighthouse audita a ordem numérica no DOM.
- **Como:** o **nível é semântico**; o tamanho visual vem da classe Tailwind (`text-[1rem]` etc.). Trocar o nível não muda a aparência.

## 6. Links de WhatsApp — sempre normalizados

- **Regra:** todo link de WhatsApp sai de `siteConfig.whatsapp.*` / constantes de `lib/config.ts`, geradas por `toWhatsAppUrl()`. **Nunca** usar env var de telefone direto no `href`.
- **Por quê:** a env no Vercel pode vir como número cru (`555133077772`) → gera `href="555133077772"` (link quebrado). Já aconteceu em produção.
- **Como:** `toWhatsAppUrl()` aceita número puro, com pontuação, `wa.me/...` ou URL completa e sempre devolve `https://wa.me/<dígitos>`.

## 7. SEO — Schema.org (JSON-LD)

- **Regra:** `LegalService` deve incluir: `name`, `url`, `description`, `image`, `telephone`, `priceRange`, `address` e `aggregateRating`.
- **`address`** deve ser `PostalAddress` estruturado: `streetAddress` (só rua/número/bairro), `addressLocality`, `addressRegion`, `postalCode`, `addressCountry: "BR"`.
- **Como:** dados por unidade em `lib/config.ts` (`endereco`, `cep`). `streetAddress` é derivado removendo cidade/UF do `endereco`.

## 8. Tracking / GTM — decisão fixada

- **Regra:** GTM permanece com `strategy="afterInteractive"`. **Não** adiar/lazy-load para ganhar score. Preservar GTM + Facebook Pixel + Google Ads.
- **Por quê:** adiar perde eventos de pageview/conversão dos primeiros segundos. Tracking completo > pontos de performance.
- **Consequência:** o TBT do mobile (~900ms) vem majoritariamente desses terceiros. **Teto realista de Mobile Performance: ~75-85.** Não perseguir 100 no mobile às custas do tracking.

---

## Checklist — nova página / componente

- [ ] Fontes herdadas do layout (sem `<link>` externo)
- [ ] `export const revalidate` definido; sem `force-dynamic` desnecessário
- [ ] Fetches externos com `next: { revalidate }` (sem `no-store`)
- [ ] Imagens com `next/image` + `sizes`; LCP com `priority`
- [ ] `<h1>` único e headings sem pulo de nível
- [ ] Cores de texto passam contraste (usar tokens seguros)
- [ ] CTAs de WhatsApp via `siteConfig` / `toWhatsAppUrl`
- [ ] `metadata` (title, description, canonical, OG) + JSON-LD quando aplicável
- [ ] `npm run build` limpo; validar no PageSpeed + Rich Results antes do deploy

**Baseline de referência (manter ou melhorar):** Desktop 99 / Mobile 76 (Perf) · A11y 100 · Boas Práticas 100 · SEO 100.
