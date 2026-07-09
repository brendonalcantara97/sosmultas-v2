# Segurança base para testes — SOS Multas

> Pesquisa breve, nível intermediário, para já deixar o projeto preparado para crescer com segurança.

## Objetivo
Mesmo sendo um projeto ainda sem site final e sem banco, é importante já adotar controles básicos para evitar:
- exposição de tokens e chaves
- vazamento de `.env`
- abuso de endpoints por requisições em excesso
- logs com dados sensíveis
- problemas de validação de entrada

---

## 1) Riscos prioritários

### 1.1 Token/segredo exposto
Risco:
- chave de API commitada por acidente
- variáveis de ambiente incluídas no Git
- arquivos `.env` enviados para o repositório

Controles recomendados:
- adicionar `.env`, `.env.local`, `.env.production` e variações no `.gitignore`
- manter apenas `.env.example` com nomes das variáveis, sem valores
- nunca colocar token em arquivo versionado
- usar validação de variáveis obrigatórias no startup

### 1.2 Limite de requisições
Risco:
- endpoint de tracking ou formulário ser abusado
- spam de WhatsApp/lead
- tentativa de flood em rotas públicas

Controles recomendados:
- rate limit por IP + janela de tempo
- limite por rota sensível (`/api/track`, futuras rotas de formulário)
- resposta com HTTP `429 Too Many Requests`
- logar somente metadados, sem dados pessoais desnecessários

### 1.3 Entrada maliciosa
Risco:
- payloads com script, texto enorme ou caractere estranho
- parâmetros UTM/gclid/lead_id fora do esperado

Controles recomendados:
- validar tipo e tamanho de entrada
- limitar comprimento de strings
- normalizar query params
- rejeitar payloads fora do formato esperado

### 1.4 Vazamento por log
Risco:
- tokens, telefones, e-mails ou identificadores sensíveis indo para console/logs

Controles recomendados:
- nunca logar segredos
- mascarar dados pessoais quando necessário
- logar apenas o suficiente para debug e auditoria

### 1.5 Headers e navegação
Risco:
- site ficar mais exposto a XSS, clickjacking e sniffing

Controles recomendados:
- `Content-Security-Policy` quando possível
- `X-Frame-Options` / `frame-ancestors`
- `X-Content-Type-Options: nosniff`
- `Referrer-Policy`
- `Permissions-Policy`

---

## 2) Checklist mínimo para o projeto

### Git / arquivos sensíveis
- [ ] `/.env` está no `.gitignore`
- [ ] `/.env.local` está no `.gitignore`
- [ ] `/.env.production` está no `.gitignore`
- [ ] Não existe segredo real em arquivo versionado
- [ ] Existe `.env.example` com nomes das variáveis
- [ ] Não existe token em README, logs ou HTML

### Rotas / API
- [ ] Toda rota pública valida entrada
- [ ] Endpoints sensíveis têm limite de requisição
- [ ] Resposta de abuso retorna `429`
- [ ] Payloads inválidos retornam `400`
- [ ] Campos sensíveis são sanitizados
- [ ] Nenhuma rota aceita conteúdo sem validação

### Tracking
- [ ] `utm_source`, `utm_medium`, `utm_campaign`, `gclid` e `lead_id` são aceitos com validação
- [ ] URLs com parâmetros estranhos não quebram o fluxo
- [ ] Nenhum dado sensível é enviado para analytics
- [ ] O tracking não depende de segredo exposto no frontend

### Frontend
- [ ] Nenhum `innerHTML` com dado externo sem sanitização
- [ ] Nenhum segredo é embutido no JS do cliente
- [ ] Mensagens de erro não expõem detalhes internos

### Infra / deploy
- [ ] Variáveis de ambiente configuradas fora do Git
- [ ] Build falha se variável obrigatória estiver ausente
- [ ] Logs de produção são mínimos e úteis
- [ ] Dependências revisadas periodicamente

---

## 3) Testes de segurança que valem a pena adicionar

### Teste 1 — Bloqueio de segredos no repositório
Objetivo:
- impedir commit de chaves ou `.env`

Sugestão:
- teste ou hook que falhe se encontrar padrões como:
  - `API_KEY=`
  - `SECRET=`
  - `TOKEN=`
  - `PASSWORD=`

### Teste 2 — `.gitignore` cobre arquivos sensíveis
Objetivo:
- garantir que arquivos de ambiente nunca sejam versionados

Verificar presença de:
- `.env`
- `.env.local`
- `.env.production`
- `.env.*.local`

### Teste 3 — Rate limit em endpoint sensível
Objetivo:
- evitar abuso em `/api/track` ou futuros endpoints de lead

Cenário esperado:
- primeira requisição: 200
- excesso de requisições no intervalo: 429

### Teste 4 — Validação de payload
Objetivo:
- rejeitar entradas inválidas ou excessivas

Cenários:
- campo obrigatório ausente -> 400
- string muito longa -> 400
- formato inválido -> 400

### Teste 5 — Não exposição de segredos no frontend
Objetivo:
- garantir que variáveis privadas não aparecem no bundle do cliente

Cenário:
- build final não contém valores secretos em arquivos públicos

### Teste 6 — Sanitização de parâmetros de tracking
Objetivo:
- aceitar apenas parâmetros esperados e com tamanho razoável

Cenários:
- `utm_source` normal -> aceito
- parâmetro gigante / malformado -> truncado ou rejeitado
- script injection -> neutralizado

---

## 4) Recomendação prática para o SOS Multas

Como o projeto ainda está em fase de refatoração, eu faria assim:

1. agora
- criar `.gitignore` cedo
- manter `.env.example`
- preparar validação de env
- documentar os limites de tracking

2. quando existir API/rota
- adicionar rate limit
- adicionar validação de payload
- adicionar testes de abuso e de entrada inválida

3. antes de publicar
- rodar revisão de segredos
- revisar headers
- revisar logs
- revisar se nenhum token foi parar no frontend

---

## 5) Regra simples para o projeto

Se uma entrada vem do usuário, trate como não confiável.
Se uma chave é sensível, nunca versionar.
Se uma rota é pública, assumir que pode ser abusada.

---

## 6) Próximos passos sugeridos

- criar `.gitignore`
- criar `.env.example`
- definir onde o tracking vai receber os dados
- preparar a rota `/api/track` com validação e limite
- adicionar checagens automáticas para segredos no pipeline
