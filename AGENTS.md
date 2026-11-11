# Dev Grimoire

## Contexto do projeto

- Objetivo: manter regras, moldes, skills e guias reutilizáveis para projetos de trabalho.
- Stack: Markdown e Bash.
- Arquitetura: `docs/rules/` contém convenções; `moldes/` contém referências; `agents/` contém skills, prompts, fragments e scripts.

## Comandos

- Validação do Grimório: `bash agents/scripts/validar-grimorio.sh`
- Sincronização de skills: `bash agents/scripts/sync-global-skills.sh`

## Limites locais

- `docs/rules/global.md` é a fonte da User Rule global e da skill `dev-grimoire`.
- `agents/scripts/sync-global-skills.sh` distribui skills e publica `global.md` em `~/.codex/AGENTS.md` e `~/.claude/CLAUDE.md`.
- Não alterar arquivos em `~/.codex`, `~/.claude` ou `~/.cursor/skills` como substituto da fonte neste repositório.

## Preferências de Código

- Prefira código simples, legível e idiomático. Use nomes claros, tipos adequados e os padrões já adotados no módulo.
- Mantenha as mudanças no escopo pedido. Reaproveite o código existente e só introduza dependências, abstrações ou camadas quando houver necessidade concreta.
- Guarde os resultados de funções, métodos e construções de objetos em variáveis com nomes claros antes de usá-los como argumentos, valores em arrays ou objetos, ou em estruturas de retorno. Literais e acessos simples a variáveis, propriedades ou índices podem ser usados diretamente. Calcule cada valor no bloco, condição ou callback em que ele é usado para preservar a ordem e o momento da execução.
- Use português nos nomes de funções, métodos e classes, respeitando as convenções do framework e do módulo.
- Quando houver commit, escreva a mensagem em português, no formato `{TAREFA}: descrição objetiva`, com a tarefa em maiúsculas e a descrição com substantivos. Exemplo: `ACESSO: ajuste da validação do código`.
