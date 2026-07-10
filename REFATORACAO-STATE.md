# REFATORAÇÃO SOS MULTAS — STATE

## Fase atual
- [x] Fase 0 iniciada: leitura de referências e diagnóstico do baseline
- [x] Fase 1 concluída: base Next.js + TypeScript + Tailwind criada e validada
- [x] Fase 2 executada na homepage: design system aplicado e home migrada para a nova base
- [~] Fase 3 em andamento: rotas secundárias críticas e base de tracking portadas
- [x] Repositório Git inicializado e publicado

## Concluído
- [x] Plano criado
- [x] Checklist criado
- [x] Design system salvo
- [x] Prompt para agentes criado
- [x] README do repositório criado
- [x] Git init/commit/push executados
- [x] Pesquisa de segurança base criada
- [x] Variáveis de ambiente documentadas
- [x] `.gitignore` criado
- [x] `.env.example` criado
- [x] Estrutura inicial Next.js criada
- [x] Tailwind CSS configurado com tokens base do design system
- [x] Layout global, homepage inicial e rotas prioritárias placeholder criadas
- [x] Redirects legados e headers básicos configurados para Vercel
- [x] `npm run typecheck` validado
- [x] `npm run build` validado
- [x] Homepage refeita com seções reais baseadas no baseline atual
- [x] Componentes base do design system criados (`button`, `card`, `section`)
- [x] Header e footer alinhados ao novo padrão visual
- [x] Schema `LegalService` adicionado na homepage Next.js
- [x] `/unidades`, `/porto-alegre` e `/capao-da-canoa` migradas com copy real e metadata
- [x] Base client-side de tracking portada para Next.js
- [x] Endpoints iniciais `/api/track`, `/api/reviews` e `/api/map-iframe` criados
- [x] **Bloqueador corrigido:** Canonical das páginas de unidade agora aponta para URLs primárias (`/porto-alegre`, `/capao-da-canoa`)
- [x] **Bloqueador corrigido:** Sitemap criado em `app/sitemap.ts`
- [x] **Bloqueador corrigido:** Favicon (`app/favicon.ico`, `app/icon.svg`) e OG images (`app/opengraph-image.jpg`, `app/twitter-image.jpg`) adicionados
- [x] **Build validado:** `npm run build` passou sem erros (21 páginas estáticas geradas)

## Em andamento
- Refino da camada server-side de reviews/mapa conforme envs e ativos disponíveis
- Refatoracao visual da base atual para aderir de verdade ao novo design system, sem alterar tracking/SEO
- QA visual e responsivo das paginas internas apos a remocao dos placeholders

## Pendente
- [ ] Backup e baseline (Fase 0 - nunca marcado como feito)
- [x] Base Next.js
- [x] Design system aplicado
- [x] Homepage migrada
- [x] Páginas de apoio migradas
- [~] Tracking reimplementado
- [x] SEO/performance revisados (canonical, sitemap, OG images corrigidos)
- [ ] QA
- [ ] Deploy
- [ ] Definir limite de requisições para rotas públicas (`/api/track`)
- [ ] Criar testes/checagens de segredos e payload
- [ ] Testar tracking em navegação client-side entre páginas (links WhatsApp podem não ter lead_id reescrito)

## Bloqueios
- Nenhum bloqueio registrado

## Decisões importantes
- Stack alvo: Next.js + TypeScript + Tailwind CSS
- Preservar copy e tracking existentes
- Priorizar mobile e conversão
- O projeto atual ainda nao esta plenamente alinhado ao novo design system; ele precisa ser refatorado com base nele, nao apenas preservado
- Repositório GitHub: https://github.com/brendonalcantara97/sosmultas-v2.git
- Segurança base: proteção de env, rate limit, validação de entrada e logging sem segredos
- Baseline atual confirmado fora deste repositório: site estático/Tailwind servido por `server.js`, com `vercel.json`, GTM, schema `LegalService`, `/api/track`, `/api/reviews` e `/api/map-iframe`
- O repositório `sosmultas-v2` ainda não contém a aplicação Next.js; nesta etapa ele funciona como repositório de plano, estado e documentação
- A migração deve preservar as rotas atuais principais: `/`, `/porto-alegre`, `/capao-da-canoa`, `/unidades`, `/locais`, `/como-funciona`, `/privacidade`, `/termos-de-uso`
- `GOOGLE_API_KEY` não pode ir para o client bundle; reviews e mapa devem permanecer server-side
- Compatibilidade com Vercel é viável desde o início via Next.js App Router + route handlers + env vars configuradas no dashboard
- `next/font` foi removido nesta etapa porque o ambiente local de build não resolve `fonts.googleapis.com`; o carregamento de fonte ficou por `<link>` externo até decidirmos entre self-hosting ou fonte local
- As rotas críticas do baseline já existem na nova base como placeholders estáticos para evitar 404 durante a migração
- O workspace está com pouco espaço em disco; a Fase 2 foi concluída sem depender de novos binários, usando componentes SVG/CSS e `hero-reference.png` já versionado no repositório
- O `next build` continua funcional apesar de avisos de cache `ENOSPC`; o problema atual impacta cache/armazenamento, não a renderização final da aplicação
- Na Fase 3, as páginas regionais foram migradas sem copiar novos binários do baseline; a parte visual de fachadas/mapas ainda pode ser refinada quando houver mais espaço em disco
- A etapa atual consolidou melhor os tokens globais e aplicou uma linguagem visual mais fiel ao design system na home, header, footer, componentes base e páginas de unidade
- As páginas `/locais`, `/como-funciona`, `/privacidade` e `/termos-de-uso` ja foram convertidas de placeholder para páginas reais com metadata e copy do baseline reorganizada
- O proximo foco da camada visual passa a ser consistencia fina, QA responsivo e refinamento de contraste/espacamento entre as páginas

## Arquivos alterados nesta etapa (correção bloqueadores)
- /Users/brendonalcantara/Desktop/sosmultas-v2/components/unit-page.tsx (canonical corrigido)
- /Users/brendonalcantara/Desktop/sosmultas-v2/app/unidades/[slug]/page.tsx (canonical corrigido)
- /Users/brendonalcantara/Desktop/sosmultas-v2/app/sitemap.ts (novo)
- /Users/brendonalcantara/Desktop/sosmultas-v2/app/favicon.ico (novo)
- /Users/brendonalcantara/Desktop/sosmultas-v2/app/icon.svg (novo)
- /Users/brendonalcantara/Desktop/sosmultas-v2/app/opengraph-image.jpg (novo)
- /Users/brendonalcantara/Desktop/sosmultas-v2/app/twitter-image.jpg (novo)
- /Users/brendonalcantara/Desktop/sosmultas-v2/CLAUDE.md (atualizado)

## Arquivos alterados (etapas anteriores)
- /Users/brendonalcantara/Desktop/sosmultas-v2/README.md
- /Users/brendonalcantara/Desktop/sosmultas-v2/.gitignore
- /Users/brendonalcantara/Desktop/sosmultas-v2/.env.example
- /Users/brendonalcantara/Desktop/sosmultas-v2/agent.md
- /Users/brendonalcantara/Desktop/sosmultas-v2/app/globals.css
- /Users/brendonalcantara/Desktop/sosmultas-v2/app/layout.tsx
- /Users/brendonalcantara/Desktop/sosmultas-v2/app/page.tsx
- /Users/brendonalcantara/Desktop/sosmultas-v2/app/como-funciona/page.tsx
- /Users/brendonalcantara/Desktop/sosmultas-v2/app/unidades/page.tsx
- /Users/brendonalcantara/Desktop/sosmultas-v2/app/porto-alegre/page.tsx
- /Users/brendonalcantara/Desktop/sosmultas-v2/app/capao-da-canoa/page.tsx
- /Users/brendonalcantara/Desktop/sosmultas-v2/app/locais/page.tsx
- /Users/brendonalcantara/Desktop/sosmultas-v2/app/privacidade/page.tsx
- /Users/brendonalcantara/Desktop/sosmultas-v2/app/termos-de-uso/page.tsx
- /Users/brendonalcantara/Desktop/sosmultas-v2/claude.md
- /Users/brendonalcantara/Desktop/sosmultas-v2/components/site-header.tsx
- /Users/brendonalcantara/Desktop/sosmultas-v2/components/whatsapp-button.tsx
- /Users/brendonalcantara/Desktop/sosmultas-v2/components/site-footer.tsx
- /Users/brendonalcantara/Desktop/sosmultas-v2/components/tracking-client.tsx
- /Users/brendonalcantara/Desktop/sosmultas-v2/components/unit-page.tsx
- /Users/brendonalcantara/Desktop/sosmultas-v2/components/home-icons.tsx
- /Users/brendonalcantara/Desktop/sosmultas-v2/components/route-placeholder.tsx
- /Users/brendonalcantara/Desktop/sosmultas-v2/components/ui/button.tsx
- /Users/brendonalcantara/Desktop/sosmultas-v2/components/ui/card.tsx
- /Users/brendonalcantara/Desktop/sosmultas-v2/components/ui/section.tsx
- /Users/brendonalcantara/Desktop/sosmultas-v2/REFATORACAO-STATE.md
- /Users/brendonalcantara/Desktop/sosmultas-v2/SEGURANCA-PARA-TESTES.md
- /Users/brendonalcantara/Desktop/sosmultas-v2/ENV-PRODUCAO-SOS-MULTAS.md
- /Users/brendonalcantara/Desktop/sosmultas-v2/lib/env.ts
- /Users/brendonalcantara/Desktop/sosmultas-v2/lib/content.ts
- /Users/brendonalcantara/Desktop/sosmultas-v2/lib/site-config.ts
- /Users/brendonalcantara/Desktop/sosmultas-v2/lib/whatsapp.ts
- /Users/brendonalcantara/Desktop/sosmultas-v2/app/api/track/route.ts
- /Users/brendonalcantara/Desktop/sosmultas-v2/app/api/reviews/route.ts
- /Users/brendonalcantara/Desktop/sosmultas-v2/app/api/map-iframe/route.ts
- /Users/brendonalcantara/Desktop/sosmultas-v2/next-env.d.ts
- /Users/brendonalcantara/Desktop/sosmultas-v2/next.config.ts
- /Users/brendonalcantara/Desktop/sosmultas-v2/package-lock.json
- /Users/brendonalcantara/Desktop/sosmultas-v2/package.json
- /Users/brendonalcantara/Desktop/sosmultas-v2/postcss.config.js
- /Users/brendonalcantara/Desktop/sosmultas-v2/public/robots.txt
- /Users/brendonalcantara/Desktop/sosmultas-v2/tailwind.config.ts
- /Users/brendonalcantara/Desktop/sosmultas-v2/tsconfig.json

## Próximo passo
- Executar QA visual e responsivo nas páginas principais e internas
- Testar tracking em navegação client-side (verificar se links WhatsApp recebem lead_id após navegação via `<Link>`)
- Configurar rate limit em `/api/track` antes do deploy
- Deploy para Vercel (configurar env vars no dashboard)

## Registro rápido - 2026-07-09 20:03:12 -0300
- Preview local revalidado em `http://localhost:4174` com `next build` + `next start` usando as envs de produção/local fornecidas para Google Places, GTM, WhatsApp e Apps Script.
- Corrigido bloqueio de build do App Router envolvendo `TrackingClient` com `Suspense` em `app/layout.tsx`.
- `app/api/reviews/route.ts` passou a usar `getReviewsPayload()` em vez do seed estático de `lib/content.ts`.
- `lib/google-reviews.ts` recebeu invalidação de cache por configuração (`place_id`, overrides e versão do schema) para evitar payload stale.
- Home e páginas de unidade que exibem reviews foram forçadas para renderização dinâmica (`force-dynamic`) para não congelar HTML com fallback antigo.
- Hero e carrossel de depoimentos passaram a usar `profilePhotoUrl` real do Google Places com fallback para inicial em `components/reviewer-avatar.tsx`.
- Ajuste visual no hero concluído: removida a frase `Avaliacoes reais de clientes atendidos` e o selo textual `Google` foi substituído pelo mesmo ícone usado na seção `Sobre Nós`.
- Pendente relatado pelo usuário: revisar os grids, pois ainda há problema visual/layout a corrigir.

## Registro rápido - 2026-07-10 12:10:48 -0300
- Divergência confirmada entre alterações de código e o que aparecia no projeto local quando havia processo antigo, build anterior ou porta errada em execução.
- Processo antigo em `:3000` foi encerrado e o preview local voltou a ser padronizado em `http://localhost:4174`.
- Ajuste solicitado pelo usuário restaurado na home: a faixa azul voltou a destacar `+10.000 clientes atendidos` em vez de exibir o total dinâmico de avaliações do Google.
- Ajuste solicitado pelo usuário restaurado no rodapé: `components/site-footer.tsx` voltou para um formato mais próximo do baseline, sem colunas extras introduzidas durante a refatoração.
- Regra operacional registrada: antes de qualquer nova alteração, revisar este `REFATORACAO-STATE.md` e validar o estado real do preview local para evitar mudanças não solicitadas ou diferença entre código e renderização.

## Registro rápido - 2026-07-10 12:27:00 -0300
- `components/landing-sections.tsx`: a faixa azul (`StatsBand`) foi unificada para home e páginas de unidade, mantendo o mesmo conjunto visual da home: `Nota no Google`, `+10.000 clientes atendidos`, `20 anos`, `Atendimento nacional`.
- `components/site-footer.tsx`: restaurado o rodapé completo de 4 colunas conforme a referência de `html_standalone/index.html`, com fundo `#F8F9FA`, borda superior `#e3e2e7`, títulos em Bebas Neue e copyright centralizado.
- O logo do rodapé voltou a usar `/assets/logo-footer.webp` com altura aproximada de `72px`, sem card/caixa branca adicionada pelo componente.
- Causa das fotos dos clientes do Google identificada no ambiente local: o servidor havia sido reiniciado sem as envs de Google Places, fazendo `/api/reviews` cair no fallback estático e remover `profilePhotoUrl`.
- Preview local reiniciado novamente em `http://localhost:4174` com as envs completas (`GOOGLE_API_KEY`, `GOOGLE_PLACE_ID_*`, overrides, GTM, WhatsApp e Apps Script`), e a API local voltou a responder reviews com `profilePhotoUrl` real.

## Registro - 2026-07-10 (sessão atual)

### Estado atual dos arquivos (lido diretamente)

**components/landing-sections.tsx (fachadas):**
- Hero Section (linha 138): `aspect-[4/3]`, `bg-[#F8F9FA]`, `className={unidade ? "object-cover object-top" : "object-cover"}`
- UnitsGridSection (linha 366-367): `aspect-[4/3]`, `bg-[#F8F9FA]`, `object-cover object-top`

**components/site-footer.tsx (estado atual):**
- Versão simples com 2 áreas (logo+copyright | links de navegação)
- Usando `/assets/logo-sos-multas.png`
- Fundo branco (`bg-white`)

**Problema identificado - Fachada cortando:**
- Imagem de Capão da Canoa é RETRATO (931x1070 pixels, proporção ~7:8)
- Container usa `aspect-[4/3]` que é PAISAGEM
- Mesmo com `object-top`, corta muito do topo porque a proporção é muito diferente
- SOLUÇÃO: usar imagem paisagem OU ajustar aspect para algo mais próximo da proporção real

### Tarefas pendentes desta sessão

1. [ ] **Fachada de Capão da Canoa** - Imagem retrato em container paisagem = corte inevitável. Opções:
   - Trocar imagem por versão paisagem
   - Usar `aspect-[3/4]` ou `aspect-square` para containers de fachada

2. [ ] **Footer 4 colunas** - Implementar layout conforme referência html_standalone/index.html

### Regra: SEMPRE ler o arquivo atual antes de editar
