# 🚀 Feature Prompt

## Branch da Feature (obrigatório)

Antes de qualquer alteração:

1. Crie uma nova branch a partir da `master` (ou branch principal atual).
2. Utilize um nome descritivo seguindo o padrão:

```bash
feature/nome-da-feature
````

Exemplos:

```bash
feature/cadastro-clientes
feature/integracao-pagamentos
feature/controle-estoque
```

### Regras

* A branch existe apenas localmente.
* Nunca faça push para repositórios remotos.
* Nunca abra Pull Request.
* Toda implementação, testes e validações devem ocorrer nesta branch.
* Após aprovação e merge na `master`, a branch deverá ser excluída localmente.
* Nunca implemente diretamente na `master`.
* Planos de implmentação gerados devem ser TEMPORÁRIOS. Excluídos automaticamente após passar as specs para docs/features/{feature-atual}/specs.md

---

## Descrição da Feature

[Descreva aqui: o que faz, por que existe, quem usa, entradas/saídas esperadas, regras de negócio relevantes]

---

## Para a IA

### 1. Leia a codebase primeiro

Antes de qualquer coisa: estrutura de pastas, stack, padrões arquiteturais, convenções de código e arquivos de configuração relevantes.

Nunca assuma nada sem verificar.

---

### 2. Perguntas — obrigatório antes de implementar

⛔ Nunca implemente sem tirar TODAS as dúvidas.

Se houver qualquer ambiguidade sobre comportamento, casos de borda, encaixe na arquitetura existente ou dependências, pergunte primeiro.

Somente após todas as dúvidas serem respondidas a implementação poderá começar.

---

### 3. Planejamento obrigatório

Antes de escrever código:

1. Explique o que entendeu da feature.
2. Identifique os arquivos que provavelmente serão alterados.
3. Identifique riscos e impactos.
4. Apresente um plano de implementação em etapas.

Aguarde aprovação antes de começar a codificar.

---

### 4. Siga os padrões da codebase à risca

⛔ Não invente padrões novos.

Nomenclatura, estrutura de arquivos, formatação, estilo de código, tratamento de erros e organização devem seguir exatamente o padrão já existente.

Código novo deve parecer que sempre pertenceu ao projeto.

---

### 5. Compatibilidade total com o código existente

⛔ A nova feature não pode quebrar funcionalidades existentes.

Antes de alterar qualquer arquivo existente:

* Analise dependências.
* Identifique pontos de integração.
* Avalie possíveis efeitos colaterais.
* Em caso de dúvida, pergunte.

---

### 6. Implementação

Princípios:

* KISS
* Menor alteração possível
* Reutilizar código existente
* Evitar abstrações desnecessárias
* Evitar refatorações não relacionadas à feature
* Código gerado deve ser SIMPLES de entender, e fácil de dar manutenção

---

### 7. Validação

Antes de considerar a implementação concluída:

* Executar testes existentes relacionados.
* Executar testes da nova funcionalidade.
* Validar manualmente o fluxo principal.
* Garantir ausência de regressões aparentes.

---

### 8. Pausa obrigatória

Ao concluir, responda exatamente:

> ✅ Implementação concluída. Aguardando sua revisão antes de prosseguir.

Não realizar merge.
Não realizar push.
Não excluir a branch.
Aguardar aprovação explícita.
