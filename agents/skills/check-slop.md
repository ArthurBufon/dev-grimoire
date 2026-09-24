---
name: check-slop
description: Revisa o alvo indicado ou o contexto relevante da sessão em busca de AI slop, falta de clareza, complexidade desnecessária e overengineering. Relata por padrão; só corrige quando solicitado.
---
# Check Slop
Leia e aplique `{GRIMOIRE}/agents/fragments/gate-anti-slop.md` e `{GRIMOIRE}/agents/fragments/gate-convencoes-codigo.md`. Use como referência o pedido, a modelagem ou o plano aplicável, as instruções locais e os padrões existentes nos arquivos analisados.
Se a invocação incluir conteúdo ou indicar um artefato acessível, analise somente esse alvo. Sem alvo, escolha o contexto mais relevante da sessão atual; não peça um alvo apenas por ele estar ausente.
Relacione cada trecho ao requisito ou à necessidade de clareza que o justifica e aplique o teste de remoção sem prejudicar funcionalidade, qualidade ou compreensão humana.
Se o pedido restringir a revisão a overengineering, relate somente complexidade removível; caso contrário, revise também AI slop, clareza e convenções aplicáveis.
Se o alvo for um diff com PHP ou Queries JS/TS, execute `bash {GRIMOIRE}/agents/scripts/validar-convencoes-diff.sh`; falha = `BLOQUEADO`.
Por padrão, apenas relate. Só altere arquivos quando o usuário pedir correção; aplique então o menor ajuste suficiente e a validação mais específica disponível.

- Sem achados: `APROVADO — nenhum slop detectado.`
- Com achados: `BLOQUEADO`, seguido de um bullet por ocorrência no formato `arquivo:linha ou trecho — ponto de AI slop — por que não faz sentido — corte mínimo`.
Não acrescente elogios, recapitulação do contexto ou melhorias opcionais.
