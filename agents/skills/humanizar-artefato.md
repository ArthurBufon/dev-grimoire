---
name: humanizar-artefato
description: Humaniza texto de uma modelagem ou plano Markdown referenciado, preservando integralmente a ideia central.
---

# Humanizar Artefato

## Pré-condição bloqueante

A invocação deve referenciar um arquivo `.md` acessível de modelagem ou plano.
Sem esse alvo, não analise nem altere arquivos. Responda:

```text
Humanização bloqueada: informe um arquivo .md acessível de modelagem ou plano.
```

## Trabalho

1. Leia o artefato inteiro para identificar sua ideia central, decisões, regras,
   limites e critérios verificáveis.
2. Edite somente o texto do arquivo para facilitar a leitura humana: prefira
   frases curtas, linguagem direta, ordem lógica e termos concretos.
3. Remova repetição, jargão desnecessário, abstração vaga e detalhe que não
   acrescente significado. Preserve títulos, estrutura útil, requisitos,
   decisões, nomes técnicos indispensáveis e 100% da ideia central.
4. Não acrescente requisitos, mude comportamento, tome decisões técnicas,
   altere escopo ou transforme o artefato em resumo superficial.
5. Releia o resultado e confirme que uma pessoa entende o que será feito, por
   que e quais limites permanecem, sem perder informação relevante.

## Entrega

Informe o arquivo humanizado e resuma em uma frase os ganhos de clareza. Não
faça outras alterações nem crie arquivos novos.
