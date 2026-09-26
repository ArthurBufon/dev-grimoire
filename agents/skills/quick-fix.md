---
name: quick-fix
description: >-
  Use when the user asks for a small, local code change in chat:
  typo, copy, one validation, one button, swap X for Y, “arrume isso”,
  /quick-fix, “sem plano”, “faz direto”. Not for new architecture,
  multi-feature work, or an explicit plan/subagents request.
disable-model-invocation: false
---

# Quick Fix

Ajuste **exato** do pedido, no menor diff seguro. Sem plano, sem subagents.

**Fora:** arquitetura nova, várias features, refatoração ampla, impacto em mais de um módulo ou comportamento incerto → parar e sugerir `definir-plano-simples`. Se houver alto risco, ambiguidade de domínio, migração, permissões, financeiro ou decisão arquitetural → sugerir `definir-modelagem`.

## Contrato

1. Se `{GRIMOIRE}` já estiver resolvido nesta sessão, não reler `global.md`. Prioridades: Grep da seção **Conflitos de prioridade** só se essa regra ainda não estiver no contexto.
2. Ler o `AGENTS.md` do projeto atual. Resolver o Grimório só se `{GRIMOIRE}` ainda não estiver definido. Todo patch de código lê `geral.md` + a rule da stack detectada (não a da stack ausente). Spec em `docs/features/<feature>/specs.md` se existir. Molde só se **criar** arquivo.
3. Gates: anti-slop (`gate-anti-slop.md`) e convenções (`gate-convencoes-codigo.md`) — ler na primeira vez da sessão; ritual bloqueante antes da entrega.
4. Não expandir escopo, não “melhorar” o resto, não dependência nova, não arquivo fora do pedido.
5. Dúvida que muda comportamento → perguntar. Estilo → copiar o arquivo vizinho.

## Fluxo

1. Registrar baseline (`git status`, diffs staged e unstaged e snapshot do conteúdo de arquivos untracked relevantes) e preservar alterações preexistentes ou concorrentes do dev.
2. Arquivos mínimos do pedido.
3. Patch no padrão existente.
4. Verificação proporcional (teste/lint/typecheck do que mudou; sem suíte pesada). Executar sempre `bash {GRIMOIRE}/agents/scripts/validar-convencoes-diff.sh`; sem PHP/JS/TS alterado, o próprio script informa que não há arquivos para validar. Falha bloqueia entrega.
5. Checar que o diff não saiu do escopo nem sobrescreveu alterações do dev.

## Red flags — parar

- “já que estou aqui…”
- helper/abstração genérica
- plano ou subagent
- mais de um módulo sem o dev ter pedido
- a mudança revelou regra de negócio, risco ou escopo maior que um ajuste local

## Resposta

```markdown
## Quick fix concluído

### Alterações
- arquivo: o que mudou

### Contexto consultado
- arquivos lidos para definir o patch

### Verificações
- comando: resultado | não executado: motivo

### Observações
- Nenhuma | risco/limitação em uma linha
```
