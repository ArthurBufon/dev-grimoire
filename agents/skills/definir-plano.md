---

name: definir-plano
description: Cria planos de implementação detalhados antes de alterar código. Use com "elaborar plano", "write a plan" ou "criar plano de implementação".
---

# Definir Plano

## Regra final

NUNCA desperdiçar tokens — sempre visar economia, mas mantendo qualidade de prompt/resultado.

Crie somente o plano. Não implemente código durante este fluxo.

## Contexto obrigatório

Antes de escrever o plano, leia:

1. Escopo: `docs/modelagem/{feature}/escopo/{feature}.md`
2. Design: `docs/modelagem/{feature}/design/{feature}.md`
3. Regras do projeto: `AGENTS.md`, `CLAUDE.md`, `.cursor/rules/` ou equivalentes.
4. Specs, ADRs e documentação permanente relevante em `docs/` (fora de `docs/modelagem/`).
5. User rules globais.
6. Estrutura do codebase e arquivos semelhantes.

Use o mesmo slug `{feature}` das demais etapas. Não inicie o plano sem escopo e design.

Regras do projeto e do usuário têm precedência sobre esta skill. Não invente convenções; quando algo não estiver documentado, siga os padrões existentes no código.

## Objetivo do plano

Produza um plano executável por alguém que não conhece o projeto, contendo:

* arquivos exatos que serão criados ou alterados;
* responsabilidade de cada arquivo;
* arquitetura e decisões relevantes;
* interfaces, assinaturas e tipos;
* etapas de implementação;
* testes essenciais;
* comandos reais de validação.

Siga KISS, DRY e YAGNI. Não inclua refatorações fora do escopo.

## Escopo

Se houver subsistemas independentes, divida em planos separados.

Cada tarefa deve gerar uma entrega funcional, revisável e testável. Agrupe imports, configuração, scaffolding e documentação pequena à tarefa que depende deles.

## Artefato

Salve o plano em:

`docs/modelagem/{feature}/plano/{feature}.md`

## Política de exclusão

Os arquivos em `docs/modelagem/{feature}/` são **artefatos temporários** de modelagem — não documentação permanente do projeto.

* Não versione conteúdo que deva permanecer no repositório dentro desses paths; transfira o que for necessário para `docs/features/` ou equivalente do projeto.
* Após a feature estar implementada e entregue, **exclua** `docs/modelagem/{feature}/` por completo para evitar lixo acumulado no repositório.
* Só mantenha os artefatos enquanto ainda forem necessários para as etapas seguintes do workflow.

## Política Git

Nunca crie branches, faça commits, push ou altere o histórico sem autorização explícita do usuário.

O plano deve:

* identificar a branch de desenvolvimento existente;
* orientar a implementação nessa branch;
* proibir branches avulsas ou de feature;
* proibir commits durante a implementação;
* exigir revisão final de todos os arquivos alterados.

Não inclua etapas automáticas de commit.

## Estrutura do documento

```markdown
# Plano de Implementação: [Feature]

**Objetivo:** [resultado em uma frase]

**Arquitetura:** [abordagem resumida]

**Stack:** [tecnologias utilizadas]

## Restrições Globais
- [regras aplicáveis a todas as tarefas]

## Política Git para execução
- Branch: `[branch identificada]`
- Não criar branches.
- Não fazer commits ou push sem autorização.
- Revisar cada arquivo alterado ao final.

## Arquivos
- `caminho/arquivo`: [responsabilidade]
```

Para cada tarefa:

```markdown
### Tarefa N: [Entrega]

**Arquivos:**
- Criar: `caminho/exato`
- Alterar: `caminho/exato`
- Testar: `caminho/exato`

**Responsabilidade:** [resultado produzido]

**Interfaces:**
- Consome: [dependências e assinaturas]
- Produz: [métodos, tipos e comportamentos]

- [ ] Criar os testes essenciais
- [ ] Confirmar que falham pelo motivo esperado
- [ ] Implementar o comportamento
- [ ] Executar testes relacionados
- [ ] Validar lint, tipos e build aplicáveis
```

Inclua código, assinaturas e comandos concretos quando necessários para eliminar ambiguidades.

## Estratégia de testes

Use TDD com equilíbrio. Escreva testes suficientes para os cenários mais importantes da feature:

* fluxo principal;
* regras de negócio;
* validações e autorizações relevantes;
* erros esperados;
* integrações críticas;
* regressões.

Não abuse de testes unitários. Evite testar métodos privados, detalhes internos, cenários duplicados, mocks excessivos e cobertura sem valor.

Use testes unitários, de integração ou de feature conforme o comportamento real.

## Proibições

Não use:

* `TBD`, `TODO` ou “implementar depois”;
* instruções vagas como “tratar erros”;
* testes sem cenários definidos;
* “igual à tarefa anterior”;
* funções, tipos ou arquivos não definidos;
* comandos incompatíveis com o projeto;
* alterações fora do escopo.

## Autorrevisão

Antes de concluir:

1. Confirme que todos os requisitos possuem uma tarefa.
2. Verifique paths, nomes, tipos e assinaturas.
3. Remova placeholders, duplicações e tarefas pequenas demais.
4. Confirme aderência às regras do projeto e do usuário.
5. Confirme que nenhum commit ou branch será criado sem permissão.
6. Inclua uma etapa final com `git status` e revisão individual dos arquivos.
7. Confirme que o plano referencia a exclusão futura de `docs/modelagem/{feature}/`.

Ao terminar, informe onde o plano foi salvo (`docs/modelagem/{feature}/plano/{feature}.md`) e um resumo breve do escopo.
