# Escrita Humanizada

## Objetivo

Modelagens e planos são lidos por um dev que precisa **entender e validar** a
feature antes de aprovar. Escreva para essa pessoa, não para outro agente.

**Teste final:** um dev que não participou da conversa entende o que muda, para
quem e por quê lendo o artefato uma única vez? Se não, reescreva antes de salvar.

## Regras

- Abra com **Em poucas palavras**: de 2 a 4 frases sem termos técnicos sobre o
  problema e o que a feature faz.
- Descreva o comportamento do ponto de vista de quem usa: quem faz o quê, o que
  vê na tela e o que acontece depois.
- Toda regra com cálculo, limite ou condição precisa de um exemplo concreto, com
  números reais (ex.: "10% sobre R$ 200 dá R$ 20").
- Use frases curtas, na voz ativa e com uma ideia por frase. Prefira a palavra
  comum ao jargão.
- Use nomes técnicos (tabela, classe, rota, coluna) só onde o executor precisa
  deles. Na primeira vez que aparecerem, diga em palavras o que são.
- Não use siglas ou rótulos internos sem explicar (`R7`, `NFR`, `DTO`, `Given/When/Then`).
  Critérios de aceite são frases como "Quando…, então…".
- Explique o **porquê** de cada decisão não óbvia em uma frase.
- Use tabelas só para listas de campos ou opções. Para o resto, use parágrafos
  curtos ou listas.
- Termine com **o que fica de fora** e com os **pontos de atenção** (riscos,
  pendências externas). Nada de "TBD".

## Resumo da feature (obrigatório em todo plano)

Ao terminar qualquer plano, simples ou vindo de modelagem, salve junto
`docs/modelagem/{feature}/resumo.md`. É um resumo simples e enxuto para o dev
entender a feature em um minuto. Ele não substitui o plano nem repete os passos.

```markdown
# Resumo: {feature}

**O que é:** [1–2 frases sem termos técnicos]

## Como é hoje
- [comportamento atual, do ponto de vista de quem usa]

## Como vai ficar
- [comportamento depois da entrega]
```

Use no máximo 3 bullets por seção. Se a feature for nova, em "Como é hoje"
diga em uma frase o que a pessoa faz hoje sem ela.

## O que não muda

Escrever de forma humanizada não significa resumir. Preserve todos os
requisitos, decisões, limites, paths e comandos de que o executor precisa. Se
cortar um termo técnico deixar o executor sem informação, mantenha o termo e
explique-o.
