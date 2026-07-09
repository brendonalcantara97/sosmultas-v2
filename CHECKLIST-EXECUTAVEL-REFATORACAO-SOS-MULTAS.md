# SOS Multas — Checklist Executável de Refatoração

> Objetivo: migrar o site atual para uma base moderna em Next.js sem perder SEO, tracking, copy e conversão.

## Antes de começar
- [ ] Fazer backup completo da pasta atual do projeto
- [ ] Confirmar que a cópia de segurança abre normalmente
- [ ] Salvar screenshots da home e das páginas principais
- [ ] Listar URLs atuais que precisam ser preservadas
- [ ] Listar assets críticos: logo, imagens, ícones, dados de tracking
- [ ] Confirmar onde ficará a nova base do projeto

## Fase 0 — Congelar baseline
- [ ] Duplicar o projeto atual para uma pasta de backup
- [ ] Verificar que o backup contém todos os arquivos principais
- [ ] Registrar comportamento atual de navegação e CTAs
- [ ] Registrar links de WhatsApp e URLs regionais
- [ ] Confirmar que o site atual continua funcionando depois do backup

## Fase 1 — Criar a base Next.js
- [ ] Criar novo projeto Next.js em pasta separada
- [ ] Instalar e configurar TypeScript
- [ ] Instalar e configurar Tailwind CSS
- [ ] Criar estrutura inicial de `app/`, `components/`, `lib/` e `public/`
- [ ] Criar `app/layout.tsx`
- [ ] Criar `app/page.tsx`
- [ ] Criar `app/globals.css`
- [ ] Validar que o projeto sobe localmente sem erro
- [ ] Validar que o build funciona

## Fase 2 — Aplicar o design system
- [ ] Importar as fontes definidas no design system
- [ ] Criar tokens de cor no `globals.css` e/ou `tailwind.config.ts`
- [ ] Definir radius, sombras, container e espaçamento
- [ ] Criar componente de botão primário
- [ ] Criar componente de botão secundário
- [ ] Criar componente de card
- [ ] Criar componente de seção
- [ ] Validar que os componentes seguem o visual definido

## Fase 3 — Migrar a homepage
- [ ] Criar a nova seção Hero
- [ ] Inserir a imagem correta do hero
- [ ] Preservar os textos atuais da página inicial
- [ ] Criar a seção de prova social
- [ ] Criar a seção de serviços
- [ ] Criar a seção “como funciona”
- [ ] Criar a seção de CTA final
- [ ] Revisar a hierarquia visual da home
- [ ] Testar a home em desktop
- [ ] Testar a home em mobile

## Fase 4 — Migrar páginas de apoio
- [ ] Criar página `/porto-alegre`
- [ ] Criar página `/capao-da-canoa`
- [ ] Criar página `/unidades`
- [ ] Criar página `/locais`
- [ ] Criar página `/como-funciona`
- [ ] Criar página `/privacidade`
- [ ] Criar página `/termos-de-uso`
- [ ] Reaproveitar a copy atual de cada página
- [ ] Validar que cada página carrega sem erro

## Fase 5 — Tracking e conversão
- [ ] Criar componente de tracking centralizado
- [ ] Preservar UTM
- [ ] Preservar GCLID
- [ ] Preservar lead_id
- [ ] Criar endpoint `/api/track`
- [ ] Validar evento de clique no WhatsApp
- [ ] Validar integração com GTM
- [ ] Validar integração com planilha/Apps Script, se aplicável
- [ ] Confirmar que os eventos continuam chegando

## Fase 6 — SEO e performance
- [ ] Criar metadata por página
- [ ] Configurar Open Graph
- [ ] Manter schema `LegalService`
- [ ] Garantir que exista apenas um H1 por página
- [ ] Revisar ordem de H2/H3
- [ ] Otimizar imagens
- [ ] Ativar lazy-loading onde fizer sentido
- [ ] Validar performance geral no desktop
- [ ] Validar performance geral no mobile

## Fase 7 — QA visual
- [ ] Comparar a home nova com a antiga
- [ ] Verificar CTA principal em todos os blocos
- [ ] Verificar legibilidade de textos
- [ ] Verificar contraste de cores
- [ ] Verificar espaçamentos e alinhamentos
- [ ] Verificar se o mobile está consistente
- [ ] Verificar se o layout não quebra em telas menores
- [ ] Verificar se os botões têm estados de hover/focus

## Fase 8 — QA funcional
- [ ] Testar o WhatsApp em desktop
- [ ] Testar o WhatsApp em mobile
- [ ] Testar todos os links internos
- [ ] Testar todas as páginas regionais
- [ ] Testar redirecionamentos, se houver
- [ ] Testar formulário, se existir
- [ ] Testar tracking em ambiente local e homologação
- [ ] Confirmar build final sem erros

## Fase 9 — Deploy
- [ ] Publicar em ambiente de teste
- [ ] Validar domínio e rotas
- [ ] Conferir se o tracking está ativo no site publicado
- [ ] Conferir se o SEO básico está correto
- [ ] Conferir se as páginas principais estão indexáveis
- [ ] Publicar em produção somente após validação completa

## Pós-publicação
- [ ] Monitorar eventos de conversão nas primeiras horas
- [ ] Monitorar erros de console e rede
- [ ] Monitorar tráfego e comportamento das páginas
- [ ] Manter o backup da versão antiga por segurança
- [ ] Registrar ajustes pendentes para a próxima iteração

## Ordem recomendada de execução
1. Backup e baseline
2. Base Next.js
3. Design system
4. Homepage
5. Páginas de apoio
6. Tracking
7. SEO e performance
8. QA
9. Deploy

## Critério de sucesso
- Site novo no ar
- Copy preservada
- Tracking funcionando
- SEO preservado
- Mobile melhorado
- Visual alinhado ao design system
- Conversão mantida ou melhorada
