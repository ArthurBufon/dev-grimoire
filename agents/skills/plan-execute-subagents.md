---
name: plan-execute-subagents
description: >-
  Executa planos aprovados com subagents, uma task por vez, com revisão de spec
  e qualidade entre etapas. Use após plan-write ou quando o usuário pedir para
  executar um plano com subagents, ou com triggers como "/plan-execute-subagents",
  "execute o plano", "subagent-driven-development".
disable-model-invocation: true
---

# Execução de planos com subagents

Orquestra a **execução** de um plano já aprovado. Ativa o workflow de `subagent-driven-development` e define o comportamento obrigatório durante a implementação: uma task por vez, sem drift de escopo, KISS, regras do projeto e revisão antes de avançar.

**Não planeja. Não reescreve o plano.** Só executa.

## Posição no fluxo

```
plan-write → [revisão opcional: revisar-plano-grill] → plan-execute-subagents → plan-finished-review
```

## Hard Gate

- O plano **já foi revisado e aprovado** pelo usuário.
- **Não reescreva** o plano e **não altere o escopo**, exceto se encontrar bloqueio real — nesse caso, **pare e pergunte ao dev**.
- Antes de começar, carregar e aplicar durante toda a execução:
  1. **User Rules da IDE**
  2. **`AGENTS.md`** na raiz (ou equivalente: `.cursor/rules/`, `CLAUDE.md`)
  3. **Spec/design** referenciado no plano
  4. **Plano** (arquivo ou texto fornecido na conversa)

**Regra de precedência:** regras do projeto + user rules **sobrescrevem** defaults das sub-skills quando houver conflito.

Anunciar no início: *"Iniciando execução do plano com subagent-driven-development."*

---

## Instruções de execução

Seguir **integralmente** o conteúdo abaixo:

```text
/subagent-driven-development

Execute o plano.

O plano já foi revisado e aprovado. Não reescreva o plano e não altere o escopo, exceto se encontrar bloqueio real.

Execute uma task por vez, na ordem do plano.
Para cada task:
1. implemente somente o necessário, princípio KISS é chave aqui;
2. rode as verificações/testes indicados;
3. faça revisão de aderência à spec;
4. faça revisão de qualidade de código;
5. corrija findings críticos/importantes antes de avançar.

REGRAS DE DESENVOLVIMENTO
- Seguir melhores práticas atuais (2026)
- Código idiomático, tipado e legível
- KISS é inegociável
- Preferir soluções simples e previsíveis
- Fazer alterações mínimas e localizadas
- Nunca refatorar fora do escopo solicitado
- Nunca criar abstrações, arquivos ou camadas sem necessidade real
- Priorizar reutilização do código existente antes de criar novos componentes

REGRAS GERAIS
- Não alterar padrões arquiteturais sem necessidade
- Não adicionar dependências sem justificativa
- Não criar "helpers genéricos" prematuramente
- Não mover arquivos sem motivo claro
- Evitar efeitos colaterais fora do escopo da tarefa
- Em caso de dúvida, preferir a solução mais simples
- SEMPRE esclarecer todas dúvidas pendentes com o dev antes de fazer algo.
- Ao executar os planos, sempre devem ser consideradas religiosamente: User Rules da IDE + AGENTS.md na raiz

Ao final, apresente resumo do que foi alterado e verificações executadas.
```

---

## Workflow técnico (subagent-driven-development)

Seguir a skill `superpowers:subagent-driven-development` para o mecanismo de subagents.

### Preparação (uma vez)

1. Ler o plano **uma vez**; extrair todas as tasks com texto completo e contexto
2. Criar TodoWrite com todas as tasks
3. Se o projeto exigir workspace isolado: aplicar `superpowers:using-git-worktrees` antes de implementar

### Por task (sequencial — nunca paralelo)

| Etapa | Subagent / ação |
|-------|-----------------|
| 1 | Dispatch implementer com texto completo da task + contexto (subagent **não** lê o arquivo do plano) |
| 2 | Responder perguntas do implementer antes de prosseguir |
| 3 | Implementer implementa, roda testes, self-review |
| 4 | Dispatch spec reviewer → corrigir gaps → re-review até ✅ |
| 5 | Dispatch code quality reviewer → corrigir issues críticos/importantes → re-review até ✅ |
| 6 | Marcar task completa no TodoWrite |
| 7 | Próxima task |

**Ordem das revisões:** spec compliance **antes** de code quality. Nunca avançar com issues abertas.

### Após todas as tasks

1. Dispatch code reviewer final (implementação inteira)
2. Apresentar resumo (ver seção abaixo)
3. Sugerir `plan-finished-review` para validação pós-implementação
4. Aplicar `superpowers:finishing-a-development-branch` quando apropriado

### Escalonamento do implementer

| Status | Ação |
|--------|------|
| DONE | Ir para revisão de spec |
| DONE_WITH_CONCERNS | Ler concerns; se sobre correção/escopo, resolver antes da revisão |
| NEEDS_CONTEXT | Fornecer contexto e re-dispatch |
| BLOCKED | Avaliar: mais contexto, modelo mais capaz, dividir task, ou escalar ao dev |

---

## Resumo final obrigatório

Ao concluir todas as tasks, entregar:

```markdown
## Execução concluída

### Alterações
- [lista de arquivos/módulos alterados por task]

### Verificações executadas
- [comandos de teste/lint rodados e resultado]

### Tasks
- [x] Task 1 — ...
- [x] Task 2 — ...

### Pendências / bloqueios
- [se houver; senão: "Nenhum"]

### Próximo passo
- [ex.: plan-finished-review, PR, testes manuais]
```

---

## Anti-patterns

- Reescrever ou expandir o plano durante a execução
- Pular revisão de spec ou de qualidade
- Dispatch de múltiplos implementers em paralelo (conflitos)
- Refatorar fora do escopo "já que estou aqui"
- Ignorar perguntas do subagent
- Avançar para próxima task com findings críticos/importantes abertos
- Implementar em `main`/`master` sem consentimento explícito do usuário

## Trigger phrases

- `/plan-execute-subagents`
- `execute o plano`
- `subagent-driven-development` (quando o plano já está aprovado)
- "implementar o plano", "rodar o plano de implementação"

## Skills relacionadas

| Skill | Quando |
|-------|--------|
| `plan-write` | Antes — planejamento |
| `revisar-plano-grill` | Antes — revisão crítica do plano |
| `superpowers:subagent-driven-development` | Mecanismo de subagents |
| `superpowers:using-git-worktrees` | Workspace isolado (se aplicável) |
| `superpowers:test-driven-development` | Subagents implementadores |
| `plan-finished-review` | Depois — validação pós-implementação |
| `superpowers:finishing-a-development-branch` | Depois — merge/PR/cleanup |
