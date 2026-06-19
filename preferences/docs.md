# Workflow preferido: specs por feature para trabalhar melhor com IA

Este é o meu workflow preferido para levar o desenvolvimento assistido por IA para outro nível: manter uma documentação simples por feature.

A ideia não é criar burocracia, nem um monte de arquivo gigante cheio de boilerplate.

A ideia é só dar contexto suficiente para a IA entender melhor o projeto, evitar retrabalho e manter as decisões importantes registradas.

---

## Como eu organizo

Cada feature pode ter um `specs.md` próprio:

```txt
/docs/features/{feature}/specs.md
```

Exemplo:

```txt
/docs/features/auth/specs.md
/docs/features/checkout/specs.md
/docs/features/dashboard/specs.md
```

Quando a feature for mais complexa, eu prefiro quebrar em sub-specs:

```txt
/docs/features/{feature}/{subspec}/specs.md
```

Exemplo:

```txt
/docs/features/checkout/specs.md
/docs/features/checkout/payment/specs.md
/docs/features/checkout/coupons/specs.md
```

---

## Como uso isso com IA

Sempre que eu for pedir ajuda para IA em alguma feature, eu tento mandar junto o `specs.md` relacionado.

Exemplo:

```txt
Estou trabalhando na feature de checkout.

Use este arquivo como contexto:
/docs/features/checkout/specs.md

Tarefa:
Adicionar suporte a cupom percentual.

No final, veja se o specs.md precisa ser atualizado.
```

A ideia é simples: se a IA tiver o contexto certo, ela erra menos.

---

## Quando atualizo o specs.md

Depois de uma tarefa, eu gosto de atualizar o `specs.md` se mudou alguma coisa relevante, como:

* regra de negócio;
* fluxo da feature;
* comportamento esperado;
* decisão técnica;
* integração;
* caso de borda importante;
* algo que eu provavelmente vou esquecer depois.

Não precisa documentar cada detalhe pequeno.

O foco é registrar o que vai ajudar no futuro.

---

## O que costumo colocar no specs.md

Geralmente algo simples assim:

```md
# Feature: Nome da feature

## Objetivo

Pra que essa feature existe.

## Regras principais

Regras de negócio ou comportamentos importantes.

## Fluxos importantes

Como a feature funciona nos principais cenários.

## Pontos técnicos

Arquivos, tabelas, endpoints, componentes ou integrações importantes.

## Decisões

Decisões relevantes e o motivo delas.

## Pendências

Coisas que ficaram para depois ou que precisam de atenção.
```

Nem sempre precisa ter todas essas seções.

O importante é o arquivo ser útil, não bonito.

---

## Resumo do workflow

Meu fluxo preferido é:

1. Vou mexer em uma feature.
2. Passo o `specs.md` dela no chat da IA.
3. Peço a tarefa normalmente.
4. No final, peço para a IA atualizar ou sugerir atualização do `specs.md`.
5. Se a feature ainda não tem specs, crio um inicial simples.

---

## Por que faço assim

Porque IA trabalha muito melhor com contexto.

Com specs por feature, fica mais fácil:

* lembrar decisões antigas;
* evitar quebrar regra de negócio;
* revisar código com mais contexto;
* criar features novas seguindo o padrão do projeto;
* manter o conhecimento do projeto fora da minha cabeça;
* continuar uma tarefa dias ou semanas depois sem precisar explicar tudo de novo.

---

## Importante

Isso não é uma regra rígida.

É só o meu workflow preferido.

A ideia é usar documentação como apoio para desenvolver melhor com IA, sem transformar isso em burocracia.
