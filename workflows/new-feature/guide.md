# 🚀 Meu workflow de desenvolvimento de nova feature com IA

Este é o meu workflow preferido para desenvolver features usando IA + Superpowers.

Não é uma regra rígida.
É só o fluxo que eu prefiro seguir para evitar retrabalho, tirar dúvidas cedo e manter contexto do projeto bem documentado.

---

## 1. 🧠 Definição da feature com `/brainstorming`

Toda nova feature deve começar com:

```txt
/brainstorming
```

Essa etapa deve acontecer **dentro da IDE**, usando o Superpowers, para que a IA consiga analisar o contexto real do projeto:

* estrutura de pastas;
* padrões já usados;
* arquivos relacionados;
* regras existentes;
* código parecido;
* integrações;
* banco de dados;
* componentes;
* services;
* controllers;
* endpoints;
* qualquer detalhe relevante da implementação atual.

O objetivo aqui não é sair implementando.

O objetivo é **entender bem a feature antes de planejar**.

---

## 2. ❓ Tirar todas as dúvidas de negócio

Durante o `/brainstorming`, a IA deve levantar todas as dúvidas importantes antes de qualquer plano formal.

Exemplos de dúvidas que precisam ser resolvidas:

* Qual problema essa feature resolve?
* Qual é o comportamento esperado?
* Quais regras de negócio existem?
* Quais cenários precisam ser suportados?
* O que acontece em casos de erro?
* Existe algum fluxo parecido no sistema?
* Essa feature altera algo existente?
* Tem impacto em permissões, usuários, financeiro, relatórios ou integrações?
* O que está fora do escopo?
* Existem casos de borda importantes?

A ideia é não deixar dúvida crítica para depois da implementação.

Se algo não estiver claro, a IA deve perguntar antes de planejar.

---

## 3. 🗂️ Criar ou atualizar o `specs.md` da feature

Depois que a feature estiver bem entendida, deve existir um `specs.md` vinculado a ela.

Caminho padrão:

```txt
/docs/features/{feature}/specs.md
```

Exemplo:

```txt
/docs/features/checkout/specs.md
/docs/features/auth/specs.md
/docs/features/dashboard/specs.md
```

Se a feature for complexa, podem existir sub-specs:

```txt
/docs/features/{feature}/{subspec}/specs.md
```

Exemplo:

```txt
/docs/features/checkout/specs.md
/docs/features/checkout/payment/specs.md
/docs/features/checkout/coupons/specs.md
```

O `specs.md` não precisa ser gigante.

Ele só precisa registrar o que é útil:

* objetivo da feature;
* regras de negócio;
* fluxos principais;
* decisões importantes;
* pontos técnicos relevantes;
* pendências;
* casos de borda.

---

## 4. 📝 Escrita do plano com `writing-plans`

Com a feature definida e as dúvidas resolvidas, usar a skill do Superpowers:

```txt
writing-plans
```

O plano deve ser gerado com base em:

* contexto analisado dentro da IDE;
* respostas do brainstorming;
* `specs.md` da feature;
* padrões atuais do projeto;
* código existente.

O plano deve ser objetivo, mas completo o suficiente para guiar a implementação sem depender de adivinhação.

---

## 5. 🔍 Revisão rigorosa do plano

Antes de implementar, revisar o plano com calma.

Checklist:

* [ ] O plano cobre todos os cenários importantes?
* [ ] Alguma regra de negócio ficou vaga?
* [ ] Algum passo está ambíguo?
* [ ] A ordem das tarefas faz sentido?
* [ ] O plano respeita o padrão atual do projeto?
* [ ] Existe risco de quebrar alguma feature existente?
* [ ] Precisa separar backend e frontend?
* [ ] Precisa dividir em múltiplos planos menores?
* [ ] O `specs.md` está coerente com o plano?

Se o plano estiver grande demais, prefiro quebrar em partes menores.

Exemplos:

```txt
Plano 1: Backend
Plano 2: Frontend
Plano 3: Testes e ajustes finais
```

Ou:

```txt
Plano 1: Estrutura base
Plano 2: Regras de negócio
Plano 3: Interface
Plano 4: Revisão final
```

---

## 6. ⚙️ Implementação com `executing-plans`

Depois do plano revisado, usar a skill do Superpowers:

```txt
executing-plans
```

A execução pode seguir dois modos:

| Modo                | Quando usar                                                               |
| ------------------- | ------------------------------------------------------------------------- |
| 🤖 **Subagents**    | Quando existem tarefas independentes que podem ser feitas em paralelo     |
| 📋 **Task by task** | Quando as tarefas são sequenciais ou precisam de revisão entre cada etapa |

Eu prefiro usar **subagents** quando as tarefas são bem separadas e não dependem muito uma da outra.

Exemplos:

* um subagent para backend;
* um subagent para frontend;
* um subagent para testes;
* um subagent para revisão.

Mas quando a feature é mais sensível, cheia de regra de negócio ou com risco maior, prefiro ir **task by task** para ter mais controle.

---

## 7. ✅ Revisão final

Depois da implementação, revisar:

* se o plano foi cumprido;
* se a feature funciona como esperado;
* se não quebrou comportamento antigo;
* se os arquivos alterados fazem sentido;
* se existe código desnecessário;
* se há duplicação;
* se os nomes estão bons;
* se faltou teste;
* se alguma regra ficou fora.

Também gosto de pedir para a IA fazer uma revisão geral da implementação com base no plano e no `specs.md`.

---

## 8. 🔄 Atualizar o `specs.md` no final

Ao finalizar a tarefa, o `specs.md` deve ser revisado.

Se algo mudou, ele deve ser atualizado.

Exemplos do que atualizar:

* nova regra de negócio;
* novo fluxo;
* comportamento alterado;
* decisão técnica tomada;
* integração nova;
* caso de borda descoberto;
* pendência futura;
* limitação conhecida.

Não precisa documentar detalhe pequeno.

O foco é registrar o que vai ajudar em futuras manutenções.

---

## Resumo do fluxo

```txt
1. Começar com /brainstorming dentro da IDE
2. Tirar todas as dúvidas de negócio
3. Criar ou atualizar o specs.md da feature
4. Gerar plano com writing-plans
5. Revisar e ajustar o plano
6. Implementar com executing-plans
7. Revisar a implementação
8. Atualizar o specs.md no final
```

---

## Prompt base que posso usar

```txt
/brainstorming

Estou começando uma nova feature: {nome_da_feature}.

Quero seguir meu workflow usando Superpowers.

Antes de qualquer plano ou implementação:
- analise o contexto do projeto dentro da IDE;
- procure arquivos, padrões e fluxos relacionados;
- levante todas as dúvidas de negócio;
- me ajude a definir o comportamento esperado;
- identifique possíveis impactos, casos de borda e decisões técnicas;
- não gere plano ainda.

Depois que a feature estiver bem definida, vamos criar ou atualizar:

/docs/features/{feature}/specs.md

Só depois disso vamos seguir para writing-plans.
```

---

## Ideia principal

A ideia desse workflow é simples:

**primeiro entender, depois documentar, depois planejar, depois implementar.**

Assim a IA trabalha com mais contexto, o projeto fica mais organizado e eu evito sair implementando coisa errada rápido demais.
