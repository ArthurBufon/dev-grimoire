---
name: plan-review
description: Revisa criticamente uma task ou plano antes da implementação para identificar problemas de escopo, arquitetura e complexidade.
disable-model-invocation: true
---

# Revisão crítica de plano

Revise a task ou plano antes da implementação.

Objetivo: garantir que a solução seja simples, consistente com o projeto e pronta para execução.

## Verifique principalmente

### 1. Aderência ao projeto

Confirme se a solução segue os padrões já existentes de:

- arquitetura;
- organização do projeto;
- convenções de código;
- regras já estabelecidas.

Aponte qualquer inconsistência.

---

### 2. Escopo

Verifique se a implementação:

- resolve apenas o problema proposto;
- evita alterações desnecessárias;
- não mistura responsabilidades;
- não amplia o escopo da task.

Destaque qualquer mudança que pareça fugir do objetivo.

---

### 3. Simplicidade

Avalie se existe:

- overengineering;
- abstrações prematuras;
- complexidade desnecessária;
- solução mais simples possível (KISS).

Sempre sugira simplificações quando apropriado.

---

### 4. Riscos

Liste apenas riscos relevantes, como:

- regressões;
- impacto em funcionalidades existentes;
- dependências não consideradas;
- dúvidas realmente bloqueantes.

Quando possível, proponha uma decisão padrão em vez de perguntar ao usuário.

---

### 5. Veredito

Classifique a task como:

- ✅ Pronta para implementação
- ⚠️ Precisa de pequenos ajustes
- ❌ Precisa de refinamento

Explique objetivamente os motivos.

## Regras

- Não implemente código.
- Não altere arquivos.
- Não aumente o escopo da task.
- Priorize simplicidade e consistência com o projeto.
- Questione apenas problemas que realmente afetem a implementação.
