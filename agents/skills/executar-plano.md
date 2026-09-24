---
name: executar-plano
description: >-
  Executa plano pronto em `docs/modelagem/{feature}/plano/` tarefa por tarefa com
  subagents. Triggers: "executar plano", "executar-plano".
---

# Executar Plano

## Proteção de diffs fora do plano (bloqueante)

O plano define **o que o executor pode alterar**; não define o estado completo que o worktree deve ter. Todo diff que não seja comprovadamente produzido pelo controlador ou por seus subagents durante a tarefa atual pertence ao dev e deve permanecer intacto — mesmo que surja depois de uma task concluída, entre checkpoints ou no mesmo arquivo alterado pelo executor.

* Vale para alterações staged, unstaged e untracked, anteriores ou concorrentes à execução.
* Diff fora do plano não é erro, sujeira nem regressão. Nunca o remova para “voltar ao plano”, limpar o worktree, facilitar revisão/testes ou encerrar a execução.
* É proibido apagar, reverter, sobrescrever ou neutralizar esse diff, inclusive por patch inverso, reescrita do arquivo, `git restore`, `git checkout --`, `git reset`, `git clean`, stash ou exclusão.
* Antes de cada task, registrar o estado atual; depois dela, atribuir ao executor somente os hunks que ele comprovadamente criou. Revisões e correções podem modificar apenas esses hunks e os novos hunks estritamente exigidos pela tarefa.
* Se um hunk misturar mudança da task com mudança paralela do dev e não houver separação inequívoca, parar e pedir instrução. Nunca escolher apagar a parte fora do plano.

Esta proteção prevalece sobre escopo mínimo, fidelidade ao plano, correções de revisão e limpeza de encerramento.

## Velocidade e tokens (bloqueante)

Vale para o controlador e para **todo** subagent. Pular qualidade para ir mais rápido é proibido: se o atalho piora o código, os testes ou a revisão, não usar.

1. **Caminho mais curto.** Entregar a tarefa no menor número de passos que ainda preserve o resultado correto e claro. Não explorar, reler, documentar, testar em largura nem lançar agentes extras quando isso não muda o diff, os testes da tarefa ou o veredito da revisão. Manter obrigatórios: leitura das rules/molde necessários à tarefa, ciclo implementador → revisor, testes pedidos pela tarefa, gate anti-slop e checkpoint do dev.
2. **Tokens só no que muda o resultado.** Ler só os arquivos da tarefa (Grep/Read pontual). Prompt de subagent: recorte da tarefa + paths — não colar skill, plano inteiro nem conteúdo de arquivos. Retorno em bullets curtos. Sem prosa de status, sem repetir contexto já lido nesta sessão, sem segundo passe “por garantia”.

## Dúvida bloqueante (bloqueante)

Dúvida importante ou que muda o resultado → **parar no meio da execução** e confirmar com o dev. Não assumir, não escolher “o mais provável”, não seguir a tarefa.

Vale para o controlador e para **todo** subagent. Subagent com dúvida → status `precisa contexto` e devolver; o controlador pergunta ao dev e só retoma depois da resposta explícita.

Não bloqueia detalhe trivial que não altera comportamento, arquivos ou testes. Velocidade e tokens **não** autorizam seguir com ambiguidade.

Exemplos: plano vs código; requisito faltando; duas interpretações plausíveis; decisão de produto/arquitetura; conflito com alteração do dev.

## Clareza do código (bloqueante)

Hierarquia de aceite, nesta ordem: **FUNCIONAL > QUALIDADE > FACILMENTE COMPREENSÍVEL PARA SERES HUMANOS > SEM OVERENGINEERING**. Todos os critérios são obrigatórios: passar nos testes ou funcionar não basta para aceitar código difícil de entender. Use a ordem para resolver escolhas entre soluções que atendem aos critérios anteriores, sem sacrificar correção ou qualidade para reduzir linhas ou abstrações.

* Gerar código cujo propósito, dados e fluxo principal uma pessoa consiga entender na primeira leitura. Preferir nomes claros, fluxo direto e estruturas já conhecidas no módulo.
* Evitar aninhamento, valores implícitos, condicionais compactas e controle de fluxo indireto quando dificultarem a leitura. Separar passos somente quando isso tornar a lógica mais clara.
* Usar abstrações e camadas apenas quando necessárias para os requisitos ou a qualidade. Comentários explicam decisões não óbvias; não devem compensar código difícil de ler.
* Antes de aceitar cada diff, reler o código novo como alguém que não o escreveu. Se for preciso reconstruir mentalmente o fluxo para entendê-lo, devolver para simplificação dentro do escopo e revisar novamente.

## Gate anti-slop (bloqueante)

**Leia e aplique** `{GRIMOIRE}/agents/fragments/gate-anti-slop.md` antes da primeira tarefa, ao montar prompts de subagents e ao aceitar cada entrega.

## Gate convenções de código (bloqueante)

**Leia e aplique** `{GRIMOIRE}/agents/fragments/gate-convencoes-codigo.md` antes da primeira tarefa PHP/JS e ao aceitar cada entrega.

Antes de **cada checkpoint** e no **encerramento**, executar automaticamente no repositório do app:

`bash {GRIMOIRE}/agents/scripts/validar-convencoes-diff.sh`

Falha bloqueia avanço até corrigir. Não pedir ao dev para rodar o script.

Hard gate desta skill — **não avance** se:

* implementador ou revisor entregar arquivos, abstrações ou refatorações além do plano;
* o diff incluir formatação, "limpeza" ou código não ligado à tarefa;
* implementador ou revisor apagar, reverter, sobrescrever ou neutralizar diff que não tenha sido produzido pelo executor, ainda que esse diff esteja fora do plano;
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

**Não usar:** sem artefato de plano; escopo ainda aberto.

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

Antes de cada tarefa, registrar também um baseline daquela tarefa. Antes de aplicar qualquer correção de subagent e antes de cada checkpoint, comparar o worktree com o baseline inicial e o da tarefa para separar os hunks exigidos pelo plano dos diffs feitos separadamente pelo dev. Nunca reverta, sobrescreva, descarte, neutralize ou exclua os diffs do dev. Se a tarefa tocar o mesmo arquivo, integre somente o trecho necessário e preserve o restante; conflito sem resolução inequívoca → parar e pedir instrução explícita ao dev.

Dúvida bloqueante/importante (incl. plano vs código) → parar e confirmar com o dev; não implementar chute.

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
- `[arquivo]` — [o que foi feito neste arquivo]
- Diff: [resumo objetivo do comportamento]

## Validações
- [comando]: [resultado]

## Decisões e bloqueios
- [decisão confirmada, risco ou "Nenhum"]

## Próxima ação
- [uma ação concreta]
```

Antes de cada checkpoint, bloqueio ou encerramento, atualizar **só as seções
que mudaram** nesta tarefa. Nas seções acumulativas (`Tarefas` concluídas,
`Alterações verificadas`, `Validações`), **acrescentar** o delta — não apagar
o histórico das tarefas anteriores. `Estado atual` e `Próxima ação` substituem
o valor corrente. `Decisões e bloqueios` só muda se houver novidade. Não
reescrever o arquivo inteiro nem seções estáveis. Em seguida executar o
validador. Falha de validação bloqueia o avanço até corrigir o handoff. O
diretório `docs/modelagem/{feature}/` já é removido no encerramento, portanto
o handoff não permanece como documentação do projeto.

## Ciclo por tarefa

1. Contexto mínimo — aplicar as duas regras de velocidade e tokens; não explorar além do que a tarefa exige.
2. Subagent **implementador** (checklist abaixo), priorizando código que seja claro na primeira leitura.
3. Validar diff + testes executados.
4. Subagent **revisor** (checklist abaixo).
5. Corrigir crítico/importante → re-revisar (máx. **2** rodadas por problema).
6. Ritual anti-slop no diff.
7. Executar `bash {GRIMOIRE}/agents/scripts/validar-convencoes-diff.sh` no repositório do app.
8. Atualizar e validar o handoff automático.
9. **CHECKPOINT** — parar; aguardar aprovação **explícita** do dev.
10. Só então próxima tarefa.

**Proibido:** encadear tarefas após revisão do subagent; aprovação por silêncio; checkpoint opcional em tarefa "pequena" ou "já revisada". Revisão do subagent **não substitui** checkpoint do dev.

Checkpoint incompleto **bloqueia** o avanço: sem o resumo de comportamento **e** sem um bullet por arquivo do diff da tarefa (path + o que foi feito), não pedir aprovação.

### Template de checkpoint

```markdown
## Task concluída — [nome]

### Alterações
- [o que a tarefa passou a fazer / deixou de fazer — comportamento, não path]

### Arquivos alterados
- `[arquivo]` — [o que foi feito neste arquivo]

### Verificações
- [comandos e resultado]

### Riscos
- [pontos de atenção]

### Handoff
- `docs/modelagem/{feature}/handoff/{feature}.md` — validado

Aguardando confirmação explícita do dev para avançar.
```

`Arquivos alterados` cobre **todo** o diff da tarefa (criados, editados, removidos). Um bullet por path; o texto diz o que mudou naquele arquivo, não o nome do módulo. Sem agrupamento tipo “backend” ou “forms”.

## Subagents

### Implementador — incluir no prompt

* Tarefa completa + arquivos + decisões anteriores + comandos de teste
* Ler: `gate-anti-slop.md`, `gate-convencoes-codigo.md`, `global.md`, rule da stack, e todo molde citado na tarefa (obrigatório se cria arquivo ou se o plano ancora no molde)
* Caminho mais curto + tokens só no que muda o resultado (regras do topo desta skill)
* Dúvida bloqueante/importante → parar, status `precisa contexto`; não chutar
* Proibido: commit, branch, formatadores, escopo extra e apagar/reverter/sobrescrever/neutralizar qualquer diff que o implementador não tenha produzido; o plano não autoriza limpar mudanças paralelas do dev, mesmo no mesmo arquivo ou feitas após uma task concluída
* Aplicar a hierarquia de aceite da seção **Clareza do código**; entregar código funcional, de qualidade e facilmente compreensível por pessoas, sem complexidade desnecessária
* Retorno: status (concluído/bloqueado/precisa contexto), um bullet por arquivo (`path` — o que foi feito), testes, riscos — bullets curtos, sem dump de arquivos

### Revisor — incluir no prompt

* Requisitos da tarefa + diff/arquivos alterados (paths, não colar o repositório)
* Caminho mais curto + tokens só no que muda o resultado (regras do topo desta skill)
* Implementação chutada sob dúvida bloqueante/importante = **crítico** (devolver; o controlador confirma com o dev)
* Verificar: plano, gate anti-slop, gate convenções, conformidade Dev Grimoire, bugs/regressões, escopo
* Aplicar a hierarquia de aceite da seção **Clareza do código**; código funcional mas humanamente difícil de compreender, ou com complexidade evitável, = **crítico**
* Slop ou não-conformidade com grimório = **crítico**
* Apagar, reverter, sobrescrever ou neutralizar diff não produzido pelo executor = **crítico**, mesmo que o resultado fique mais fiel ao plano; revisar o contexto completo sem propor correção fora dos hunks do executor e dos novos hunks estritamente exigidos pela tarefa
* Classificar: crítico / importante / menor
* Sem melhorias, refatorações ou preferência pessoal fora do escopo

## Testes

Regras detalhadas: gate anti-slop. TDD quando a tarefa pedir (bug, regra de negócio, regressão).

Cobrir cenários importantes da tarefa — não detalhes internos nem suíte ampla.

## Bloqueios

Tarefa bloqueada quando: dúvida bloqueante/importante; requisitos faltando; plano vs código inconsistente; dependência ausente; problema estrutural fora do escopo; decisão de produto/arquitetura necessária.

Parar no meio da execução, atualizar e validar o handoff, e perguntar ao dev: tarefa, problema, tentativas, decisão necessária. Não retomar sem resposta explícita.

## 🏁 Encerramento

Após todas as tarefas aprovadas:

1. Atualizar `docs/features/{entidade}/specs.md` quando a entrega mudar contexto, comportamento ou decisão permanente.
2. Um revisor novo confere plano, modelagem, spec atualizada e diff final; em seguida invoca `$check-slop` sobre o diff.
3. Executar `bash {GRIMOIRE}/agents/scripts/validar-convencoes-diff.sh` no repositório do app.
4. Slop, violação de convenções ou achado crítico/importante bloqueia o encerramento: corrigir somente dentro do escopo e repetir a revisão final (máx. 2 rodadas). Achado menor entra no relatório.
5. Se houver erro real, local e recorrente, sugerir no máximo uma `Lição ativa` no relatório. **Nunca** alterar `AGENTS.md` sem aprovação explícita do dev.
6. Executar a suíte de testes aplicável e revisar o diff completo.
7. Atualizar e validar o handoff final.
8. Excluir `docs/modelagem/{feature}/` por completo somente se o diretório contiver apenas os artefatos temporários cobertos pela execução. Se houver diff paralelo do dev nele, preservar e pedir instrução antes de qualquer exclusão.
9. Entregar o relatório final no formato abaixo. Usar linguagem simples, direta e fácil de entender, sem termos técnicos desnecessários. Em cada item de mudança, explicar claramente **como era antes** e **como é agora**.

Não afirmar conclusão sem verificar testes, diff final e exclusão dos artefatos temporários.

### 📋 Relatório final

```markdown
## ✅ Concluído

- [resumo simples do que foi entregue]

## 🔄 Como era antes / como é agora

- **[mudança]**
  - Antes: [comportamento anterior, em linguagem simples]
  - Agora: [novo comportamento, em linguagem simples]

## 📁 Arquivos alterados

- `[arquivo]` — [o que mudou]

## 🧪 Verificações

- `[comando]` — [resultado]

## 🔎 Revisão final

- [resultado da revisão e do check-slop]

## 💡 Lição ativa sugerida

- [lição ou “Nenhuma”]

## 📝 Decisões e pendências

- Decisões: [decisões confirmadas ou “Nenhuma”]
- Pendências menores: [itens ou “Nenhuma”]
- Bloqueios: [itens ou “Nenhum”]
```
