# 🔮 Meu Grimório

Este é o meu repositório de referências para o trabalho do dia a dia. Aqui ficam os padrões, prompts, moldes e configurações que fui ajustando em projetos reais.

Não é uma tentativa de reunir “as melhores práticas” universais. É um conjunto opinativo de escolhas que quero repetir quando fazem sentido — e revisar quando deixarem de fazer.

---

## O que tem aqui

### 📁 `guias/`
Guias práticos para situações recorrentes: backup MySQL, conexão SSH e deploy Laravel.

### 📁 `agents/`
Prompts e skills para trabalhar com agentes de IA.

| Pasta | Função |
|---|---|
| [`prompts/`](agents/prompts/) | Prompts pontuais (refactor, troubleshoot, MVP) |
| [`skills/`](agents/skills/) | Skills personalizadas (planejamento, quick-fix, extrair-molde, mapear specs, grill-me, etc.) |
| [`sync-global-skills.sh`](agents/scripts/sync-global-skills.sh) | Sincroniza skills globais (Cursor, Codex, Claude) com `agents/skills/` |

#### Sincronizar skills globais

Depois de alterar uma skill em `agents/skills/`, rode:

```bash
agents/scripts/sync-global-skills.sh
```

O script atualiza as instalações já existentes do Cursor, Codex e Claude. A skill `dev-grimoire` é gerada a partir de `docs/rules/global.md`.

### 📁 `moldes/`
Código de referência para Laravel e React/Inertia. O domínio de exemplo é **Carro** e cobre controller, form requests, modelo, queries, services web/view/API, helpers, migration, testes e specs.

```
moldes/
├── laravel/   → Controllers, Requests, Models, Queries, Services, migration, tests, docs/features/
└── react/     → Pages, Forms, Services, Queries, Components, Utils
```

### 📁 `docs/rules/`
As convenções ficam centralizadas aqui. Os apps as consomem pelo clone irmão `../dev-grimoire/`, lido pelo agente no filesystem; não é necessário copiar essas rules para cada repositório.

| Arquivo | Função |
|---|---|
| [`global.md`](docs/rules/global.md) | **User Rule global** — clone local + Read/Grep |
| [`geral.md`](docs/rules/geral.md) | Escopo mínimo, princípios, nomenclatura, Git, segurança |
| [`php.md`](docs/rules/php.md) | Convenções PHP / Laravel |
| [`javascript.md`](docs/rules/javascript.md) | Convenções JavaScript / React |

### 📁 `.cursor/`

Configuração do Cursor, incluindo User Rule global, MCPs e plugin. Veja [`.cursor/README.md`](.cursor/README.md) e o [guia de setup local](guias/cursor/setup-grimoire-local.md).

---

## Ideias que seguram a casa

**SRP** — cada arquivo, função e serviço deve ter um motivo claro para mudar.

**Queries + Services** — acesso a dados e lógica de caso de uso não ficam misturados. Quando a operação se encaixa, os métodos usam `index`, `show`, `store`, `update` e `destroy`.

**Retorno padronizado** — os fluxos usam o mesmo envelope:
```json
{ "sucesso": true,  "dados": {},  "erros": [] }
{ "sucesso": false, "dados": {}, "erros": ["mensagem"] }
```

**Docs como contexto para IA** — specs em `docs/features/<feature>/specs.md` registram regras e reduzem ambiguidade na hora de gerar código.

**SDD (Specification-Driven Development)** — regras e fronteiras vêm antes da implementação.

---

## Por que manter isso?

Com IA participando cada vez mais do código, pequenas convenções bem registradas evitam que cada conversa recomece do zero:

- Prompts rendem melhor quando a arquitetura já tem um padrão reconhecível
- User Rules do Cursor levam essas escolhas para os projetos
- O clone local do **Dev Grimoire** (`../dev-grimoire/`) dá ao agente uma fonte concreta para consultar via Read/Grep
- Specs em `docs/features/` funcionam como memória de contexto da feature

---

## Referência rápida

### Nomenclatura REST
 
Queries usam somente os cinco métodos abaixo. Quando uma consulta precisar de contexto próprio, ela vai para uma subpasta e mantém o método REST correspondente — por exemplo, `Queries/Carro/Ativos/Queries.tsx: index`.

Services também usam esses verbos quando a operação se encaixa. Regras de negócio específicas continuam nos services, com nomes em português, simples e objetivos.
 
| Método | HTTP | Descrição |
|---|---|---|
| `index` | `GET /recursos` | Lista |
| `show` | `GET /recursos/{id}` | Um registro |
| `store` | `POST /recursos` | Cria |
| `update` | `PUT/PATCH /recursos/{id}` | Atualiza |
| `destroy` | `DELETE /recursos/{id}` | Remove |
 
> Se surgir um método chamado `buscar`, `listar`, `salvar` ou `deletar`, vale conferir antes se ele não é um desses cinco com outro nome.

### Princípios

```
SRP  → um motivo de mudar por unidade
OCP  → aberto para extensão, fechado para modificação
DIP  → dependa de abstrações, não implementações
```
