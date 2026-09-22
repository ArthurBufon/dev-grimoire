# 🔮 Meu Grimório

![Meu grimório](img/1.png)

Aqui guardo regras, exemplos de código, prompts e guias que uso em vários projetos.

O [guia de instalação](INSTALACAO.md) mostra como clonar o repositório, configurar `grimoire-sync` e usar o Grimório no Cursor, Codex e Claude Code.

---

## O que tem aqui

### 📁 `guias/`

Guias de backup MySQL, SSH, deploy Laravel e configuração do Cursor.

### 📁 `agents/`

Prompts, skills e scripts para os agentes.

| Pasta | Função |
|---|---|
| [`prompts/`](agents/prompts/) | Prompts pontuais (refactor, troubleshoot, MVP) |
| [`skills/`](agents/skills/) | Planejamento, quick-fix, extrair-molde, mapear specs, grill-me, etc. |
| [`sync.sh`](agents/scripts/sync.sh) | Atualiza este repositório e sincroniza as skills globais |
| [`sync-global-skills.sh`](agents/scripts/sync-global-skills.sh) | Copia as skills e a User Rule (`docs/rules/global.md`) para as ferramentas disponíveis |
| [`inicializar-contexto-agentes.sh`](agents/scripts/inicializar-contexto-agentes.sh) | Cria `AGENTS.md` e `CLAUDE.md` no app, sem sobrescrever o que já existe |

Para atualizar tudo com um comando, adicione este alias ao `~/.zshrc` ou `~/.bashrc`. Ajuste o caminho se clonou em outra pasta:

```bash
alias grimoire-sync="$HOME/projects/dev-grimoire/agents/scripts/sync.sh"
```

Depois de recarregar o arquivo com `source ~/.zshrc` ou `source ~/.bashrc`, rode:

```bash
grimoire-sync
```

Esse comando atualiza o repositório e sincroniza as skills. No Cursor, você ainda precisa colar a User Rule em **Settings → Rules → User**.

Para criar os arquivos de contexto de um app, rode na raiz dele:

```bash
bash ../dev-grimoire/agents/scripts/inicializar-contexto-agentes.sh
```

Ajuste o caminho se o clone estiver em outro lugar. O script não sobrescreve arquivos existentes. Preencha as informações pedidas no `AGENTS.md` antes de usar o agente. O `CLAUDE.md` importa esse arquivo e guarda apenas instruções exclusivas do Claude.

### 📁 `moldes/`

Exemplos para Laravel e React/Inertia. A entidade de exemplo é **Carro**, ligada ao catálogo **Fabricante** por `belongsTo`.

```
moldes/
├── contratos/ → o que as duas stacks precisam manter igual
├── laravel/   → Controllers, Requests, Models, Queries, Services, migration, tests, specs
└── react/     → Pages, Forms, Services, Queries, Components, Utils
```

Os contratos de [`carro.md`](moldes/contratos/carro.md) e [`fabricante.md`](moldes/contratos/fabricante.md) mostram quais dados devem combinar nas duas stacks. Ao adaptar um molde, consulte a seção *Manutenção* do contrato para conferir tipos, formulário, queries e testes.

### 📁 `docs/rules/`

As regras ficam nesta pasta. Cada app lê o clone local `dev-grimoire`, que pode estar ao lado dele, em uma pasta acima ou em uma pasta irmã. Não é preciso copiar as regras para cada app.

| Arquivo | Função |
|---|---|
| [`global.md`](docs/rules/global.md) | User Rule global |
| [`geral.md`](docs/rules/geral.md) | Escopo, nomenclatura, Git, segurança |
| [`php.md`](docs/rules/php.md) | PHP / Laravel |
| [`javascript.md`](docs/rules/javascript.md) | JavaScript / React |

### 📁 `.cursor/`

Configuração do Cursor, incluindo User Rule, MCPs e plugin. Consulte [`.cursor/README.md`](.cursor/README.md) e o [guia do Cursor](guias/cursor/setup-grimoire-local.md).

---

## O que eu sigo

**Uma responsabilidade por arquivo ou serviço (SRP)** — cada um tem um motivo claro para mudar.

**Queries e Services** — Queries cuidam do acesso aos dados; Services cuidam das regras de negócio. Quando a operação se encaixa, uso os métodos `index`, `show`, `store`, `update` e `destroy`.

**Retorno** — uso sempre os campos `sucesso`, `dados` e `erros`:

```json
{ "sucesso": true,  "dados": {},  "erros": [] }
{ "sucesso": false, "dados": [], "erros": ["mensagem"] }
```

**Moldes como referência** — adapto a organização à stack sem contrariar as convenções do framework.

**Specs** — registro as regras de cada funcionalidade em `docs/features/<feature>/specs.md` antes de implementar.

Atualizo este repositório quando um projeto real traz um padrão que vale a pena reutilizar. Sem um aprendizado novo, não há mudança para commitar.

---

## Referência rápida

Queries usam estes cinco métodos. Para uma operação mais específica, crio uma subpasta e mantenho o método REST correspondente. Por exemplo: `Queries/Carro/Ativos/Queries.tsx: index`. Faço o mesmo em Services quando a operação se encaixa. Os nomes são simples e em português.

| Método | HTTP | O que faz |
|---|---|---|
| `index` | `GET /recursos` | Lista |
| `show` | `GET /recursos/{id}` | Um registro |
| `store` | `POST /recursos` | Cria |
| `update` | `PUT/PATCH /recursos/{id}` | Atualiza |
| `destroy` | `DELETE /recursos/{id}` | Remove |

Nomes como `buscar`, `listar`, `salvar` ou `deletar` geralmente correspondem a um dos cinco métodos acima.
