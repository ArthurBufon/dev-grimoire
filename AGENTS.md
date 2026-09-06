# Dev Grimoire

## Contexto do projeto

- Objetivo: manter regras, moldes, skills e guias reutilizáveis para projetos de trabalho.
- Stack: Markdown e Bash.
- Arquitetura: `docs/rules/` contém convenções; `moldes/` contém referências; `agents/` contém skills, prompts, fragments e scripts.

## Comandos

- Validação do Grimório: `bash agents/scripts/validar-grimorio.sh`
- Sincronização de skills: `bash agents/scripts/sync-global-skills.sh`

## Limites locais

- `docs/rules/global.md` é a fonte da skill global `dev-grimoire`.
- `agents/scripts/sync-global-skills.sh` distribui skills para Cursor, Codex e Claude.
- Não alterar arquivos instalados em diretórios globais como substituto da fonte neste repositório.
