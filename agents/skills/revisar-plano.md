---
name: revisar-plano
description: >-
  Use before implementing an approved plan to give a brief, plain-language view
  of its architecture, code flow, affected areas, and decisions still requiring approval.
  Triggers: "revisar plano", "explicar plano", "resumir plano", "visão do plano".
---

# Revisar Plano

## Objetivo

Dar ao desenvolvedor tudo o que precisa saber para decidir se executa o plano,
sem exigir a leitura completa dele. A revisão é uma visão executiva: simples,
breve e orientada a arquitetura e fluxo de código.

## Antes de resumir

Siga `{GRIMOIRE}/docs/rules/global.md` para resolver o Grimório e ler `geral.md` e as rules da stack do projeto via Read/Grep.

**Leia e aplique** `{GRIMOIRE}/agents/fragments/gate-anti-slop.md` ao avaliar o plano.

Leia o plano inteiro. Quando ele referenciar modelagem, specs ou arquivos existentes,
consulte somente o contexto necessário para explicar o fluxo e os impactos com precisão.

Se alguma tarefa carregar arquitetura, abstração, refatoração ou NFR sem ligação
com o pedido/modelagem, sinalize em **"Pontos para conferir antes de executar"**.
Se o plano alterar comportamento e não trouxer validação verificável, sinalize
isso na mesma seção.
Não altere o plano nesta skill.

## O que explicar

Explique em linguagem simples:

* o objetivo e o resultado percebido pelo usuário;
* a arquitetura e o fluxo principal: entrada → regras → dados → saída;
* módulos, arquivos ou camadas que mudam e a responsabilidade de cada grupo;
* dependências entre as etapas e o que permanece inalterado;
* decisões, limitações, riscos de comportamento e trade-offs que realmente
  dependam de aprovação.

Não reproduza o plano tarefa a tarefa, não liste cada linha/arquivo sem explicar
seu papel e não invente detalhes ausentes.

Não faça code review, não avalie qualidade de código e não sugira melhorias técnicas
menores. A intenção é confirmar que a abordagem geral corresponde ao que será executado.

## Formato de resposta

Use apenas as seções que trouxerem informação relevante:

```markdown
## Em uma frase

## Como a solução se encaixa

## Áreas afetadas

## Resultado após a execução

## Pontos para conferir antes de executar

## Pronto para executar?
```

Em **Pronto para executar?**, responda diretamente: sim, ou condicione à decisão
explicitada. Se não houver ponto pendente, diga que o plano está coerente e pronto.
