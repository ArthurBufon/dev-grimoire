---
name: definir-modelagem
description: >-
  Define requisitos verificáveis e, quando necessário, design técnico de uma
  feature antes do plano. Use com "definir modelagem", "definir escopo",
  "definir design" ou antes de definir-plano. Substitui definir-escopo e
  definir-design.
---

# Definir Modelagem (escopo + design)

## Regra final

NUNCA desperdiçar tokens — sempre visar economia, mas mantendo qualidade de prompt/resultado.

## Objetivo

Em um único fluxo: fechar **o quê** (comportamento) e, só se houver sinal, **como** (design técnico).
O artefato deve bastar para `definir-plano` — sem segundo handoff.

Slug `{feature}` compartilhado com `definir-plano` → `executar-plano`.

## Artefato

Salve **um** documento em:

`docs/modelagem/{feature}/modelagem/{feature}.md`

Inclua sempre a seção de comportamento. Inclua a seção de design técnico somente quando a triagem exigir (ou quando surgir trade-off real no meio do fluxo).

## Política de exclusão

Os arquivos em `docs/modelagem/{feature}/` são **artefatos temporários** de modelagem — não documentação permanente do projeto.

* Não versione conteúdo permanente nesses paths; transfira o necessário para `docs/features/` ou equivalente.
* Após a feature entregue, **exclua** `docs/modelagem/{feature}/` por completo.
* Só mantenha os artefatos enquanto forem necessários às etapas seguintes.

## Triagem (obrigatória)

Antes do interrogatório, inspecione código/docs existentes. Anuncie o modo e o motivo em uma frase. Se o usuário discordar, ajuste.

| Modo | Quando | Ritual | Design no artefato? |
|---|---|---|---|
| **L** | CRUD/ajuste em padrão; comportamento claro ou inferível | 3–5 perguntas (até 3 agrupadas/msg); saída curta | **Não** — âncora em padrão/molde existente |
| **M** | Regra de negócio nova; stack/padrão do projeto óbvios | Blocos 1–3; bloco 4 só com sinal; até 2 perguntas/msg | **Só se** trade-off real (modelo novo, contrato externo, integração) |
| **H** | Domínio novo, compliance, multi-ator, integração crítica ou muita ambiguidade | Completo; uma pergunta por vez | **Sim** |

Na dúvida L↔M → **M**. M↔H → **H**.

## Regras

* Explore código, docs, banco e testes antes de perguntar.
* Reaproveite termos e padrões válidos; aponte inconsistências para o usuário decidir.
* Na fase de comportamento: descreva **o que** acontece — não invente arquitetura. Âncora (“igual à feature Y / molde do módulo”) é permitida.
* Na fase de design: só decisões que o plano **não** deriva sozinho de moldes/padrões.
* Em cada pergunta: alternativas concretas + recomendação + motivo.
* Pressione o vago até ficar verificável (comportamento) / implementável (design).
* Pesquise práticas do domínio/stack quando houver sinal; cite fontes só se forem decisivas.

## Fase 1 — Comportamento (sempre)

Percorra nesta ordem; aprofunde só com sinal do modo:

1. **Problema e escopo** — que problema resolve, para quem, o que fica de fora.
2. **Atores e fluxo** — perfis/permissões; evento que inicia; caminho principal; erros, cancelamentos e retomadas **relevantes**.
3. **Dados e regras** — campos, obrigatoriedade, validações, limites, estados e transições que mudam comportamento.
4. **Colaterais e NFRs** — *somente com sinal* (notificação, auditoria, integração, histórico/retrocompat, prazo/fuso, segurança, acessibilidade, desempenho, concorrência). Sem sinal: registre “N/A”.

## Fase 2 — Design (condicional)

Só se modo **H**, ou **M** com decisão técnica aberta. Não reperguntar regras de negócio.

1. **Dados** — entidades, relações, persistência (delta vs. existente).
2. **Componentes e contratos** — camadas/módulos; endpoints/eventos; formatos I/O.
3. **Integrações e fluxo técnico** — externos/filas/cache; como requisitos viram execução e erro.
4. **Trade-offs** — escolha, alternativa descartada, risco e mitigação (só o relevante).

Se a Fase 2 for pulada, registre no artefato: `Design: pulado — seguir moldes/padrão X`.

## Encerramento

Antes de gravar, apresente **Entendimento compartilhado**:

* **L:** 5–8 bullets.
* **M/H:** problema, atores, regras, fluxos, NFRs se houver, e design se aplicável.

Só produza o artefato após confirmação explícita. Se algo mudar, retome o bloco afetado.

Checklist interno (não entrevistar): lacuna? contradição? requisito que é implementação? decisão técnica sem design quando deveria ter?

## Saída do artefato

```markdown
# Modelagem: {feature}

**Modo:** L | M | H
**Design:** gerado | pulado ([motivo / âncora])

## Comportamento
- Contexto e objetivo
- Atores e permissões
- Requisitos e regras (numerados, atômicos, testáveis)
- Estados, validações e fluxos relevantes
- NFR / integrações (ou N/A)
- Critérios de aceite (L: bullets verificáveis; M/H: Given/When/Then)
- Fora de escopo

## Design técnico
(omitir a seção inteira se pulado; senão:)
- Arquitetura (1 parágrafo)
- Modelo de dados (delta)
- Componentes e contratos
- Integrações
- Decisões com justificativa e alternativas
- Rastreabilidade: requisito → decisão
```

Revise lacunas, contradições e complexidade injustificada.

Salve em `docs/modelagem/{feature}/modelagem/{feature}.md`, informe o path e o próximo passo: `definir-plano`.
