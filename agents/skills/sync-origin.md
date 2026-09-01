---
name: sync-origin
description: >-
  Sincroniza com segurança a branch atual com `origin`. Em uma branch de
  desenvolvimento, publica a branch e também atualiza a branch principal
  (`main` ou `master`). Use com "sync origin", "sincronizar origin" ou
  "atualizar dev e main". Não faz force-push nem resolve conflitos sozinho.
---

# Sync Origin

## Objetivo

Deixar a branch local atual e sua contraparte em `origin` alinhadas. Em uma
branch de desenvolvimento, deixar também a branch principal remota contendo as
alterações da branch de desenvolvimento.

## Limites

* Use somente o remoto `origin`.
* Não criar commits, fazer rebase, force-push, sobrescrever alterações locais ou
  resolver conflitos automaticamente.
* Antes de qualquer merge, troca de branch ou push, mostrar a sequência que
  será executada e pedir confirmação explícita do dev.
* Se houver worktree sujo, commits divergentes, conflito ou rejeição de push,
  parar e informar o estado e a decisão necessária.

## Preparação

1. Ler e aplicar `../dev-grimoire/docs/rules/geral.md` e
   `{GRIMOIRE}/agents/fragments/gate-anti-slop.md`.
2. Registrar o baseline com `git status --short`, `git diff --cached` e
   `git diff`. Alterações preexistentes pertencem ao dev.
3. Exigir worktree limpo antes de sincronizar. Não usar stash, restore, reset ou
   clean para obtê-lo.
4. Confirmar que existe o remoto `origin`, identificar a branch atual e executar
   `git fetch --prune origin` para atualizar todas as referências remotas.
5. Identificar a branch principal: preferir `origin/main`; se ela não existir,
   usar `origin/master`. Se nenhuma existir, parar.

## Branch principal (`main` ou `master`)

Quando a branch atual for a principal:

1. Verificar a relação entre a branch local e `origin/<principal>`.
2. Se `origin/<principal>` estiver à frente, aplicar somente
   `git merge --ff-only origin/<principal>`.
3. Se os históricos divergirem, parar: a estratégia de integração precisa de
   decisão explícita do dev.
4. Se a branch local estiver à frente, executar `git push origin <principal>`.
5. Confirmar que `HEAD` e `origin/<principal>` apontam para o mesmo commit.

## Branch de desenvolvimento

Tratar `dev`, `develop` e `desenvolvimento` como branches de desenvolvimento.
Em qualquer outra branch, parar e pedir que o dev confirme se ela deve seguir o
mesmo fluxo; não presumir que uma feature branch deve atualizar a principal.

Depois da confirmação solicitada nos limites:

1. Se `origin/<branch-atual>` existir, integrar apenas avanços lineares com
   `git merge --ff-only origin/<branch-atual>`. Se não existir, registrar que o
   primeiro push criará a branch remota.
2. Se a branch atual e `origin/<branch-atual>` divergirem, parar. Não escolher
   merge ou rebase sem o dev.
3. Integrar `origin/<principal>` na branch de desenvolvimento com
   `git merge --no-edit origin/<principal>`. Conflito ou merge recusado: parar,
   preservando o estado para o dev resolver.
4. Publicar a branch de desenvolvimento com
   `git push origin <branch-atual>`.
5. Trocar para a branch principal local. Se ela não existir, criar seu tracking
   a partir de `origin/<principal>`; se existir, atualizá-la somente por
   `git merge --ff-only origin/<principal>`.
6. Aplicar `git merge --ff-only <branch-atual>` na principal e executar
   `git push origin <principal>`. Como a principal entrou antes na branch de
   desenvolvimento, essa promoção deve ser linear.
7. Voltar à branch de desenvolvimento original e confirmar que ela, a principal
   local e as duas referências `origin` apontam para o mesmo commit.

## Entrega

Informar: branch inicial, branch principal detectada, comandos executados,
commits finais de cada referência e se a sincronização foi concluída ou em qual
passo parou. Não afirmar sucesso sem comparar os commits finais.
