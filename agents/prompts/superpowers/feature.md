# 🚀 Feature Prompt com Superpowers

## Objetivo

Implementar a feature descrita seguindo obrigatoriamente o workflow de Superpowers:

1. `/brainstorming`
2. `/writing-plan`
3. `/subagent-driven-development`
4. `/finishing-a-development-branch`

Ao final, apresentar tudo que foi feito e solicitar revisão manual do desenvolvedor.

---

## Branch da Feature

Antes de qualquer alteração, crie uma nova branch a partir da `master` ou da branch principal atual.

Padrão obrigatório:

```bash
feature/nome-da-feature
```

Exemplos:

```bash
feature/cadastro-clientes
feature/integracao-pagamentos
feature/controle-estoque
```

### Regras da branch

* A branch deve existir apenas localmente.
* Nunca faça push para repositórios remotos.
* Nunca abra Pull Request.
* Nunca implemente diretamente na `master`.
* Toda implementação, testes e validações devem ocorrer nesta branch.
* Após aprovação e merge na `master`, a branch deverá ser excluída localmente.
* Planos temporários devem ser removidos após consolidar as specs em:

```bash
docs/features/{feature-atual}/specs.md
```

---

## Descrição da Feature

[Descreva aqui o que a feature faz, por que existe, quem usa, entradas e saídas esperadas, regras de negócio e impactos relevantes.]

---

# Workflow obrigatório

## 1. `/brainstorming`

Use esta etapa para planejamento inicial e esclarecimento de dúvidas.

Antes de propor qualquer implementação:

* Leia a codebase.
* Entenda estrutura de pastas, stack, arquitetura, padrões e convenções.
* Verifique arquivos de configuração relevantes.
* Nunca assuma comportamento sem confirmar no código.
* Identifique ambiguidades, riscos e possíveis efeitos colaterais.
* Faça todas as perguntas necessárias antes de avançar.

⛔ Não implemente nada nesta etapa.

A implementação só pode continuar quando todas as dúvidas forem respondidas.

---

## 2. `/writing-plan`

Use esta etapa para escrever o plano de implementação.

O plano deve conter:

1. O que foi entendido da feature.
2. Arquivos que provavelmente serão criados ou alterados.
3. Regras de negócio envolvidas.
4. Riscos e impactos.
5. Estratégia de validação.
6. Etapas de implementação.

Após gerar o plano:

* Salve as specs finais em:

```bash
docs/features/{feature-atual}/specs.md
```

* Remova qualquer plano temporário usado durante o processo.
* Aguarde aprovação explícita antes de codificar.

⛔ Não escreva código antes da aprovação do plano.

---

## 3. `/subagent-driven-development`

Use esta etapa para implementar a feature com revisão e qualidade de código.

Durante a implementação:

* Siga rigorosamente os padrões da codebase.
* Não invente arquitetura, nomenclatura ou abstrações novas.
* Faça a menor alteração possível.
* Reutilize código existente.
* Evite refatorações não relacionadas à feature.
* Mantenha o código simples, legível e fácil de manter.
* Garanta compatibilidade com funcionalidades existentes.
* Analise dependências antes de alterar arquivos existentes.
* Em caso de dúvida, pare e pergunte.

### Validação obrigatória

Antes de considerar a implementação concluída:

* Execute testes existentes relacionados.
* Execute testes da nova funcionalidade.
* Valide manualmente o fluxo principal.
* Verifique possíveis regressões aparentes.
* Revise a qualidade do código implementado.

Ao concluir uma etapa relevante da implementação, responda:

```md
✅ Implementação concluída. Aguardando sua revisão antes de prosseguir.
```

⛔ Não realize merge.
⛔ Não faça push.
⛔ Não exclua a branch.
⛔ Aguarde aprovação explícita.

---

## 4. `/finishing-a-development-branch`

Use esta etapa somente após aprovação explícita do desenvolvedor.

Antes de finalizar:

* Apresente um resumo completo de tudo que foi feito.
* Liste arquivos criados, alterados e removidos.
* Liste validações e testes executados.
* Informe qualquer limitação, risco ou ponto que exige revisão manual.
* Solicite revisão manual final do desenvolvedor.

Após revisão e aprovação explícita:

* Realize o merge na `master` ou branch principal atual.
* Exclua a branch local da feature.
* Não faça push remoto.
* Não abra Pull Request.

---

# Regras gerais para a IA

## Leitura da codebase

Antes de qualquer decisão técnica, leia a codebase.

Verifique:

* Estrutura de pastas.
* Stack utilizada.
* Padrões arquiteturais.
* Convenções de código.
* Arquivos de configuração.
* Dependências e pontos de integração.

Nunca assuma nada sem verificar.

---

## Compatibilidade

A nova feature não pode quebrar funcionalidades existentes.

Antes de alterar arquivos existentes:

* Analise dependências.
* Identifique pontos de integração.
* Avalie efeitos colaterais.
* Pergunte em caso de dúvida.

---

## Princípios de implementação

Siga obrigatoriamente:

* KISS.
* Menor alteração possível.
* Reutilização de código existente.
* Sem abstrações desnecessárias.
* Sem refatorações fora do escopo.
* Código simples, claro e manutenível.

---

## Encerramento obrigatório

Ao final de todo o workflow, apresente:

1. Tudo que foi solicitado.
2. Tudo que foi implementado.
3. Arquivos criados, alterados ou removidos.
4. Testes e validações executadas.
5. Pontos de atenção.
6. Itens que precisam de revisão manual.

Finalize solicitando revisão manual do desenvolvedor.

Mensagem final obrigatória:

```md
✅ Implementação concluída. Aguardando sua revisão manual antes de prosseguir.
```
