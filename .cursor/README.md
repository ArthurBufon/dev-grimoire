# Cursor — setup

## User Rule

Copie [`docs/rules/global.md`](../docs/rules/global.md) para **Settings → Rules → User**, ou rode `bash agents/scripts/sync-global-skills.sh` e use o conteúdo atualizado (Codex/Claude são publicados automaticamente; Cursor continua manual).

## Grimório local

Clone `dev-grimoire` como repositório **irmão** dos apps, no mesmo diretório pai (nome do pai é livre — ex.: `projetos/`). Ver [guia completo](../guias/cursor/setup-grimoire-local.md).

## MCPs

| MCP | Pacote |
|---|---|
| Context7 | `@upstash/context7-mcp` |
| Filesystem | `@modelcontextprotocol/server-filesystem` |
| GitHub | `@modelcontextprotocol/server-github` |

Máximo 5 MCPs ativos.

## Plugin

**Superpowers** — no Agent chat: `/add-plugin superpowers` (Add for myself, global).
