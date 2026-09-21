---
name: mapear-specs
description: Mapear regras de negócio e código em linguagem compreensível entre humanos e IAs
---

Use os anexos e o contexto para gerar `docs/features/{entidade}/specs.md`. Se forem insuficientes, leia módulos, rotas e testes ligados à feature antes de inferir regras.

Antes de analisar ou escrever, siga `{GRIMOIRE}/docs/rules/global.md` para resolver o Grimório e ler `geral.md` e as rules da stack do projeto via Read/Grep.

Leia e aplique `{GRIMOIRE}/agents/fragments/gate-anti-slop.md` antes de analisar ou escrever e antes de salvar a spec.

Antes de escrever, leia a spec existente. Sem ela, use o molde aplicável à stack; o molde Laravel só vale para Laravel.

Antes de salvar, preserve alterações existentes conforme a regra global; em conflito ambíguo, peça instrução.

REGRAS:

Documente somente fatos confirmados no código e contexto; não invente regras, fluxos, campos ou comportamentos.
Escreva em linguagem simples, breve e informativa, sem tom de changelog.
Seguir o padrão Markdown das specs já existentes no projeto; se não houver, seguir o molde.
Em specs existentes, preserve trechos não confirmados pelo material disponível; informe a incerteza ao usuário em vez de removê-los ou reescrevê-los como fato.
Na entrega, informe o path salvo, os arquivos consultados e as incertezas preservadas, se houver.
