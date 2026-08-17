# Gate Anti-Slop

## O que é

**AI slop** = complexidade, texto e código que LLMs produzem por reflexo — não porque o pedido exige.

LLMs tendem ao caminho mais complexo: camadas extras, abstrações prematuras, documentação inflada, testes em matriz, refatoração de brinde, patterns "enterprise" e verbosidade. Este gate é **bloqueante**: nenhuma saída avança sem passar.

## Regra-mãe

**Se não está ligado a um requisito verificável do pedido, da modelagem ou do plano, não entra.**

Na dúvida: **corte**. Pergunte ao dev só se cortar mudar comportamento ou decisão real.

## Red flags — bloquear imediatamente

### Arquitetura e código

- Abstrações, base classes, interfaces, traits ou generics "para o futuro"
- Camadas extras (Repository, DTO, Presenter, Handler chain, ServiceLocator) sem requisito explícito
- Helpers, utilities ou módulos genéricos "reutilizáveis" não pedidos
- Novos arquivos quando alterar um existente basta
- Refatoração, renomeação, modernização ou "limpeza" fora do escopo
- Dependências novas para problema trivial
- Feature flags, config ou env para o que pode ser constante
- Error handling para cenários impossíveis ou extremamente improváveis
- Retry, circuit breaker, cache ou fila "por precaução"
- Patterns enterprise (event sourcing, CQRS, microservices) sem sinal no pedido
- Reformatar ou "normalizar" arquivos tocados fora do diff necessário

### Plano, modelagem e documentação

- Seções, bullets ou parágrafos que repetem o óbvio ou enchem volume
- Passos de exploração, auditoria, spike ou "revisar arquitetura" não pedidos
- Tarefas granulares demais (micro-passos que poderiam ser um)
- Duplicar o mesmo cenário em unit + feature + integração
- Matriz de edge cases, combinações "por precaução" ou cenários hipotéticos
- Assinaturas ou código completo quando o molde ou padrão do módulo já define
- Diagramas, tabelas ou ASCII art que não eliminam ambiguidade real
- Várias alternativas quando uma decisão já foi tomada
- NFRs, colaterais ou design técnico sem sinal concreto no pedido
- `TBD`, `TODO`, placeholders ou "implementar depois"

### Execução e comunicação

- Comentários explicando o óbvio
- Logs ou debug temporários no código entregue
- Testes de getters/setters, métodos privados ou detalhes internos
- Factories, fixtures ou scaffolding de teste maiores que o código testado
- Respostas longas repetindo contexto já dado
- "Melhorias", refatorações ou sugestões não solicitadas
- Meta de cobertura percentual ou "testar tudo que o diff tocar"

## Ritual de saída (obrigatório)

Antes de entregar **qualquer** artefato ou mensagem substancial, execute internamente:

```text
Gate anti-slop:
- Cortei: [itens removidos ou "nada"]
- Mantive porque o pedido exige: [lista mínima]
- Complexidade rejeitada: [o que quase entrou e por quê não]
```

Se "Mantive" tiver item sem ligação clara ao pedido → volte e corte.

## Escalonamento

- **Slop detectado no fluxo:** pare, corte, simplifique — não documente a complexidade extra.
- **Slop por ambiguidade real:** uma pergunta objetiva ao dev — não invente camada extra.
- **Slop em artefato de outro agente:** rejeite; exija revisão enxuta antes de continuar.
