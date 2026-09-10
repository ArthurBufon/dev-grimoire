# Cursor — setup

## User Rule

Copie [`docs/rules/global.md`](../docs/rules/global.md) para **Settings → Rules → User**, ou rode `bash agents/scripts/sync-global-skills.sh` e use o conteúdo atualizado (Codex/Claude são publicados automaticamente; Cursor continua manual).

## Grimório local

Clone `dev-grimoire` uma vez (irmão, ancestral ou pasta irmã do ancestral — ex.: grimório em `projetos/dev-grimoire` e app em `projetos-flutter/projeto-1`). Ver [guia completo](../guias/cursor/setup-grimoire-local.md).

## MCPs

| MCP | Pacote |
|---|---|
| Context7 | `@upstash/context7-mcp` |
| Filesystem | `@modelcontextprotocol/server-filesystem` |
| GitHub | `@modelcontextprotocol/server-github` |

Máximo 5 MCPs ativos.

## Plugin

**Superpowers** — no Agent chat: `/add-plugin superpowers` (Add for myself, global).
