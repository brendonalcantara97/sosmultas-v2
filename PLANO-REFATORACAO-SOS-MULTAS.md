# SOS Multas — Plano de Refatoração e Migração para Next.js

> **Para execução futura:** use uma abordagem por fases, preservando o site atual como baseline até a validação final do novo build.

**Objetivo:** migrar a SOS Multas de um site estático `server.js + HTML + Tailwind` para uma base moderna em Next.js, mantendo SEO, tracking, performance e a identidade visual definida no design system.

**Arquitetura:** o site atual já tem conteúdo, páginas regionais, tracking e integrações. A migração deve preservar o que converte e reorganizar a implementação para uma stack mais flexível, com páginas estáticas/SSG, componentes reutilizáveis, tracking centralizado e base pronta para expansão.

**Stack alvo:** Next.js, TypeScript, Tailwind CSS, componentes reutilizáveis, tracking via API/route handlers, SEO/schema, deploy em Vercel.

---

## 1) Diagnóstico do que já existe

### Base atual identificada
- `index.html`
- `porto-alegre.html`
- `capao-da-canoa.html`
- `unidades.html`
- `locais.html`
- `como-funciona.html`
- `privacidade.html`
- `termos-de-uso.html`
- `index2.html`
- `server.js`
- `assets/`
- `js/tracking.js`
- `data/`
- `vercel.json`

### O que precisa ser preservado
- copy principal já validada
- CTA de WhatsApp
- páginas de localização/serviço
- schema/SEO
- tracking de conversão
- prova social
- estrutura de conversão que já existe

### O que pode mudar
- estrutura técnica
- organização de componentes
- layout responsivo
- hierarquia visual
- implementação do tracking
- organização das imagens e ativos

---

## 2) Decisão de migração

### Recomendação final de stack
- **Next.js** como base principal
- **TypeScript** para previsibilidade
- **Tailwind CSS** para velocidade de implementação
- **Server/route handlers** para tracking e integrações
- **SSG/ISR** onde fizer sentido para performance e SEO

### Por que não Astro agora
- o site já tem tracking, páginas regionais e capacidade de expansão
- a refatoração precisa preservar lógica e permitir evolução
- Next.js equilibra performance e flexibilidade melhor para este caso

---

## 3) Estratégia de migração

A migração será feita em 4 camadas:

1. **Base técnica nova**
   - criar o projeto Next.js
   - configurar Tailwind/TypeScript
   - definir variáveis de ambiente
   - montar layout base e tokens

2. **Replicação fiel da navegação e conteúdo**
   - portar as páginas existentes
   - manter a copy atual
   - reaproveitar URLs sempre que possível

3. **Recriação do sistema de conversão**
   - CTA WhatsApp
   - tracking de cliques
   - tracking de formulário/lead se existir
   - schema e SEO

4. **Refino visual com o design system**
   - aplicar paleta oficial
   - aplicar hero novo
   - aplicar componentes premium e consistentes
   - otimizar mobile e performance

---

## 4) Plano por fases

### Fase 0 — Backup e congelamento do baseline

**Objetivo:** garantir um ponto de retorno seguro antes de mexer na arquitetura.

**Tarefas:**
- duplicar o projeto atual em uma pasta de backup
- registrar URLs e comportamento atual das páginas
- salvar screenshots dos blocos principais
- listar os assets críticos que não podem se perder

**Critério de pronto:**
- existe uma cópia intacta do estado atual
- sabemos exatamente o que será migrado

---

### Fase 1 — Criar a base Next.js

**Objetivo:** iniciar o novo projeto em paralelo sem quebrar o atual.

**Tarefas:**
- criar um novo projeto Next.js em uma pasta dedicada
- configurar TypeScript
- configurar Tailwind CSS
- criar layout global, header e footer base
- importar a fonte/tokens do design system

**Arquivos esperados na nova base:**
- `app/layout.tsx`
- `app/page.tsx`
- `app/globals.css`
- `components/*`
- `lib/*`
- `public/*`

**Critério de pronto:**
- projeto abre localmente
- build funciona
- layout base renderiza sem erro

---

### Fase 2 — Extrair e formalizar os tokens do design system

**Objetivo:** transformar o HTML do design system em regras reais de implementação.

**Tarefas:**
- converter cores em tokens do Tailwind/CSS variables
- definir radius, shadow, spacing e container
- definir tipografia de títulos e corpo
- mapear botões, cards, badges e seções

**Arquivos esperados:**
- `app/globals.css`
- `tailwind.config.ts`
- `components/ui/button.tsx`
- `components/ui/card.tsx`
- `components/ui/section.tsx`

**Critério de pronto:**
- o novo projeto reproduz a linguagem visual do design system
- botões e cards têm comportamento consistente

---

### Fase 3 — Migrar a homepage

**Objetivo:** recriar a home com a nova direção visual, mantendo os textos reais.

**Tarefas:**
- construir hero novo
- portar prova social
- portar blocos de serviços
- portar como funciona
- portar CTA final
- manter textos principais intactos

**Arquivos esperados:**
- `app/page.tsx`
- `components/sections/Hero.tsx`
- `components/sections/SocialProof.tsx`
- `components/sections/Services.tsx`
- `components/sections/HowItWorks.tsx`
- `components/sections/FinalCTA.tsx`

**Critério de pronto:**
- home nova está visualmente alinhada ao design system
- mobile funciona bem
- copy não foi inventada nem alterada sem necessidade

---

### Fase 4 — Migrar páginas de apoio e região

**Objetivo:** preservar SEO e jornada local.

**Tarefas:**
- criar páginas regionais no novo padrão
- portar páginas institucionais
- manter URLs relevantes com redirecionamento quando necessário

**Arquivos esperados:**
- `app/porto-alegre/page.tsx`
- `app/capao-da-canoa/page.tsx`
- `app/unidades/page.tsx`
- `app/locais/page.tsx`
- `app/como-funciona/page.tsx`
- `app/privacidade/page.tsx`
- `app/termos-de-uso/page.tsx`

**Critério de pronto:**
- páginas existem no novo projeto
- conteúdo principal foi reaproveitado
- SEO base está mantido

---

### Fase 5 — Reimplementar tracking e conversão

**Objetivo:** manter ou melhorar a mensuração atual.

**Tarefas:**
- criar tracking centralizado para WhatsApp
- carregar GTM
- preservar gclid/utm
- preservar lead_id
- preparar endpoint de track
- validar se o encaminhamento para Google Sheets/Apps Script continua funcionando

**Arquivos esperados:**
- `components/Tracking.tsx`
- `app/api/track/route.ts`
- `lib/tracking.ts`
- `lib/whatsapp.ts`

**Critério de pronto:**
- clique em CTA gera evento
- parâmetros de campanha são preservados
- tracking não quebra no build

---

### Fase 6 — SEO, schema e performance

**Objetivo:** evitar queda de tráfego e melhorar a base técnica.

**Tarefas:**
- importar metadata por página
- configurar Open Graph
- manter schema `LegalService`
- revisar H1/H2/H3
- otimizar imagens
- aplicar lazy-loading onde fizer sentido
- validar Core Web Vitals

**Arquivos esperados:**
- `app/layout.tsx`
- `app/page.tsx`
- `app/*/page.tsx`
- `public/robots.txt`
- `public/sitemap.xml` ou geração dinâmica

**Critério de pronto:**
- meta tags existem
- schema está presente
- performance não piorou

---

### Fase 7 — QA visual e funcional

**Objetivo:** comparar o novo site com o atual e validar conversão.

**Tarefas:**
- conferir hero
- conferir mobile
- conferir botões
- conferir tracking
- conferir redirecionamentos
- conferir conteúdo renderizado
- validar links de WhatsApp

**Checklist de QA:**
- [ ] home abre
- [ ] mobile fica bom
- [ ] WhatsApp abre com texto correto
- [ ] tracking dispara
- [ ] páginas regionais carregam
- [ ] build final passa

---

### Fase 8 — Deploy e corte final

**Objetivo:** colocar o novo site no ar sem perda de tráfego.

**Tarefas:**
- publicar a nova versão
- testar domínio principal
- validar redirecionamentos
- monitorar tracking nas primeiras horas
- manter fallback para a versão antiga até estabilizar

**Critério de pronto:**
- novo site em produção
- tracking ativo
- URLs importantes sem quebra

---

## 5) Ordem recomendada de execução

1. congelar o baseline atual
2. criar a base Next.js
3. aplicar design system e tokens
4. migrar homepage
5. migrar páginas de apoio
6. reimplementar tracking
7. revisar SEO/performance
8. testar tudo
9. publicar

---

## 6) Riscos principais

- perder tracking durante a migração
- quebrar URLs já indexadas
- mudar copy importante sem necessidade
- excesso de animação e perda de performance
- diferença visual grande demais entre atual e novo

### Como evitar
- migrar em paralelo
- validar cada página individualmente
- manter a copy
- usar o design system como base, não como prisão
- fazer QA antes de publicar

---

## 7) Decisão de design para a refatoração

### Manter
- navy como autoridade
- laranja como ação
- WhatsApp como canal principal
- prova social cedo
- textos reais

### Aplicar
- hero mais forte
- layout mais premium
- cards mais consistentes
- mobile-first de verdade
- seções mais escaneáveis

### Evitar
- poluição visual
- animação excessiva
- cópia genérica de template
- qualquer mudança que enfraqueça conversão

---

## 8) Entregáveis finais esperados

- projeto Next.js funcionando
- homepage nova
- páginas de apoio migradas
- tracking preservado
- SEO básico preservado
- design system aplicado
- documentação do que mudou

---

## 9) Próximo passo

Quando este plano for aprovado, a execução ideal é começar por:

1. estrutura Next.js
2. tokens do design system
3. homepage
4. tracking
5. páginas regionais

