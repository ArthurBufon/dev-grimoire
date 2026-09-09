# Setup — Dev Grimoire no Codex CLI

## Pré-requisito

Clone `dev-grimoire` como repositório **irmão** dos apps. Ver layout em [guia do Cursor](../cursor/setup-grimoire-local.md).

## Instrução global always-on

Fonte: [`docs/rules/global.md`](../../docs/rules/global.md).

```bash
cd /caminho/para/dev-grimoire
bash agents/scripts/sync-global-skills.sh
```

Destino: `$CODEX_HOME/AGENTS.md` (default `~/.codex/AGENTS.md`).

O Codex carrega esse arquivo no início de cada sessão, antes do trabalho no repositório.

## Skills de workflow

O mesmo script publica skills em `$CODEX_HOME/skills/`, incluindo `dev-grimoire` (conteúdo derivado de `global.md`).

## Validação

Na raiz de um app com layout irmão:

```bash
codex --ask-for-approval never "Resuma as instruções atuais sobre o Dev Grimoire."
```

Resultado esperado: menção ao clone `../dev-grimoire/` e leitura via Read/Grep.

## Manutenção

Após `git pull` no grimório, rode novamente `bash agents/scripts/sync-global-skills.sh`.

Se você usa `AGENTS.override.md` em `~/.codex/`, o script **não** altera `AGENTS.md` — remova o override para voltar ao fluxo do grimório.
