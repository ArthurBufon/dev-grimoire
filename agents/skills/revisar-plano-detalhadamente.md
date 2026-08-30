---
name: revisar-plano-detalhadamente
description: >-
  Use before implementing an approved plan when a human needs a detailed but
  readable explanation of its low-level code flow, contracts, data, affected files,
  and execution risks without reading the full plan. Triggers: "revisar plano detalhadamente",
  "explicar plano em detalhes", "contexto detalhado do plano".
---

# Revisar Plano Detalhadamente

## Objetivo

Entregar uma leitura técnica e humana do plano: detalhada o bastante para
entender como o código vai funcionar, mas mais rápida que ler o plano completo.
É complementar a `revisar-plano`, que dá apenas a visão executiva.

## Antes de explicar

**Leia e aplique** `{GRIMOIRE}/agents/fragments/gate-anti-slop.md`.

Leia o plano inteiro. Consulte a modelagem, specs e somente os módulos de código
diretamente citados ou necessários para confirmar o fluxo. Não suponha detalhes
que não estejam no plano ou no código atual.

Se o plano introduzir arquitetura, abstração, refatoração ou NFR sem vínculo com
um requisito, sinalize isso em **⚠️ Pontos para decidir antes de executar**. Não
altere nem reescreva o plano nesta skill.

Se o plano alterar comportamento e não trouxer validação verificável, sinalize
isso na mesma seção.

## O que explicar

Descreva, em linguagem simples:

* o problema e o comportamento final para quem usa o sistema;
* a sequência real de execução — entrada, validação, regras, persistência,
  respostas e efeitos colaterais;
* a responsabilidade de cada módulo, arquivo ou camada alterada;
* contratos relevantes: rotas, payloads, tipos, eventos, props, retornos e
  mudanças de schema, quando existirem;
* regras de negócio, permissões, estados e dados que precisam permanecer
  consistentes;
* como os testes validarão o resultado e quais limites permanecem fora do escopo.

Inclua nomes de arquivos, classes, métodos e campos quando eles ajudarem a pessoa
a localizar o código. Não copie blocos de código nem transforme a resposta em uma
lista literal de tarefas do plano.

## Forma de escrita

Use Markdown amigável para humanos, frases curtas e cabeçalhos com emoji. Prefira
bullets e uma tabela pequena quando ela tornar relações mais claras. Use apenas
as seções que contiverem informação real; omita as demais.

Evite repetição, jargão sem explicação, detalhes de implementação sem impacto e
recomendações técnicas não pedidas. Não faça code review.

## Formato de resposta

```markdown
## 🎯 O que muda

## 🏗️ Como a solução se encaixa

## 🔄 Fluxo de execução

## 🧩 Áreas e responsabilidades afetadas

| Área | Papel depois da mudança |
| --- | --- |

## 🗃️ Dados e contratos

## 🧪 Como saberemos que funcionou

## 🚫 O que não muda

## ⚠️ Pontos para decidir antes de executar

## ✅ Leitura final
```

Em **✅ Leitura final**, explique em poucas linhas a consequência prática de
executar o plano e diga se há alguma decisão pendente. Se não houver, declare
claramente que o plano está compreendido e pronto para execução.
