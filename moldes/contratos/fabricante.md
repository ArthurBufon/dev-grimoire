# Contrato canônico: Fabricante

Fonte de verdade para o catálogo de fabricantes usado no vínculo com Carro.
Não substitui regras de implementação de cada stack.

## Dados

| Campo | Persistência/API | Observação |
| --- | --- | --- |
| `nome` | string obrigatória; única; até 120 caracteres | |
| `descricao` | string opcional ou `null`; até 255 caracteres | |
| `ativo` | boolean; padrão `true` | Fabricantes inativos não entram no select de Carro |

## Listagem

- Entrada: `busca_geral`, `ativo`, `quantidade`, `pagina` e `aplicar_paginacao`.
- Saída: `lista` de fabricantes e `paginacao` com `total`, `total_retornado`,
  `pagina`, `limite` e `total_paginas`.

## Retornos e fluxos

- Services e Queries retornam `{ sucesso, dados, erros }`.
- `store` cria o fabricante; `update` atualiza o fabricante existente;
  `destroy` remove o fabricante existente.
- Exclusão com carros vinculados deve falhar por `restrictOnDelete` na FK de
  `carros.fabricante_id`.

## Manutenção

Ao alterar este contrato, revisar na mesma mudança:

1. migration, Form Requests e tipos do Model;
2. tipos React compartilhados (`OpcaoVinculo`);
3. spec de Fabricante;
4. qualquer Query, Service ou teste que exponha os dados alterados.
