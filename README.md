# 🔮 Meu Grimório

![Meu grimório](img/1.png)

Padrões, prompts, moldes e configs que fui ajustando ao longo do tempo...

---

## O que tem aqui

### 📁 `guias/`

Backup MySQL, SSH, deploy Laravel e setup do Cursor.

### 📁 `agents/`

Prompts e skills para os agentes.

| Pasta | Função |
|---|---|
| [`prompts/`](agents/prompts/) | Prompts pontuais (refactor, troubleshoot, MVP) |
| [`skills/`](agents/skills/) | Planejamento, quick-fix, extrair-molde, mapear specs, grill-me, etc. |
| [`sync.sh`](agents/scripts/sync.sh) | `git pull` neste repo + sync das skills globais |
| [`sync-global-skills.sh`](agents/scripts/sync-global-skills.sh) | Espelha skills e a User Rule (`docs/rules/global.md`) nos runtimes |
| [`inicializar-contexto-agentes.sh`](agents/scripts/inicializar-contexto-agentes.sh) | Cria `AGENTS.md` e `CLAUDE.md` no app, sem sobrescrever o que já existe |

No `~/.zshrc` (ou `~/.bashrc`):

```bash
alias grimoire-sync="$HOME/projects/dev-grimoire/agents/scripts/sync.sh"
```

Depois de um `source ~/.zshrc`, para atualizar o grimório e as skills é só:

```bash
grimoire-sync
```

Isso puxa o repo e roda o `sync-global-skills.sh`. No Cursor, a User Rule ainda é colada em Settings → Rules → User.

Para subir o contexto local de um app, na raiz dele:

```bash
bash ../dev-grimoire/agents/scripts/inicializar-contexto-agentes.sh
```

Ajuste o caminho se o clone não for irmão. Os arquivos só nascem se ainda não existirem. Preencha os colchetes do `AGENTS.md` antes de mandar o agente trabalhar. `CLAUDE.md` só importa o `AGENTS.md` e guarda o que for exclusivo do Claude.

### 📁 `moldes/`

Referência Laravel e React/Inertia. O exemplo é **Carro**, com catálogo **Fabricante** (`belongsTo`).

```
moldes/
├── contratos/ → o que as duas stacks precisam manter igual
├── laravel/   → Controllers, Requests, Models, Queries, Services, migration, tests, specs
└── react/     → Pages, Forms, Services, Queries, Components, Utils
```

Muda o domínio pelo contrato: [`carro.md`](moldes/contratos/carro.md) e [`fabricante.md`](moldes/contratos/fabricante.md). Na mesma mudança, olhe tipos, formulário, queries e testes (seção *Manutenção* de cada contrato).

### 📁 `docs/rules/`

Convenções ficam aqui. Os apps leem o clone local `dev-grimoire` (irmão, ancestral ou pasta irmã). Não copie essas rules para cada repositório.

| Arquivo | Função |
|---|---|
| [`global.md`](docs/rules/global.md) | User Rule global |
| [`geral.md`](docs/rules/geral.md) | Escopo, nomenclatura, Git, segurança |
| [`php.md`](docs/rules/php.md) | PHP / Laravel |
| [`javascript.md`](docs/rules/javascript.md) | JavaScript / React |

### 📁 `.cursor/`

Setup do Cursor: User Rule, MCPs e plugin. Ver [`.cursor/README.md`](.cursor/README.md) e o [guia de setup](guias/cursor/setup-grimoire-local.md).

---

## O que eu sigo

**SRP** — cada arquivo e serviço tem um motivo claro para mudar.

**Queries e Services** — dado de um lado, caso de uso do outro. Quando cabe, os métodos são `index`, `show`, `store`, `update` e `destroy`.

**Retorno** — sempre o mesmo envelope:

```json
{ "sucesso": true,  "dados": {},  "erros": [] }
{ "sucesso": false, "dados": [], "erros": ["mensagem"] }
```

**Moldes como referência** — essa organização vale em qualquer stack, sem forçar o framework a abrir mão das próprias convenções.

**Specs** — regras da feature em `docs/features/<feature>/specs.md`, antes de implementar.

Este repo só muda quando um projeto real deixa um padrão reutilizável. Sem aprendizado novo, não tem o que commitar.

---

## Referência rápida

Queries usam só estes cinco. Contexto extra vai para subpasta e mantém o verbo REST — ex.: `Queries/Carro/Ativos/Queries.tsx: index`. Services também, quando a operação se encaixa. Nome em português, simples.

| Método | HTTP | O que faz |
|---|---|---|
| `index` | `GET /recursos` | Lista |
| `show` | `GET /recursos/{id}` | Um registro |
| `store` | `POST /recursos` | Cria |
| `update` | `PUT/PATCH /recursos/{id}` | Atualiza |
| `destroy` | `DELETE /recursos/{id}` | Remove |

Se aparecer `buscar`, `listar`, `salvar` ou `deletar`, quase sempre é um desses cinco com outro nome.
