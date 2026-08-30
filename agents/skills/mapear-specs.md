---
name: mapear-specs
description: Mapear regras de negócio e código em linguagem compreensível entre humanos e IAs
---

Use os arquivos anexados e o contexto fornecido para gerar a especificação da feature.

O output final deve ser salvo em:

`docs/features/{entidade}/specs.md`

Antes de escrever, leia o molde `{GRIMOIRE}/moldes/laravel/docs/features/carro/specs.md` e a spec existente da entidade, se houver. Espelhe seções e tom do molde (ou da spec do projeto, se já existir); adapte só a entidade e o que o código realmente tem.

REGRAS:

Não alucinar. Documentar somente regras identificadas no código/contexto.
Traduzir regras técnicas para linguagem simples e objetiva.
Manter o arquivo breve, claro e direto.
Seguir o padrão Markdown das specs já existentes no projeto; se não houver, seguir o molde.
Não inventar regras, fluxos, campos ou comportamentos não presentes nos arquivos analisados.
Em specs existentes, preserve trechos não confirmados pelo material disponível; informe a incerteza ao usuário em vez de removê-los ou reescrevê-los como fato.
O `specs.md` deve ser 100% informativo (explicar a feature e decisões — sem tom de changelog).
