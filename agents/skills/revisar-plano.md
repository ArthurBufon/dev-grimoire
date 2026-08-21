---
name: revisar-plano
description: >-
  Use when reviewing an implementation plan at a high level before execution —
  summarize what will be done, affected parts, and decisions that need approval.
  Triggers: "revisar plano", "explicar plano", "resumir plano".
---

# Revisar Plano

## Gate anti-slop (bloqueante)

**Leia e aplique** `{GRIMOIRE}/agents/fragments/gate-anti-slop.md` ao avaliar o plano.

Se alguma tarefa carregar arquitetura, abstração, refatoração ou NFR sem ligação com o pedido/modelagem, isso entra em **"Pontos para conferir antes de executar"** — não corrija o plano nesta skill, só sinalize.

Gere um resumo simples e de alto nível do plano fornecido.

O objetivo é permitir que eu entenda rapidamente **o que será feito, como será feito em linhas gerais e qual será o resultado esperado**, sem precisar ler o plano completo.

Foque em:

* Qual problema ou objetivo o plano pretende resolver.
* Quais são as principais mudanças ou etapas.
* Quais partes do sistema serão afetadas.
* Como essas mudanças se conectam entre si.
* Qual será o comportamento ou resultado final esperado.
* Decisões importantes, limitações ou trade-offs que eu deveria conhecer antes de aprovar a execução.

Use linguagem simples e direta. Evite detalhes de implementação desnecessários.

Não faça code review, não avalie qualidade de código e não sugira melhorias técnicas menores. A intenção não é revisar a implementação linha por linha, mas verificar se **a abordagem geral do plano faz sentido e corresponde ao que quero executar**.

Ao final, indique brevemente:

**Resumo:** uma explicação curta do plano em linguagem simples.

**Pontos para conferir antes de executar:** apenas decisões, comportamentos ou consequências que realmente possam exigir minha aprovação ou ajuste.

Se não houver nada relevante para revisar, diga que o plano parece coerente e pronto para execução.
