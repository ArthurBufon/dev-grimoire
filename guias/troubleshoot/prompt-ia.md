# 🐛 Prompt: Análise de Bug por Log de Erro

## Como usar

Preencha as seções abaixo e envie para a IA.

---

## Template

**Contexto do erro** *(obrigatório)*:

```
[Descreva o comportamento incorreto e o contexto em que ocorre. Exemplos:
- "Usuário sem configuração X tentou acessar Y e recebeu erro"
- "Após o deploy de ontem, clientes do plano Z não conseguem concluir o pagamento"
- "A tela de relatório trava ao filtrar por data em ambiente de produção"]
```

**Log de erro** *(opcional, mas recomendado)*:

```
[COLE O LOG DE ERRO AQUI, SE DISPONÍVEL]
```

Com base nas informações acima, me ajude a identificar as possíveis causas do erro.

**Restrições:**
- Não sugira alterações de código
- Apenas liste as possíveis causas, do mais para o menos provável
- Se precisar de mais contexto para uma análise mais precisa, sinalize quais informações seriam úteis

---

## Variações

### 🔍 Apenas diagnóstico (padrão)
> Use o template acima sem alterações.

### 🔧 Diagnóstico + correção em etapas separadas
> Adicione ao final do template:
> ```
> Após listar as causas, aguarde minha confirmação antes de sugerir qualquer correção.
> ```

### 🎯 Diagnóstico focado em um tipo de problema
> Adicione ao final do template:
> ```
> Foque especialmente em problemas de [nullability / autenticação / fluxo de dados / permissões / etc.].
> ```

### 📄 Análise com contexto de código
> Adicione ao final do template:
> ```
> Segue o trecho de código relevante para apoiar a análise:
>
> [COLE O TRECHO DE CÓDIGO AQUI]
> ```
