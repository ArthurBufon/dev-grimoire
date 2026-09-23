---
name: explicar-plano
description: >-
  Explica um plano de implementação, em visão breve ou detalhada,
  cobrindo arquitetura, fluxo, áreas afetadas, contratos e decisões pendentes.
  Use com "explicar plano", "revisar plano", "resumir plano", "visão do plano",
  "explicar plano em detalhes" ou "revisar plano detalhadamente".
---

# Explicar Plano

## Objetivo

Permitir que o desenvolvedor entenda e aprove a abordagem antes da execução,
sem precisar ler o plano completo.

## Profundidade

- Use a visão **breve** por padrão e em pedidos para resumir ou dar uma visão do plano.
- Use a visão **detalhada** quando o pedido disser "detalhadamente", "em detalhes"
  ou solicitar fluxo técnico, contratos, dados ou arquivos.
- Respeite uma profundidade ou formato definidos explicitamente pelo usuário.

## Antes de explicar

Leia o `AGENTS.md` do projeto atual. Siga
`{GRIMOIRE}/docs/rules/global.md` para resolver o Grimório e ler `geral.md` e as
rules da stack via Read/Grep.

Leia e aplique `{GRIMOIRE}/agents/fragments/gate-anti-slop.md`.

Leia o plano inteiro. Consulte modelagem, specs e somente os arquivos necessários
para explicar o fluxo e os impactos com precisão. Não suponha detalhes ausentes;
identifique inferências quando forem indispensáveis.

Se o plano trouxer arquitetura, abstração, refatoração ou requisito não funcional
sem ligação com o pedido ou a modelagem, sinalize em **Pontos para decidir antes
de executar**. Faça o mesmo quando houver mudança de comportamento sem validação
verificável. Não altere nem reescreva o plano.

## Conteúdo comum

Explique em linguagem simples:

- o objetivo e o resultado percebido por quem usa o sistema;
- a arquitetura e o fluxo principal: entrada → regras → dados → saída;
- as áreas alteradas e a responsabilidade de cada uma;
- dependências entre etapas, limites e o que permanece inalterado;
- decisões, riscos de comportamento e trade-offs que dependam de aprovação;
- como a validação prevista demonstra que a mudança funciona.

Não reproduza o plano tarefa a tarefa, não copie blocos de código e não liste
arquivos sem explicar seu papel. Não faça code review nem sugira melhorias
técnicas menores.

## Visão breve

Entregue uma leitura executiva curta. Use somente as seções relevantes:

```markdown
## Em uma frase

## Como a solução se encaixa

## Áreas afetadas

## Resultado após a execução

## Pontos para decidir antes de executar

## Pronto para executar?
```

Em **Pronto para executar?**, responda diretamente se o plano está coerente e
pronto ou condicione a execução à decisão pendente.

## Visão detalhada

Acrescente a sequência real de execução — entrada, validação, regras, persistência,
respostas e efeitos colaterais —, responsabilidades por módulo e contratos
relevantes, como rotas, payloads, tipos, eventos, props, retornos e schema. Inclua
nomes de arquivos, classes, métodos e campos apenas quando ajudarem a localizar o
código. Explique também regras de negócio, permissões, estados, consistência dos
dados, cobertura dos testes e limites fora do escopo.

Use somente as seções relevantes; uma tabela pequena é permitida quando esclarecer
relações entre áreas:

```markdown
## O que muda

## Como a solução se encaixa

## Fluxo de execução

## Áreas e responsabilidades afetadas

## Dados e contratos

## Como saberemos que funcionou

## O que não muda

## Pontos para decidir antes de executar

## Leitura final
```

Em **Leitura final**, resuma a consequência prática e declare se existe decisão
pendente. Sem pendências, diga claramente que o plano está compreendido e pronto
para execução.
