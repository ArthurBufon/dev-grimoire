---
name: mapear-specs
description: Mapear regras de negócio e código em linguagem compreensível entre humanos e IAs
---

Use os arquivos anexados e o contexto fornecido para gerar a especificação da feature.

Se esse material não bastar, localize e leia os módulos, rotas e testes diretamente ligados à feature antes de inferir regras.

O output final deve ser salvo em:

`docs/features/{entidade}/specs.md`

Antes de analisar ou escrever, siga `{GRIMOIRE}/docs/rules/global.md` para resolver o Grimório e ler `geral.md` e as rules da stack do projeto via Read/Grep.

Leia e aplique `{GRIMOIRE}/agents/fragments/gate-anti-slop.md` antes de analisar ou escrever e antes de salvar a spec.

Antes de escrever, leia a spec existente da entidade, se houver. Em projetos Laravel, leia também o molde `{GRIMOIRE}/moldes/laravel/docs/features/carro/specs.md`. Em projetos React-only sem spec existente, não use o molde Laravel; estruture a spec somente com os fatos identificados no código e contexto.

Antes de salvar, registre `git status` e os diffs relevantes. Preserve integralmente trechos preexistentes ou concorrentes na spec; conflito sem resolução inequívoca → peça instrução ao dev.

REGRAS:

Documente somente fatos confirmados no código e contexto; não invente regras, fluxos, campos ou comportamentos.
Traduzir regras técnicas para linguagem simples e objetiva.
Manter o arquivo breve, claro e direto.
Seguir o padrão Markdown das specs já existentes no projeto; se não houver, seguir o molde.
Em specs existentes, preserve trechos não confirmados pelo material disponível; informe a incerteza ao usuário em vez de removê-los ou reescrevê-los como fato.
O `specs.md` deve ser 100% informativo (explicar a feature e decisões — sem tom de changelog).
Na entrega, informe o path salvo, os arquivos consultados e as incertezas preservadas, se houver.
