---
name: definir-plano-simples
description: >-
  Gera plano de implementação objetivo para tarefas simples e decisões já tomadas
  na conversa. Use com "plano simples", "plano objetivo", "definir-plano-simples"
  ou quando a tarefa não exige escopo/design completo. Antes do plano, use grill-me
  para esclarecer dúvidas.
---

# Definir Plano Simples

## Regra final

NUNCA desperdiçar tokens — sempre visar economia, mas mantendo qualidade de prompt/resultado.

## Regras obrigatórias

1. **Evitar overengineering:** não planejar abstrações, camadas, arquivos, refatorações ou verificações além do que a tarefa exige. A solução mais simples que atende o pedido é a correta.
2. **Iterações rápidas com qualidade:** priorizar loops curtos (poucos passos, validação só do essencial, sem exploração ou auditoria não solicitada). Manter a melhor qualidade de código possível **dentro do escopo** — não compensar com trabalho extra fora dele.

Anunciar no início:

```text
Usando definir-plano-simples para gerar o plano.
```

Crie somente o plano. Não implemente código durante este fluxo.

## Objetivo

Transformar decisões já tomadas (ou tarefas pontuais com escopo claro) em um plano executável, direto e com alterações mínimas.

Esta skill cobre ajustes, correções, extensões pequenas e tarefas objetivas — **não** features inteiras. Para features completas, use `definir-modelagem` → `definir-plano`.

## Quando usar / não usar

**Usar:** escopo já decidido na conversa; tarefa pontual (fix, ajuste, validação, endpoint simples); plano direto após dúvidas esclarecidas.

**Não usar:** feature inteira, escopo ambíguo sem passar por `grill-me`, ou workflow completo solicitado — nesses casos, sugerir `definir-modelagem` ou `definir-plano`.

## Tirar dúvidas antes do plano

Antes de gerar o plano, use a skill **`grill-me`** para esclarecer **todas** as dúvidas sobre escopo, comportamento, arquivos afetados e decisões em aberto.

Fluxo obrigatório quando houver incerteza:

```text
grill-me → decisões fechadas → definir-plano-simples
```

* Só avance para o plano quando não restar decisão relevante em aberto.
* Se o escopo já estiver 100% claro na conversa, pode pular `grill-me` e ir direto ao plano.

## Hard gate

Não implementar código durante a geração do plano. Não expandir escopo nem inventar decisões. Não gerar o plano com dúvidas em aberto — use `grill-me` antes. Não incluir passos de exploração, auditoria ou verificação que o pedido não exija.

## Contexto obrigatório

Antes de escrever o plano, inspecione:

1. Regras do projeto: `AGENTS.md`, `CLAUDE.md`, `.cursor/rules/` ou equivalentes.
2. **Dev Grimoire** (`../dev-grimoire/`): `{GRIMOIRE}/docs/rules/global.md` e rules da stack — leitura via Read/Grep; nunca assumir conteúdo sem ler o filesystem.
3. Specs permanentes em `docs/features/{entidade}/specs.md`, se existirem.
4. Codebase: estrutura, padrões reais e arquivos semelhantes ao que será alterado.

Não inventar arquitetura, nomenclatura ou ferramentas. Padrões consolidados no módulo alterado têm prioridade sobre moldes do Dev Grimoire.

## Artefato

Salve o plano em:

`docs/modelagem/{feature}/plano/{feature}.md`

Use slug `{feature}` em kebab-case. Se o diretório não existir, crie antes de salvar.

**Paths proibidos:** `docs/superpowers/`, `docs/plans/` ou qualquer local fora de `docs/modelagem/{feature}/plano/`.

## Política de exclusão

Artefatos em `docs/modelagem/{feature}/` são **temporários** — não versionar conteúdo permanente. Atualizar `docs/features/{entidade}/specs.md` só após implementação; depois, excluir `docs/modelagem/{feature}/` por completo.

## Política Git

Nunca crie branches, faça commits, push ou altere histórico sem autorização explícita.

O plano deve:

* identificar a branch de desenvolvimento existente (`dev`, `desenvolvimento`, `develop` ou equivalente);
* orientar implementação nessa branch;
* proibir branches avulsas ou `feature/*`, `fix/*`, `task/*`, `chore/*`;
* proibir commits e push durante a implementação;
* exigir `git status` e revisão individual de cada arquivo alterado ao final.

## Estrutura do documento

```markdown
# Plano de Implementação — [nome curto]

**Objetivo:** [resultado em uma frase]

## Contexto decidido

Resumo do que já foi decidido na conversa ou na spec existente.

## Escopo

O que será implementado.

## Fora do escopo

O que não será feito agora.

## Restrições globais

- Convenções: `{GRIMOIRE}/docs/rules/global.md` (ler rules e moldes via Read/Grep).
- **Formatação:** proibido usar ferramentas de formatação automática (Pint, Prettier, PHP CS Fixer, `eslint --fix` para estilo, format-on-save). Seguir estilo existente no arquivo/módulo; diff mínimo.
- **Sem overengineering:** solução mínima; sem abstrações, camadas ou arquivos extras sem necessidade concreta.
- **Iteração rápida:** poucos passos diretos; validação só do que protege o comportamento pedido — sem verificações ou explorações extras.

## Política Git para execução

- Branch: `[branch identificada]`
- Não criar branches, commits ou push sem autorização.
- Revisar cada arquivo alterado ao final.

## Arquivos

- `caminho/arquivo`: [criar|alterar] — [responsabilidade]

## Passos de implementação

### 1. [passo objetivo]

- Ação direta.
- Arquivos: `caminho/exato`
- Resultado esperado.

### 2. [passo objetivo]

- Ação direta.
- Arquivos: `caminho/exato`
- Resultado esperado.

## Validação

- Comandos reais de teste/build/lint do projeto.
- Verificações manuais necessárias.
- Casos principais a validar (ver seção **Testes** abaixo — mínimo essencial).

## Documentação pós-implementação

- Atualizar: `docs/features/{entidade}/specs.md`
- Excluir: `docs/modelagem/{feature}/` por completo.

## Checklist final

- [ ] Implementação concluída.
- [ ] Testes/build/lint executados.
- [ ] `git status` revisado.
- [ ] Arquivos alterados revisados um por um.
- [ ] Alterações fora do escopo removidas.
- [ ] `docs/features/{entidade}/specs.md` atualizado.
- [ ] `docs/modelagem/{feature}/` excluído.
- [ ] Nenhum commit ou push automático.
```

## Testes (mínimo essencial — anti-overkill)

Agents tendem a exagerar na quantidade e na granularidade dos testes. **Não faça isso.**

No plano, cubra **somente o básico mínimo** da mudança: os poucos casos que realmente protegem o comportamento pedido. Prefira poucos testes de alto valor a uma suíte larga e frágil.

**Incluir (quando aplicável):**

* 1 fluxo feliz principal da alteração;
* a regra de negócio ou validação crítica (só se for o ponto da tarefa);
* 1 caso de erro esperado, se a feature/API falhar de forma relevante para o usuário;
* regressão pontual se o ajuste for correção de bug conhecido.

**Não incluir:**

* matriz de edge cases, combinações “por precaução” ou cenários hipotéticos;
* testes de detalhes internos, métodos privados ou getters/setters;
* duplicar o mesmo cenário em vários níveis (unitário + feature + integração);
* mocks excessivos, factories elaboradas ou scaffolding maior que o próprio ajuste;
* meta de cobertura percentual ou “testar tudo que o diff tocar”.

Regra prática: se a seção de testes/validação listar mais itens do que passos de implementação, corte até sobrar o mínimo que falharia de forma óbvia se a mudança quebrasse. Um tipo de teste costuma bastar; não planeje suíte ampla em tarefa simples.

## Regras de escrita e autorrevisão

Plano direto, com paths exatos, moldes do Dev Grimoire para arquivos novos e validação concreta. Proibido: `TBD`, `TODO`, tarefas vagas, refatorações fora do escopo, passos de auditoria/exploração não solicitados ou complexidade acima do pedido. Na seção de testes: mínimo essencial — sem overkill.

Antes de concluir: cada item do escopo tem passo correspondente; paths e rules conferidos; política Git e exclusão de `docs/modelagem/{feature}/` confirmadas; testes planejados são só os casos mais importantes.

## Critério de conclusão

A skill termina quando o plano estiver salvo em `docs/modelagem/{feature}/plano/{feature}.md`.

Encerrar com:

```markdown
## Plano concluído

- **Plano temporário:** `docs/modelagem/{feature}/plano/{feature}.md`
- **Branch de execução:** [dev/desenvolvimento/develop/etc.]
- **Spec pós-implementação:** `docs/features/{entidade}/specs.md`
- **Próximo passo:** executar o plano em etapa separada
```
