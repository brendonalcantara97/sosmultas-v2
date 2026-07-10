## Tracking Check - 2026-07-09

Escopo validado:

- Mensagem de WhatsApp montada no cliente em `components/tracking-client.tsx`
- Persistencia de `lead_id` em `localStorage` com chave `sos_lead_id`
- Reescrita do link para `https://api.whatsapp.com/send/?phone=...&text=...`
- Inclusao de `Numero de Atendimento : SM-YYYYMMDD-XXXXXX` no texto enviado
- Envio do clique para `/api/track` via `sendBeacon` com fallback `fetch`

Resultado:

- Status: aprovado em revisao de codigo
- O fluxo de mensagem esta implementado
- O clique de WhatsApp continua sendo rastreado separadamente do texto da mensagem

Observacoes:

- A validacao foi feita por leitura deterministica do codigo porque a automacao de browser local falhou neste ambiente ao iniciar o Chrome em modo headless.
- Sinais confirmados no arquivo:
  - string `Numero de Atendimento`
  - uso de `sos_lead_id`
  - reescrita para `api.whatsapp.com/send/?`
  - envio para `/api/track`

Arquivos envolvidos:

- `components/tracking-client.tsx`
- `app/api/track/route.ts`
- `app/layout.tsx`
