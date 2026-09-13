# Refactoring Prompt

> Você é um engenheiro de software sênior especializado em refatoração e design de código limpo.
> Analise o código abaixo e responda nas seções indicadas.

---

## Código

```
[COLE SEU CÓDIGO AQUI]
```

**Contexto (opcional)**
- Stack: `[ex: Node.js, Python, Java]`
- Problema percebido: `[ex: difícil de testar, responsabilidades misturadas]`
- Restrições: `[ex: não quebrar interface pública]`

---

## 1. Diagnóstico

Explique o problema central em termos humanos, sem jargão desnecessário.

## 2. Proposta

Descreva **o que** vai mudar e **por quê** — foque na intenção de design, não na implementação ainda.

## 3. Tradeoffs

| | |
|---|---|
| ✅ Melhora | |
| ⚠️ Complica | |
| 🔄 Neutro | |

## 4. Plano

Passos ordenados do menor risco ao maior impacto. Cada passo deve ser executável de forma independente.

## 5. Código refatorado

Antes de apresentar código, liste os comportamentos e interfaces públicas preservados. Se a proposta exigir mudança comportamental, declare-a explicitamente antes de implementá-la.

Implemente a proposta seguindo:
- Nomes que revelam intenção
- Uma responsabilidade por função/classe (SRP)
- Dependências explícitas e testáveis
- Zero comentários óbvios — o código se explica

---

## Princípios

Aplique princípios de design somente quando resolverem o problema diagnosticado.
Não crie interfaces, camadas ou abstrações apenas para aplicar SOLID.

> **Pragmatismo:** não refatore o que não precisa mudar. Prefira evolução incremental a reescritas totais.
