---
name: plan-finished-review
description: "Revisão crítica pós-implementação para validar se uma task/plano foi executado corretamente, sem alterar código."
disable-model-invocation: true
---

# Revisão pós-implementação

Revise a implementação concluída antes de considerar a task finalizada.

Use o plano, diff, arquivos alterados e contexto disponível.

## Verifique principalmente

### 1. Plano cumprido

Confirme se:

* o objetivo da task foi entregue;
* os itens essenciais foram implementados;
* os critérios de aceite foram atendidos;
* não existem pendências relevantes.

Aponte claramente o que ficou incompleto ou não pôde ser verificado.

### 2. Escopo respeitado

Verifique se a implementação:

* alterou apenas o necessário;
* não adicionou funcionalidades não solicitadas;
* não realizou refactors fora do escopo;
* não mudou comportamentos, APIs ou regras sem necessidade.

Destaque arquivos ou mudanças sem relação clara com a task.

### 3. Padrões do projeto

Confirme se o código segue os padrões existentes de:

* arquitetura;
* organização;
* nomenclatura;
* validação e tratamento de erros;
* testes;
* segurança e permissões.

Aponte problemas concretos, não preferências pessoais.

### 4. Simplicidade

Procure por:

* overengineering;
* abstrações prematuras;
* complexidade desnecessária;
* duplicação problemática;
* solução mais ampla do que o problema exigia.

Sugira simplificações apenas quando houver benefício real.

### 5. Bugs e regressões

Identifique riscos prováveis, como:

* comportamento incorreto;
* edge cases não tratados;
* impacto em funcionalidades existentes;
* dados inconsistentes;
* permissões incorretas;
* testes ausentes ou insuficientes.

Classifique os problemas como:

* bloqueante;
* importante;
* observação;
* follow-up opcional.

## Formato da resposta

### Resumo

Explique brevemente o que foi revisado.

### Problemas encontrados

Liste apenas problemas relevantes, com impacto e recomendação.

### Veredito

Classifique como:

* ✅ Aprovada
* ⚠️ Aprovada com observações
* 🔧 Precisa de ajustes
* ❌ Incompleta
* ❓ Não verificável

### Próximo passo

Indique objetivamente se deve:

* finalizar;
* corrigir problemas;
* executar testes;
* revisar novamente;
* criar follow-up separado.

## Regras

* Não implemente código.
* Não altere arquivos.
* Não faça refactor.
* Não aumente o escopo.
* Não transforme melhorias opcionais em bloqueantes.
* Diferencie bugs reais de preferências pessoais.
* Quando algo não puder ser verificado, diga claramente.
