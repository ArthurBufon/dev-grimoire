---
name: definir-escopo
description: Use when defining or refining complete functional and non-functional requirements for a feature before design, architecture, planning, or implementation.
---
# Definição de escopo (Requisitos + Especificações)

## Regra final

NUNCA desperdiçar tokens — sempre visar economia, mas mantendo qualidade de prompt/resultado.

## Objetivo
Definir, por interrogatório progressivo, todos os requisitos verificáveis de uma feature.
Descreva **o que** deve acontecer — nunca **como** será implementado.

## Artefato

Salve a especificação em:

`docs/modelagem/{feature}/escopo/{feature}.md`

Use o mesmo slug `{feature}` em todas as etapas do workflow (`definir-escopo` → `definir-design` → `definir-plano` → `executar-plano`).
`definir-design` é opcional conforme a triagem abaixo.

## Política de exclusão

Os arquivos em `docs/modelagem/{feature}/` são **artefatos temporários** de modelagem — não documentação permanente do projeto.

* Não versione conteúdo que deva permanecer no repositório dentro desses paths; transfira o que for necessário para `docs/features/` ou equivalente do projeto.
* Após a feature estar implementada e entregue, **exclua** `docs/modelagem/{feature}/` por completo para evitar lixo acumulado no repositório.
* Só mantenha os artefatos enquanto ainda forem necessários para as etapas seguintes do workflow.

## Triagem de intensidade (obrigatória)

Antes do interrogatório, classifique a feature após inspecionar o código/docs existentes. Anuncie o modo escolhido e o motivo em uma frase. Se o usuário discordar, ajuste.

| Modo | Quando | Ritual | Design depois? |
|---|---|---|---|
| **L** | CRUD/ajuste em padrão existente; decisões de comportamento claras ou inferíveis do código | 3–5 perguntas (até 3 agrupadas por mensagem); escopo curto | **Pular** `definir-design` — ir ao plano (ou `plan-simple-write` se o usuário preferir) |
| **M** | Regra de negócio nova, mas stack/padrão do projeto óbvios | Interrogatório nos blocos 1–3; bloco 4 só com sinal; uma pergunta por vez ou até 2 agrupadas | **Só se** houver decisão técnica não óbvia (modelo novo, contrato externo, trade-off real). Caso contrário, pular |
| **H** | Domínio novo, compliance, multi-ator, integração crítica ou muita ambiguidade | Interrogatório completo; uma pergunta por vez; aprofundar até ficar testável | **Sim** — seguir para `definir-design` antes do plano |

Na dúvida entre L e M, prefira **M**. Na dúvida entre M e H, prefira **H**.

Ao concluir o escopo, informe explicitamente o próximo passo recomendado (pular design → plano; ou seguir para design).

## Regras
* Antes de perguntar, inspecione código, docs, banco, testes e padrões já existentes no app relacionados ao tema.
* Reaproveite termos e regras já existentes quando válidos; não presuma que o comportamento atual está correto — aponte inconsistências para o usuário decidir.
* Pesquise práticas e normas atuais do domínio; cite fontes relevantes.
* Não proponha arquitetura, tabelas, endpoints, bibliotecas ou qualquer detalhe de implementação.
* Pode ancorar em padrão existente (“igual à feature Y / molde do módulo”) sem abrir design — isso não é implementação inventada.

## Condução do interrogatório
Conduza o interrogatório na intensidade do modo (L/M/H) até chegar a um entendimento compartilhado. Resolva dependências entre decisões na ordem dos blocos.

* **Perguntas** — objetiva, com alternativas concretas quando possível. Modo **H**: uma por vez. Modos **L/M**: agrupe conforme a triagem, desde que não haja dependência forte entre as decisões.
* **Recomendação em cada pergunta** — para cada decisão em aberto, apresente sua resposta recomendada e o motivo.
* **Explore antes de perguntar** — se a resposta puder ser obtida inspecionando código, docs, banco ou testes, faça isso em vez de perguntar.
* **Pressione o vago** — questione respostas vagas, ambíguas ou contraditórias até ficarem verificáveis.
* **Suficiência** — encerre quando o comportamento for testável e não houver decisão aberta que mude aceite. Prefira hipótese recomendada + confirmação a interrogatório longo (exceto modo **H**, onde a profundidade é o default).

### Critério de encerramento
Antes de produzir a especificação, apresente um resumo **Entendimento compartilhado** cobrindo problema, atores, regras, fluxos e — se aplicável — efeitos colaterais/NFRs. Em modo **L**, use 5–8 bullets. Só prossiga para a saída final após confirmação explícita do usuário. Se algo mudar na confirmação, retome o interrogatório no bloco afetado.

Checklist interno antes de fechar (não é etapa de entrevista): falta algo? há contradição ou duplicidade? há decisão de design disfarçada de requisito?

## Blocos do interrogatório
Percorra nesta ordem. Aprofunde cada bloco até as decisões relevantes do modo atual; não invente profundidade onde não há sinal.

1. **Problema e escopo** — que problema resolve, para quem, e o que fica de fora.
2. **Atores e fluxo** — perfis/permissões; evento que inicia; caminho principal; erros, cancelamentos e retomadas **relevantes** (não enumerate exceções hipotéticas sem sinal).
3. **Dados e regras** — campos, obrigatoriedade, validações, limites, estados e transições que mudam comportamento.
4. **Colaterais e NFRs** — *somente se houver sinal* (notificação, auditoria, integração, dados históricos/retrocompatibilidade, prazo/fuso, segurança/privacidade, acessibilidade, desempenho, concorrência). Sem sinal: registre “não aplicável / sem requisitos especiais” e siga.

## Saída final
Produza a especificação com:
- Contexto, objetivo e glossário
- Atores e permissões
- Requisitos funcionais e regras de negócio (numerados, atômicos, testáveis)
- Estados, transições e validações
- Fluxos (principal, alternativos, exceções)
- Requisitos não funcionais e integrações
- Critérios de aceitação em Given/When/Then
- Fora de escopo, dúvidas resolvidas e fontes consultadas
- Modo de triagem (L/M/H) e se `definir-design` foi recomendado ou pulado

Revise ao final procurando lacunas, contradições, duplicidades e requisitos que na verdade são decisões de implementação.

Salve o documento em `docs/modelagem/{feature}/escopo/{feature}.md` e informe o path ao concluir.
