---
name: definir-plano-simples
description: >-
  Gera plano de implementação objetivo para tarefas simples e decisões já tomadas
  na conversa. Use com "plano simples", "plano objetivo", "definir-plano-simples"
  ou quando a tarefa não exige escopo/design completo.
---

# Definir Plano Simples

## Regra final

NUNCA desperdiçar tokens — sempre visar economia, mas mantendo qualidade de prompt/resultado.

Anunciar no início:

```text
Usando definir-plano-simples para gerar o plano.
```

Crie somente o plano. Não implemente código durante este fluxo.

## Objetivo

Transformar decisões já tomadas (ou tarefas pontuais com escopo claro) em um plano executável, direto e com alterações mínimas.

Esta skill cobre ajustes, correções, extensões pequenas e tarefas objetivas — **não** features inteiras. Para features completas, use `definir-escopo` → `definir-design` → `definir-plano`.

## Quando usar / não usar

**Usar:** escopo já decidido na conversa; tarefa pontual (fix, ajuste, validação, endpoint simples); plano direto sem brainstorming.

**Não usar:** feature inteira, escopo ambíguo ou workflow completo solicitado — nesses casos, sugerir `definir-escopo` ou `definir-plano`.

## Hard gate

Não implementar código, invocar outras skills, brainstorming ou grilling. Não expandir escopo nem inventar decisões. No máximo **uma pergunta bloqueante**; se não bloquear, assumir o caminho mais simples como premissa.

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
- Casos principais a validar.

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

## Regras de escrita e autorrevisão

Plano direto, com paths exatos, moldes do Dev Grimoire para arquivos novos e validação concreta. Proibido: `TBD`, `TODO`, tarefas vagas, refatorações fora do escopo ou rediscutir decisões.

Antes de concluir: cada item do escopo tem passo correspondente; paths e rules conferidos; política Git e exclusão de `docs/modelagem/{feature}/` confirmadas.

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
