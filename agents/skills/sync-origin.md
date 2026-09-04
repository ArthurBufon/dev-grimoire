---
name: sync-origin
description: >-
  Confirma um commit com todas as alterações elegíveis e sincroniza a branch
  atual com `origin`, resolvendo conflitos e validando o resultado. Use com
  "sync origin" ou "sincronizar origin". Não toca em outra branch.
---

# Sync Origin

## Objetivo

Na branch local atual, incluir todas as alterações elegíveis em um commit com
mensagem confirmada pelo dev e sincronizá-la com `origin/<branch-atual>`.
Funciona da mesma forma em qualquer branch, inclusive `main` e `master`.

## Limites

* Use somente o remoto `origin` e a branch atual; nunca troque, promova, mescle
  ou publique outra branch.
* Não faça rebase, force-push, reset, restore, clean ou stash.
* Inclua no commit todas as alterações elegíveis, inclusive as fora do escopo
  da feature e os arquivos não rastreados.
* Nunca adicione ou publique `.env`, credenciais, tokens, logs ou arquivos de
  build. Se algum deles já estiver staged, pare e peça instrução sem alterar o
  index.
* Antes de criar o commit de alterações pendentes, proponha uma mensagem no
  padrão `{TAREFA}: descrição objetiva e breve` e aguarde confirmação explícita
  ou uma mensagem ajustada pelo dev. Depois disso, merge e push são automáticos.
* Se uma resolução de conflito não puder ser validada, pare; não invente uma
  escolha de negócio para concluir o merge.

## Preparação

1. Resolver o Grimório via `{GRIMOIRE}/docs/rules/global.md`, ler `geral.md`,
   as rules da stack detectada e aplicar
   `{GRIMOIRE}/agents/fragments/gate-anti-slop.md`.
2. Registrar baseline com `git status --short`, `git diff --cached`, `git diff`
   e a lista de arquivos não rastreados. Alterações existentes pertencem ao dev.
3. Confirmar que `HEAD` está em uma branch local e que existe o remoto `origin`;
   branch destacada → parar e informar o estado.
4. Identificar os arquivos alterados e não rastreados. Excluir os arquivos
   proibidos pelos limites; se houver dúvida sobre um arquivo sensível, parar e
   pedir instrução.
5. Executar `bash {GRIMOIRE}/agents/scripts/validar-grimorio.sh` antes de
   propor o commit. Falha bloqueia commit e push; reportar a regra violada e
   aguardar decisão do dev quando a correção exigir escolha de produto ou padrão.

## Commit das pendências

1. Se não houver alteração elegível, pular esta seção.
2. Exibir a lista completa de arquivos que entrarão no commit e propor a
   mensagem conforme as regras Git do Grimório.
3. Aguardar confirmação explícita ou mensagem revisada pelo dev.
4. Adicionar todos os arquivos elegíveis e criar um único commit com a mensagem
   confirmada. Não dividir por feature nem deixar de fora arquivos fora do
   escopo.

## Sincronização

1. Executar `git fetch --prune origin`.
2. Se `origin/<branch-atual>` não existir, publicar a branch atual com upstream
   e confirmar os commits finais.
3. Se a referência remota estiver à frente e a local não tiver commits próprios,
   integrar com `git merge --ff-only origin/<branch-atual>`.
4. Se a branch local estiver à frente e a remota for ancestral, executar
   `git push origin <branch-atual>`.
5. Se os históricos divergirem, executar merge de `origin/<branch-atual>` na
   branch atual. Sem conflito, publicar o resultado. Com conflito, seguir a
   seção abaixo.

## Conflitos e validação

1. Inspecionar apenas os arquivos conflitantes e o contexto direto necessário
   para preservar os dois lados da alteração.
2. Resolver os conflitos no padrão do módulo e das rules lidas, sem refatorar
   trechos não conflitantes ou descartar alterações do dev.
3. Executar a validação mais específica disponível para as áreas afetadas. Sem
   validação disponível, ou se ela falhar, parar e relatar arquivos, conflito e
   resultado; não concluir o merge nem fazer push.
4. Com validação aprovada, concluir o merge, publicar a branch atual e confirmar
   que `HEAD` e `origin/<branch-atual>` apontam para o mesmo commit.

## Entrega

Informar: branch inicial, arquivos incluídos no commit ou ausência de
pendências, mensagem confirmada, comandos executados, validações, commits finais
de `HEAD` e `origin/<branch-atual>` e se a sincronização foi concluída ou em
qual passo parou. Não afirmar sucesso sem comparar os commits finais.
