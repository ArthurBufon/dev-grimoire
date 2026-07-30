---

name: requisitos-especificacoes
description: Use when defining or refining complete functional and non-functional requirements for a feature before design, architecture, planning, or implementation.

---

# Modelagem de Requisitos e Especificações

## Objetivo

Definir todos os requisitos verificáveis de uma feature por meio de um interrogatório progressivo.
O resultado descreve **o que** deve acontecer, nunca **como** será arquitetado ou implementado.

## Regras obrigatórias

* Antes das perguntas, inspecione código, documentação, banco, testes e padrões existentes relacionados.
* Reaproveite termos, regras, comportamentos e restrições já presentes no app sempre que forem válidos.
* Não presuma que o comportamento atual está correto; exponha inconsistências para decisão do usuário.
* Pesquise recomendações atuais na internet para o domínio da feature e requisitos semelhantes.
* Priorize documentação oficial, normas, fontes primárias e práticas amplamente adotadas; cite as fontes relevantes.
* Não proponha arquitetura, classes, tabelas, endpoints, bibliotecas, componentes ou detalhes de implementação.
* Faça apenas uma pergunta por vez e espere a resposta antes de continuar.
* Prefira perguntas objetivas com alternativas concretas, permitindo resposta livre.
* Questione respostas vagas, termos ambíguos, exceções ocultas e regras contraditórias.
* Não encerre enquanto houver decisões relevantes indefinidas.

## Ordem do interrogatório

1. Qual problema a feature resolve e para quem?
2. Qual evento inicia o fluxo e qual resultado indica sucesso?
3. Quais atores, perfis, permissões e responsabilidades existem?
4. Quais dados entram, são exibidos, alterados, derivados ou exportados?
5. Quais campos são obrigatórios, opcionais, únicos, imutáveis ou condicionais?
6. Quais validações, limites, formatos, estados e transições são permitidos?
7. Qual é o fluxo principal, passo a passo, do ponto de vista do usuário?
8. Quais fluxos alternativos, cancelamentos, repetições e retomadas existem?
9. Quais erros, indisponibilidades, conflitos e dados inválidos devem ser tratados?
10. Quais efeitos colaterais ocorrem: notificações, registros, integrações ou auditoria?
11. Quais regras de prazo, data, horário, fuso, moeda, idioma e localização se aplicam?
12. Quais requisitos de segurança, privacidade, acessibilidade e conformidade existem?
13. Quais requisitos de desempenho, volume, disponibilidade e concorrência são esperados?
14. O que deve acontecer com dados existentes, históricos e compatibilidade retroativa?
15. O que está explicitamente fora do escopo?

## Saída obrigatória

Produza uma especificação com: contexto, objetivo, glossário, atores, pré-condições, requisitos funcionais numerados, regras de negócio numeradas, estados e transições, validações, fluxos principal/alternativos/exceções, permissões, dados envolvidos, requisitos não funcionais, integrações, critérios de aceitação em Given/When/Then, fora de escopo, dúvidas resolvidas e fontes.
Cada requisito deve ser claro, atômico, testável, sem termos subjetivos e rastreável aos critérios de aceitação.
Ao final, faça uma revisão procurando lacunas, contradições, duplicidades, suposições e decisões de design disfarçadas de requisito.
