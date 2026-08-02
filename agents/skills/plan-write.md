---
name: plan-write
description: >-
  Orchestrates full planning: brainstorming (superpowers), grilling (grill-me),
  then implementation plan (writing-plans). Use when the user wants a complete
  plan before building, or uses triggers like "plan-write", "write a plan",
  "elaborar plano", or "/plan-write".
---

# Plan Write

Orquestra o planejamento completo em três fases sequenciais. **Nunca pule fases. Nunca implemente código.**

## Hard Gate

```text
Fase 1 (brainstorming) → Fase 2 (grill-me) → Fase 3 (writing-plans) → [execução separada]
```

* Não escrever código, scaffold, nem invocar skills de implementação durante este fluxo.
* Cada fase só inicia após a anterior ser **explicitamente aprovada** pelo usuário.
* Anunciar no início de cada fase: *"Iniciando Fase N — [nome da skill]."*
* A execução do plano é uma etapa separada e deve obedecer integralmente à política de Git definida nesta skill.

---

## Política Git obrigatória

Estas regras devem ser consideradas **user rules globais** e têm precedência sobre defaults das sub-skills, ferramentas, agentes ou convenções genéricas.

### Branch de trabalho

A implementação completa do plano deve ser feita **dentro de uma branch de desenvolvimento existente**, por exemplo:

```text
dev
desenvolvimento
develop
development
```

Ou a branch equivalente definida pelo projeto.

### Proibições

Durante a implementação, é proibido:

* Criar branch avulsa com nome da feature.
* Criar branch temporária para a tarefa.
* Criar branch específica como `feature/*`, `fix/*`, `task/*`, `chore/*` ou similar, salvo se o projeto exigir explicitamente.
* Subir branch avulsa para o `origin`.
* Poluir o repositório remoto com branches de implementação pontuais.
* Fazer commits durante a implementação.

### Antes de implementar

O plano de implementação deve orientar o desenvolvedor a:

1. Identificar a branch de desenvolvimento correta do projeto.
2. Garantir que está trabalhando nessa branch.
3. Atualizar a branch de desenvolvimento conforme o fluxo do projeto.
4. Confirmar que nenhuma branch avulsa será criada.
5. Confirmar que nenhum commit será feito durante a implementação.

Exemplo aceitável:

```bash
git checkout dev
git pull origin dev
```

Ou equivalente, conforme a branch real do projeto.

### Durante a implementação

Durante a execução do plano:

* Alterar arquivos somente dentro do escopo planejado.
* Não commitar checkpoints intermediários.
* Não criar branches novas.
* Não fazer push de branch.
* Não executar comandos destrutivos sem autorização explícita do usuário.
* Não misturar refatorações fora do escopo com a implementação principal.

### Após a implementação

Após concluir a implementação, antes de qualquer commit:

1. Rodar `git status`.
2. Listar todos os arquivos alterados.
3. Revisar detalhadamente cada arquivo modificado.
4. Validar se cada alteração pertence ao escopo do plano.
5. Aprovar os arquivos **um por um**.
6. Remover alterações acidentais, temporárias ou fora do escopo.
7. Só então apresentar ao usuário o resumo final da implementação.

O desenvolvedor deve tratar a revisão final como um gate obrigatório:

```text
Arquivo alterado → revisar → validar escopo → aprovar ou corrigir
```

Nenhum commit deve ser feito automaticamente.

---

## Contexto obrigatório antes de tudo

Antes da Fase 1, carregar e aplicar durante todo o fluxo:

1. **Regras do projeto** — `AGENTS.md`, `CLAUDE.md`, `.cursor/rules/`, ou equivalentes
2. **`docs/`** — specs, ADRs e contexto da feature relevante
3. **User rules globais** — convenções de código, Git, segurança, testes
4. **Codebase** — estrutura existente, padrões do stack, arquivos similares

**Regra de precedência:** regras do projeto + user rules **sobrescrevem** defaults das sub-skills quando houver conflito.

Isso inclui, obrigatoriamente:

* paths de documentação
* política de branches
* política de commits
* política de push
* nomenclatura
* arquitetura
* testes
* persistência ou descarte de planos

Quando houver conflito entre defaults das sub-skills e a política Git desta skill, **seguir a política Git desta skill**.

---

## Resolução de paths

Defaults das sub-skills, como:

```text
docs/superpowers/specs/
docs/superpowers/plans/
docs/plans/
```

aplicam **somente** se o projeto não definir outro padrão.

Antes de salvar qualquer artefato, verificar nas regras do projeto:

| Artefato               | Se o projeto não define   | Se o projeto define (Dev Grimoire)                           |
| ---------------------- | ------------------------- | ------------------------------------------------------------ |
| Escopo                 | —                         | `docs/modelagem/{feature}/escopo/{feature}.md`               |
| Design draft           | `docs/superpowers/specs/` | `docs/modelagem/{feature}/design/{feature}.md`               |
| Plano de implementação | `docs/superpowers/plans/` | `docs/modelagem/{feature}/plano/{feature}.md`                |
| Spec definitiva        | —                         | `docs/features/{entidade}/specs.md`                          |

Artefatos em `docs/modelagem/{feature}/` são temporários. Após a implementação, excluir o diretório por completo.

Quando houver conflito, **seguir o projeto** e informar o usuário qual default foi substituído.

---

## Fase 1 — Brainstorming

**Sub-skill:** `superpowers:brainstorming`

Anunciar:

```text
Iniciando Fase 1 — brainstorming (superpowers).
```

Seguir o checklist completo da skill `brainstorming`, **exceto** o passo final:

| Passo brainstorming                   | Ação em plan-write                                         |
| ------------------------------------- | ---------------------------------------------------------- |
| Explorar contexto do projeto          | ✅ Obrigatório — inclui regras do projeto, docs, codebase   |
| Perguntas esclarecedoras, uma por vez | ✅ Até cobrir todas as informações necessárias para o plano |
| Propor 2–3 abordagens com trade-offs  | ✅                                                          |
| Apresentar design por seções          | ✅ Aprovação do usuário após cada seção                     |
| Escrever design doc                   | ✅ Conforme resolução de paths acima                        |
| Spec self-review                      | ✅                                                          |
| Revisão do usuário no spec            | ✅                                                          |
| ~~Invocar writing-plans~~             | ❌ Substituído pela Fase 2                                  |

Durante esta fase, também identificar qualquer regra existente sobre:

* branch principal de desenvolvimento
* fluxo de Git
* política de commits
* política de push
* revisão de arquivos alterados

Caso o projeto não defina política de Git, aplicar a **Política Git obrigatória** desta skill.

### Critério de saída

O usuário aprova o design/rascunho.

Então perguntar:

```text
Design aprovado. Posso iniciar a Fase 2 (grill-me) para stress-testar o design?
```

**Não avançar sem confirmação.**

---

## Fase 2 — Grill Me

**Sub-skill:** `grill-me`

Anunciar:

```text
Iniciando Fase 2 — grill-me.
```

**Input:** design aprovado na Fase 1, via mensagem ou arquivo de rascunho.

Seguir `grill-me` integralmente:

* Uma pergunta por vez, com recomendação.
* Explorar codebase antes de perguntar o que já é descobrível.
* Percorrer árvore de decisões até não restar ambiguidade.
* Validar aderência às regras do projeto e user rules em cada decisão.
* Validar se a estratégia respeita a política Git obrigatória.

Durante o grilling, confirmar explicitamente:

* Qual branch de desenvolvimento será usada.
* Que nenhuma branch avulsa será criada.
* Que nenhuma branch de feature será enviada para o `origin`.
* Que nenhum commit será feito durante a implementação.
* Que a revisão final será feita arquivo por arquivo.

### Critério de saída

Resumo **Entendimento compartilhado** apresentado e **confirmado** pelo usuário.

O entendimento compartilhado deve conter uma seção obrigatória:

```markdown
### Política Git confirmada

- Branch de implementação: [dev/desenvolvimento/develop/etc.]
- Criar branch avulsa: não
- Subir branch para origin: não
- Fazer commits durante implementação: não
- Revisão final: validar todos os arquivos alterados um por um
```

Se o grilling invalidar decisões do design, revisar o rascunho da Fase 1 antes de seguir.

Então perguntar:

```text
Entendimento compartilhado confirmado. Posso iniciar a Fase 3 (writing-plans)?
```

**Não avançar sem confirmação.**

---

## Fase 3 — Writing Plans

**Sub-skill:** `superpowers:writing-plans`

Anunciar:

```text
Iniciando Fase 3 — writing-plans (superpowers).
```

**Input:** design aprovado da Fase 1 + entendimento compartilhado da Fase 2.

Seguir `writing-plans` integralmente, **mais** as regras abaixo.

---

## Conformidade obrigatória

Todo plano deve refletir o que estiver definido em **regras do projeto** e **user rules globais**.

Antes de escrever o plano, extrair e aplicar explicitamente:

* **Arquitetura** — camadas, separação de responsabilidades, onde vai cada tipo de lógica
* **Nomenclatura** — idioma, convenções de arquivos, diretórios e Git
* **Escopo** — KISS, alterações mínimas, sem refatoração fora do escopo
* **Testes** — framework, comandos, TDD se exigido
* **Segurança** — credenciais, dados sensíveis, logging
* **Stack** — libs, patterns e ferramentas já usadas no projeto
* **Git** — branch de desenvolvimento, proibição de branches avulsas, proibição de commits durante implementação e revisão final arquivo por arquivo

Não inventar convenções.

Se o projeto não define algo, seguir padrões já presentes no codebase.

Se o projeto não define Git, aplicar obrigatoriamente:

```text
Implementar na branch de desenvolvimento existente.
Não criar branch de feature.
Não subir branch avulsa para origin.
Não fazer commits durante a implementação.
Revisar todos os arquivos alterados um por um ao final.
```

---

## Requisitos obrigatórios do plano

O plano final deve conter uma seção específica chamada:

```markdown
## Política Git para execução
```

Essa seção deve especificar:

* Branch de desenvolvimento que será usada.
* Comandos seguros para entrar/atualizar essa branch, quando aplicável.
* Proibição de criar branch avulsa.
* Proibição de subir branch da feature para o `origin`.
* Proibição de commits durante a implementação.
* Obrigatoriedade de validar todos os arquivos alterados antes de qualquer commit.
* Obrigatoriedade de aprovar os arquivos alterados um por um.

Exemplo de conteúdo esperado:

```markdown
## Política Git para execução

- Implementar diretamente na branch de desenvolvimento existente: `dev`.
- Não criar branch `feature/*`, `fix/*`, `task/*` ou similar.
- Não subir branch avulsa para `origin`.
- Não fazer commits durante a implementação.
- Ao final, rodar `git status` e revisar todos os arquivos alterados.
- Cada arquivo deve ser validado e aprovado individualmente antes de qualquer commit manual posterior.
```

---

## Checklist de conformidade

Após o self-review de `writing-plans`, verificar:

* [ ] Cada task cita paths exatos do projeto.
* [ ] Padrões existentes do codebase foram seguidos.
* [ ] Nenhuma violação das regras do projeto ou user rules.
* [ ] Política de branch respeitada.
* [ ] Nenhuma branch avulsa será criada.
* [ ] Nenhuma branch de feature será enviada para o `origin`.
* [ ] Nenhum commit será feito durante a implementação.
* [ ] Revisão final arquivo por arquivo está prevista.
* [ ] Política de persistência do plano respeitada.
* [ ] Nenhum placeholder, como `TBD`, "implementar depois" ou "adicionar validação".
* [ ] Comandos de teste e build usam ferramentas reais do projeto.
* [ ] Nenhuma refatoração fora do escopo foi incluída.

---

## Entrega final

A entrega final deve conter:

1. Plano completo, conforme política de paths do projeto.
2. Seção obrigatória de política Git.
3. Checklist de execução.
4. Checklist de validação final dos arquivos alterados.
5. Opções de execução conforme `writing-plans`, como subagent-driven ou inline.
6. Lembrete das políticas do projeto sobre planos temporários ou specs pós-implementação, se aplicável.

Encerrar com:

```markdown
## Plano concluído

- **Design:** [path ou "na conversa"]
- **Grilling:** entendimento compartilhado confirmado
- **Plano:** [localização e política de persistência]
- **Branch de execução:** [dev/desenvolvimento/develop/etc.]
- **Git:** sem branch avulsa, sem push de branch de feature, sem commits durante implementação
- **Validação final:** revisar e aprovar todos os arquivos alterados um por um
- **Próximo passo:** escolher modo de execução (subagent-driven / inline)
```

---

## Anti-Patterns

* Pular brainstorming ou grilling porque o escopo parece simples.
* Ir direto para writing-plans sem as Fases 1 e 2.
* Ignorar regras do projeto em favor dos defaults do Superpowers.
* Plano genérico que ignora padrões do codebase.
* Impor convenções de um stack específico quando o projeto usa outro.
* Múltiplas perguntas por mensagem nas Fases 1 e 2.
* Criar branch `feature/*` para executar o plano.
* Criar branch avulsa com nome da feature.
* Subir branch temporária para o `origin`.
* Fazer commits durante a implementação.
* Deixar arquivos alterados sem revisão individual.
* Aprovar implementação apenas por resumo geral, sem validar arquivo por arquivo.
* Incluir comandos Git destrutivos sem autorização explícita.
* Misturar refatoração fora do escopo com a implementação planejada.

---

## Trigger phrases

* `/plan-write`
* "elaborar plano"
* "write a plan"
* "criar plano de implementação"
* "planejar antes de implementar"
* "fluxo completo de planejamento"
