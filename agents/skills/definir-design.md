---
name: definir-design
description: Use when translating an already-defined scope/requirements into a concrete technical design — architecture, data modeling, components, and implementation decisions — before planning or coding.
---
# Modelagem de Design Técnico

## Objetivo
Definir o design técnico completo de uma feature por meio de um interrogatório progressivo, partindo de uma especificação de escopo/requisitos já pronta (gerada pela skill `definir-escopo`).
O resultado descreve **como** a feature será construída — arquitetura, dados, componentes, integrações e decisões técnicas.

## Regras
* Antes de perguntar, inspecione código, arquitetura, padrões, bibliotecas e convenções já existentes no app.
* Reaproveite padrões e decisões já estabelecidos no projeto sempre que forem válidos; aponte inconsistências ou dívidas técnicas para decisão do usuário.
* Não repita perguntas sobre comportamento/regras de negócio — assuma que o escopo já está definido e resolvido.
* Pesquise práticas atuais e recomendadas para as tecnologias e o domínio envolvidos; cite fontes relevantes.
* Se uma pergunta puder ser respondida explorando o código-fonte, explore o código em vez de perguntar.

## Instrução de condução da entrevista
Me entreviste incansavelmente sobre cada aspecto deste plano até chegarmos a um entendimento compartilhado. Percorra cada ramo da árvore de decisões de design, resolvendo as dependências entre decisões uma a uma. Para cada pergunta, forneça sua resposta recomendada.
Faça as perguntas uma de cada vez, aguardando o retorno sobre cada uma antes de continuar. Fazer várias perguntas ao mesmo tempo é confuso.
Se uma pergunta puder ser respondida explorando o código-fonte, explore o código-fonte em vez disso.

## Blocos do interrogatório
Percorra nesta ordem, aprofundando cada bloco até esgotar as decisões relevantes antes de passar ao próximo:

1. **Modelagem de dados** — entidades, relacionamentos, esquema, migrações, origem e persistência dos dados.
2. **Componentes e responsabilidades** — camadas, módulos, serviços, separação de responsabilidades.
3. **Interfaces e contratos** — endpoints, eventos, mensagens, formatos de entrada/saída, versionamento.
4. **Integrações e dependências** — serviços externos, bibliotecas, filas, cache, terceiros.
5. **Fluxo técnico** — como cada requisito funcional se traduz em fluxo de execução, incluindo casos alternativos e de erro.
6. **Decisões de infraestrutura e qualidade** — escalabilidade, performance, segurança, observabilidade, testes.
7. **Trade-offs e riscos** — alternativas consideradas, motivo da escolha, riscos técnicos e como serão mitigados.
8. **Fechamento** — revisão geral: falta alguma decisão? há inconsistência com o escopo definido? há acoplamento desnecessário?

## Saída final
Produza o design técnico com:
- Visão geral da arquitetura
- Modelo de dados (entidades, relacionamentos, esquema)
- Componentes e suas responsabilidades
- Contratos de interface (endpoints/eventos/mensagens)
- Integrações e dependências externas
- Decisões técnicas relevantes com justificativa e alternativas descartadas
- Requisitos não funcionais endereçados (performance, segurança, escalabilidade, observabilidade)
- Riscos técnicos e mitigação
- Rastreabilidade: cada decisão de design ligada ao requisito do escopo que ela atende

Revise ao final procurando decisões pendentes, contradições com o escopo definido, acoplamento desnecessário e complexidade não justificada.