# SOS Multas — Variáveis de ambiente em produção

> Lista de nomes das variáveis já usadas em produção. Não versionar valores reais.

## Operacionais / integrações
- APPS_SCRIPT_URL
- GTM_ID

## WhatsApp
- WHATSAPP_MAIN
- WHATSAPP_POA
- WHATSAPP_CAPAO

## Google / Places / Reviews
- GOOGLE_API_KEY
- GOOGLE_PLACE_ID
- GOOGLE_PLACE_ID_POA
- GOOGLE_PLACE_ID_CAPAO
- GOOGLE_RATING_POA
- GOOGLE_REVIEW_COUNT_POA
- GOOGLE_RATING_CAPAO
- GOOGLE_REVIEW_COUNT_CAPAO

## Observações de segurança
- valores reais ficam apenas no provedor de deploy
- `.env`, `.env.local` e `.env.production` devem permanecer fora do Git
- se uma variável for usada no frontend, avaliar se ela pode ser pública antes de prefixar com `NEXT_PUBLIC_`
- nunca expor `GOOGLE_API_KEY` ou chaves privadas no bundle do cliente
