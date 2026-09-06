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

## Clareza do código (bloqueante)

O código gerado deve ser o mais simples possível e compreensível por uma pessoa na primeira leitura. Clareza para humanos tem prioridade sobre soluções engenhosas, genéricas ou excessivamente compactas.

* Preferir fluxo linear, nomes que expliquem intenção e estruturas já conhecidas no módulo.
* Não criar abstrações, helpers, camadas, condicionais compactas ou controle de fluxo indireto quando uma solução direta for mais clara.
* Evitar aninhamento desnecessário, valores implícitos e lógica que exija dedução para ser entendida.
* Comentários explicam decisões não óbvias; não devem compensar código difícil de ler.
* Se a implementação nova não puder ser entendida de primeira, simplificá-la dentro do escopo da tarefa antes de aceitá-la.

## Gate anti-slop (bloqueante)

**Leia e aplique** `{GRIMOIRE}/agents/fragments/gate-anti-slop.md` antes da primeira tarefa, ao montar prompts de subagents e ao aceitar cada entrega.

Hard gate desta skill — **não avance** se:

* implementador ou revisor entregar arquivos, abstrações ou refatorações além do plano;
* o diff incluir formatação, "limpeza" ou código não ligado à tarefa;
* o código novo exigir interpretação, rastreamento indireto ou conhecimento implícito para entender seu fluxo básico;
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
* Handoff (automático): `docs/modelagem/{feature}/handoff/{feature}.md`

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
2. Se existir handoff, validar com `bash {GRIMOIRE}/agents/scripts/validar-handoff.sh docs/modelagem/{feature}/handoff/{feature}.md`, lê-lo e conferir seu estado contra Git e código. Git e código são a fonte de verdade; divergência → atualizar o handoff antes de seguir.
3. Registrar o baseline do worktree (`git status` e diffs staged, unstaged e untracked relevantes). Alterações existentes pertencem ao dev e devem ser preservadas; worktree sujo **não** bloqueia a execução.
4. Criar ou atualizar o handoff automaticamente. Nunca pedir essa ação ao dev.
5. Registrar tarefas já concluídas.

Antes de cada tarefa, de aplicar qualquer correção de subagent e de cada checkpoint, comparar o worktree com o baseline para identificar alterações concorrentes do dev. Nunca as reverta, sobrescreva, descarte ou exclua. Se a tarefa tocar o mesmo arquivo, integre somente o trecho necessário e preserve o restante; conflito sem resolução inequívoca → parar e pedir instrução explícita ao dev.

Plano contradiz código ou decisão impossível de inferir → perguntar ao dev antes de implementar.

## Handoff automático

O handoff existe somente para retomar execução após troca de sessão ou agente. Ele
não cria tarefa, não substitui checkpoint e não exige ação do dev.

```markdown
# Handoff de execução: {feature}

## Estado atual
- Plano: `...`
- Baseline Git: [commit/status e alterações do dev preservadas]
- Última tarefa: [concluída | bloqueada | aguardando aprovação]

## Tarefas
- Concluídas: ...
- Atual: ...
- Próxima: ...

## Alterações verificadas
- Arquivos: ...
- Diff: [resumo objetivo]

## Validações
- [comando]: [resultado]

## Decisões e bloqueios
- [decisão confirmada, risco ou "Nenhum"]

## Próxima ação
- [uma ação concreta]
```

Antes de cada checkpoint, bloqueio ou encerramento, atualizar esse arquivo e
executar o validador. Falha de validação bloqueia o avanço até corrigir o
handoff. O diretório `docs/modelagem/{feature}/` já é removido no encerramento,
portanto o handoff não permanece como documentação do projeto.

## Ciclo por tarefa

1. Contexto mínimo — não explorar além do que a tarefa exige.
2. Subagent **implementador** (checklist abaixo), priorizando código que seja claro na primeira leitura.
3. Validar diff + testes executados.
4. Subagent **revisor** (checklist abaixo).
5. Corrigir crítico/importante → re-revisar (máx. **2** rodadas por problema).
6. Ritual anti-slop no diff.
7. Atualizar e validar o handoff automático.
8. **CHECKPOINT** — parar; aguardar aprovação **explícita** do dev.
9. Só então próxima tarefa.

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

### Handoff
- `docs/modelagem/{feature}/handoff/{feature}.md` — validado

Aguardando confirmação explícita do dev para avançar.
```

## Subagents

### Implementador — incluir no prompt

* Tarefa completa + arquivos + decisões anteriores + comandos de teste
* Ler: `gate-anti-slop.md`, `global.md`, rule da stack, molde (se arquivo novo)
* Proibido: commit, branch, formatadores, escopo extra e desfazer/sobrescrever/descartar alterações preexistentes ou concorrentes do dev
* Implementar a solução mais direta e legível; o fluxo principal deve ser compreensível na primeira leitura, sem abstrações prematuras ou lógica indireta
* Retorno: status (concluído/bloqueado/precisa contexto), arquivos, testes, riscos

### Revisor — incluir no prompt

* Requisitos da tarefa + diff/arquivos alterados
* Verificar: plano, gate anti-slop, conformidade Dev Grimoire, bugs/regressões, escopo
* Verificar se o fluxo e a intenção do código novo são compreensíveis na primeira leitura; complexidade ou indireção evitável = **crítico**
* Slop ou não-conformidade com grimório = **crítico**
* Regressão, remoção ou sobrescrita não autorizada de alteração preexistente ou concorrente do dev = **crítico**
* Classificar: crítico / importante / menor
* Sem melhorias, refatorações ou preferência pessoal fora do escopo

## Testes

Regras detalhadas: gate anti-slop. TDD quando a tarefa pedir (bug, regra de negócio, regressão).

Cobrir cenários importantes da tarefa — não detalhes internos nem suíte ampla.

## Bloqueios

Tarefa bloqueada quando: requisitos faltando; plano vs código inconsistente; dependência ausente; problema estrutural fora do escopo; decisão de produto/arquitetura necessária.

Atualizar e validar o handoff antes de reportar: tarefa, problema, tentativas,
decisão necessária.

## Encerramento

Após todas as tarefas aprovadas:

1. Atualizar `docs/features/{entidade}/specs.md` quando a entrega mudar contexto, comportamento ou decisão permanente.
2. Um revisor novo confere plano, modelagem, spec atualizada e diff final; em seguida invoca `$check-slop` sobre o diff.
3. Slop ou achado crítico/importante bloqueia o encerramento: corrigir somente dentro do escopo e repetir a revisão final (máx. 2 rodadas). Achado menor entra no relatório.
4. Executar a suíte de testes aplicável e revisar o diff completo.
5. Atualizar e validar o handoff final.
6. Excluir `docs/modelagem/{feature}/` por completo.
7. Relatar: tarefas, arquivos, testes, revisão final, decisões, pendências menores e bloqueios.

Não afirmar conclusão sem verificar testes, diff final e exclusão dos artefatos temporários.
