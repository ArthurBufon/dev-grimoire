# 🐞 Fluxo Simples para Resolver Bugs

## 🎯 Objetivo

Resolver bugs com segurança, sem criar novos problemas.

Fluxo:
**entender → analisar → planejar → corrigir → testar**

---

## 1. Entender o problema

Antes de codar:

* Leia o erro, handoff ou relato
* Entenda o comportamento esperado
* Compare com o comportamento atual

> Não saia implementando direto.

---

## 2. Analisar a causa

* Descubra onde o fluxo quebra
* Liste possíveis causas
* Valide no código antes de concluir

Se precisar:

* Veja logs
* Confira dados e dependências
* Revise o fluxo completo

---

## 3. Validar o handoff

Se existir handoff:

* Não assuma que está correto
* Confirme o diagnóstico
* Questione inconsistências

---

## 4. Planejar a correção

Antes de alterar código:

* Defina uma solução simples
* Prefira mudanças pequenas
* Evite refactors desnecessários

---

## 5. Implementar

* Faça mudanças em etapas
* Evite alterações grandes de uma vez
* Prefira ajustar código existente

---

## 6. Testar

Depois da correção:

* Verifique se o bug foi resolvido
* Teste cenários relacionados
* Confira possíveis efeitos colaterais

---

## ✅ Princípios

* Diagnóstico antes da correção
* Clareza antes da velocidade
* Simplicidade antes da complexidade
* Mudanças pequenas antes de mudanças globais

---

## 📌 Resumo

1. Entender
2. Analisar
3. Validar
4. Planejar
5. Corrigir
6. Testar

Seguir esse fluxo reduz retrabalho, regressões e soluções frágeis.
