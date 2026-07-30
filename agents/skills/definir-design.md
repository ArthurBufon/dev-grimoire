---
name: definir-design
description: Use when translating an already-defined scope/requirements into a concrete technical design — architecture, data modeling, components, and implementation decisions — before planning or coding.
---
# Modelagem de Design Técnico

## Regra final

NUNCA desperdiçar tokens — sempre visar economia, mas mantendo qualidade de prompt/resultado.

## Objetivo
Definir o design técnico completo de uma feature por meio de um interrogatório progressivo, partindo de uma especificação de escopo/requisitos já pronta (gerada pela skill `definir-escopo`).
O resultado descreve **como** a feature será construída — arquitetura, dados, componentes, integrações e decisões técnicas.

## Entrada obrigatória

Leia o escopo em:

`docs/modelagem/{feature}/escopo/{feature}.md`

Não inicie o interrogatório sem esse arquivo. Use o mesmo slug `{feature}` das demais etapas.

## Artefato

Salve o design técnico em:

`docs/modelagem/{feature}/design/{feature}.md`

## Política de exclusão

Os arquivos em `docs/modelagem/{feature}/` são **artefatos temporários** de modelagem — não documentação permanente do projeto.

* Não versione conteúdo que deva permanecer no repositório dentro desses paths; transfira o que for necessário para `docs/features/` ou equivalente do projeto.
* Após a feature estar implementada e entregue, **exclua** `docs/modelagem/{feature}/` por completo para evitar lixo acumulado no repositório.
* Só mantenha os artefatos enquanto ainda forem necessários para as etapas seguintes do workflow.

## Regras
* Antes de perguntar, inspecione código, arquitetura, padrões, bibliotecas e convenções já existentes no app.
* Reaproveite padrões e decisões já estabelecidos no projeto sempre que forem válidos; aponte inconsistências ou dívidas técnicas para decisão do usuário.
* Não repita perguntas sobre comportamento/regras de negócio — assuma que o escopo já está definido e resolvido.
* Pesquise práticas atuais e recomendadas para as tecnologias e o domínio envolvidos; cite fontes relevantes.

## Condução do interrogatório
Entreviste incansavelmente sobre cada aspecto do design até chegar a um entendimento compartilhado. Percorra cada ramo da árvore de decisões de design, resolvendo dependências entre decisões uma a uma.

* **Uma pergunta por vez** — objetiva, com alternativas concretas quando possível; aguarde a resposta antes de continuar. Várias perguntas na mesma mensagem confundem.
* **Recomendação em cada pergunta** — para cada decisão em aberto, apresente sua resposta recomendada e o motivo.
* **Explore antes de perguntar** — se a resposta puder ser obtida inspecionando código, arquitetura ou convenções do projeto, faça isso em vez de perguntar.
* **Pressione o vago** — questione decisões vagas, ambíguas ou contraditórias com o escopo até ficarem implementáveis.
* **Não encerre cedo** — só avance para a saída final quando não houver decisão técnica relevante em aberto.

### Critério de encerramento
Antes de produzir o design técnico, apresente um resumo **Entendimento compartilhado** cobrindo modelagem, componentes, contratos, integrações, fluxo técnico e trade-offs. Só prossiga para a saída final após confirmação explícita do usuário. Se algo mudar na confirmação, retome o interrogatório no bloco afetado.

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

Salve o documento em `docs/modelagem/{feature}/design/{feature}.md` e informe o path ao concluir.