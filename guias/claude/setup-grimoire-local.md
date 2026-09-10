# Setup — Dev Grimoire no Claude Code

## Pré-requisito

Clone `dev-grimoire` uma vez no ancestral comum dos apps (irmão ou níveis acima). Ver layout em [guia do Cursor](../cursor/setup-grimoire-local.md).

## Instrução global always-on

Fonte: [`docs/rules/global.md`](../../docs/rules/global.md).

```bash
cd /caminho/para/dev-grimoire
bash agents/scripts/sync-global-skills.sh
```

Destino: `~/.claude/CLAUDE.md`.

## Skills de workflow

O mesmo script publica skills em `~/.claude/skills/`, incluindo `dev-grimoire`.

## Contexto por projeto

Em cada app, versione `AGENTS.md` na raiz (contexto local). O `CLAUDE.md` do projeto importa `@AGENTS.md` — não substitui o global em `~/.claude/`.

Inicializar arquivos locais:

```bash
bash {GRIMOIRE}/agents/scripts/inicializar-contexto-agentes.sh
```

## Manutenção

Após `git pull` no grimório, rode novamente `bash agents/scripts/sync-global-skills.sh`.

Não edite `~/.claude/CLAUDE.md` manualmente — altere `docs/rules/global.md` e sincronize.
