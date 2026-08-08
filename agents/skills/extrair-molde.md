---
name: extrair-molde
description: >-
  Extrai padrões estruturais de uma entidade canônica do app atual e propõe
  atualização dos moldes em ../dev-grimoire/moldes/. Use com "extrair molde",
  "atualizar molde", "sincronizar molde", "promover padrão ao grimoire" ou
  quando o molde Carro estiver desatualizado em relação ao projeto vivo.
---

# Extrair Molde

## Regra final

NUNCA desperdiçar tokens — sempre visar economia, mas mantendo qualidade de prompt/resultado.

Anunciar no início:

```text
Usando extrair-molde para atualizar os moldes do Dev Grimoire.
```

## Objetivo

A partir de uma entidade **canônica** do app aberto, extrair a **estrutura** (camadas, assinaturas, imports, envelope, nomenclatura) e propor atualização do domínio de exemplo **Carro** em `{GRIMOIRE}/moldes/`.

O molde deve continuar genérico e didático — não virar cópia do domínio do app.

## Quando usar

* O padrão do app evoluiu e o molde Carro ficou atrás
* Uma camada nova consolidou (Controller, Request, Enum, Form, etc.) e falta no grimório
* O usuário pede para “promover” um módulo bem feito a referência

## Quando não usar

* O código-fonte ainda é experimental ou inconsistente
* O pedido é só gerar código no app (use `definir-plano` / `quick-fix`)
* Há dúvida se o padrão do app deve virar convenção global — nesse caso, perguntar antes

## Hard gates

1. **Não escrever** em `{GRIMOIRE}/moldes/` nem em `docs/rules/` sem confirmação explícita do dev sobre a proposta.
2. **Não copiar** regras de negócio, nomes de domínio reais, secrets, IDs, textos de produto ou integrações específicas do app.
3. **Não inventar** arquivos no molde que não existam (ou não tenham âncora clara) na entidade-fonte.
4. Domínio do molde permanece **Carro** (e tipos auxiliares do exemplo, ex.: `Marca`) — renomear entidade-fonte → Carro na proposta.

## Contexto obrigatório

Resolver `{GRIMOIRE}` via `../dev-grimoire/docs/rules/geral.md` (marker). Se ausente, parar.

Ler via Read/Grep:

1. `{GRIMOIRE}/docs/rules/global.md` (mapa de moldes)
2. Rules da stack em uso (`geral.md` + `php.md` e/ou `javascript.md`)
3. Moldes atuais do tipo que será atualizado
4. Código da entidade-fonte no app (e specs em `docs/features/`, se houver)

## Entrada

Pedir se não estiver claro:

| Campo | Exemplo |
|---|---|
| Entidade-fonte | `Pedido`, `Cliente` |
| Escopo | `laravel` / `react` / `ambos` / lista de tipos (Model, Queries, Controller…) |
| Intensidade | `delta` (só o que divergiu) ou `camada-nova` (arquivo que ainda não existe no molde) |

Default de intensidade: **delta**.

## Fluxo

### 1. Escolher âncora

Preferir entidade que:

* Já segue Queries + Services + envelope `sucesso/dados/erros`
* Tem cobertura razoável (CRUD ou fluxo completo da camada)
* É citada pelo time como “faça igual a X”

Se houver mais de uma candidata, apresentar 2–3 opções com um motivo cada e recomendar.

### 2. Inventariar pares fonte → molde

Usar o mapa de `{GRIMOIRE}/docs/rules/global.md`. Para cada tipo no escopo:

| Tipo | Path no app | Path no molde |
|---|---|---|
| … | caminho real | caminho Carro correspondente |

Marcar: `igual` | `divergente` | `só-no-app` | `só-no-molde`.

### 3. Extrair padrão (não domínio)

Para cada item `divergente` ou `só-no-app`, isolar o que é **estrutura**:

* Assinaturas REST (`index/show/store/update/destroy`)
* Envelope de retorno
* Ordem/comentários de imports
* Transações, `try/catch`, helpers (`formatarMensagemErro`, etc.)
* Organização de pastas/namespaces
* Padrões React (`useForm`, `Form` compartilhado, Queries/Services)

Descartar ou generalizar:

* Campos e validações específicas do negócio
* Relacionamentos e regras só daquele domínio
* Strings de UI, rotas de produto, policies ad hoc

Reescrever o exemplo no domínio **Carro** (campos simples do molde atual: marca, modelo, ano, placa…).

### 4. Proposta (obrigatória antes de gravar)

Apresentar resumo curto:

```markdown
## Proposta extrair-molde

**Fonte:** `{Entidade}` em `{app}`
**Escopo:** …
**GRIMOIRE:** `../dev-grimoire/`

### Divergências
| Arquivo molde | Mudança | Motivo (estrutura) |
|---|---|---|
| `moldes/laravel/...` | criar / atualizar / remover | … |

### Fora de escopo
- [itens do app que NÃO entram no molde e por quê]

### Impacto em rules
- [ ] nenhum
- [ ] atualizar mapa em `docs/rules/global.md` (linhas/tipos)
- [ ] ajustar trecho em `php.md` / `javascript.md` (só se a convenção mudou de verdade)

### Próximo passo
Confirme o que aplicar (tudo / subset por path). Nada será gravado sem isso.
```

### 5. Aplicar (só após confirmação)

1. Atualizar/criar arquivos em `{GRIMOIRE}/moldes/...` com domínio Carro.
2. Se o mapa ou a convenção mudou, atualizar `docs/rules/global.md` e, se necessário, a rule da stack — alteração mínima.
3. Manter specs do molde (`moldes/laravel/docs/features/carro/specs.md`) alinhadas à estrutura (sem regras do app-fonte).
4. Não rodar formatadores automáticos; seguir estilo dos moldes existentes.
5. Não commitar sem pedido explícito do dev.

### 6. Encerrar

```markdown
## Extrair-molde concluído

### Aplicado
- [path]: [criar|atualizar] — [1 frase]

### Rules
- [global.md / php.md / javascript.md ou "nenhuma"]

### Sync
Rodar quando quiser publicar skills/rules nos runtimes:
`./agents/scripts/sync-global-skills.sh`
(Nota: o script sincroniza skills; moldes e rules já são lidos via clone irmão.)

### Não aplicado / pendente
- […]
```

## Regras de qualidade do molde gerado

* SRP: uma responsabilidade por arquivo, como nos moldes atuais
* Queries só com `index/show/store/update/destroy` (específicos → subpasta de contexto no exemplo, se a fonte tiver esse padrão consolidado)
* Services orquestram; Controllers finos; envelope `sucesso/dados/erros`
* Código idiomático ao estilo já presente em `moldes/` (imports comentados por seção, PT nos nomes de métodos de domínio do exemplo)
* Exemplo **ensinável**: preferir o caminho feliz claro a cobrir todos os edge cases do app
* Se a fonte tiver padrão melhor que o molde **e** alinhado às rules → promover; se conflitar com `geral.md`/stack → apontar o conflito e perguntar (não silenciar)

## Anti-patterns

* Copiar `Pedido`/`Cliente` literalmente para dentro de `moldes/`
* Atualizar molde com “melhorias” que o app ainda não usa de forma consolidada
* Reescrever rules inteiras por um detalhe de um módulo
* Extrair de código que viola o grimório sem avisar
* Aplicar sem a tabela de proposta confirmada

## Trigger phrases

* `/extrair-molde`
* `extrair molde`
* `atualizar molde`
* `sincronizar molde`
* `promover padrão ao grimoire`
* `molde desatualizado`
* `atualizar Carro no grimoire`
