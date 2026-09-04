# Contrato canônico: Carro

Fonte de verdade para as informações compartilhadas entre os moldes Laravel,
React e a spec de Carro. Não substitui regras de implementação de cada stack.

## Dados

| Campo | Persistência/API | Formulário React | Observação |
| --- | --- | --- | --- |
| `marca` | obrigatório; `toyota`, `honda`, `volkswagen`, `fiat` ou `chevrolet` | obrigatório; um dos mesmos valores | Enum `Marca` |
| `modelo` | string obrigatória; até 120 caracteres | string obrigatória | |
| `ano` | inteiro entre 1900 e 2100 | número obrigatório | |
| `cor` | string opcional ou `null`; até 40 caracteres | string; vazio representa ausência | |
| `placa` | string obrigatória, única e normalizada sem espaços em maiúsculas; até 10 caracteres | string obrigatória | |
| `km` | inteiro maior ou igual a zero | número obrigatório | |
| `valor` | decimal maior ou igual a zero | string decimal | |
| `data_lancamento` | data opcional ou `null` | string `YYYY-MM-DD`; vazio representa ausência | |

## Listagem

- Entrada: `busca_geral`, `data_lancamento_inicio`, `data_lancamento_fim`,
  `quantidade` e `pagina`.
- Saída: `lista` de carros e `paginacao` com `total`, `total_retornado`,
  `pagina`, `limite` e `total_paginas`.

## Retornos e fluxos

- Services e Queries retornam `{ sucesso, dados, erros }`.
- `store` cria o carro; `update` atualiza o carro existente; `destroy` remove o
  carro existente.
- A validação HTTP é a autoridade para entrada. Validação React só existe para
  regra de negócio que precise ser verificada antes do envio.

## Manutenção

Ao alterar este contrato, revisar na mesma mudança:

1. enum, migration, Form Requests e tipos do Model;
2. tipos, campos e navegação React;
3. spec de Carro;
4. qualquer Query, Service ou teste que exponha os dados alterados.

Se uma camada precisar divergir, documentar a razão nesta seção antes de alterar
o molde correspondente.
