# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

SOS Multas is a conversion-focused landing page site for a traffic ticket consulting service in Brazil. The project is a Next.js 15 + React 19 refactoring of an existing static site.

**Primary goal:** Migrate/refactor the site preserving copy, tracking (GTM), SEO, URLs, and visual identity while improving performance and conversion.

## Development Commands

```bash
npm run dev        # Start development server
npm run build      # Production build
npm run start      # Start production server
npm run typecheck  # TypeScript check (tsc --noEmit)
```

No test runner is configured yet.

## Architecture

### App Router Structure (Next.js 15)
- `app/layout.tsx` - Root layout with GTM, header, footer, WhatsApp FAB
- `app/page.tsx` - Homepage with all landing sections
- `app/[city]/page.tsx` - City-specific landing pages (porto-alegre, capao-da-canoa)
- `app/unidades/[slug]/page.tsx` - Dynamic unit pages
- `app/api/` - Route handlers for tracking, reviews, map iframe

### Key Directories
- `components/` - UI components (site-header, site-footer, landing-sections, ui/)
- `components/ui/` - Design system primitives (button, card, section)
- `lib/` - Configuration and utilities
  - `lib/config.ts` - Unit data (UNIDADES), WhatsApp links, contact info
  - `lib/env.ts` - Server environment variable schema and validation
  - `lib/site-config.ts` - Site metadata (name, description, URL)

### Design System
- Tailwind CSS with custom tokens in `tailwind.config.ts`
- Colors: `navy`, `accent` (orange), `petrol`, `ink`, `surface`, `vivid`
- Fonts: Bebas Neue (headings), DM Sans (body)
- Reference: `SOS-Multas-Design-System.html`

### Environment Variables
Server-side only (never expose to client):
- `GTM_ID` - Google Tag Manager
- `GOOGLE_API_KEY`, `GOOGLE_PLACE_ID_*` - Reviews/maps API
- `WHATSAPP_*` - WhatsApp routing numbers
- `APPS_SCRIPT_URL` - Form submission endpoint

See `.env.example` for full list.

## Refactoring Context

### Source of Truth
- Design system: `SOS-Multas-Design-System.html`
- Refactoring plan: `PLANO-REFATORACAO-SOS-MULTAS.md`
- Checklist: `CHECKLIST-EXECUTAVEL-REFATORACAO-SOS-MULTAS.md`
- **Quality guardrails (Perf/A11y/SEO): `PADROES-QUALIDADE-SOS-MULTAS.md`**
- Original site: `/Users/brendonalcantara/Desktop/Megabrain/mega-brain/sites/sos-multas-lp`

### Progress Tracking
Save state to `REFATORACAO-STATE.md` before stopping work. Include:
- Current phase
- Completed/in-progress/pending tasks
- Blockers and decisions
- Changed files
- Next steps

### Constraints
- Preserve existing copy (no unnecessary rewrites)
- Preserve WhatsApp CTAs and tracking
- Keep `GOOGLE_API_KEY` server-side only
- Follow phases: baseline -> Next.js base -> tokens -> homepage -> support pages -> tracking -> SEO -> QA -> deploy

### Quality Standards (apply by default — full detail in `PADROES-QUALIDADE-SOS-MULTAS.md`)
- **Fonts:** `next/font/google` only. Never a `<link>` to fonts.googleapis.com.
- **Rendering:** content pages use `export const revalidate = N` (ISR). Never `force-dynamic` just for a fetch. External fetches use `{ next: { revalidate } }`, never `{ cache: "no-store" }` on a static page.
- **Images:** `next/image` always; every `fill` image needs `sizes`; LCP image gets `priority`. AVIF enabled in `next.config.ts`.
- **Contrast (WCAG AA):** text on light bg ≥4.5:1 (normal) / ≥3:1 (large). Orange as text on light bg → use `--laranja-titulo` or `--laranja-texto-forte`; never `--laranja` (#fd8b00). Secondary gray = `--muted` (#626973), not #6c757d.
- **Headings:** one `<h1>` per page, no skipped levels (footer/column titles are `<h2>`). Level is semantic; size comes from Tailwind classes.
- **WhatsApp links:** always from `siteConfig.whatsapp.*` / `toWhatsAppUrl()` in `lib/config.ts`. Never put a phone env var directly in an `href`.
- **Schema:** `LegalService` includes `image` + structured `address` (`PostalAddress` with `postalCode`). Unit data (incl. `cep`) lives in `lib/config.ts`.
- **GTM:** stays `afterInteractive`. Do NOT lazy-load/defer it for score. Mobile Performance ceiling ~75-85 is accepted (tracking > points).

## Repository

- GitHub: https://github.com/brendonalcantara97/sosmultas-v2.git
