---
name: executar-plano
description: >-
  Executa plano pronto em `docs/modelagem/{feature}/plano/` tarefa por tarefa com
  subagents. Triggers: "executar plano", "executar-plano". Pipeline completo com
  revisão de spec + qualidade → `plan-execute-subagents`.
---

# Executar Plano

## Regra final

NUNCA desperdiçar tokens — sempre visar economia, mas mantendo qualidade de prompt/resultado.

## Gate anti-slop (bloqueante)

**Leia e aplique** `{GRIMOIRE}/agents/fragments/gate-anti-slop.md` antes da primeira tarefa, ao montar prompts de subagents e ao aceitar cada entrega.

Hard gate desta skill — **não avance** se:

* implementador ou revisor entregar arquivos, abstrações ou refatorações além do plano;
* o diff incluir formatação, "limpeza" ou código não ligado à tarefa;
* testes, factories ou mocks forem desproporcionais ao código alterado;
* o subagent propor "melhorias" fora do escopo — rejeite e peça diff mínimo;
* checkpoint ou relatório repetirem contexto em prosa longa.

**Por tarefa:** antes do checkpoint com o dev, execute o ritual de saída do fragmento sobre o diff. Slop detectado → devolver ao implementador antes de pedir aprovação.

Além do fragmento: uma tarefa por vez; subagent novo por tarefa; sem paralelismo no mesmo arquivo; sem branch/worktree/commit sem permissão; sem formatadores automáticos (Pint, Prettier, PHP CS Fixer, `eslint --fix` de estilo — ver `{GRIMOIRE}/docs/rules/php.md` se PHP).

Anunciar no início:

```text
Usando executar-plano para executar o plano.
```

## Objetivo

Executar um plano tarefa por tarefa, delegando para subagents e validando cada entrega antes de continuar.

> Um subagent implementa, outro revisa e o controlador coordena.

## Quando usar / não usar

**Usar:** plano pronto em `docs/modelagem/{feature}/plano/{feature}.md`; escopo fechado.

**Não usar:** sem artefato de plano; escopo ainda aberto; pipeline com revisão de spec + qualidade → `plan-execute-subagents`.

## Entrada

* Plano (obrigatório): `docs/modelagem/{feature}/plano/{feature}.md`
* Modelagem (se existir): `docs/modelagem/{feature}/modelagem/{feature}.md`

Artefatos em `docs/modelagem/{feature}/` são **temporários** — excluir por completo ao concluir; transferir o permanente para `docs/features/`.

## Dev Grimoire (obrigatório)

Implementador e revisor devem **ler via Read/Grep** antes de codar ou revisar:

* `{GRIMOIRE}/docs/rules/global.md` + rule da stack (`geral.md`, `php.md`, `javascript.md`)
* molde em `{GRIMOIRE}/moldes/` quando a tarefa cria arquivo novo (mapa em `global.md`)

Na revisão: validar conformidade contra esses artefatos — slop ou não-conformidade = **crítico**. Padrões consolidados no módulo alterado têm prioridade sobre molde.

Incluir path do molde no prompt quando aplicável. **Não copiar regras do skill no prompt — referenciar paths.**

## Preparação

Antes da primeira tarefa:

1. Ler o plano completo; identificar tarefas, ordem e dependências.
2. Registrar o baseline do worktree (`git status` e diffs staged, unstaged e untracked relevantes). Alterações existentes pertencem ao dev e devem ser preservadas; worktree sujo **não** bloqueia a execução.
3. Registrar tarefas já concluídas.

Antes de cada tarefa, de aplicar qualquer correção de subagent e de cada checkpoint, comparar o worktree com o baseline para identificar alterações concorrentes do dev. Nunca as reverta, sobrescreva, descarte ou exclua. Se a tarefa tocar o mesmo arquivo, integre somente o trecho necessário e preserve o restante; conflito sem resolução inequívoca → parar e pedir instrução explícita ao dev.

Plano contradiz código ou decisão impossível de inferir → perguntar ao dev antes de implementar.

## Ciclo por tarefa

1. Contexto mínimo — não explorar além do que a tarefa exige.
2. Subagent **implementador** (checklist abaixo).
3. Validar diff + testes executados.
4. Subagent **revisor** (checklist abaixo).
5. Corrigir crítico/importante → re-revisar (máx. **2** rodadas por problema).
6. Ritual anti-slop no diff.
7. **CHECKPOINT** — parar; aguardar aprovação **explícita** do dev.
8. Só então próxima tarefa.

**Proibido:** encadear tarefas após revisão do subagent; aprovação por silêncio; checkpoint opcional em tarefa "pequena" ou "já revisada". Revisão do subagent **não substitui** checkpoint do dev.

### Template de checkpoint

```markdown
## Task concluída — [nome]

### Alterações
- [arquivos/módulos]

### Verificações
- [comandos e resultado]

### Riscos
- [pontos de atenção]

Aguardando confirmação explícita do dev para avançar.
```

## Subagents

### Implementador — incluir no prompt

* Tarefa completa + arquivos + decisões anteriores + comandos de teste
* Ler: `gate-anti-slop.md`, `global.md`, rule da stack, molde (se arquivo novo)
* Proibido: commit, branch, formatadores, escopo extra e desfazer/sobrescrever/descartar alterações preexistentes ou concorrentes do dev
* Retorno: status (concluído/bloqueado/precisa contexto), arquivos, testes, riscos

### Revisor — incluir no prompt

* Requisitos da tarefa + diff/arquivos alterados
* Verificar: plano, gate anti-slop, conformidade Dev Grimoire, bugs/regressões, escopo
* Slop ou não-conformidade com grimório = **crítico**
* Regressão, remoção ou sobrescrita não autorizada de alteração preexistente ou concorrente do dev = **crítico**
* Classificar: crítico / importante / menor
* Sem melhorias, refatorações ou preferência pessoal fora do escopo

## Testes

Regras detalhadas: gate anti-slop. TDD quando a tarefa pedir (bug, regra de negócio, regressão).

Cobrir cenários importantes da tarefa — não detalhes internos nem suíte ampla.

## Bloqueios

Tarefa bloqueada quando: requisitos faltando; plano vs código inconsistente; dependência ausente; problema estrutural fora do escopo; decisão de produto/arquitetura necessária.

Reportar: tarefa, problema, tentativas, decisão necessária.

## Encerramento

Após todas as tarefas aprovadas:

1. Diff completo + suíte de testes aplicável.
2. Corrigir crítico/importante.
3. Atualizar `docs/features/{entidade}/specs.md`.
4. Excluir `docs/modelagem/{feature}/` por completo.
5. Relatar: tarefas, arquivos, testes, decisões, pendências menores, bloqueios.

Não afirmar conclusão sem verificar testes, diff final e exclusão dos artefatos temporários.
