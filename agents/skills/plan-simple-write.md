---

name: plan-simple-write
description: >-
Generates a simple, objective implementation plan for decisions already made
in the current conversation. Use when the user wants a direct implementation
plan without brainstorming, grilling, design exploration, or invoking other
skills. Trigger phrases include "plan-simple-write", "/plan-simple-write",
"gerar plano simples", "plano simples", "plano objetivo", or
"criar plano direto".
---

# Plan Simple Write

Gera um plano objetivo para implementar o que **já foi decidido** na conversa atual.

**Não invoca outras skills. Não escreve código. Não faz brainstorming nem grilling.**

Anunciar no início:

```text
Usando plan-simple-write para gerar o plano.
```

---

## Objetivo

Criar um plano de implementação simples, direto e executável, com foco em:

* escopo já decidido
* alterações mínimas
* zero overengineering
* paths reais do projeto
* validação clara
* política Git obrigatória
* documentação pós-implementação

Esta skill existe para transformar decisões já tomadas em um plano prático de execução.

---

## Hard Gate

Durante este fluxo:

* Não implementar código.
* Não criar scaffold.
* Não criar migrações.
* Não criar componentes.
* Não criar testes.
* Não invocar outras skills.
* Não fazer brainstorming.
* Não fazer grilling.
* Não propor múltiplas abordagens, salvo se o usuário pedir explicitamente.
* Não expandir o escopo além do que já foi decidido.
* Não inventar decisões ausentes.

Se algo essencial não estiver decidido, fazer no máximo **uma pergunta objetiva e bloqueante**.

Se a dúvida não bloquear o plano, assumir o caminho mais simples e registrar como premissa.

---

## Contexto obrigatório

Antes de escrever o plano, verificar e considerar:

1. **Regras do projeto** — `AGENTS.md`, `CLAUDE.md`, `.cursor/rules/`, ou equivalentes
2. **Docs existentes** — especialmente `docs/features/{entidade}/specs.md`
3. **User rules globais** — Git, documentação, segurança, testes e estilo
4. **Codebase** — estrutura existente, padrões reais e arquivos similares

Não inventar arquitetura, nomenclatura ou ferramentas.

Se o projeto já possui padrão claro, seguir o padrão existente.

Se não houver padrão claro, escolher a solução mais simples e direta.

---

## Política Git obrigatória

Estas regras são obrigatórias e têm precedência sobre defaults genéricos, ferramentas, agentes ou convenções comuns.

### Branch de trabalho

A implementação completa do plano deve ser feita **dentro de uma branch de desenvolvimento existente**, por exemplo:

```text
dev
desenvolvimento
develop
development
```

Ou a branch equivalente já utilizada pelo projeto.

### Proibições

Durante a implementação, é proibido:

* Criar branch avulsa com nome da feature.
* Criar branch temporária para a tarefa.
* Criar branch específica como `feature/*`, `fix/*`, `task/*`, `chore/*` ou similar.
* Subir branch avulsa para o `origin`.
* Fazer commits durante a implementação.
* Fazer push durante a implementação.
* Executar comandos destrutivos de Git sem autorização explícita do usuário.

### Antes de implementar

O plano deve orientar o desenvolvedor a:

1. Identificar a branch de desenvolvimento correta.
2. Garantir que está nessa branch.
3. Atualizar a branch conforme o fluxo seguro do projeto.
4. Confirmar que nenhuma branch avulsa será criada.
5. Confirmar que nenhum commit será feito durante a implementação.
6. Confirmar que nenhum push será feito durante a implementação.

Exemplo aceitável:

```bash
git checkout dev
git pull origin dev
```

Ou equivalente, conforme a branch real do projeto.

### Após implementar

Após concluir a implementação, antes de qualquer commit manual posterior:

1. Rodar `git status`.
2. Listar todos os arquivos alterados.
3. Revisar detalhadamente cada arquivo modificado.
4. Validar se cada alteração pertence ao escopo do plano.
5. Atualizar a spec definitiva da entidade em `docs/features/{entidade}/specs.md`.
6. Excluir o plano temporário de `docs/plans/`.
7. Aprovar os arquivos alterados **um por um**.
8. Remover alterações acidentais, temporárias ou fora do escopo.
9. Apresentar resumo final da implementação ao usuário.

Nenhum commit deve ser feito automaticamente.

---

## Política obrigatória de paths

A política de paths desta skill é obrigatória.

Não utilizar defaults antigos de outras skills, como:

```text
docs/superpowers/specs/
docs/superpowers/plans/
```

Esses paths estão proibidos neste fluxo.

---

### Plano de implementação

Todo plano gerado por esta skill deve ser obrigatoriamente criado em:

```text
docs/plans/
```

Regras:

* O plano é temporário.
* A pasta `docs/plans/` é ignorada no Git por padrão.
* O plano não deve ser commitado.
* O plano não deve ser salvo fora de `docs/plans/`.
* Se `docs/plans/` não existir, criar a pasta antes de salvar o plano.
* O arquivo deve usar nome curto, descritivo e em kebab-case.
* O plano deve ser excluído obrigatoriamente após a implementação.

Exemplo:

```text
docs/plans/implementar-clientes.md
```

---

### Specs de entidade

Specs de entidade representam documentação definitiva da feature **após implementação**.

Elas devem ser criadas ou atualizadas em:

```text
docs/features/{entidade}/specs.md
```

Regras:

* `specs.md` deve documentar comportamento implementado, não intenção de implementação.
* Não atualizar `specs.md` durante a criação do plano.
* Após implementar a feature, atualizar a spec da entidade correspondente.
* Se `docs/features/{entidade}/specs.md` já existir, atualizar o arquivo existente.
* Se a estrutura da entidade não existir, criar a estrutura necessária.
* Não criar specs de entidade em `docs/superpowers/specs/`.
* Não criar specs soltas em `docs/`.

Exemplos:

```text
docs/features/clientes/specs.md
docs/features/profissionais/specs.md
docs/features/titulos/specs.md
docs/features/empresas/specs.md
```

Se a implementação afetar múltiplas entidades, atualizar o `specs.md` de cada entidade impactada após a implementação.

---

## Fluxo correto

```text
Decisões já tomadas na conversa
→ gerar plano simples em docs/plans/
→ execução separada da implementação
→ atualizar docs/features/{entidade}/specs.md
→ excluir plano temporário de docs/plans/
→ revisar todos os arquivos alterados um por um
```

---

## Formato obrigatório do plano

O plano gerado deve ser objetivo e conter as seções abaixo.

```markdown
# Plano de Implementação — [nome curto da feature]

## Contexto decidido

Resumo direto do que já foi decidido na conversa.

## Escopo

O que será implementado.

## Fora do escopo

O que não será implementado agora.

## Arquivos prováveis

Lista de arquivos e diretórios que provavelmente serão criados ou alterados.

## Política Git para execução

- Branch de execução: [dev/desenvolvimento/develop/etc.]
- Não criar branch avulsa.
- Não criar branch feature/fix/task/chore.
- Não fazer commit durante a implementação.
- Não fazer push durante a implementação.
- Revisar todos os arquivos alterados um por um antes de qualquer commit manual posterior.

## Política de documentação

- Plano temporário: docs/plans/[arquivo].md
- Spec pós-implementação: docs/features/{entidade}/specs.md
- Após implementar e atualizar a spec, excluir este plano temporário.

## Passos de implementação

### 1. [passo objetivo]
- Ação direta.
- Arquivos envolvidos.
- Resultado esperado.

### 2. [passo objetivo]
- Ação direta.
- Arquivos envolvidos.
- Resultado esperado.

## Validação

- Comandos reais de teste/build/lint do projeto.
- Verificações manuais necessárias.
- Casos principais a validar.

## Checklist final

- [ ] Implementação concluída.
- [ ] Testes/build/lint executados.
- [ ] `git status` revisado.
- [ ] Todos os arquivos alterados revisados um por um.
- [ ] Alterações fora do escopo removidas.
- [ ] `docs/features/{entidade}/specs.md` atualizado.
- [ ] Plano temporário removido de `docs/plans/`.
- [ ] Nenhum commit feito automaticamente.
- [ ] Nenhum push feito automaticamente.
```

---

## Regras de escrita do plano

O plano deve:

* Ser direto.
* Ser prático.
* Usar linguagem objetiva.
* Evitar overengineering.
* Evitar abstrações desnecessárias.
* Evitar refatorações fora do escopo.
* Citar paths exatos sempre que possível.
* Usar comandos reais do projeto.
* Separar claramente escopo e fora do escopo.
* Incluir validação final arquivo por arquivo.
* Incluir atualização de `specs.md` após implementação.
* Incluir exclusão obrigatória do plano temporário após implementação.

O plano não deve:

* Rediscutir decisões já tomadas.
* Reabrir brainstorming.
* Fazer grilling.
* Sugerir 2–3 abordagens.
* Criar design draft separado.
* Criar spec antes da implementação.
* Sugerir branch `feature/*`.
* Sugerir commits intermediários.
* Sugerir push.
* Incluir placeholders como `TBD`, "implementar depois" ou "validar depois".
* Incluir tarefas genéricas sem arquivo, objetivo ou resultado esperado.

---

## Critério de conclusão

A skill termina quando o plano simples estiver gerado e salvo em:

```text
docs/plans/[nome-do-plano].md
```

Encerrar com:

```markdown
## Plano concluído

- **Plano temporário:** `docs/plans/[nome-do-plano].md`
- **Branch de execução:** [dev/desenvolvimento/develop/etc.]
- **Git:** sem branch avulsa, sem commits, sem push durante implementação
- **Spec pós-implementação:** `docs/features/{entidade}/specs.md`
- **Pós-implementação obrigatório:** atualizar spec definitiva e excluir plano temporário
- **Próximo passo:** executar o plano em etapa separada
```

---

## Anti-Patterns

* Fazer brainstorming.
* Fazer grilling.
* Invocar outras skills.
* Escrever código durante o planejamento.
* Criar design draft separado.
* Criar plano fora de `docs/plans/`.
* Atualizar `docs/features/{entidade}/specs.md` antes da implementação.
* Criar branch `feature/*`.
* Criar branch avulsa.
* Fazer commit durante a implementação.
* Fazer push durante a implementação.
* Criar plano genérico sem paths reais.
* Criar tarefas vagas.
* Criar refatorações fora do escopo.
* Manter plano temporário após a implementação.
* Deixar arquivos alterados sem revisão individual.

---

## Trigger phrases

* `/plan-simple-write`
* `plan-simple-write`
* "gerar plano simples"
* "plano simples"
* "plano objetivo"
* "plano direto"
* "criar plano direto"
* "criar plano simples de implementação"
* "gerar plano do que já decidimos"
