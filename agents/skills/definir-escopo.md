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

## Política de exclusão

Os arquivos em `docs/modelagem/{feature}/` são **artefatos temporários** de modelagem — não documentação permanente do projeto.

* Não versione conteúdo que deva permanecer no repositório dentro desses paths; transfira o que for necessário para `docs/features/` ou equivalente do projeto.
* Após a feature estar implementada e entregue, **exclua** `docs/modelagem/{feature}/` por completo para evitar lixo acumulado no repositório.
* Só mantenha os artefatos enquanto ainda forem necessários para as etapas seguintes do workflow.

## Regras
* Antes de perguntar, inspecione código, docs, banco, testes e padrões já existentes no app relacionados ao tema.
* Reaproveite termos e regras já existentes quando válidos; não presuma que o comportamento atual está correto — aponte inconsistências para o usuário decidir.
* Pesquise práticas e normas atuais do domínio; cite fontes relevantes.
* Não proponha arquitetura, tabelas, endpoints, bibliotecas ou qualquer detalhe de implementação.

## Condução do interrogatório
Entreviste incansavelmente sobre cada aspecto do escopo até chegar a um entendimento compartilhado. Percorra cada ramo da árvore de requisitos, resolvendo dependências entre decisões uma a uma.

* **Uma pergunta por vez** — objetiva, com alternativas concretas quando possível; aguarde a resposta antes de continuar. Várias perguntas na mesma mensagem confundem.
* **Recomendação em cada pergunta** — para cada decisão em aberto, apresente sua resposta recomendada e o motivo.
* **Explore antes de perguntar** — se a resposta puder ser obtida inspecionando código, docs, banco ou testes, faça isso em vez de perguntar.
* **Pressione o vago** — questione respostas vagas, ambíguas ou contraditórias até ficarem verificáveis.
* **Não encerre cedo** — só avance para a saída final quando não houver decisão relevante em aberto.

### Critério de encerramento
Antes de produzir a especificação, apresente um resumo **Entendimento compartilhado** cobrindo problema, atores, regras, fluxos, efeitos colaterais e restrições não funcionais. Só prossiga para a saída final após confirmação explícita do usuário. Se algo mudar na confirmação, retome o interrogatório no bloco afetado.

## Blocos do interrogatório
Percorra nesta ordem, aprofundando cada bloco até esgotar as decisões relevantes antes de passar ao próximo:

1. **Problema e escopo** — que problema resolve, para quem, e o que fica de fora.
2. **Fluxo e atores** — evento que inicia, resultado de sucesso, perfis/permissões envolvidos.
3. **Dados e regras** — campos, obrigatoriedade, validações, limites, estados e transições.
4. **Fluxo completo** — caminho principal, alternativos, erros, cancelamentos e retomadas.
5. **Efeitos colaterais** — notificações, auditoria, integrações, dados históricos/retrocompatibilidade.
6. **Contexto operacional** — prazos, fuso, idioma, segurança, privacidade, acessibilidade, desempenho e concorrência.
7. **Fechamento** — revisão geral: falta algo, há contradição, duplicidade ou decisão de design disfarçada de requisito?

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

Revise ao final procurando lacunas, contradições, duplicidades e requisitos que na verdade são decisões de implementação.

Salve o documento em `docs/modelagem/{feature}/escopo/{feature}.md` e informe o path ao concluir.