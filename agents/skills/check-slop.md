---
name: check-slop
description: "Revisa conteúdo colado na invocação, prompts, código, diffs e outros artefatos em busca de AI slop, complexidade desnecessária, falta de clareza e overengineering. Relata por padrão; só corrige quando o usuário pedir explicitamente."
---

# Check Slop

## Contexto

Leia e aplique `{GRIMOIRE}/agents/fragments/gate-anti-slop.md` e `{GRIMOIRE}/agents/fragments/gate-convencoes-codigo.md`. Use como referência o pedido, a modelagem ou o plano aplicável, as instruções locais e os padrões existentes nos arquivos analisados.

Se o diff incluir PHP ou Queries JS/TS, executar automaticamente `bash {GRIMOIRE}/agents/scripts/validar-convencoes-diff.sh` no repositório analisado; falha = `BLOQUEADO`.

## Limite de atuação

Por padrão, apenas relate os achados. Só altere arquivos quando o usuário pedir explicitamente a correção; nesse caso, aplique o menor ajuste suficiente.

## Fluxo

1. Se houver conteúdo após a invocação, trate-o como o alvo completo e prioritário, inclusive quando for um prompt ou texto copiado e colado. Caso contrário, analise somente o artefato ou diff indicado; sem alvo explícito, use as alterações atuais do repositório.
2. Relacione cada arquivo, seção ou trecho ao requisito que o justifica.
3. Aplique o teste de remoção do gate. Quando o alvo for código, compare também com a solução direta já usada no módulo.
4. Indique como AI slop todo item sem requisito, benefício verificável ou necessidade concreta, explicando objetivamente por que ele não faz sentido.

## Resposta

- Sem achados: `APROVADO — nenhum slop detectado.`
- Com achados: `BLOQUEADO`, seguido de um bullet por ocorrência no formato `arquivo:linha ou trecho — ponto de AI slop — por que não faz sentido — corte mínimo`.

Em conteúdo colado sem numeração de linhas, localize cada ocorrência por uma seção ou trecho curto reconhecível.

Não acrescente elogios, recapitulação do contexto ou melhorias opcionais.
