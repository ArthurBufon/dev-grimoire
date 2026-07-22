---
name: plan-execute-subagents
description: >-
  Executa planos aprovados com subagents, uma task por vez, com revisão de spec
  e qualidade entre etapas. Use após plan-write/revisar-plano-grill ou quando
  o usuário pedir para executar um plano aprovado com subagents.
  disable-model-invocation: true
---

# Execução de plano com subagents

Executa um plano já aprovado usando `subagent-driven-development`.

Esta skill **não planeja, não reescreve e não expande escopo**. Ela apenas orquestra a implementação sequencial das tasks, garantindo aderência à spec, KISS e qualidade antes de avançar.

## Fluxo

```text
plan-write → revisar-plano-grill → plan-execute-subagents → plan-finished-review
```

## Gate de entrada

Antes de executar, confirmar que existe:

* Plano aprovado pelo usuário
* Spec/design referenciado no plano
* Regras do projeto carregadas:

  * User Rules da IDE
  * `AGENTS.md` na raiz, ou equivalente: `.cursor/rules/`, `CLAUDE.md`
  * documentação **Dev Grimoire** indexada (regras + moldes)
  * Outras instruções locais relevantes

Regras do projeto e User Rules têm precedência sobre defaults desta skill.

Se o plano não estiver aprovado, não executar. Solicitar aprovação primeiro.

Ao iniciar, anunciar:

> Iniciando execução do plano com subagent-driven-development.

## Contrato de execução

Executar uma task por vez, na ordem do plano.

Para cada task:

1. Enviar ao implementer o texto completo da task e o contexto necessário
2. Implementar somente o necessário
3. Rodar testes, lint ou verificações indicadas
4. Fazer self-review
5. Fazer revisão de aderência à spec
6. Corrigir gaps de spec, se houver
7. Fazer revisão de qualidade de código
8. Corrigir issues críticos/importantes, se houver
9. Marcar a task como concluída no TodoWrite
10. Apresentar o checkpoint da task e aguardar revisão e confirmação explícita do dev
11. Somente após a confirmação, avançar para a próxima task

Nunca executar tasks em paralelo.

## Princípios obrigatórios

* KISS é inegociável
* Alterações mínimas, localizadas e previsíveis
* Código idiomático para o stack do projeto
* Reutilizar padrões e componentes existentes
* Não refatorar fora do escopo
* Não criar abstrações prematuras
* Não adicionar dependências sem justificativa forte
* Não alterar arquitetura sem necessidade real
* Não implementar em `main`/`master` sem consentimento explícito
* Em caso de dúvida bloqueante, parar e perguntar ao dev
* Após concluir cada task, parar e aguardar revisão e confirmação explícita do dev antes de continuar

Dúvidas não bloqueantes devem ser resolvidas pela opção mais simples e mais aderente ao padrão existente do projeto.

## Preparação

1. Ler o plano uma vez
2. Extrair todas as tasks com texto completo e contexto
3. Criar TodoWrite com todas as tasks
4. Se o projeto exigir isolamento, aplicar `superpowers:using-git-worktrees`
5. Iniciar `superpowers:subagent-driven-development`

## Ciclo por task

| Etapa | Ação                                                        |
| ----- | ----------------------------------------------------------- |
| 1     | Dispatch implementer com task completa + contexto           |
| 2     | Resolver dúvidas bloqueantes do implementer                 |
| 3     | Implementer implementa, testa e faz self-review             |
| 4     | Dispatch spec reviewer                                      |
| 5     | Corrigir gaps de spec até aprovação                         |
| 6     | Dispatch code quality reviewer                              |
| 7     | Corrigir issues críticos/importantes até aprovação          |
| 8     | Marcar task como concluída                                  |
| 9     | Apresentar checkpoint e aguardar revisão/confirmação do dev |
| 10    | Após confirmação explícita, avançar para a próxima task     |

A revisão de spec sempre vem antes da revisão de qualidade.

Não avançar com findings críticos/importantes abertos.

## Checkpoint por task

Após finalizar completamente uma task, parar a execução e apresentar:

```markdown
## Task concluída — [nome da task]

### Alterações
- [arquivos/módulos alterados]

### Verificações executadas
- [comandos executados e resultado]

### Decisões / observações
- [decisões relevantes, riscos ou pontos de atenção]

### Revisão manual
Aguardando revisão e confirmação explícita do dev para avançar para a próxima task.
```

Não iniciar, preparar ou implementar a próxima task antes da confirmação explícita do dev.

## Status do implementer

| Status               | Ação                                                       |
| -------------------- | ---------------------------------------------------------- |
| `DONE`               | Enviar para revisão de spec                                |
| `DONE_WITH_CONCERNS` | Avaliar concerns antes da revisão                          |
| `NEEDS_CONTEXT`      | Fornecer contexto e re-dispatch                            |
| `BLOCKED`            | Resolver com mais contexto, dividir task ou escalar ao dev |

Se o bloqueio envolver mudança de escopo, parar e perguntar ao dev.

## Finalização

Após todas as tasks:

1. Dispatch code reviewer final para a implementação completa
2. Corrigir issues críticos/importantes, se houver
3. Apresentar resumo final
4. Sugerir `plan-finished-review`
5. Aplicar `superpowers:finishing-a-development-branch` quando apropriado

## Resumo final obrigatório

```markdown
## Execução concluída

### Alterações
- [arquivos/módulos alterados por task]

### Verificações executadas
- [comandos executados e resultado]

### Tasks
- [x] Task 1 — ...
- [x] Task 2 — ...

### Pendências / bloqueios
- [se houver; senão: "Nenhum"]

### Próximo passo
- [plan-finished-review, PR, testes manuais etc.]
```

## Anti-patterns

* Reescrever o plano durante a execução
* Expandir escopo sem aprovação
* Pular revisão de spec
* Pular revisão de qualidade
* Executar múltiplas tasks em paralelo
* Avançar para a próxima task sem revisão e confirmação explícita do dev
* Refatorar “aproveitando que já está aqui”
* Criar helpers genéricos sem necessidade real
* Ignorar perguntas bloqueantes do implementer
* Avançar com findings críticos/importantes abertos
* Implementar direto em `main`/`master` sem consentimento

## Trigger phrases

* `/plan-execute-subagents`
* `execute o plano`
* `implementar o plano`
* `rodar o plano de implementação`
* `subagent-driven-development`

## Skills relacionadas

| Skill                                        | Quando usar                               |
| -------------------------------------------- | ----------------------------------------- |
| `plan-write`                                 | Antes, para criar o plano                 |
| `revisar-plano-grill`                        | Antes, para revisar criticamente o plano  |
| `superpowers:subagent-driven-development`    | Durante, como mecanismo de execução       |
| `superpowers:using-git-worktrees`            | Durante, se precisar de workspace isolado |
| `plan-finished-review`                       | Depois, para validação pós-implementação  |
| `superpowers:finishing-a-development-branch` | Depois, para PR/merge/cleanup             |
