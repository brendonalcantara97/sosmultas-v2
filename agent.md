# AGENT PROMPT — SOS Multas Refatoração

Você está trabalhando na refatoração do projeto SOS Multas dentro da pasta:
/Users/brendonalcantara/Desktop/sosmultas-v2

Objetivo principal:
Executar a migração/refatoração do site da SOS Multas com foco em:
- performance
- conversão
- tracking
- SEO
- manutenção futura
- fidelidade à copy atual
- aplicação do design system definido

Fontes obrigatórias de contexto:
- /Users/brendonalcantara/Desktop/sosmultas-v2/PLANO-REFATORACAO-SOS-MULTAS.md
- /Users/brendonalcantara/Desktop/sosmultas-v2/CHECKLIST-EXECUTAVEL-REFATORACAO-SOS-MULTAS.md
- /Users/brendonalcantara/Desktop/sosmultas-v2/SOS-Multas-Design-System.html
- o site atual do projeto em /Users/brendonalcantara/Desktop/Megabrain/mega-brain/sites/sos-multas-lp

Regras de execução:
1. Siga o checklist na ordem das fases.
2. Não invente copy nova sem necessidade. Preserve os textos atuais sempre que possível.
3. Não quebre tracking, SEO, URLs importantes ou CTA de WhatsApp.
4. Mantenha o design system como base visual.
5. Faça mudanças pequenas, verificáveis e seguras.
6. Se terminar uma etapa, registre o resultado em /Users/brendonalcantara/Desktop/sosmultas-v2/REFATORACAO-STATE.md.
7. Se estiver acabando o contexto/tokens, pare o que estiver fazendo e salve exatamente:
   - o que foi concluído
   - o que está em andamento
   - o que falta fazer
   - arquivos alterados
   - bloqueios/decisões
   no arquivo REFATORACAO-STATE.md.
8. Antes de avançar para a próxima fase, valide o que foi feito.

Como trabalhar:
- Comece lendo o plano e o checklist.
- Respeite a ordem:
  1) backup e baseline
  2) base Next.js
  3) design system
  4) homepage
  5) páginas de apoio
  6) tracking
  7) SEO/performance
  8) QA
  9) deploy
- Sempre que possível, mantenha uma versão funcional no ar enquanto migra.
- Se houver dúvida estrutural, priorize a solução mais simples que preserve conversão e performance.

Critérios de sucesso:
- site novo funcional
- copy preservada
- tracking funcionando
- SEO mantido
- mobile melhorado
- visual alinhado ao design system
- migração sem perda de conversão

Skills a usar quando necessário:
- writing-plans: para organizar qualquer nova fase ou mudança grande
- subagent-driven-development: para executar tarefas por etapas com revisão
- requesting-code-review: para validar alterações antes de commit/push
- test-driven-development: quando houver lógica nova com testes
- systematic-debugging: quando surgir bug ou regressão difícil

Formato de saída desejado em cada checkpoint:
- O que foi feito
- O que foi validado
- O que falta
- Próximo passo
- Atualização do REFATORACAO-STATE.md

Se precisar interromper por limite de contexto, salve o progresso antes de parar.