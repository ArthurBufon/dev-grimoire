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

**Fora:** arquitetura nova, várias features, refatoração ampla, plano ou subagents pedidos → sugerir `definir-plano`.

## Contrato

1. Pedido do chat > padrão do módulo alterado > Dev Grimoire (`../dev-grimoire/docs/rules/`) > AGENTS.md / User Rules.
2. Ler só o necessário: `geral.md` + rule da stack; spec em `docs/features/<feature>/specs.md` se existir; molde se **criar** arquivo.
3. Não expandir escopo, não “melhorar” o resto, não dependência nova, não arquivo fora do pedido.
4. Dúvida que muda comportamento → perguntar. Estilo → copiar o arquivo vizinho.

## Fluxo

1. Arquivos mínimos do pedido.
2. Patch no padrão existente.
3. Verificação proporcional (teste/lint/typecheck do que mudou; sem suíte pesada).
4. Checar que o diff não saiu do escopo.

## Red flags — parar

- “já que estou aqui…”
- helper/abstração genérica
- plano ou subagent
- mais de um módulo sem o dev ter pedido

## Resposta

```markdown
## Quick fix concluído

### Alterações
- arquivo: o que mudou

### Verificações
- comando: resultado

### Observações
- Nenhuma | risco/limitação em uma linha
```
