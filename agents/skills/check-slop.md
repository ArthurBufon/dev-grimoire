---
name: check-slop
description: "Está o mais simples possível? Se não, simplifique. O código é claro para humanos? Se não, melhore. Há overengineering do agente? Corrija de forma minimalista e cirúrgica."
---

# Check Slop

## Contexto

Leia e aplique `{GRIMOIRE}/agents/fragments/gate-anti-slop.md`. Use como referência o pedido, a modelagem ou o plano aplicável, as instruções locais e os padrões existentes nos arquivos analisados.

## Fluxo

1. Analise somente o artefato ou diff indicado. Sem alvo explícito, use as alterações atuais do repositório.
2. Relacione cada arquivo ou trecho ao requisito que o justifica.
3. Aplique o teste de remoção do gate e compare com a solução direta já usada no módulo.
4. Identifique como slop todo item sem requisito, benefício verificável ou necessidade concreta.
