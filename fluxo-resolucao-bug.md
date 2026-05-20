# 🐞 Guia Básico: Fluxo para Resolução de Bugs

Este guia define um fluxo simples e confiável para tratar bugs de forma consistente, evitando soluções apressadas e retrabalho.
entender → planejar → executar

---

## 🎯 Objetivo

Garantir que cada bug seja:

- Bem compreendido
- Corretamente diagnosticado
- Resolvido com segurança
- Sem introduzir novos problemas

---

## 🔄 Fluxo Padrão

### 1. Entendimento do Problema

Antes de qualquer ação:

- Leia o contexto completo (handoff, erro, relato)
- Entenda o comportamento esperado
- Compare com o comportamento atual

> ❗ Nunca comece implementando diretamente

---

### 2. Análise e Diagnóstico

- Identifique onde o comportamento começa a divergir
- Liste possíveis causas (hipóteses)
- Valide cada hipótese com base no código e contexto

Se necessário:

- Leia logs
- Verifique fluxo de dados
- Analise dependências

---

### 3. Validação do Handoff

Se houver handoff:

- Não assuma que está 100% correto
- Confirme se o diagnóstico faz sentido
- Questione inconsistências

---

## 🧠 Handoff Handling

- Always analyze and validate handoff instructions before implementing  
- Do not assume the proposed solution is correct  
- Identify risks and edge cases before coding  

---

### 4. Planejamento da Correção

Antes de codar:

- Defina uma abordagem clara
- Prefira mudanças pequenas e isoladas
- Evite refactors desnecessários

---

### 5. Implementação

- Implemente em etapas
- Evite mudanças amplas de uma vez
- Prefira editar código existente ao invés de criar novos arquivos

---

### 6. Validação

Após implementar:

- Verifique se o bug foi realmente corrigido
- Teste cenários relacionados
- Avalie possíveis efeitos colaterais

---

### 7. Revisão Final

- A solução está consistente com a arquitetura?
- Existe risco de regressão?
- O código está claro e simples?

---

## ⚠️ Princípios Importantes

- Diagnóstico > Correção rápida  
- Clareza > Velocidade  
- Simplicidade > Complexidade  
- Correção localizada > Mudança global  

---

## ✅ Resumo

Fluxo ideal:

1. Entender
2. Analisar
3. Validar
4. Planejar
5. Implementar
6. Testar

---

Seguir esse processo reduz drasticamente:
- retrabalho
- bugs ocultos
- soluções frágeis

E aumenta:
- previsibilidade
- qualidade
- confiança no código
