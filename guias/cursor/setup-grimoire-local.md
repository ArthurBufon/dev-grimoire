# Setup — Dev Grimoire local (clone único)

## Propósito

O agente do Cursor precisa ler rules e moldes do Dev Grimoire via **Read/Grep no filesystem**. O Index Docs nativo não crawl repositórios GitHub nem expõe arquivos PHP/TSX às ferramentas do agente.

A solução: manter **um clone local** chamado `dev-grimoire` — irmão do app, ancestral, ou numa pasta irmã (ex.: `projetos/dev-grimoire` com o app em `projetos-flutter/projeto-1`).

---

## Layout de pastas

O **único nome fixo** é a pasta do grimório: `dev-grimoire`.

O diretório que agrupa os apps **não tem nome fixo**. Apps podem ficar em subpastas de stack ou em pastas irmãs (`projetos-flutter/`, `projetos/`); o grimório fica num único clone, não em cada pasta de framework.

Irmão dos apps:

```text
projetos/                  ← nome livre (exemplo)
├── dev-grimoire/          ← nome fixo; clone único
├── app-cliente-a/
├── app-cliente-b/
└── ...
```

Ancestral (apps agrupados por stack):

```text
projetos/
├── dev-grimoire/          ← clone único
├── laravel/
│   └── erp-1/             ← app aberto; grimório em ../../dev-grimoire
└── react/
    └── spa-1/
```

Pastas irmãs (apps fora da árvore do grimório):

```text
diretorio/
├── projetos/
│   └── dev-grimoire/      ← clone único
└── projetos-flutter/
    └── projeto-1/         ← app aberto; grimório em ../projetos/dev-grimoire
```

A User Rule sobe a partir do pai do app: em cada nível testa `{dir}/dev-grimoire` e, se faltar, os filhos imediatos `{dir}/*/dev-grimoire`. O marker mais próximo vence.

---

## Clone

No ancestral comum (ex.: dentro de `projetos/`):

```bash
cd /caminho/para/projetos
git clone https://github.com/ArthurBufon/dev-grimoire.git dev-grimoire
```

O nome da pasta **deve** ser `dev-grimoire` — a User Rule global resolve o grimório por esse marker.

---

## Setup no Cursor

1. Abra **somente o app** no Cursor (ex.: `projetos/laravel/erp-1/`) — multi-root não é obrigatório.
2. Rode `bash agents/scripts/sync-global-skills.sh` no grimório (skills + Codex/Claude globais).
3. Copie o conteúdo de [`docs/rules/global.md`](../../docs/rules/global.md) para **Settings → Rules → User** (Cursor não tem destino em arquivo no script).
4. Não é necessário configurar **Indexing & Docs**.

Guias dos outros runtimes: [Codex](../codex/setup-grimoire-local.md), [Claude](../claude/setup-grimoire-local.md).

---

## Validação

Com o app aberto no Cursor, peça ao agente:

> Resolva `{GRIMOIRE}` conforme a User Rule e leia `{GRIMOIRE}/README.md`.

Resultado esperado: leitura bem-sucedida (irmão, ancestral ou `{dir}/{irmao}/dev-grimoire`).

Teste adicional (Laravel):

> Leia `{GRIMOIRE}/moldes/laravel/app/Models/Carro.php`.

---

## Manutenção

Quando houver mudanças no grimório:

```bash
cd /caminho/para/projetos/dev-grimoire
git pull origin main
```

Um único clone serve apps no ancestral, em subpastas de stack e em pastas irmãs.

---

## Sincronização global (Cursor, Codex, Claude)

Fonte de verdade: `docs/rules/global.md` e `agents/skills/`.

Após `git pull` com mudanças em skills ou `global.md`:

```bash
cd /caminho/para/dev-grimoire
bash agents/scripts/sync-global-skills.sh
```

| Runtime | Instrução always-on | Skills |
|---|---|---|
| Cursor | Settings → Rules → User (manual) | `~/.cursor/skills/` |
| Codex | `$CODEX_HOME/AGENTS.md` | `$CODEX_HOME/skills/` |
| Claude | `~/.claude/CLAUDE.md` | `~/.claude/skills/` |

O script copia `agents/skills/*.md` → `{dir}/{skill}/SKILL.md`, gera a skill `dev-grimoire` a partir de `global.md` e publica `global.md` em `AGENTS.md` / `CLAUDE.md`. Se existir `AGENTS.override.md` no Codex, o script não sobrescreve `AGENTS.md`.

---

## Troubleshooting

| Problema | Causa provável | Solução |
|---|---|---|
| Agente não encontra o grimório | Clone fora do ancestral e das pastas irmãs | Clonar `dev-grimoire` no ancestral ou numa pasta irmã visível (ex.: `projetos/`) |
| Marker não encontrado | Pasta com nome diferente de `dev-grimoire` | Renomear para `dev-grimoire` ou clonar com o nome correto |
| Read bloqueado em `../` | Restrição do ambiente | Usar multi-root workspace como plano B (adicionar `dev-grimoire` como pasta raiz extra) |
| Conteúdo desatualizado | Clone sem `git pull` | Atualizar o grimório local |
