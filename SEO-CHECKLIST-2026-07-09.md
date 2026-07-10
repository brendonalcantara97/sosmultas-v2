# Checklist Executável de SEO Técnico

Data da análise: 2026-07-09  
Base analisada: repo local + `npm run build` + HTML renderizado do preview local em `http://localhost:4174`

## Crítico

- [ ] Redirecionar `301` de `/unidades/porto-alegre` para `/porto-alegre` e de `/unidades/capao-da-canoa` para `/capao-da-canoa`
  - Problema: as URLs duplicadas respondem `200`, renderizam o mesmo conteúdo e dependem apenas de canonical para consolidar sinal.
  - Impacto: risco de duplicação indexável, desperdício de crawl budget e fragmentação de sinais entre URL canônica e URL alternativa.
  - Correção: trocar a estratégia atual de “URL acessível + canonical” por redirect permanente no App Router ou em `next.config.ts`.

- [ ] Fortalecer linking interno entre páginas estratégicas
  - Problema: no HTML renderizado, a maioria das páginas principais aponta basicamente para `/unidades`, `/privacidade` e `/#como-funciona`; `/locais`, `/termos-de-uso` e as páginas de unidade têm distribuição interna limitada.
  - Impacto: descoberta e reforço semântico fracos para páginas importantes, principalmente institucionais e locais.
  - Correção: inserir links contextuais reais entre home, páginas de unidade, `/locais`, `/como-funciona` e `/unidades`, além de reforçar rotas institucionais no rodapé.

## Importante

- [ ] Substituir `lastModified: new Date()` do sitemap por data estável e baseada em conteúdo
  - Problema: todas as URLs do sitemap recebem a data do build atual.
  - Impacto: sinal artificial de atualização para todas as páginas, pouco confiável para crawlers e ruim para auditoria futura.
  - Correção: usar datas fixas por página, timestamps derivados de conteúdo controlado ou um valor manual por grupo de páginas.

- [ ] Padronizar social metadata entre todas as páginas
  - Problema: a presença de `og:image` e `twitter:image` não está uniforme em todas as rotas renderizadas; páginas que sobrescrevem metadata podem perder partes herdadas.
  - Impacto: cards sociais inconsistentes e menor controle sobre compartilhamento.
  - Correção: garantir imagem social explícita e consistente em todas as páginas principais, seja no layout com herança estável, seja por metadata completa em cada rota.

- [ ] Enriquecer cobertura de schema para além de home e páginas de unidade
  - Problema: hoje há `LegalService` na home/unidades e `CollectionPage` em `/unidades`, mas páginas institucionais relevantes não têm schema complementar.
  - Impacto: perda de clareza semântica para mecanismos sobre tipo de página e contexto do conteúdo.
  - Correção: adicionar apenas o markup necessário, como `WebPage` e, quando fizer sentido, `BreadcrumbList`; em `/unidades`, considerar estrutura mais forte de coleção.

- [ ] Reavaliar a estratégia de indexação das páginas espelho de unidade
  - Problema: `/unidades/[slug]` continua disponível e indexável em potencial, embora o canonical aponte para `/<slug>`.
  - Impacto: mesmo com canonical correto, a URL espelho ainda pode gerar ruído de descoberta e análise.
  - Correção: se não houver necessidade funcional explícita, consolidar com redirect; se precisar manter, documentar a razão e monitorar.

## Opcional

- [ ] Melhorar o título da home para incluir a intenção principal
  - Problema: o título atual é apenas `SOS Multas`.
  - Impacto: menor clareza semântica para busca quando comparado a um title que já explicita defesa de CNH, multas ou Lei Seca.
  - Correção: testar um title mais descritivo sem perder marca.

- [ ] Refinar títulos e descriptions das páginas de unidade
  - Problema: metadados estão corretos estruturalmente, mas ainda bastante padronizados.
  - Impacto: oportunidade perdida de capturar nuances locais e diferenciais por cidade.
  - Correção: tornar title/description de Porto Alegre e Capão mais específicos, mantendo consistência de marca.

- [ ] Adicionar breadcrumbs navegáveis no HTML e opcionalmente em schema
  - Problema: a arquitetura já existe, mas a navegação não explicita trilhas entre páginas.
  - Impacto: menor contexto interno para usuário e máquina.
  - Correção: inserir breadcrumb visual simples nas páginas internas e refletir isso em schema, se fizer sentido.

## Validação usada nesta auditoria

- `npm run build` passou sem erros
- Conferidas no HTML renderizado:
  - `/`
  - `/porto-alegre`
  - `/capao-da-canoa`
  - `/unidades`
  - `/locais`
  - `/como-funciona`
  - `/privacidade`
  - `/termos-de-uso`
  - `/unidades/porto-alegre`
  - `/unidades/capao-da-canoa`
- Itens verificados:
  - `title`
  - `meta description`
  - `canonical`
  - `h1`
  - presença de schema
  - cobertura do sitemap
  - padrão básico de linking interno

## Estado atual resumido

- Canonicals principais estão presentes e corretos nas rotas auditadas.
- `robots.txt` existe e aponta para `sitemap.xml`.
- `sitemap.xml` cobre home, páginas principais e unidades canônicas.
- Home e páginas de unidade já possuem schema útil.
- O maior risco atual é consolidação incompleta de URLs duplicadas e distribuição fraca de links internos.
