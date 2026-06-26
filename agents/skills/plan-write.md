---
name: plan-write
description: >-
  Orchestrates full planning: brainstorming (superpowers), grilling (grill-me),
  then implementation plan (writing-plans). Use when the user wants a complete
  plan before building, or uses triggers like "plan-write", "write a plan",
  "elaborar plano", or "/plan-write".
---

# Plan Write

Orquestra o planejamento completo em três fases sequenciais. **Nunca pule fases. Nunca implemente código.**

## Hard Gate

```
Fase 1 (brainstorming) → Fase 2 (grill-me) → Fase 3 (writing-plans) → [execução separada]
```

- Não escrever código, scaffold, nem invocar skills de implementação durante este fluxo.
- Cada fase só inicia após a anterior ser **explicitamente aprovada** pelo usuário.
- Anunciar no início de cada fase: *"Iniciando Fase N — [nome da skill]."*

## Contexto obrigatório (antes de tudo)

Antes da Fase 1, carregar e aplicar durante todo o fluxo:

1. **Regras do projeto** — `AGENTS.md`, `CLAUDE.md`, `.cursor/rules/`, ou equivalentes
2. **`docs/`** — specs, ADRs e contexto da feature relevante
3. **User rules globais** — convenções de código, git, segurança, testes
4. **Codebase** — estrutura existente, padrões do stack, arquivos similares

**Regra de precedência:** regras do projeto + user rules **sobrescrevem** defaults das sub-skills quando houver conflito (paths de docs, commits, nomenclatura, arquitetura).

### Resolução de paths

Defaults das sub-skills (ex.: `docs/superpowers/specs/`, `docs/superpowers/plans/`) aplicam **somente** se o projeto não definir outro padrão.

Antes de salvar qualquer artefato, verificar nas regras do projeto:

| Artefato | Se o projeto não define | Se o projeto define |
|----------|------------------------|---------------------|
| Design draft | `docs/superpowers/specs/` | Seguir path e política do projeto |
| Plano de implementação | `docs/superpowers/plans/` | Respeitar se planos são temporários, não commitáveis, etc. |
| Spec definitiva | — | Seguir quando e onde o projeto manda criar/atualizar specs |

Quando houver conflito, **seguir o projeto** e informar o usuário qual default foi substituído.

---

## Fase 1 — Brainstorming

**Sub-skill:** `superpowers:brainstorming`

Anunciar: *"Iniciando Fase 1 — brainstorming (superpowers)."*

Seguir o checklist completo da skill `brainstorming`, **exceto** o passo final:

| Passo brainstorming | Ação em plan-write |
|---------------------|-------------------|
| Explorar contexto do projeto | ✅ Obrigatório — inclui regras do projeto, docs, codebase |
| Perguntas esclarecedoras (uma por vez) | ✅ Até cobrir **todas** as informações necessárias para o plano |
| Propor 2–3 abordagens com trade-offs | ✅ |
| Apresentar design por seções | ✅ Aprovação do usuário após cada seção |
| Escrever design doc | ✅ Conforme resolução de paths acima |
| Spec self-review | ✅ |
| Revisão do usuário no spec | ✅ |
| ~~Invocar writing-plans~~ | ❌ **Substituído pela Fase 2** |

**Critério de saída:** usuário aprova o design/rascunho. Então perguntar:

> "Design aprovado. Posso iniciar a Fase 2 (grill-me) para stress-testar o design?"

**Não avançar sem confirmação.**

---

## Fase 2 — Grill Me

**Sub-skill:** `grill-me`

Anunciar: *"Iniciando Fase 2 — grill-me."*

**Input:** design aprovado na Fase 1 (mensagem ou arquivo de rascunho).

Seguir `grill-me` integralmente:

- Uma pergunta por vez, com recomendação
- Explorar codebase antes de perguntar o que já é descobrível
- Percorrer árvore de decisões até não restar ambiguidade
- Validar aderência às regras do projeto e user rules em cada decisão

**Critério de saída:** resumo **Entendimento compartilhado** apresentado e **confirmado** pelo usuário.

Se o grilling invalidar decisões do design, revisar o rascunho da Fase 1 antes de seguir.

Perguntar:

> "Entendimento compartilhado confirmado. Posso iniciar a Fase 3 (writing-plans)?"

**Não avançar sem confirmação.**

---

## Fase 3 — Writing Plans

**Sub-skill:** `superpowers:writing-plans`

Anunciar: *"Iniciando Fase 3 — writing-plans (superpowers)."*

**Input:** design aprovado (Fase 1) + entendimento compartilhado (Fase 2).

Seguir `writing-plans` integralmente, **mais** as regras abaixo.

### Conformidade obrigatória

Todo plano DEVE refletir o que estiver definido em **regras do projeto** e **user rules globais**. Antes de escrever, extrair e aplicar explicitamente:

- **Arquitetura** — camadas, separação de responsabilidades, onde vai cada tipo de lógica
- **Nomenclatura** — idioma, convenções de arquivos, diretórios, commits
- **Escopo** — KISS, alterações mínimas, sem refatoração fora do escopo
- **Testes** — framework, comandos, TDD se exigido
- **Segurança** — credenciais, dados sensíveis, logging
- **Stack** — libs, patterns e ferramentas já usadas no projeto

Não inventar convenções. Se o projeto não define algo, seguir padrões já presentes no codebase.

### Checklist de conformidade (self-review extra)

Após o self-review de `writing-plans`, verificar:

- [ ] Cada task cita paths exatos do projeto
- [ ] Padrões existentes do codebase foram seguidos
- [ ] Nenhuma violação das regras do projeto ou user rules
- [ ] Política de commit/persistência do plano respeitada
- [ ] Nenhum placeholder (TBD, "implementar depois", "adicionar validação")
- [ ] Comandos de teste e build usam ferramentas reais do projeto

### Entrega final

1. Apresentar o plano completo (conforme política de paths do projeto)
2. Oferecer opções de execução conforme `writing-plans` (subagent-driven vs inline)
3. Lembrar políticas do projeto sobre planos temporários ou specs pós-implementação, se aplicável. O arquivo .md do plano DEVE ser gerado, com uma observação de que será excluído após implementação.

Encerrar com:

```markdown
## Plano concluído

- **Design:** [path ou "na conversa"]
- **Grilling:** entendimento compartilhado confirmado
- **Plano:** [localização e política de persistência]
- **Próximo passo:** escolher modo de execução (subagent-driven / inline)
```

---

## Anti-Patterns

- Pular brainstorming ou grilling "porque o escopo é simples"
- Ir direto para writing-plans sem as Fases 1 e 2
- Ignorar regras do projeto em favor dos defaults do Superpowers
- Plano genérico que ignora padrões do codebase
- Impor convenções de um stack específico quando o projeto usa outro
- Múltiplas perguntas por mensagem nas Fases 1 e 2

## Trigger phrases

- `/plan-write`
- "elaborar plano", "write a plan", "criar plano de implementação"
- "planejar antes de implementar" (fluxo completo, não só writing-plans)
