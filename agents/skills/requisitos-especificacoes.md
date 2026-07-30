---
name: requisitos-especificacoes
description: Use when defining or refining complete functional and non-functional requirements for a feature before design, architecture, planning, or implementation.
---
# Modelagem de Requisitos e Especificações

## Objetivo
Definir, por interrogatório progressivo, todos os requisitos verificáveis de uma feature.
Descreva **o que** deve acontecer — nunca **como** será implementado.

## Regras
* Antes de perguntar, inspecione código, docs, banco, testes e padrões já existentes no app relacionados ao tema.
* Reaproveite termos e regras já existentes quando válidos; não presuma que o comportamento atual está correto — aponte inconsistências para o usuário decidir.
* Pesquise práticas e normas atuais do domínio; cite fontes relevantes.
* Não proponha arquitetura, tabelas, endpoints, bibliotecas ou qualquer detalhe de implementação.
* Uma pergunta por vez, objetiva e com alternativas concretas quando possível; espere a resposta antes de seguir.
* Questione respostas vagas, ambíguas ou contraditórias.
* Só encerre quando não houver decisão relevante em aberto.

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