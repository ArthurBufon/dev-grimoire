---
name: check-slop
description: "Revisa código, diffs e artefatos em busca de complexidade desnecessária, falta de clareza e overengineering. Relata por padrão; só corrige quando o usuário pedir explicitamente."
---

# Check Slop

## Contexto

Leia e aplique `{GRIMOIRE}/agents/fragments/gate-anti-slop.md` e `{GRIMOIRE}/agents/fragments/gate-convencoes-codigo.md`. Use como referência o pedido, a modelagem ou o plano aplicável, as instruções locais e os padrões existentes nos arquivos analisados.

Se o diff incluir PHP ou Queries JS/TS, executar automaticamente `bash {GRIMOIRE}/agents/scripts/validar-convencoes-diff.sh` no repositório analisado; falha = `BLOQUEADO`.

## Limite de atuação

Por padrão, apenas relate os achados. Só altere arquivos quando o usuário pedir explicitamente a correção; nesse caso, aplique o menor ajuste suficiente.

## Fluxo

1. Analise somente o artefato ou diff indicado. Sem alvo explícito, use as alterações atuais do repositório.
2. Relacione cada arquivo ou trecho ao requisito que o justifica.
3. Aplique o teste de remoção do gate e compare com a solução direta já usada no módulo.
4. Identifique como slop todo item sem requisito, benefício verificável ou necessidade concreta.

## Resposta

- Sem achados: `APROVADO — nenhum slop detectado.`
- Com achados: `BLOQUEADO`, seguido de um bullet por ocorrência no formato `arquivo:linha — excesso — por que não se justifica — corte mínimo`.

Não acrescente elogios, recapitulação do contexto ou melhorias opcionais.
