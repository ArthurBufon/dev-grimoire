---
name: check-overengineering
description: >-
  Revisa texto enviado ou artefato indicado exclusivamente para apontar
  complexidade desnecessária. Use check-slop para revisão ampla de AI slop e clareza.
---
Analise o texto passado na invocação ou leia o artefato indicado; sem alvo acessível, peça o texto ou caminho.
Quando o alvo pertencer a um repositório, consulte somente o pedido, as instruções locais, a spec aplicável e os padrões do módulo necessários para decidir se a complexidade é removível.
Leia e aplique `{GRIMOIRE}/agents/fragments/gate-anti-slop.md`.
Aponte apenas complexidade removível sem prejudicar os critérios anteriores. Para cada achado, informe a localização, a complexidade observada, a simplificação mínima e por que ela preserva funcionalidade, qualidade e clareza humana.
Responda brevemente; se não houver achados, diga isso. Não altere o artefato sem pedido explícito.
