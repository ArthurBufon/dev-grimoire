# Cursor — setup

## User Rule

Copie [`docs/rules/global.md`](../docs/rules/global.md) para **Settings → Rules → User**, ou rode `bash agents/scripts/sync-global-skills.sh` e use o conteúdo atualizado (Codex/Claude são publicados automaticamente; Cursor continua manual).

## Grimório local

Clone `dev-grimoire` uma vez no ancestral comum dos apps (irmão do app ou alguns níveis acima — ex.: `projetos/` com apps em `projetos/laravel/...`). Ver [guia completo](../guias/cursor/setup-grimoire-local.md).

## MCPs

| MCP | Pacote |
|---|---|
| Context7 | `@upstash/context7-mcp` |
| Filesystem | `@modelcontextprotocol/server-filesystem` |
| GitHub | `@modelcontextprotocol/server-github` |

Máximo 5 MCPs ativos.

## Plugin

**Superpowers** — no Agent chat: `/add-plugin superpowers` (Add for myself, global).
