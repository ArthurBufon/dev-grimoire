---
name: definir-plano-simples
description: >-
  Plano objetivo para mudanças de escopo claro, incluindo ajustes que afetam mais
  de um arquivo ou módulo. Use após quick-fix escalar uma tarefa. Dúvida bloqueante
  ou alto risco → definir-modelagem; escopo claro → plano direto.
---

# Definir Plano Simples

## Regra final

NUNCA desperdiçar tokens — sempre visar economia, mas mantendo qualidade de prompt/resultado.

## Gate anti-slop (bloqueante)

**Leia e aplique** `{GRIMOIRE}/agents/fragments/gate-anti-slop.md` antes de gerar o plano e antes de salvar o artefato.

Hard gate desta skill — **não avance** se:

* o plano tiver mais passos de implementação do que a tarefa simples exige (prefira 1–3 passos diretos);
* a seção de testes/validação listar mais itens do que passos de implementação;
* surgirem arquivos, camadas, refatorações ou explorações não pedidas;
* código de exemplo, assinaturas ou diagramas duplicarem o que o molde/padrão do módulo já define;
* restrições globais ou checklist repetirem o fragmento em prosa longa.

Ritual obrigatório antes de salvar: executar o ritual de saída do fragmento; confirmar escopo ↔ passos, paths reais, Git e exclusão de `docs/modelagem/{feature}/`. Plano simples = plano **curto**; se o documento parecer "feature completa", corte até caber em tarefa pontual.

Além do fragmento: não implementar código; não expandir escopo; dúvida bloqueante → ver seção abaixo.

Anunciar no início:

```text
Usando definir-plano-simples para gerar o plano.
```

Crie somente o plano. Não implemente código durante este fluxo.

## Objetivo

Transformar decisões já tomadas (ou tarefas pontuais com escopo claro) em um plano executável, direto e com alterações mínimas.

Esta skill cobre ajustes, correções, extensões e tarefas objetivas com escopo claro — inclusive quando afetam mais de um arquivo ou módulo. **Não** cobre features inteiras nem mudanças de alto risco. Para esses casos, use `definir-modelagem` → `definir-plano`.

## Quando usar / não usar

**Usar:** escopo já decidido na conversa; fix, ajuste, validação, endpoint simples ou mudança delimitada que `quick-fix` escalou por não ser mais local.

**Não usar:** feature inteira, escopo ambíguo, arquitetura, migração, permissões, financeiro ou workflow completo — nesses casos, sugerir `definir-modelagem`.

## Antes do plano

* Escopo 100% claro na conversa → plano direto.
* Dúvida **bloqueante** de escopo pontual → `grill-me` ou **uma** pergunta objetiva.
* Dúvida de domínio, impacto ou arquitetura → parar e sugerir `definir-modelagem`.
* Premissa só para fato técnico verificável no código; dúvida de comportamento → perguntar.

## Contexto obrigatório

Antes de escrever o plano, inspecione:

1. Regras do projeto: `AGENTS.md`, `CLAUDE.md`, `.cursor/rules/` ou equivalentes.
2. **Dev Grimoire** (`../dev-grimoire/`): `{GRIMOIRE}/docs/rules/global.md` e rules da stack — leitura via Read/Grep; nunca assumir conteúdo sem ler o filesystem.
3. Specs permanentes em `docs/features/{entidade}/specs.md`, se existirem.
4. Codebase: estrutura, padrões reais e arquivos semelhantes ao que será alterado.

Priorize: (1) arquivo mais parecido no módulo alterado; (2) molde em `{GRIMOIRE}/moldes/` se arquivo novo — cite path do molde no plano.

Não inventar arquitetura, nomenclatura ou ferramentas. Padrões consolidados no módulo alterado têm prioridade sobre moldes do Dev Grimoire.

## Artefato

Salve o plano em:

`docs/modelagem/{feature}/plano/{feature}.md`

Use slug `{feature}` em kebab-case. Se o diretório não existir, crie antes de salvar.

**Paths proibidos:** `docs/superpowers/`, `docs/plans/` ou qualquer local fora de `docs/modelagem/{feature}/plano/`.

Artefatos em `docs/modelagem/{feature}/` são **temporários** — atualizar `docs/features/{entidade}/specs.md` só após implementação; depois, excluir `docs/modelagem/{feature}/` por completo.

## Política Git

* Branch de dev existente (`dev`, `desenvolvimento`, `develop` ou equivalente).
* Proibido: `feature/*`, `fix/*`, commits e push durante implementação.
* Final: `git status` + revisão individual de cada arquivo.
* Commits, push ou alteração de histórico só com autorização explícita.
* Registrar baseline do worktree antes da execução e preservar qualquer alteração preexistente ou concorrente do dev, mesmo fora do escopo. Nunca reverter, sobrescrever ou descartar essas alterações; conflito sem resolução inequívoca → parar e pedir instrução.

## Estrutura do documento

Template mínimo — omitir seções vazias. Não copiar regras do skill/gate para o plano.

```markdown
# Plano — [nome curto]

**Objetivo:** [resultado em uma frase]

## Contexto decidido

Resumo do que já foi decidido na conversa ou na spec existente.

## Premissas

[só se houver; omitir seção se vazia]

## Escopo / Fora do escopo

- Implementar: …
- Não fazer: …

## Passos (1–3)

### 1. [verbo + entrega]

- Arquivos: `caminho/exato` — [criar|alterar]
- Resultado: …

## Validação

- Comando: `[teste/build/lint real do projeto]`
- Manual: …
- Testes (mínimo): [≤ nº de passos; ver gate anti-slop]

## Execução

- Branch: `[dev/desenvolvimento/develop/etc.]`
- Convenções: seguir `{GRIMOIRE}/docs/rules/global.md` + molde citado por passo
- Alterações do dev: registrar baseline e preservar alterações preexistentes ou concorrentes; nunca desfazer mudanças fora do escopo
- Pós: atualizar `docs/features/{entidade}/specs.md` quando relevante; revisor novo confere plano, spec e diff final e invoca `$check-slop`; achado crítico/importante ou slop bloqueia o encerramento até correção dentro do escopo
- Só então: validar handoff; excluir `docs/modelagem/{feature}/`
- Checklist: implementado · testes · git status · revisão arquivo a arquivo · sem commit/push
```

## Testes (mínimo)

Regras detalhadas: gate anti-slop. No plano, listar **no máximo** tantos itens quanto passos de implementação.

Incluir só: 1 fluxo feliz + 1 regra crítica ou erro relevante (se aplicável).

Não incluir: matriz de edge cases, duplicar níveis (unit+feature), cobertura %, mocks/scaffolding maiores que o ajuste.

## Critério de conclusão

A skill termina quando o plano estiver salvo em `docs/modelagem/{feature}/plano/{feature}.md`.

Encerrar com:

```markdown
## Plano concluído

- **Plano temporário:** `docs/modelagem/{feature}/plano/{feature}.md`
- **Branch de execução:** [dev/desenvolvimento/develop/etc.]
- **Spec pós-implementação:** `docs/features/{entidade}/specs.md`
- **Próximo passo:** executar o plano em etapa separada
```
