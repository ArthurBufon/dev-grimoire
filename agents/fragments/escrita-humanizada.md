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
`docs/modelagem/{feature}/resumo.md`. É a explicação da feature para o dev ler
**uma vez** e conseguir validar o comportamento sem abrir a modelagem nem o
plano. Escreva do ponto de vista de quem usa, sem paths, classes ou passos de
implementação.

Não confunda resumo com versão curta. O resumo cobre **todo** o comportamento
que o dev precisa validar, em linguagem simples. Uma lista de 3 bullets não basta.

```markdown
# {Feature}: como vai funcionar

## A ideia
[2–4 frases: o problema, o que a feature faz e com que se parece]

## Quem faz o quê
- **[Perfil]:** [o que pode fazer; quem não pode]

## Como é hoje
[1–3 frases sobre o comportamento atual ou o que a pessoa faz sem a feature]

## Como funciona
[o fluxo principal em passos numerados, do ponto de vista de quem usa;
tabela só para campos ou opções que a pessoa preenche]

## Regras e exemplos
[cada cálculo, limite ou condição com um exemplo em números reais]

## Quando algo dá errado
[mensagens que a pessoa vê e o que acontece em cada caso]

## O que muda no resto do sistema
[onde o resultado aparece: telas, mensagens, e-mails, integrações]

## O que fica de fora
- [itens adiados]

## Pontos de atenção
- [riscos e pendências externas, ditos em linguagem simples]
```

Omita as seções que não se aplicam. Em mudança pequena, o resumo fica pequeno,
mas cada regra que o dev precisa validar continua com o seu exemplo.

## O que não muda

Escrever de forma humanizada não significa resumir. Preserve todos os
requisitos, decisões, limites, paths e comandos de que o executor precisa. Se
cortar um termo técnico deixar o executor sem informação, mantenha o termo e
explique-o.
